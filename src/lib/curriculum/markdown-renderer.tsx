import React, { ElementType } from 'react';

export function renderMarkdown(text: string) {
  if (!text) return null;

  // Split text by double newlines into block-level chunks
  const blocks = text.split(/\n\n+/);

  return blocks.map((block, idx) => {
    block = block.trim();
    if (!block) return null;

    // Fenced Code Blocks (e.g. ```text ... ```)
    const codeMatch = block.match(/^```(\w+)?\n([\s\S]*?)```$/);
    if (codeMatch) {
      const lines = codeMatch[2].trim().split('\n');
      return (
        <div key={idx} className="my-6 p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-line/40">
          <div className="flex flex-col gap-2 font-medium text-ink-muted">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-3">
                {line.trim().startsWith('→') ? (
                  <>
                    <span className="text-brand-orange shrink-0">→</span>
                    <span>{renderInline(line.replace(/^→\s*/, '').trim())}</span>
                  </>
                ) : (
                  <span>{renderInline(line.trim())}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Headings (e.g. ### Titlu)
    const headingMatch = block.match(/^(#{1,6})\s+([\s\S]*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const content = renderInline(headingMatch[2]);
      const Tag = `h${level}` as ElementType;
      return <Tag key={idx} className="font-heading font-bold mt-8 mb-4">{content}</Tag>;
    }

    // Blockquotes
    if (block.startsWith('>')) {
      // remove '> ' from the beginning of each line
      const lines = block.split('\n').map(line => line.replace(/^>\s?/, ''));
      return (
        <blockquote key={idx} className="border-l-4 border-brand-orange/30 pl-4 italic text-ink-muted my-6">
          {renderInline(lines.join('\n'))}
        </blockquote>
      );
    }

    // Unordered Lists
    if (block.match(/^[-*]\s/m)) {
      const listItems = block.split('\n').filter(line => line.trim().match(/^[-*]\s/));
      return (
        <ul key={idx} className="list-disc pl-6 my-4 space-y-2 text-ink-muted">
          {listItems.map((item, i) => (
            <li key={i}>{renderInline(item.replace(/^[-*]\s/, ''))}</li>
          ))}
        </ul>
      );
    }

    // Default: Paragraph
    return (
      <p key={idx} className="mb-4 text-ink-muted leading-relaxed">
        {renderInline(block)}
      </p>
    );
  });
}

function renderInline(text: string) {
  // Regex parts:
  // Bold: \*\*(.*?)\*\*
  // Italic: \*(.*?)\*
  // Code: `(.*?)`
  const inlineRegex = /(\*\*.*?\*\*|\*.*?\*|`.*?`)/;
  const parts = text.split(inlineRegex);

  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={idx} className="font-bold text-ink">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={idx}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={idx} className="bg-line/30 px-1.5 py-0.5 rounded text-sm font-mono text-ink">{part.slice(1, -1)}</code>;
    }
    // Convert newlines to <br/>
    if (part.includes('\n')) {
      const lines = part.split('\n');
      return (
        <React.Fragment key={idx}>
          {lines.map((l, i) => (
            <React.Fragment key={i}>
              {l}
              {i < lines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </React.Fragment>
      );
    }
    return part;
  });
}
