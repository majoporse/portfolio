interface SectionHeaderProps {
  subtitle: string;
  title: string;
  accentTitle?: boolean;
}

export function SectionHeader({ subtitle, title, accentTitle = false }: SectionHeaderProps) {
  return (
    <div className="px-2 md:px-24 pt-24 pb-8">
      <div className="inline-block theme-bg-card px-8 py-6">
        <p className="text-[10px] uppercase tracking-[0.8em] theme-text-muted mb-4 font-bold">
          {subtitle}
        </p>
        <h2
          className={`text-6xl md:text-8xl font-black tracking-tighter italic text-left ${accentTitle ? "theme-text-accent" : "theme-text-primary"}`}
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
          <span className="theme-text-accent">.</span>
        </h2>
      </div>
    </div>
  );
}
