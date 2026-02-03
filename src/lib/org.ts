export interface Division {
  name: string;
  icon?: string; // icon key (lucide)
  bgColor?: string;
  positions: string[];
}

export interface Unit {
  name: string;
  desc?: string;
}

export interface OrgData {
  divisions: Division[];
  staff: string[];
  units: Unit[];
}

const ORG_KEY = "app_org";

const DEFAULT_ORG: OrgData = {
  divisions: [
    { name: "Enjiniring & QA", icon: "Zap", bgColor: "#000000", positions: ["Asman System Owner", "Asman Condition Based Maintenance", "Asman MMRK"] },
    { name: "Operasi & Pemeliharaan", icon: "Wrench", bgColor: "#FBBF24", positions: ["Asman Rendal Operasi", "Asman Rendal Pemeliharaan", "Asman ICC & Gudang", "Asman PLTA Remote", "Asman Outage Management"] },
    { name: "Keuangan & Adm", icon: "DollarSign", bgColor: "#9CA3AF", positions: ["Asman Keuangan", "Asman SDM, Umum & CSR", "Asman Pengadaan"] },
  ],
  staff: ["Asman K3 & Keamanan", "Asman Sipil & Lingkungan"],
  units: [
    { name: "Asman Distrik A", desc: "PLTA Sutami & Sengguruh" },
    { name: "Asman Distrik B", desc: "PLTA Wlingi & Lodoyo" },
    { name: "Asman Distrik C", desc: "PLTA Tulungagung & Wonorejo" },
    { name: "Asman Distrik D", desc: "PLTA Selorejo, Mendalan, & Siman" },
    { name: "Asman Distrik E", desc: "PLTA Golang, Giringan, & Ngebel" },
    { name: "TL PLTA Ampelgading", desc: "Unit Pembangkitan" },
  ],
};

let listeners: Array<(o: OrgData) => void> = [];

export function readOrg(): OrgData {
  try {
    const raw = localStorage.getItem(ORG_KEY);
    if (!raw) return DEFAULT_ORG;
    return JSON.parse(raw) as OrgData;
  } catch {
    return DEFAULT_ORG;
  }
}

export function writeOrg(next: Partial<OrgData>) {
  const current = readOrg();
  const merged: OrgData = {
    divisions: next.divisions ?? current.divisions,
    staff: next.staff ?? current.staff,
    units: next.units ?? current.units,
  };
  localStorage.setItem(ORG_KEY, JSON.stringify(merged));
  listeners.forEach((l) => l(merged));
}

export function subscribeOrg(cb: (o: OrgData) => void) {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
}

// CRUD helpers
export function addDivision(name: string, icon?: string, bgColor?: string) {
  const org = readOrg();
  org.divisions.push({ name, icon, bgColor, positions: [] });
  writeOrg({ divisions: org.divisions });
}

export function removeDivision(index: number) {
  const org = readOrg();
  org.divisions.splice(index, 1);
  writeOrg({ divisions: org.divisions });
}

export function addPosition(divIndex: number, position: string) {
  const org = readOrg();
  const d = org.divisions[divIndex];
  if (!d) return;
  d.positions.push(position);
  writeOrg({ divisions: org.divisions });
}

export function removePosition(divIndex: number, posIndex: number) {
  const org = readOrg();
  const d = org.divisions[divIndex];
  if (!d) return;
  d.positions.splice(posIndex, 1);
  writeOrg({ divisions: org.divisions });
}

export function updateDivisionName(divIndex: number, name: string) {
  const org = readOrg();
  const d = org.divisions[divIndex];
  if (!d) return;
  d.name = name;
  writeOrg({ divisions: org.divisions });
}

export function updateDivisionColor(divIndex: number, color: string) {
  const org = readOrg();
  const d = org.divisions[divIndex];
  if (!d) return;
  d.bgColor = color;
  writeOrg({ divisions: org.divisions });
} 

export function updateDivisionIcon(divIndex: number, icon: string) {
  const org = readOrg();
  const d = org.divisions[divIndex];
  if (!d) return;
  d.icon = icon;
  writeOrg({ divisions: org.divisions });
}

export function addStaff(name: string) {
  const org = readOrg();
  org.staff.push(name);
  writeOrg({ staff: org.staff });
}

export function removeStaff(index: number) {
  const org = readOrg();
  org.staff.splice(index, 1);
  writeOrg({ staff: org.staff });
}

export function updateStaff(index: number, name: string) {
  const org = readOrg();
  if (!org.staff[index]) return;
  org.staff[index] = name;
  writeOrg({ staff: org.staff });
}

export function addUnit(name: string, desc?: string) {
  const org = readOrg();
  org.units.push({ name, desc });
  writeOrg({ units: org.units });
}

export function removeUnit(index: number) {
  const org = readOrg();
  org.units.splice(index, 1);
  writeOrg({ units: org.units });
}
