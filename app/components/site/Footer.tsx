export default function Footer() {
  return (
    <footer className="border-t border-[var(--line-soft)]">
      <div className="wrap py-12 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        <div>
          <div className="eyebrow mb-2">Verde / Tower 01</div>
          <p className="text-[14px] muted">Precision-grown living. Built in Delhi, India.</p>
        </div>
        <div className="flex flex-wrap gap-x-7 gap-y-2 text-[13px] muted">
          <span className="mono text-[11px]">28.6139° N · 77.209° E</span>
          <a
            className="hover:text-[var(--ink)] transition-colors"
            href="https://github.com/UCHIHA-MADARA-ANUJ"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
