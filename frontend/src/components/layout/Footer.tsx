import { ArrowUpIcon } from "@/components/ui/icons";

export function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-surface">
      <div className="container-page flex flex-wrap items-center justify-between gap-4 py-10">
        <p className="text-sm font-medium text-muted">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <a
          href="#home"
          aria-label="맨 위로 이동"
          className="inline-flex h-11 w-11 items-center justify-center border border-line text-white transition-colors hover:border-accent hover:text-accent"
        >
          <ArrowUpIcon size={20} />
        </a>
      </div>
    </footer>
  );
}
