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
    id: "shrekify",
    title: "Shrekify",
    description: "AI-powered image transformation service that converts any photo into Shrek-style artwork using Stable Diffusion with ControlNet.",
    backgroundLabel: "SHREKIFY",
    skills: ["Stable Diffusion", "Python", "TypeScript", "PostgreSQL", "MinIO/S3"],
    link: "https://github.com/majoporse/shrekify",
    linkText: "View GitHub",
    blogContent: [
      "An AI image transformation platform that uses Stable Diffusion with ControlNet to convert input images into Shrek-style artwork.",
      "Built with a FastAPI backend for ML inference and a Django REST API for image storage and management.",
      "Features include real-time image generation, ControlNet integration for style preservation, and a React frontend for the gallery UI.",
      "Uses PostgreSQL for metadata storage and MinIO/S3 for object storage, running in a Docker containerized environment.",
    ],
    images: [],
  },
  {
      id: "textinatorx",
      title: "TextInatorX",
      description: "A web application designed to extract text from images using OCR, built on a robust microservice architecture orchestrated with Kafka.",
      backgroundLabel: "TEXTINATORX",
      skills: [".NET", "C#", "Kafka", "MongoDB", "Azure Blob Storage", "Docker"],
      link: "https://github.com/majoporse/TextInatorX",
      linkText: "View GitHub",
      blogContent: [
        "A web application designed to extract text from images using OCR, with a primary focus on demonstrating a robust microservice architecture.",
        "Built around three core microservices (Frontend, Image Storage, Image Processing) seamlessly integrated using .NET Aspire.",
        "Each microservice leverages Wolverine, a powerful mediator framework with built-in Kafka support, for efficient communication.",
        "Uses Azure Blob Storage for image data, SQLite for metadata, and MongoDB for storing processed text, running in a Docker containerized environment.",
      ],
      images: [],
  },
  {
      "id": "juiceworld",
      "title": "JuiceWorld",
      "description": "Your trustworthy anabolic steroids online store 💪💪. Achieve your dream physique with minimal effort and questionable consequences! 🔥🔥",
      "backgroundLabel": "JUICEWORLD",
      "skills": ["C#", ".NET 8", "Entity Framework", "PostgreSQL", "MongoDB", "Azure Blob Storage"],
      "link": "https://github.com/majoporse/showcase/tree/main/juiceworld",
      "linkText": "View GitHub",
      "blogContent": [
        "An e-commerce platform for the sale of anabolic steroids, developed as part of a C# Systems and Applications Development course.",
        "Built with C# and ASP.NET MVC, using Entity Framework for data management and PostgreSQL for persistence.",
        "Features include user-friendly interface, advanced filtering capabilities, customer accounts, and administrator capabilities.",
        "Containerized with Docker for streamlined local development and deployment to Azure cloud."
      ],
      "images": []
  },
  {
    id: "portfolio",
    title: "This Website :)",
    description: "The portfolio you're looking at right now. Built with React Router, Framer Motion, and WebGL shaders.",
    backgroundLabel: "PORTFOLIO",
    skills: ["React Router", "TypeScript", "Tailwind CSS", "Framer Motion", "WebGL", "GLSL"],
    link: "https://github.com/majoporse/portfolio",
    linkText: "View github",
    blogContent: [
      "A personal portfolio website showcasing projects, skills, and experience.",
      "Built with React Router v7, Tailwind CSS v4, and Framer Motion for animations.",
      "Features a WebGL simplex noise background with theme-aware colors, draggable carousels, and CSS marquee tickers.",
      "Supports light/dark theme switching with persistent state.",
    ],
  }
];
