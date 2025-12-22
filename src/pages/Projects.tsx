import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { projects, type Project } from "@/data/projects";

const typeColors = {
  SITE: "bg-accent/10 text-accent border-accent/20",
  SISTEMA: "bg-primary/10 text-primary border-primary/20",
  LANDING: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        <div className="absolute inset-0 hce-grid-bg opacity-40" />
        
        {/* Type badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border ${typeColors[project.type]}`}>
            {project.type}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        {/* Project icon/visual */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-24 w-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <span className="font-mono text-3xl font-bold text-primary">
              {project.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span key={tech} className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* View more indicator */}
        <div className="mt-4 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="font-medium">Ver case</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border/50 bg-card shadow-2xl scrollbar-hce"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 h-10 w-10 rounded-lg bg-secondary/80 flex items-center justify-center hover:bg-secondary transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header image */}
        <div className="relative aspect-video bg-muted">
          <div className="absolute inset-0 hce-grid-bg opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Type badge */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono border ${typeColors[project.type]}`}>
              {project.type}
            </span>
          </div>

          {/* Project visual */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="font-mono text-5xl font-bold text-primary">
                {project.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl font-bold">{project.name}</h2>
            <span className="text-sm font-mono text-muted-foreground">{project.year}</span>
          </div>

          {project.client && (
            <p className="text-sm text-muted-foreground mb-4">
              Cliente: <span className="text-foreground">{project.client}</span>
            </p>
          )}

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {project.fullDescription}
          </p>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Tecnologias Utilizadas
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="hce-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              Funcionalidades
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Link to="/contato" className="flex-1">
              <Button className="w-full hce-btn-primary rounded-lg">
                Quero algo assim
              </Button>
            </Link>
            <Button variant="outline" className="hce-btn-outline rounded-lg">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver online
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter((p) => p.type === filter);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 hce-grid-bg opacity-20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="hce-module-number"></span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Projetos que <span className="hce-gradient-text">contam histórias</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Cada projeto é uma expedição única. Conheça os sistemas e sites que já entregamos e como eles transformaram negócios.
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex gap-2 mt-8"
          >
            {["all", "SITE", "SISTEMA", "LANDING"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  filter === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {type === "all" ? "Todos" : type}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Seu projeto pode ser o próximo case de sucesso.
            </p>
            <Link to="/contato">
              <Button size="lg" className="hce-btn-primary rounded-xl px-8 py-6">
                Iniciar Meu Projeto
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
