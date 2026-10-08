"use client";

export default function Marquee({
  items,
  reverse = false,
  className = "",
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const row = [...items, ...items];
  return (
    <div className={`relative overflow-hidden py-5 ${className}`}>
      <div
        className="flex w-max gap-10 will-change-transform"
        style={{
          animation: `verde-marquee ${items.length * 4.5}s linear infinite${
            reverse ? " reverse" : ""
          }`,
        }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 eyebrow whitespace-nowrap">
            {t}
            <span className="w-1 h-1 rounded-full bg-[var(--green)] opacity-60" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[var(--bg)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[var(--bg)] to-transparent" />
    </div>
  );
}
