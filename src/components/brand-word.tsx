import { Fragment, type ReactNode } from "react";

// The word "Cabinet" always renders in the wordmark serif (brand guide §5).
// Literal JSX copy uses <span className="font-brand italic"> directly; this
// helper covers copy that arrives as plain strings from data files.
const WORD = /(\bCabinet(?:[’']s)?(?![A-Za-z]))/;

export function brandify(text: string): ReactNode {
  if (!WORD.test(text)) return text;
  return text.split(WORD).map((part, i) =>
    WORD.test(part) && part.startsWith("Cabinet") ? (
      <span key={i} className="font-brand italic">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

// Markdown-style [label](href) links inside data-file copy. Internal hrefs
// navigate in place; external ones open in a new tab. Everything between
// links still goes through brandify, so the wordmark styling is preserved.
const MD_LINK = /\[([^\]]+)\]\(([^()\s]+)\)/g;

/** Strip [label](href) markdown down to the label, for JSON-LD and metas. */
export function stripLinks(text: string): string {
  return text.replace(MD_LINK, "$1");
}

export function richify(text: string): ReactNode {
  if (!text.includes("](")) return brandify(text);
  const nodes: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  MD_LINK.lastIndex = 0;
  while ((match = MD_LINK.exec(text)) !== null) {
    if (match.index > last) {
      nodes.push(<Fragment key={last}>{brandify(text.slice(last, match.index))}</Fragment>);
    }
    const [, label, href] = match;
    const external = href.startsWith("http");
    nodes.push(
      <a
        key={match.index}
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
      >
        {label}
      </a>,
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    nodes.push(<Fragment key={last}>{brandify(text.slice(last))}</Fragment>);
  }
  return nodes;
}
