import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import type { ReactNode } from "react";

export interface Crumb {
  label: string;
  to?: string;
}

/**
 * Visible breadcrumb trail with schema.org microdata built-in.
 * The last item is treated as the current page.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className="flex flex-wrap items-center gap-1"
      >
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          const content: ReactNode = i === 0 ? (
            <span className="inline-flex items-center gap-1">
              <Home className="h-3 w-3" /> {c.label}
            </span>
          ) : (
            c.label
          );
          return (
            <li
              key={`${c.label}-${i}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="inline-flex items-center gap-1"
            >
              {c.to && !isLast ? (
                <Link
                  to={c.to}
                  itemProp="item"
                  className="hover:text-foreground hover:underline"
                >
                  <span itemProp="name">{content}</span>
                </Link>
              ) : (
                <span
                  itemProp="name"
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-medium text-foreground" : ""}
                >
                  {content}
                </span>
              )}
              <meta itemProp="position" content={String(i + 1)} />
              {!isLast && <ChevronRight className="h-3 w-3 opacity-60" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
