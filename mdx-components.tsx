import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="font-display" {...props} />,
    a: (props) => <a className="font-semibold text-[var(--brand-dark)] underline underline-offset-4" {...props} />,
    ...components,
  };
}
