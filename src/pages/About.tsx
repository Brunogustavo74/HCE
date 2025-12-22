import { motion } from "framer-motion";
import { Target, Heart, Cpu, Users, Award, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const aboutBlocks = [
  {
    number: "01",
    title: "Missão",
    icon: Target,
    content: "Democratizar o acesso a tecnologia de qualidade. Acreditamos que todo negócio merece software bem feito, não só as grandes empresas. Entregamos soluções que funcionam, escalam e fazem sentido para o seu bolso.",
    width: "lg:col-span-2",
  },
  {
    number: "02",
    title: "Valores",
    icon: Heart,
    content: "Transparência em cada etapa. Código limpo como padrão. Prazos que respeitamos. Cliente no centro de cada decisão. Não vendemos features — vendemos soluções.",
    width: "lg:col-span-1",
  },
  {
    number: "03",
    title: "Tecnologia",
    icon: Cpu,
    content: "Stack moderna e battle-tested. React, Node.js, PostgreSQL, TypeScript — escolhemos ferramentas que performam e têm comunidade forte. Nada de gambiarras, só arquitetura sólida.",
    width: "lg:col-span-1",
  },
  {
    number: "04",
    title: "Time",
    icon: Users,
    content: "Uma equipe enxuta e multidisciplinar. Desenvolvedores full-stack, designers e especialistas em UX trabalhando juntos. Menos burocracia, mais código.",
    width: "lg:col-span-2",
  },
];

const stats = [
  { number: "50+", label: "Projetos entregues", icon: Award },
  { number: "99.9%", label: "Uptime garantido", icon: Zap },
  { number: "24h", label: "Tempo de resposta", icon: Target },
];

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 hce-grid-bg opacity-20" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="hce-module-number"></span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Quem está por trás do{" "}
              <span className="hce-gradient-text">código</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Somos a HCE — Hardcore Content Expedition. Uma equipe que leva desenvolvimento a sério, mas sem perder a diversão no processo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Blocks */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {aboutBlocks.map((block, index) => (
              <motion.div
                key={block.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`hce-glass p-8 ${block.width}`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-4xl font-bold text-primary/30">
                    {block.number}
                  </span>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <block.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-4">{block.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {block.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="hce-module-number"></span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Resultados que falam
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-8 hce-glass"
              >
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-4" />
                <div className="text-4xl font-bold hce-gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="hce-module-number"></span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Pronto para embarcar?
            </h2>
            <p className="text-muted-foreground mb-8">
              Conte sua ideia e vamos transformar em realidade. Sem compromisso, sem enrolação.
            </p>
            <Link to="/contato">
              <Button size="lg" className="hce-btn-primary rounded-xl px-10 py-6">
                Falar com a Equipe
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
