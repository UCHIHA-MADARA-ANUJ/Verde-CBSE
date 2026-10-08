"use client";

export default function MegaMarquee({
  items,
  reverse = false,
  duration = 42,
  outline = true,
}: {
  items: string[];
  reverse?: boolean;
  duration?: number;
  outline?: boolean;
}) {
  const row = [...items, ...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/10 py-6 md:py-9 bg-black select-none">
      <div
        className={`mega-marquee ${reverse ? "rev" : ""}`}
        style={{ ["--dur" as string]: `${duration}s` }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className={
              i % 2 === 0
                ? outline
                  ? "text-outline-static"
                  : "text-white"
                : "c-grow"
            }
          >
            {t}
            <span className="c-acid px-[0.25em]">/</span>
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 md:w-56 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-56 bg-gradient-to-l from-black to-transparent pointer-events-none" />
    </div>
  );
}
