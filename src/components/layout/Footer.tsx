import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, 
  ChevronDown, 
  Mail, 
  Phone, 
  Instagram, 
  Github,
  Rocket
} from "lucide-react";

const footerSections = [
  {
    title: "Navegação",
    links: [
      { name: "Home", path: "/" },
      { name: "Serviços", path: "/servicos" },
      { name: "Projetos", path: "/projetos" },
      { name: "Sobre", path: "/sobre" },
      { name: "Contato", path: "/contato" },
      { name: "Criar Conta", path: "/auth" },
    ],
  },
  {
    title: "Serviços",
    links: [
      { name: "Desenvolvimento Web", path: "/servicos" },
      { name: "Sistemas Personalizados", path: "/servicos" },
      { name: "Landing Pages", path: "/servicos" },
      { name: "Automações", path: "/servicos" },
      { name: "Manutenção", path: "/servicos" },
    ],
  },
];

const contactInfo = [
  { icon: Mail, text: "contato@hce.dev", href: "mailto:contato@hce.dev" },
  { icon: Phone, text: "+55 81 980028922", /*href: https://wa.me/5581999999999"*/},
  { icon: Instagram, text: "@hce.dev", href: "https://instagram.com/hce.dev" },
  { icon: Github, text: "hce-dev", href: "https://github.com/hce-dev" },
];

function AccordionSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border/30 md:border-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 md:hidden"
      >
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </button>
      
      {/* Desktop always visible */}
      <div className="hidden md:block">
        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
          {title}
        </h4>
        {children}
      </div>

      {/* Mobile accordion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden md:hidden"
          >
            <div className="pb-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border/30">
      {/* Gradient Top Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-accent/50" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Identity */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              <span className="font-mono font-bold text-xl">
                HCE<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Code. Build. Deploy.
            </p>
            <p className="text-xs text-muted-foreground">
              Transformando ideias em sistemas reais desde 2025.
            </p>
          </div>

          {/* Navigation Sections */}
          {footerSections.map((section) => (
            <AccordionSection key={section.title} title={section.title}>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 inline-flex items-center gap-1 group"
                    >
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </AccordionSection>
          ))}

          {/* Contact */}
          <AccordionSection title="Contato">
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.text}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                  >
                    <item.icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionSection>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            © 2025 HCE — Hardcore Content Expedition. Todos os direitos reservados.
          </p>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            {" "}
            <span className="font-mono text-primary">HCE Devs</span>
            <Rocket className="h-3.5 w-3.5 text-accent animate-pulse" />
          </p>
        </div>
      </div>
    </footer>
  );
}
