import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle2, Mail, MessageSquare } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  projectType: z.string().min(1, "Selecione o tipo de projeto"),
  description: z.string().min(10, "Descrição deve ter pelo menos 10 caracteres").max(2000),
  deadline: z.string().optional(),
  budget: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  { value: "web", label: "Desenvolvimento Web" },
  { value: "system", label: "Sistema Personalizado" },
  { value: "landing", label: "Landing Page" },
  { value: "automation", label: "Automação" },
  { value: "maintenance", label: "Manutenção" },
  { value: "other", label: "Outro" },
];

const budgetRanges = [
  { value: "under-50", label: "Até R$ 50" },
  { value: "5k-15k", label: "R$ 50 - R$ 80" },
  { value: "15k-30k", label: "R$ 80 - R$ 100" },
  { value: "30k-plus", label: "Acima de R$ 100" },
  { value: "discuss", label: "A definir" },
];

const deadlines = [
  { value: "urgent", label: "Urgente (1-2 semanas)" },
  { value: "normal", label: "Normal (1-2 meses)" },
  { value: "flexible", label: "Flexível (3+ meses)" },
  { value: "discuss", label: "A definir" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", data);
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    toast({
      title: "Solicitação enviada!",
      description: "Entraremos em contato em até 24 horas.",
    });

    setTimeout(() => {
      setIsSuccess(false);
      reset();
    }, 3000);
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 hce-grid-bg opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="hce-module-number"></span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
              Vamos <span className="hce-gradient-text">construir juntos</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Preencha o formulário com os detalhes do seu projeto. Quanto mais informações, melhor conseguimos entender sua necessidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="hce-glass p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Nome <span className="text-destructive">*</span>
                    </label>
                    <Input
                      {...register("name")}
                      placeholder="Seu nome"
                      className="hce-input-glow bg-input border-border"
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      {...register("email")}
                      type="email"
                      placeholder="seu@email.com"
                      className="hce-input-glow bg-input border-border"
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Tipo de Projeto <span className="text-destructive">*</span>
                  </label>
                  <Select onValueChange={(value) => setValue("projectType", value)}>
                    <SelectTrigger className="hce-input-glow bg-input border-border">
                      <SelectValue placeholder="Selecione o tipo de projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      {projectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.projectType && (
                    <p className="text-xs text-destructive">{errors.projectType.message}</p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Descrição do Projeto <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    {...register("description")}
                    placeholder="Descreva seu projeto, objetivos, funcionalidades desejadas..."
                    rows={5}
                    className="hce-input-glow bg-input border-border resize-none"
                  />
                  {errors.description && (
                    <p className="text-xs text-destructive">{errors.description.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Deadline */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prazo</label>
                    <Select onValueChange={(value) => setValue("deadline", value)}>
                      <SelectTrigger className="hce-input-glow bg-input border-border">
                        <SelectValue placeholder="Selecione o prazo" />
                      </SelectTrigger>
                      <SelectContent>
                        {deadlines.map((d) => (
                          <SelectItem key={d.value} value={d.value}>
                            {d.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Budget */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Orçamento Estimado</label>
                    <Select onValueChange={(value) => setValue("budget", value)}>
                      <SelectTrigger className="hce-input-glow bg-input border-border">
                        <SelectValue placeholder="Selecione o orçamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetRanges.map((b) => (
                          <SelectItem key={b.value} value={b.value}>
                            {b.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full hce-btn-primary py-6 text-base rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Enviando...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Enviado com Sucesso!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar Solicitação
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="hce-glass p-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Prefere email? Sem problemas.
                </p>
                <a 
                  href="mailto:contato@hcestudio.com" 
                  className="text-primary hover:underline text-sm font-medium"
                >
                  contato@hcestudio.com
                </a>
              </div>

              <div className="hce-glass p-6">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20 mb-4">
                  <MessageSquare className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">WhatsApp</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  Resposta mais rápida via WhatsApp.
                </p>
                <a 
                  href="https://wa.me/5581993725124" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline text-sm font-medium"
                >
                  +55 81 99372-5124
                </a>
                
                <a 
                  href="https://wa.me/5581988064314" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline text-sm font-medium"
                >
                  +55 81 98806-4314
                </a>
              </div>

              <div className="hce-glass p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <h3 className="text-lg font-semibold mb-2">Tempo de Resposta</h3>
                <p className="text-muted-foreground text-sm">
                  Respondemos todas as solicitações em até <strong className="text-foreground">24 horas úteis</strong>. 
                  Finais de semana podem ter delay.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
