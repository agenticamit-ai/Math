import katex from "katex";
import { Fragment, useMemo } from "react";

function renderInline(text: string, key: string) {
  // Split on unescaped $...$ pairs; odd indices are math.
  const parts = text.split(/(?<!\\)\$/);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const html = katex.renderToString(part, { throwOnError: false });
      return <span key={`${key}-${i}`} dangerouslySetInnerHTML={{ __html: html }} />;
    }
    // Light **bold** support; restore escaped dollar signs.
    const bits = part.replace(/\\\$/g, "$").split(/\*\*/);
    return (
      <Fragment key={`${key}-${i}`}>
        {bits.map((b, j) => (j % 2 ? <strong key={j}>{b}</strong> : b))}
      </Fragment>
    );
  });
}

/** Text with inline $LaTeX$ math and blank-line paragraph breaks. */
export function MathText({ text, inline = false }: { text: string; inline?: boolean }) {
  const content = useMemo(() => {
    if (inline) return renderInline(text, "i");
    return text
      .split(/\n\s*\n/)
      .map((para, i) => (
        <p key={i}>
          {para.split("\n").map((line, j) => (
            <Fragment key={j}>
              {j > 0 && <br />}
              {renderInline(line, `${i}-${j}`)}
            </Fragment>
          ))}
        </p>
      ));
  }, [text, inline]);
  return inline ? <span className="math-text">{content}</span> : <div className="math-text">{content}</div>;
}
