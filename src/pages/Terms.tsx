import { motion } from "framer-motion";
import { Terminal, FileText, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="min-h-screen py-24">
        <div className="container max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link 
              to="/auth" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao login
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <FileText className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Termos de Uso</h1>
                <p className="text-muted-foreground">Última atualização: 20 de Dezembro de 2025</p>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="hce-glass hce-gradient-border p-8 space-y-8"
          >
            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-primary font-mono">01</span>
                Aceitação dos Termos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao acessar e utilizar os serviços da HCE – Hardcore Content Expedition, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-primary font-mono">02</span>
                Descrição dos Serviços
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A HCE oferece serviços de desenvolvimento web, criação de sistemas personalizados, landing pages, automações e manutenção de software. Os serviços são prestados conforme acordado em cada projeto individual.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Desenvolvimento de websites e aplicações web</li>
                <li>Criação de sistemas sob medida</li>
                <li>Landing pages otimizadas</li>
                <li>Automações e integrações</li>
                <li>Manutenção e suporte técnico</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-primary font-mono">03</span>
                Uso da Conta
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Ao criar uma conta na Base HCE, você é responsável por manter a confidencialidade de suas credenciais de acesso. Você concorda em notificar imediatamente a HCE sobre qualquer uso não autorizado de sua conta.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Para estudantes do Cícero Dias, informações adicionais como sala e turma são coletadas para fins de identificação e acesso a recursos educacionais específicos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-primary font-mono">04</span>
                Propriedade Intelectual
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Todo o conteúdo produzido pela HCE, incluindo mas não limitado a código-fonte, designs, documentação e materiais educacionais, permanece propriedade da HCE até que seja explicitamente transferido ao cliente conforme acordado em contrato.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-primary font-mono">05</span>
                Pagamentos e Reembolsos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Os pagamentos pelos serviços devem ser realizados conforme acordado em cada proposta ou contrato. Políticas de reembolso são tratadas caso a caso, dependendo do estágio do projeto e do trabalho já realizado.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-primary font-mono">06</span>
                Limitação de Responsabilidade
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A HCE não será responsável por danos indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de uso de nossos serviços, exceto nos casos previstos em lei.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-primary font-mono">07</span>
                Modificações dos Termos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A HCE reserva-se o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas através de nossos canais oficiais. O uso continuado dos serviços após modificações constitui aceitação dos novos termos.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-primary font-mono">08</span>
                Contato
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Para dúvidas sobre estes termos, entre em contato conosco através da página de{" "}
                <Link to="/contato" className="text-primary hover:underline">Contato</Link>.
              </p>
            </section>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <Terminal className="h-4 w-4" />
              <span className="font-mono text-sm">HCE – Code. Build. Deploy.</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
