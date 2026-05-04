import { useState, useMemo } from "react";
import { SectionHeader } from "./SectionHeader";
import { useTheme } from "~/context/ThemeContext";

const facts = [
  "Path of Exile",
  "lifting weights",
  "C#",
  "Christopher Nolan",
  "machine learning",
  "Neovim",
  "white monster",
  "Dune",
  "distributed systems",
  "arch btw",
  "League of Legends",
  "bench press",
  "Denis Villeneuve",
  "Rust",
  "Hi-Fi",
  "problem solving",
  "coffee",
  "not JavaScript",
  "Adam Sandler",
  "Lidl",
  "software architecture",
  "swimming",
  "generative design",
  "sleeping",
  "self improvement podcasts",
  "Need for Speed",
  "cinematography",
  "tennis",
  "strict typing",
  "Linux",
  "bicep curls",
  "Diablo",
  "Hearthstone",
  "weekends",
  "Pou",
  "scalable applications",
  "energy drinks",
  "Joe Rogan",
  "experimenting",
  "GitHub Copilot",
  "learning",
  "music",
  "protein",
  "computer science",
  "programming",
  "Path of Exile 2",
  "Parkside",
  "AliExpress",
  "Vsauce",
  "Hardstyle",
  "DnB",
  "Logic (rapper)",
  "Kanye",
  "Rock",
  "Metal",
  "B-movies",
  "Turtles",
  "Monke",
  "to move it move it",
  "you",
  "Wes Anderson",
  "dark mode",
  "star wars",
  "marvel",
  "kong strong"
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function About() {
  const [paused, setPaused] = useState(false);
  const shuffled = useMemo(() => shuffle(facts), []);
  const doubled = [...shuffled, ...shuffled];
  const {theme, setTheme} = useTheme();

  return (
    <div id="about">
      <section className="relative overflow-hidden">
        <SectionHeader subtitle="This is" title="Me" />

        <div className="theme-bg-primary px-6 py-24 ">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr_200px] gap-12 md:gap-16 items-start">

            {/* Photo */}
            <div className="w-full aspect-square theme-bg-card theme-border-subtle border flex items-center justify-center">
              <img
                src={theme == 'dark' ? "images/image2.png" : "images/headshot.jpg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-center md:min-w-[300px]">
              <p className="text-lg tracking-wider theme-text-muted leading-relaxed mb-4 max-w-xl">
                I'm Mário, a full-stack developer based in Slovakia, currently
                studying in Brno.
              </p>
              <p className="text-lg tracking-wider theme-text-muted leading-relaxed mb-4 max-w-xl">
                I've grown to love building things with C#, Python, and Rust,
                and I enjoy designing projects with clean, scalable architecture.
              </p>
              <p className="text-lg tracking-wider theme-text-muted leading-relaxed mb-4 max-w-xl">
                When I'm not coding, I'm probably doing some sports, gaming, or
                watching something from my IMDB watchlist.
              </p>
              <p className="text-lg tracking-wider theme-text-muted leading-relaxed mb-4 max-w-xl">
                I love getting better at what I do. I'm always hunting for new
                perspectives, tools, and tricks.</p>
            </div>

            {/* Facts ticker — CSS marquee */}
            <div className="flex flex-col w-100">
              <span className="text-[10px] uppercase tracking-[0.8em] theme-text-muted font-bold mb-6">
                I like
              </span>
              <div
                className="overflow-hidden h-[300px] cursor-grab active:cursor-grabbing"
                onMouseDown={() => setPaused(true)}
                onMouseUp={() => setPaused(false)}
                onMouseLeave={() => setPaused(false)}
                onTouchStart={() => setPaused(true)}
                onTouchEnd={() => setPaused(false)}
              >
                <div
                  className="flex flex-col marquee-scroll"
                  style={{
                    animationPlayState: paused ? "paused" : "running",
                  }}
                >
                  {doubled.map((fact, index) => (
                    <span
                      key={`${fact}-${index}`}
                      className="text-2xl uppercase tracking-wide theme-text-accent h-10" 
                    >
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
