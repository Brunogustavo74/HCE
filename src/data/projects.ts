export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  type: "SITE" | "SISTEMA" | "LANDING" | "GAME";
  imageUrl: string;
  images: string[]; // Array de imagens da pasta public (ex: "/images/projeto1.png")
  liveUrl?: string; // Link para ver o projeto online
  features: string[];
  client?: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "streamfy",
    name: "Streamfy",
    shortDescription: "Sistema web para assinaturas de streaming.",
    fullDescription: "O projeto foi desenvolvido com foco em uma interface moderna e responsiva, utilizando React e Tailwind CSS no front-end. Para o backend e autenticação, foi utilizada a Supabase, garantindo segurança, armazenamento de dados e escalabilidade. Todo o sistema foi pensado para oferecer uma navegação intuitiva e uma experiência fluida para o usuário final.",
    technologies: ["React", "Tailwind", "PlpgSQL"],
    type: "SISTEMA",
    imageUrl: "",
    images: ["/images/streamfy/logo.jpg", "/images/streamfy/page1.jpg", "/images/streamfy/page2.jpg"], // Adicione imagens aqui, ex: ["/images/streamfy-1.png", "/images/streamfy-2.png"]
    liveUrl: "https://streamfys.vercel.app", // Adicione o link aqui, ex: "https://streamfy.com"
    features: ["Dashboard admin", "Notificações", "Relatórios", "Chat"],
    client: "Streamfy Assinaturas",
    year: "2025",
  },
];
