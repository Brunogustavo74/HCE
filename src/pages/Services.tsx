import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Server, 
  Rocket, 
  Cog, 
  Wrench,
  ChevronRight,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Service {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: React.ElementType;
  technologies: string[];
  estimatedTime: string;
  features: string[];
}

const services: Service[] = [
  {
    id: "web",
    number: "01",
    title: "Desenvolvimento Web",
    shortDescription: "Sites e aplicações web completas com tecnologias modernas.",
    fullDescription: "Criamos sites e aplicações web responsivas, rápidas e otimizadas para SEO. Do landing page ao e-commerce, entregamos soluções que convertem.",
    icon: Globe,
    technologies: ["React", "Next.js", "TypeScript", "Tailwind"],
    estimatedTime: "2-6 semanas",
    features: ["Responsivo", "SEO otimizado", "Alta performance", "Analytics integrado"],
  },
  {
    id: "systems",
    number: "02",
    title: "Sistemas Personalizados",
    shortDescription: "Sistemas sob medida para automatizar e escalar seu negócio.",
    fullDescription: "Desenvolvemos sistemas completos com dashboard, autenticação, API e banco de dados. Soluções que crescem junto com seu negócio.",
    icon: Server,
    technologies: ["Node.js", "PostgreSQL", "Redis", "Docker"],
    estimatedTime: "4-12 semanas",
    features: ["Dashboard admin", "API REST", "Autenticação", "Relatórios"],
  },
  {
    id: "landing",
    number: "03",
    title: "Landing Pages",
    shortDescription: "Páginas de alta conversão para suas campanhas.",
    fullDescription: "Landing pages otimizadas para conversão com design impactante, copy persuasiva e integração com ferramentas de marketing.",
    icon: Rocket,
    technologies: ["React", "Framer Motion", "Vercel", "Analytics"],
    estimatedTime: "1-2 semanas",
    features: ["Alta conversão", "A/B testing", "Pixels integrados", "CTA otimizado"],
  },
  {
    id: "automation",
    number: "04",
    title: "Automações",
    shortDescription: "Automatize processos e integre sistemas.",
    fullDescription: "Criamos automações para eliminar tarefas repetitivas, integrar ferramentas e aumentar a produtividade da sua equipe.",
    icon: Cog,
    technologies: ["n8n", "Zapier", "APIs", "Webhooks"],
    estimatedTime: "1-3 semanas",
    features: ["Integração APIs", "Fluxos automáticos", "Notificações", "Sincronização"],
  },
  {
    id: "maintenance",
    number: "05",
    title: "Manutenção",
    shortDescription: "Suporte contínuo e evolução do seu sistema.",
    fullDescription: "Oferecemos planos de manutenção para manter seu sistema atualizado, seguro e funcionando perfeitamente.",
    icon: Wrench,
    technologies: ["Monitoramento", "Backups", "Updates", "Suporte"],
    estimatedTime: "Contínuo",
    features: ["Uptime 99.9%", "Backups diários", "Suporte prioritário", "Updates"],
  },
];

function ServiceModule({ service, isExpanded, onToggle }: { 
  service: Service; 
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const Icon = service.icon;
  
  return (
    <motion.div
      layout
      className={`hce-glass hce-glow cursor-pointer transition-all duration-300 ${
        isExpanded ? "border-primary/40" : "border-border/50 hover:border-primary/20"
      }`}
      onClick={onToggle}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-2xl font-bold text-primary/40">
              {service.number}
            </span>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </motion.div>
        </div>

        {/* Title and short description */}
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-muted-foreground text-sm">{service.shortDescription}</p>

        {/* Expanded content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-border/30">
                {/* Full description */}
                <p className="text-muted-foreground text-sm mb-6">
                  {service.fullDescription}
                </p>

                {/* Technologies */}
                <div className="mb-6">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    Tecnologias
                  </span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {service.technologies.map((tech) => (
                      <span key={tech} className="hce-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Time estimate */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>Prazo estimado: <strong className="text-foreground">{service.estimatedTime}</strong></span>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 hce-grid-bg opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="hce-module-number"></span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Serviços que <span className="hce-gradient-text">entregam resultado</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Cada projeto é único. Por isso, oferecemos soluções modulares que se adaptam às suas necessidades e orçamento.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceModule
                  service={service}
                  isExpanded={expandedId === service.id}
                  onToggle={() => setExpandedId(expandedId === service.id ? null : service.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-6">
              Não sabe qual serviço escolher? Vamos conversar.
            </p>
            <Link to="/contato">
              <Button size="lg" className="hce-btn-primary rounded-xl px-8 py-6">
                Solicitar Orçamento Personalizado
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
