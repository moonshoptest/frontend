import Link from "next/link";

import { Icon } from "@/components/ui/icon";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3 sm:mb-7">
      <div className="min-w-0">
        <p className="mb-2 text-[10px] font-semibold tracking-[0.16em] text-brand sm:text-xs">
          {eyebrow}
        </p>

        <h2 className="text-xl font-bold leading-relaxed text-foreground sm:text-2xl">{title}</h2>

        {description && (
          <p className="mt-1 max-w-xl text-xs leading-6 text-muted sm:text-sm">{description}</p>
        )}
      </div>

      {actionHref && actionLabel && (
        <Link
          href={actionHref}
          className="mb-1 flex shrink-0 items-center gap-1 text-xs font-semibold text-brand transition-opacity hover:opacity-70 sm:text-sm"
        >
          <span>{actionLabel}</span>
          <Icon name="arrow-left" size={16} />
        </Link>
      )}
    </div>
  );
}
