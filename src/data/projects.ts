export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  type: "SITE" | "SISTEMA" | "LANDING";
  imageUrl: string;
  images: string[]; // Array de imagens da pasta public (ex: "/images/projeto1.png")
  liveUrl?: string; // Link para ver o projeto online
  features: string[];
  client?: string;
  year: string;
}

export const projects: Project[] = [
  {
    id: "Streamfy",
    name: "Streamfy",
    shortDescription: "INTRODUÇÃO A DESC",
    fullDescription: "DESCRIÇÃO INTEIRA",
    technologies: ["React", "Tailwind", "PlpgSQL"],
    type: "SISTEMA",
    imageUrl: "",
    images: [], // Adicione imagens aqui, ex: ["/images/streamfy-1.png", "/images/streamfy-2.png"]
    liveUrl: "https://streamfys.vercel.app", // Adicione o link aqui, ex: "https://streamfy.com"
    features: ["Dashboard admin", "Notificações", "Relatórios"],
    client: "Streamfy assinaturas",
    year: "2025",
  },
];
