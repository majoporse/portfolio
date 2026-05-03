export interface Project {
  id: string;
  title: string;
  description: string;
  backgroundLabel: string;
  skills: string[];
  link: string;
  linkText: string;
  blogContent?: string[];
  images?: string[];
  position?: { x: number; y: number }; // For spatial canvas variant
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
    blogContent: [
      "A distributed karaoke system that uses AI to separate vocals from any song in real-time.",
      "Built with Python microservices running on Kubernetes for scalability.",
      "Features real-time lyric synchronization across multiple devices.",
    ],
    images: [],
    position: { x: 200, y: 200 },
  },
  {
    id: "textinator",
    title: "TextinatorX",
    description: "Distributed OCR engine handling high-concurrency image processing through event-sourcing.",
    backgroundLabel: "TEXTINATOR",
    skills: ["Kafka", "C# .NET", "SignalR"],
    link: "#",
    linkText: "Explore GitHub",
    blogContent: [
      "An event-sourced OCR system built to handle thousands of concurrent image processing jobs.",
      "Uses Apache Kafka for event streaming and C# .NET for the core processing engine.",
      "SignalR enables real-time status updates to connected clients.",
    ],
    images: [],
    position: { x: 800, y: 400 },
  },
  {
    id: "juiceworld",
    title: "JuiceWorld",
    description: "Full-stack E-commerce platform with layered architecture and optimized cloud data caching.",
    backgroundLabel: "JUICEWORLD",
    skills: ["ASP.NET MVC", "PostgreSQL"],
    link: "#",
    linkText: "Case Study",
    blogContent: [
      "A complete e-commerce solution built with ASP.NET MVC and PostgreSQL.",
      "Features optimized caching strategies for high-traffic scenarios.",
      "Layered architecture ensures maintainability and scalability.",
    ],
    images: [],
    position: { x: 400, y: 700 },
  },
];
