import 'server-only';
import fs from 'fs';
import path from 'path';
import { Round, MasteryLens, CurriculumGraph, CatalogRound, PUBLIC_STATUS } from '@/types/curriculum';
import { parseFrontmatter, extractSections, extractField } from './parser';

export interface IntersectionOverview {
  registries: string;
}

export interface PillarOverview {
  definition: string;
  progression: string;
  relationships: string;
  masteryContribution: string;
}

const DEFAULT_CURRICULUM_DIR = path.join(process.cwd(), 'docs/products/educational-program/curriculum');

/**
 * Normalizes an ID to a deterministic slug.
 * e.g., "FIN 1.2.1" -> "fin-1-2-1"
 */
export function generateSlug(id: string): string {
  return id.toLowerCase().replace(/[\s\.]+/g, '-').replace(/-+$/, '');
}

/**
 * Builds the curriculum graph at build time.
 * Throws an aggregate error if there are any structural issues, stopping the build.
 */
export function getCurriculumGraph(curriculumDir: string = DEFAULT_CURRICULUM_DIR): CurriculumGraph {
  const rounds: Round[] = [];
  const lenses: MasteryLens[] = [];
  const errors: string[] = [];
  const warnings: string[] = [];

  const roundIds = new Set<string>();
  const slugs = new Set<string>();

  const processLevelFile = (pillarPath: string, levelFile: string) => {
    const fullPath = path.join(curriculumDir, pillarPath, levelFile);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing mandatory source: ${pillarPath ? pillarPath + '/' : ''}${levelFile}`);
      return;
    }

    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const { frontmatter, content } = parseFrontmatter(fileContent);
    const sections = extractSections(content);

    const pillar = frontmatter.pillar || (pillarPath === '' ? 'Mastery' : pillarPath);
    const level = frontmatter.level?.toString() || (levelFile === 'mastery-rounds.md' ? 'MST' : levelFile.replace('.md', '').replace('level-', ''));

    for (const section of sections) {
      // Round headers look like: "FIN 1.2.1 — Vânzările/Revenue" or "MST 01 — ..."
      const match = section.title.match(/^((?:FIN|STR|PRD|MKT|OPS|MST)\s+[\d\.]+)(?:\s+(?:—|-)\s+(.*))?$/);
      if (match) {
        const id = match[1].trim();
        const slug = generateSlug(id);

        if (!id || !pillar || !level) {
          errors.push(`Missing minimal structure for section '${section.title}' in ${pillarPath}/${levelFile}`);
          continue;
        }

        if (roundIds.has(id)) {
          errors.push(`Duplicate ID found: ${id} in ${pillarPath}/${levelFile}`);
          continue;
        }
        if (slugs.has(slug)) {
          errors.push(`Slug collision for ${slug} (ID: ${id}) in ${pillarPath}/${levelFile}`);
          continue;
        }

        roundIds.add(id);
        slugs.add(slug);

        const intrebare = extractField(section.body, 'Întrebarea antreprenorială') || extractField(section.body, 'Întrebarea fondatorului');
        const titlu_participant = extractField(section.body, 'Titlu pentru participant');
        const descriere_participant = extractField(section.body, 'Descriere pentru participant');
        const continuitate = extractField(section.body, 'Continuitate');

        if (!intrebare) warnings.push(`Missing Întrebarea antreprenorială/fondatorului in ${id}`);
        if (!titlu_participant) warnings.push(`Missing Titlu pentru participant in ${id}`);
        if (!descriere_participant) warnings.push(`Missing Descriere pentru participant in ${id}`);
        if (!continuitate) warnings.push(`Missing Continuitate in ${id}`);

        rounds.push({
          id,
          slug,
          pillar: pillar as string,
          level,
          titlu_participant,
          descriere_participant,
          titlu_pedagogic: extractField(section.body, 'Titlu pedagogic'),
          descriere_pedagogica: extractField(section.body, 'Descriere pedagogică'),
          intrebare,
          competenta: extractField(section.body, 'Competență urmărită'),
          prerechizite: extractField(section.body, 'Prerechizite'),
          continuitate
        });
      }
    }
  };

  // Process Level 1-5 files (25 files)
  const pillars = ['finance', 'strategy', 'product', 'market', 'operations'];
  for (const pillar of pillars) {
    for (let l = 1; l <= 5; l++) {
      processLevelFile(pillar, `level-${l}.md`);
    }
  }

  // Process Mastery Rounds (1 file)
  processLevelFile('', 'mastery-rounds.md');

  // Process Mastery Lenses (5 files)
  const masteryDir = path.join(curriculumDir, 'mastery');
  for (const pillar of pillars) {
    const fullPath = path.join(masteryDir, `${pillar}.md`);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing mandatory lens source: mastery/${pillar}.md`);
      continue;
    }
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const { content } = parseFrontmatter(fileContent);
    const sections = extractSections(content);
    
    let standard_profunzime = '';
    let corp_dovezi = '';

    for (const section of sections) {
      if (section.title.toLowerCase().includes('standardul terminal')) {
        standard_profunzime = section.body;
      }
      if (section.title.toLowerCase().includes('corpul coerent de dovezi')) {
        corp_dovezi = section.body;
      }
    }

    if (!standard_profunzime) errors.push(`Missing 'Standardul terminal' in mastery/${pillar}.md`);
    if (!corp_dovezi) errors.push(`Missing 'Corpul coerent de dovezi' in mastery/${pillar}.md`);

    lenses.push({
      pillar: pillar.charAt(0).toUpperCase() + pillar.slice(1),
      standard_profunzime,
      corp_dovezi
    });
  }

  // Validate Totals
  const l1to5Count = rounds.filter(r => r.level !== 'MST').length;
  const mstCount = rounds.filter(r => r.level === 'MST').length;

  if (l1to5Count !== 178) {
    errors.push(`Expected 178 Level 1-5 rounds, found ${l1to5Count}`);
  }
  if (mstCount !== 13) {
    errors.push(`Expected 13 Mastery rounds, found ${mstCount}`);
  }
  if (rounds.length !== 191) {
    errors.push(`Expected exactly 191 total rounds, found ${rounds.length}`);
  }
  if (lenses.length !== 5) {
    errors.push(`Expected exactly 5 lenses, found ${lenses.length}`);
  }

  if (warnings.length > 0) {
    // console.warn can be used to output curricular warnings without failing the build
    console.warn(`Curriculum Warnings:\n- ${warnings.join('\n- ')}`);
  }

  if (errors.length > 0) {
    throw new Error(`Curriculum structural validation failed:\n- ${errors.join('\n- ')}`);
  }

  return { rounds, lenses };
}

// Caching the graph so we don't re-parse on every static generation call
let cachedGraph: CurriculumGraph | null = null;

export function getCachedGraph(): CurriculumGraph {
  if (!cachedGraph) {
    cachedGraph = getCurriculumGraph();
  }
  return cachedGraph;
}

export function getRoundBySlug(slug: string): Round | undefined {
  const graph = getCachedGraph();
  return graph.rounds.find(r => r.slug === slug);
}

export function isEligibleForDetailedPage(round: Round): boolean {
  return !!(round.titlu_participant && round.descriere_participant);
}

export function getAllEligibleSlugs(): string[] {
  const graph = getCachedGraph();
  return graph.rounds
    .filter(r => isEligibleForDetailedPage(r))
    .map(r => r.slug);
}

export const PUBLISHED_DETAILED_SLUGS = [
  'fin-1-1',
  'fin-1-2-1',
  'fin-1-2-2',
  'fin-1-3',
  'fin-1-4',
  'fin-1-5',
  'fin-1-6'
];

export function isPublishedDetailedRound(slug: string): boolean {
  return PUBLISHED_DETAILED_SLUGS.includes(slug);
}

export function getPublishedDetailedSlugs(): string[] {
  const allEligible = getAllEligibleSlugs();
  return allEligible.filter(slug => isPublishedDetailedRound(slug));
}

export function mapToCatalogRound(round: Round): CatalogRound {
  let destination = '';
  if (isPublishedDetailedRound(round.slug)) {
    destination = `/program/curriculum/rounds/${round.slug}`;
  } else if (round.level === 'MST') {
    destination = `/program/curriculum/mastery#${round.slug}`;
  } else {
    destination = `/program/curriculum/levels/${round.level}/pillars/${round.pillar.toLowerCase()}#${round.slug}`;
  }

  return {
    id: round.id,
    slug: round.slug,
    title: round.titlu_participant || round.id,
    pillar: round.pillar,
    level: round.level,
    status: PUBLIC_STATUS,
    destination
  };
}

export function getIntersectionOverview(pillar: string, level: string | number): IntersectionOverview {
  const fullPath = path.join(DEFAULT_CURRICULUM_DIR, pillar, `level-${level}.md`);
  if (!fs.existsSync(fullPath)) {
    return { registries: '' };
  }
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { content } = parseFrontmatter(fileContent);
  const sections = extractSections(content);
  
  const registriesSection = sections.find(s => s.title.toLowerCase().includes('cele două registre editoriale'));
  return {
    registries: registriesSection ? registriesSection.body : ''
  };
}

export function getMasteryOverview(): string {
  const fullPath = path.join(DEFAULT_CURRICULUM_DIR, 'mastery.md');
  if (!fs.existsSync(fullPath)) return '';
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { content } = parseFrontmatter(fileContent);
  const sections = extractSections(content);
  const overviewSection = sections.find(s => !s.title.toLowerCase().includes('founder rounds'));
  return overviewSection ? overviewSection.body : '';
}

export function getGlossaryContent(): { terminology: string; models: string } {
  let terminology = '';
  let models = '';

  const modelPath = path.join(process.cwd(), 'docs/methods/economic-model.md');
  if (fs.existsSync(modelPath)) {
    const content = fs.readFileSync(modelPath, 'utf-8');
    const sections = extractSections(content);
    const termSection = sections.find(s => s.title.toLowerCase().includes('terminologie'));
    const formulaSection = sections.find(s => s.title.toLowerCase().includes('formule'));
    if (termSection) terminology = termSection.body;
    if (formulaSection) models = formulaSection.body;
  }

  return { terminology, models };
}

export interface GlossaryTerm {
  term: string;
  definition: string;
}

export function getGlossaryTerms(): GlossaryTerm[] {
  const terms: GlossaryTerm[] = [];
  try {
    const ecoModelPath = path.join(process.cwd(), 'docs/methods/economic-model.md');
    if (fs.existsSync(ecoModelPath)) {
      const content = fs.readFileSync(ecoModelPath, 'utf-8');
      const { content: mdContent } = parseFrontmatter(content);
      const sections = extractSections(mdContent);
      
      const dictSection = sections.find(s => s.title.toLowerCase().includes('dicționarul comun'));
      if (dictSection) {
        const lines = dictSection.body.split('\n');
        for (const line of lines) {
          if (line.trim().startsWith('|') && !line.includes('---|---')) {
            const cols = line.split('|').map(c => c.trim()).filter(c => c);
            if (cols.length >= 4 && cols[0].toLowerCase() !== 'rol') {
              const rol = cols[0];
              const businessLang = cols[3];
              terms.push({ term: businessLang, definition: rol });
            }
          }
        }
      }
    }

    const archPath = path.join(process.cwd(), 'docs/products/educational-program/curriculum/architecture.md');
    if (fs.existsSync(archPath)) {
      const content = fs.readFileSync(archPath, 'utf-8');
      const { content: mdContent } = parseFrontmatter(content);
      const regex = /###\s+(Founder Round|Founder Loop)\s+([\s\S]*?)(?=###|$)/gi;
      let match;
      while ((match = regex.exec(mdContent)) !== null) {
        const term = match[1].trim();
        const body = match[2].trim();
        const firstParaMatch = body.match(/^([^\n]+(?:\n[^\n]+)*)/);
        if (firstParaMatch) {
          terms.push({ term, definition: firstParaMatch[1].trim() });
        } else {
          terms.push({ term, definition: body });
        }
      }
    }
  } catch (err) {
    console.error('Failed to extract glossary', err);
  }

  const uniqueTerms = Array.from(new Map(terms.map(item => [item.term, item])).values());
  return uniqueTerms.sort((a, b) => a.term.localeCompare(b.term));
}
export function getPillarStatus(pillar: string): string {
  const fullPath = path.join(DEFAULT_CURRICULUM_DIR, `${pillar}-spiral.md`);
  if (!fs.existsSync(fullPath)) {
    return '';
  }
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { frontmatter } = parseFrontmatter(fileContent);
  return frontmatter.status || '';
}

export function getPillarOverview(pillar: string): PillarOverview {
  const fullPath = path.join(DEFAULT_CURRICULUM_DIR, `${pillar}-spiral.md`);
  if (!fs.existsSync(fullPath)) {
    return { definition: '', progression: '', relationships: '', masteryContribution: '' };
  }
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { content } = parseFrontmatter(fileContent);
  const sections = extractSections(content);
  
  return {
    definition: sections.find(s => s.title.toLowerCase().includes('pentru fondatori') || s.title.toLowerCase().includes('pentru antreprenori'))?.body || '',
    progression: sections.find(s => s.title.toLowerCase().includes('definiția progresiei'))?.body || '',
    relationships: sections.find(s => s.title.toLowerCase().includes('relația cu celelalte'))?.body || '',
    masteryContribution: sections.find(s => s.title.toLowerCase().includes('contribuția la mastery'))?.body || ''
  };
}

export function getLevelOverview(level: number): string {
  const fullPath = path.join(DEFAULT_CURRICULUM_DIR, 'progression-map.md');
  if (!fs.existsSync(fullPath)) {
    return '';
  }
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const { content } = parseFrontmatter(fileContent);
  const sections = extractSections(content);
  
  const levelPrefix = `Level ${level} —`;
  const levelSection = sections.find(s => s.title.startsWith(levelPrefix) || s.title.startsWith(`Level ${level} -`));
  
  if (!levelSection) {
    return '';
  }

  // Extragem subtitlurile și conținutul din body-ul secțiunii (deoarece extractSections extrage doar h2)
  return levelSection.body;
}
