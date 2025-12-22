export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  type: "SITE" | "SISTEMA" | "LANDING";
  imageUrl: string;
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
    technologies: ["Tec 1", "Tec 2", "Tec 3"],
    type: "SISTEMA",
    imageUrl: "",
    features: ["Dashboard admin", "Notificações", "RelatórioS"],
    client: "Streamfy assinaturas",
    year: "2025",
  },

];
