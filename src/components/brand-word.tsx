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
