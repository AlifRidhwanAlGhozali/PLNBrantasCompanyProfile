export interface ESGCategory {
  category: string;
  icon?: string;
  color?: string;
  bgColor?: string;
  items: string[];
}

export interface ESGHighlight {
  value: string;
  unit?: string;
  label: string;
}

export interface ESGData {
  title: string;
  subtitle: string;
  intro: string;
  categories: ESGCategory[];
  highlights: ESGHighlight[];
}

const ESG_KEY = "app_esg";

const DEFAULT_ESG: ESGData = {
  title: "Komitmen Keberlanjutan",
  subtitle: "Environmental, Social & Governance",
  intro: "Menjalankan operasi bisnis yang bertanggung jawab terhadap lingkungan dan masyarakat",
  categories: [
    {
      category: "Environmental",
      icon: "Leaf",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      items: [
        "Penanaman 20.000 bibit pohon Gaharu di Arboretum Sumber Brantas",
        "Pengurangan emisi karbon 470.067 ton CO2 eq/tahun",
        "Setara dengan penanaman 16.500 pohon Trembesi",
        "PLTS & PLTB untuk optimalisasi pemakaian sendiri",
      ],
    },
    {
      category: "Social",
      icon: "Users",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      items: [
        "Program BAGOES (Brantas Goes To School)",
        "Sekolah Alam MIBA untuk pendidikan berkualitas",
        "Bantuan renovasi masjid dan sarana umum",
        "Uji Blackstart & Line Charging untuk keandalan sistem",
      ],
    },
    {
      category: "Governance",
      icon: "Shield",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      items: [
        "Sertifikasi kompetensi operator PLTA",
        "Implementasi ISO dan sistem manajemen terintegrasi",
        "Business Continuity Plan (BCP)",
        "Program K3 dan keselamatan kerja",
      ],
    },
  ],
  highlights: [
    { value: "470,067", unit: "ton CO₂ eq/tahun", label: "Pengurangan Emisi Karbon" },
    { value: "16,500", unit: "Pohon Trembesi", label: "Ekuivalen Penyerapan CO₂" },
    { value: "540,307", unit: "MWh/tahun", label: "Produksi PLTA Sutami" },
  ],
};

let listeners: Array<(e: ESGData) => void> = [];

function sanitizeESG(rawNext: any): ESGData {
  const next = { ...DEFAULT_ESG, ...(rawNext || {}) } as ESGData;

  // categories must be an array of objects with items arrays
  if (!Array.isArray(next.categories)) next.categories = DEFAULT_ESG.categories.map((c) => ({ ...c }));
  else {
    next.categories = next.categories.map((c: any) => ({
      category: String(c?.category || 'Untitled'),
      icon: String(c?.icon || ''),
      color: String(c?.color || ''),
      bgColor: String(c?.bgColor || ''),
      items: Array.isArray(c?.items) ? c.items.map(String) : []
    }));
  }

  // highlights must be an array
  if (!Array.isArray(next.highlights)) next.highlights = DEFAULT_ESG.highlights.map((h) => ({ ...h }));
  else {
    next.highlights = next.highlights.map((h: any) => ({ value: String(h?.value || ''), unit: String(h?.unit || ''), label: String(h?.label || '') }));
  }

  return next;
}

export function readESG(): ESGData {
  try {
    const raw = localStorage.getItem(ESG_KEY);
    if (!raw) return DEFAULT_ESG;
    const parsed = JSON.parse(raw);
    return sanitizeESG(parsed);
  } catch (e) {
    console.error('readESG failed, returning default', e);
    return DEFAULT_ESG;
  }
}

export function writeESG(next: Partial<ESGData>) {
  const current = readESG();
  const merged: ESGData = {
    title: next.title ?? current.title,
    subtitle: next.subtitle ?? current.subtitle,
    intro: next.intro ?? current.intro,
    categories: next.categories ?? current.categories,
    highlights: next.highlights ?? current.highlights,
  };
  const sanitized = sanitizeESG(merged);
  localStorage.setItem(ESG_KEY, JSON.stringify(sanitized));
  listeners.forEach((l) => l(sanitized));
}

export function subscribeESG(cb: (e: ESGData) => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

export function resetESG() {
  localStorage.removeItem(ESG_KEY);
  const e = readESG();
  listeners.forEach((l) => l(e));
}
