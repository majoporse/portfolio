import { SectionHeader } from "./SectionHeader";

export function Footer() {
  const handleEmailClick = () => {
    window.location.href = "mailto:" + "mario.hatalcik" + "@" + "gmail.com";
  };

  return (
    <footer className="relative z-10">
      <SectionHeader subtitle="say" title="Hello" accentTitle />

      <div className="theme-bg-primary px-12 md:px-24 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 py-10">
            <button
              onClick={handleEmailClick}
              className="text-xl md:text-4xl text-nowrap font-bold theme-text-primary hover:theme-text-accent transition-colors text-left w-fit break-all"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              mario.hatalcik [at] gmail.com
            </button>

            <div className="flex gap-8">
              <a
                href="https://github.com/majoporse"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-widest theme-text-muted hover:theme-text-accent transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/mario-hatalcik"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm uppercase tracking-widest theme-text-muted hover:theme-text-accent transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="pt-8 border-t theme-border-subtle">
            <p className="text-[10px] uppercase tracking-[1.5em] theme-text-muted">
              Mário Hatalčík
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
