export interface Project {
  id: string;
  title: string;
  description: string;
  backgroundLabel: string;
  skills: string[];
  link: string;
  linkText: string;
}

export const projects: Project[] = [
  {
    id: "singsync",
    title: "SingSync",
    description: "Orchestrating AI-driven vocal separation and real-time lyric synchronization.",
    backgroundLabel: "SINGSYNC",
    skills: ["Microservices", "Python", "K8s"],
    link: "#",
    linkText: "View System Design",
  },
  {
    id: "textinator",
    title: "TextinatorX",
    description: "Distributed OCR engine handling high-concurrency image processing through event-sourcing.",
    backgroundLabel: "TEXTINATOR",
    skills: ["Kafka", "C# .NET", "SignalR"],
    link: "#",
    linkText: "Explore GitHub",
  },
  {
    id: "juiceworld",
    title: "JuiceWorld",
    description: "Full-stack E-commerce platform with layered architecture and optimized cloud data caching.",
    backgroundLabel: "JUICEWORLD",
    skills: ["ASP.NET MVC", "PostgreSQL"],
    link: "#",
    linkText: "Case Study",
  },
];