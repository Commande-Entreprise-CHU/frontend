export type ToothState = "Normal" | "Missing" | "Implant";

export interface ToothData {
  id: string;
  state: ToothState;
}

export interface TeethData {
  [toothId: string]: ToothState;
}

export const TOOTH_STATE_COLORS: Record<ToothState, string> = {
  Normal: "fill-base-300 hover:fill-primary",
  Missing: "fill-error hover:fill-error",
  Implant: "fill-warning hover:fill-warning",
};

// FDI notation
export const TOOTH_IDS = [
  // HAUTE droite
  "18",
  "17",
  "16",
  "15",
  "14",
  "13",
  "12",
  "11",
  // HAUTE gauche
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  // BAS gauche
  "38",
  "37",
  "36",
  "35",
  "34",
  "33",
  "32",
  "31",
  // BAS droite
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
];
