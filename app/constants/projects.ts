export interface Project {
  id: string;
  title: string;
  description: string;
  backgroundLabel: string;
  skills: string[];
  links: { [key: string]: string };
  blogContent?: string[];
  images?: string[];
  position?: { x: number; y: number }; // For spatial canvas variant
}

export const projects: Project[] = [
  {
    id: "singsync",
    title: "SingSync",
    description:
      "Orchestrating AI-driven vocal separation and real-time lyric synchronization.",
    backgroundLabel: "SINGSYNC",
    skills: ["Microservices", "Python", "K3s"],
    links: {
      "Visit Website": "https://hatal.cc",
      "View GitHub": "https://github.com/majoporse/karaoke-inator",
    },
    blogContent: [
      "This project was born out of my frustration with trying to find karaoke versions of my favorite songs. I wanted to build a system that could take any track, separate the vocals from the background music, and use AI-driven transcription to sync the lyrics automatically.",
      "I used this as a learning opportunity to explore technologies I hadn't worked with much before. I built the backend in FastAPI, used WebSockets for real-time updates, and managed messaging via Redis Pub/Sub. The entire distributed system is composed of multiple microservices deployed on Kubernetes, and I even threw in Elasticsearch just to see how it would fit into the architecture.",
      "The vocal separation is handled by a pre-trained model called Demucs, which produces surprisingly high-quality results. However, because Demucs is hardware-intensive, I opted for Spleeter in the production deployment; it's much more lightweight, even if the results are a bit lower in quality. For lyric synchronization, I used OpenAI’s Whisper model alongside the stable-ts package to transcribe the vocals and perfectly align them with the original lyrics.",
      "The frontend is a simple React app that provides real-time progress updates, all tied together by an orchestration service that manages the communication between microservices. Overall, it was a rewarding challenge to see everything work together. It’s a great feeling to sing along to perfectly synced tracks—and it makes for a pretty cool party trick. If you want to see it in action, it's currently hosted at https://hatal.cc",
    ],
    images: [
      "/images/projects/singsync/home.png",
      "/images/projects/singsync/generated.png",
    ],
    position: { x: 200, y: 200 },
  },
  {
    id: "shrekify",
    title: "Shrekify",
    description:
      "AI-powered image transformation service that converts any photo into Shrek-style artwork using Stable Diffusion with ControlNet.",
    backgroundLabel: "SHREKIFY",
    skills: [
      "Stable Diffusion",
      "Python",
      "TypeScript",
      "PostgreSQL",
      "MinIO/S3",
      "FastAPI",
      "Django",
      "Docker",
      "AWS",
    ],
    links: { "View GitHub": "https://github.com/majoporse/shrekify" },
    blogContent: [
      "This project started as an assignment for a Generative Design course at my faculty, but I decided to take it a step further and build a full web application out of it. The goal was to take any photo and transform it into Shrek-style artwork using Stable Diffusion and ControlNet to ensure the original features remained recognizable.",
      "The name is actually a bit of a joke; the idea is that you expect a typical 'prettyfying' filter, but instead, the app turns you into an ogre. To manage the high costs of cloud GPUs, I designed a hybrid system: a local FastAPI backend handles the heavy 'Shrekification' on my own hardware, while a lightweight Django-based Gallery app manages the web UI and metadata. There was no specific reason for choosing these frameworks other than wanting to try both and see which I preferred; it was my first time writing a backend in Python, and I've really grown to like it.",
      "The two applications communicate via a REST API, allowing me to combine cloud accessibility with my own local GPU power. This was also my first time deploying to AWS—specifically using ECS and S3—and it was a great way to learn how to bridge the gap between heavy local ML models and cloud deployments.",
      "While this project provided deep insight into how image generation works, it is by no means production-ready. The diffusion models themselves have improved so rapidly since then that these specific versions already feel quite dated, but I learned an incredible amount about the underlying technology and full-stack architecture.",
    ],
    images: [
      "/images/projects/shrekify/image.png",
      "/images/projects/shrekify/home.png",
      "/images/projects/shrekify/after.png",
    ],
  },
  {
    id: "textinatorx",
    title: "TextInatorX",
    description:
      "A web application designed to extract text from images using OCR, built on a robust microservice architecture orchestrated with Kafka.",
    backgroundLabel: "TEXTINATORX",
    skills: [".NET", "C#", "Kafka", "MongoDB", "Azure Blob Storage", "Docker"],
    links: { "View GitHub": "https://github.com/majoporse/TextInatorX" },
    blogContent: [
      "I started this project primarily as a way to teach myself Apache Kafka and the principles of distributed systems, as my university curriculum didn't dive as deeply into those topics as I wanted. I’ve always been curious about how to properly scale applications using multiple replicas and how to manage heavy computational tasks—like OCR—within a web environment without bottlenecking the user experience.",
      "The architecture is built around three core microservices: a Frontend, Image Storage, and Image Processing, all seamlessly integrated using .NET Aspire. To handle communication between these services, I used Wolverine, a mediator framework with built-in Kafka support. While the project is somewhat synthetic in nature, it served as a perfect playground for learning how to handle message queues and brokers in a real-world C# environment.",
      "The choice of databases was driven mostly by curiosity; I wanted to experiment with different storage paradigms. I used Azure Blob Storage for raw image data, while choosing SQLite and MongoDB simply because I wanted to try out a document database and a lightweight relational setup in the same project.",
    ],
    images: [],
  },
  {
    id: "juiceworld",
    title: "JuiceWorld",
    description:
      "Your trustworthy anabolic steroids online store 💪💪. Achieve your dream physique with minimal effort and questionable consequences! 🔥🔥",
    backgroundLabel: "JUICEWORLD",
    skills: [
      "C#",
      ".NET 8",
      "Entity Framework",
      "PostgreSQL",
      "MongoDB",
      "Azure Blob Storage",
    ],
    links: {
      "View GitHub":
        "https://github.com/majoporse/showcase/tree/main/juiceworld",
    },
    blogContent: [
      "This was a school project developed for a 'Systems and Applications Development' course, where the assignment was to build a functional e-commerce platform. My partner, Michal Bilanin, and I decided it would be a funny twist to build an anabolic steroid store. It was a collaborative group effort, Michal props to Michal for handling the majority of the front-end work.",
      "This project served as my introduction to the fundamentals of software architecture. It was designed using a classic three-layer monolithic approach, featuring a front-end built with ASP.NET MVC, an API powered by .NET Core, and Entity Framework for data management. For persistence, we used a PostgreSQL database, and the entire system was containerized with Docker to streamline local development.",
      "The platform includes essential e-commerce features such as customer accounts, advanced product filtering, and a dedicated administrator interface. While the application is not currently hosted, I previously deployed it to the Azure cloud as part of a separate course focused on cloud infrastructure. Although it isn't live, the complete source code is open to the public for review.",
    ],
    images: [],
  },
  {
    id: "portfolio",
    title: "This Website :)",
    description:
      "The portfolio you're looking at right now. Built with React Router, Framer Motion, and WebGL shaders.",
    backgroundLabel: "PORTFOLIO",
    skills: [
      "React Router",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "WebGL",
      "GLSL",
    ],
    links: { "View GitHub": "https://github.com/majoporse/portfolio" },
    blogContent: [
      "I have wanted to create a personal portfolio for a long time, but I never really felt I had the right projects to showcase. After finally building a few pieces I was proud of, I decided to go for it and build the portfolio itself.",
      "I wanted this website to be more than just a regular AI-generated template in Next.js; I wanted something that felt truly unique and showcased both my technical skills and my personality. By approaching it more like an art project than a standard resume, I was able to experiment with the design and functionality.",
      "The result is this website, built with React Router v7, Tailwind CSS v4, and Framer Motion for animations. It features a WebGL simplex noise background with theme-aware colors, draggable carousels, and CSS marquee tickers, all while supporting light and dark themes with persistent state.",
      "I took a lot of inspiration from Awwwards and other design sites, but I made sure to put my own spin on it to keep the experience personal. Overall, I'm really happy with how it turned out. If you want to check out the code or see how I built it, you can find the repository on GitHub!",
    ],
  },
];
