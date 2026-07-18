

export interface CurriculumFrontmatter {
  title?: string;
  status?: string;
  version?: string;
  updated?: string;
  canonical_for?: string[];
  pillar?: string;
  level?: string | number;
  [key: string]: unknown;
}

export interface ParsedMarkdown {
  frontmatter: CurriculumFrontmatter;
  content: string;
}

export function parseFrontmatter(fileContent: string): ParsedMarkdown {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }

  const [, yamlString, content] = match;
  const frontmatter: CurriculumFrontmatter = {};
  
  const lines = yamlString.split('\n');
  let currentKey = '';
  let isArray = false;

  for (let line of lines) {
    line = line.trimEnd();
    if (!line) continue;

    if (line.startsWith('  - ')) {
      // Array item
      if (currentKey && isArray) {
        const val = line.replace('  - ', '').trim();
        if (Array.isArray(frontmatter[currentKey])) {
          (frontmatter[currentKey] as string[]).push(val);
        }
      }
    } else {
      const separatorIndex = line.indexOf(':');
      if (separatorIndex !== -1) {
        currentKey = line.slice(0, separatorIndex).trim();
        const value = line.slice(separatorIndex + 1).trim();
        if (value === '') {
          isArray = true;
          frontmatter[currentKey] = [];
        } else {
          isArray = false;
          // remove quotes if present
          frontmatter[currentKey] = value.replace(/^['"](.*)['"]$/, '$1');
        }
      }
    }
  }

  return { frontmatter, content };
}

/**
 * Extracts sections separated by `## ` headers.
 */
export function extractSections(markdown: string): { title: string; body: string }[] {
  const sections: { title: string; body: string }[] = [];
  const lines = markdown.split(/\r?\n/);
  
  let currentTitle = '';
  let currentBody: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      if (currentTitle || currentBody.length > 0) {
        sections.push({ title: currentTitle, body: currentBody.join('\n') });
      }
      currentTitle = line.substring(3).trim();
      currentBody = [];
    } else if (line.startsWith('# ')) {
      // Top level header, typically indicates start of document body
      if (currentTitle || currentBody.length > 0) {
        sections.push({ title: currentTitle, body: currentBody.join('\n') });
      }
      currentTitle = line.substring(2).trim();
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  if (currentTitle || currentBody.length > 0) {
    sections.push({ title: currentTitle, body: currentBody.join('\n') });
  }

  return sections;
}

/**
 * Extracts a specific field defined by `**Field Name:** value` or multi-line until next `**`
 */
export function extractField(body: string, fieldName: string): string | undefined {
  const regex = new RegExp(`\\*\\*${fieldName}:\\*\\*\\s*([\\s\\S]*?)(?:\\n\\*\\*|$)`, 'i');
  const match = body.match(regex);
  if (match && match[1]) {
    return match[1].trim();
  }
  return undefined;
}
