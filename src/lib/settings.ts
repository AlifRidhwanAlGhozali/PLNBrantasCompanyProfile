export interface Settings {
  totalKaryawan: number;
  assistantManager: number;
  karyawanFungsional: number;

  // performance metrics (stored as strings to preserve units like "%" or "GWh")
  eaf: string;
  eafTarget: string;
  efor: string;
  eforTarget: string;
  sof: string;
  sofTarget: string;
  produksi: string;
  produksiTarget: string;

  // certifications handled as array + a note paragraph
  certifications: string[];
  certificationsNote: string;

  // contact information
  contact: {
    companyAddress: string;
    phone: string;
    website: string;
    unitRegion: string;
    unitCustomer: string;
    networkSystem: string;
  };

  // hero stats (displayed on homepage)
  kapasitasTerpasang: string; // e.g., "286"
  totalPlta: number; // e.g., 13
  assetValue: string; // e.g., "5.4T"

  // awards / prestasi & penghargaan
  awards: Array<{
    title: string;
    category: string;
    description: string;
    icon: string;
  }>;
}  

const SETTINGS_KEY = "app_settings";

const DEFAULT_SETTINGS: Settings = {
  totalKaryawan: 533,
  assistantManager: 18,
  karyawanFungsional: 116,

  // sensible defaults based on current UI
  eaf: "98.07%",
  eafTarget: "97.39%",
  efor: "0.01%",
  eforTarget: "0.19%",
  sof: "1.93",
  sofTarget: "2.48",
  produksi: "982.77 GWh",
  produksiTarget: "1310.33",

  certifications: [
    "ISO 9001:2015",
    "ISO 14001:2015",
    "ISO 45001:2018",
    "ISO 50001:2018",
    "ISO 55001:2014",
    "ISO 27001:2013",
    "ISO 20000-1:2018",
    "ISO 22301:2012",
    "ISO 37001:2016",
  ],
  certificationsNote: "PLN NP adalah perusahaan pembangkit pertama di Indonesia yang meraih sertifikat Asset Management System ISO 55001:2014",

  contact: {
    companyAddress: "Gedung Office 18 Park, Jl. T.B. Simatupang\nJakarta Selatan - 12520",
    phone: "021-4283180",
    website: "https://www.plnnp.co.id",
    unitRegion: "Malang, Blitar, Tulungagung, Madiun, dan Ponorogo\nJawa Timur, Indonesia",
    unitCustomer: "UP2B, UID Jawa Timur\nUP3 Malang, UP3 Kediri",
    networkSystem: "20 kV & 25 kV",
  },

  // hero default stats
  kapasitasTerpasang: "286",
  totalPlta: 13,
  assetValue: "5.4T",

  awards: [
    {
      title: "Penghargaan Subroto 2023",
      category: "Keselamatan Ketenagalistrikan",
      description: "Sub Kategori Sistem Grid Code Jawa, Madura, dan Bali (Skala Menengah)",
      icon: "Trophy",
    },
    {
      title: "Penghargaan Subroto 2022",
      category: "Keselamatan Ketenagalistrikan",
      description: "Bidang Keselamatan Ketenagalistrikan PLTA",
      icon: "Trophy",
    },
    {
      title: "PROPER BIRU",
      category: "Kategori PLTA",
      description: "Penghargaan Lingkungan Periode 2018-2023",
      icon: "Award",
    },
    {
      title: "Zero Accident",
      category: "Keselamatan Kerja",
      description: "27.402.379 Jam Kerja (Nov 2006 - Mei 2024)",
      icon: "Medal",
    },
    {
      title: "Bendera EMAS SMK3",
      category: "Sistem Manajemen K3",
      description: "Penghargaan dari Gubernur Jawa Timur sejak 2012",
      icon: "Star",
    },
    {
      title: "SPKI 2024 - Juara 2",
      category: "PLN Inovasi",
      description: "Kategori Aplikasi - Implementasi TMC GBG",
      icon: "Trophy",
    },
  ],
};

let listeners: Array<(s: Settings) => void> = [];

export function readSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function writeSettings(s: Partial<Settings>) {
  const current = readSettings();
  const next = { ...current, ...s };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
  listeners.forEach((l) => l(next));
}

export function subscribeSettings(cb: (s: Settings) => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

export function resetSettings() {
  localStorage.removeItem(SETTINGS_KEY);
  const s = readSettings();
  listeners.forEach((l) => l(s));
}
