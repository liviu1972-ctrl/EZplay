export type Round = {
  id: string; // e.g., FIN 1.2.1
  slug: string; // e.g., fin-1-2-1
  pillar: string; // e.g., Finance
  level: string; // e.g., 1 (or MST)
  
  // Editorial thresholds
  titlu_participant?: string;
  descriere_participant?: string;
  titlu_pedagogic?: string;
  descriere_pedagogica?: string;
  intrebare?: string;
  competenta?: string;
  prerechizite?: string;
  continuitate?: string;
  
  // Extracted body (if needed, but plan says we only extract these specific fields)
};

export type MasteryLens = {
  pillar: string;
  standard_profunzime?: string;
  corp_dovezi?: string;
};

export type LevelOverview = {
  level: string;
  descriere_agregata: string;
};

export type IntersectionOverview = {
  level: string;
  pillar: string;
  descriere: string; // e.g. "Cele două registre editoriale ale nivelului"
};

export type PillarOverview = {
  pillar: string;
  meta_definitie: string;
};

export type CurriculumGraph = {
  rounds: Round[];
  lenses: MasteryLens[];
  // we could store the full matrix or use helper functions
};

export const PUBLIC_STATUS = 'Hartă curriculară';

export type CatalogRound = {
  id: string;
  slug: string;
  title: string;
  pillar: string;
  level: string;
  status: string;
  destination: string;
};
