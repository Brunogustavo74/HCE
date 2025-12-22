import { motion } from "framer-motion";
import { Terminal, Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
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
              <div className="h-14 w-14 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                <Shield className="h-7 w-7 text-accent" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Política de Privacidade</h1>
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
                <span className="text-accent font-mono">01</span>
                Informações que Coletamos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A HCE coleta informações que você nos fornece diretamente ao utilizar nossos serviços:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li><strong>Dados de cadastro:</strong> Nome, email e senha</li>
                <li><strong>Dados de estudantes:</strong> Sala e turma (quando aplicável)</li>
                <li><strong>Dados de contato:</strong> Informações fornecidas no formulário de orçamento</li>
                <li><strong>Dados de uso:</strong> Interações com nosso site e serviços</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-accent font-mono">02</span>
                Como Usamos suas Informações
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos as informações coletadas para:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Fornecer, manter e melhorar nossos serviços</li>
                <li>Processar solicitações de orçamento e projetos</li>
                <li>Enviar comunicações relacionadas aos serviços</li>
                <li>Identificar e autenticar usuários</li>
                <li>Personalizar a experiência do usuário</li>
                <li>Cumprir obrigações legais</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-accent font-mono">03</span>
                Compartilhamento de Dados
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                A HCE não vende, aluga ou compartilha suas informações pessoais com terceiros para fins de marketing. Podemos compartilhar dados apenas nas seguintes situações:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Com seu consentimento explícito</li>
                <li>Para cumprir obrigações legais</li>
                <li>Para proteger direitos e segurança da HCE e seus usuários</li>
                <li>Com prestadores de serviços essenciais (hospedagem, analytics)</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-accent font-mono">04</span>
                Segurança dos Dados
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. Isso inclui:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Acesso restrito a informações pessoais</li>
                <li>Monitoramento de segurança contínuo</li>
                <li>Atualizações regulares de sistemas</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-accent font-mono">05</span>
                Seus Direitos
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Em conformidade com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar exclusão de dados</li>
                <li>Revogar consentimento a qualquer momento</li>
                <li>Solicitar portabilidade de dados</li>
                <li>Obter informações sobre compartilhamento de dados</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-accent font-mono">06</span>
                Cookies e Tecnologias Similares
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos cookies e tecnologias similares para melhorar a experiência de navegação, analisar o uso do site e personalizar conteúdo. Você pode gerenciar suas preferências de cookies através das configurações do seu navegador.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-accent font-mono">07</span>
                Retenção de Dados
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política, a menos que um período de retenção maior seja exigido ou permitido por lei.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-accent font-mono">08</span>
                Alterações nesta Política
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Podemos atualizar esta política periodicamente. Notificaremos sobre mudanças significativas através de nossos canais de comunicação. Recomendamos revisar esta página regularmente.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <span className="text-accent font-mono">09</span>
                Contato
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato através da página de{" "}
                <Link to="/contato" className="text-accent hover:underline">Contato</Link>.
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
