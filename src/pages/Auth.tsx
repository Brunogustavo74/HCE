import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Terminal, 
  Loader2, 
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FlashlightPasswordInput } from "@/components/ui/FlashlightPasswordInput";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(72),
});

const registerSchema = z.object({
  name: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").max(72),
  isStudent: z.boolean().default(false),
  sala: z.string().max(20).optional(),
  turma: z.string().max(20).optional(),
}).refine((data) => {
  if (data.isStudent) {
    return data.sala && data.sala.length > 0 && data.turma && data.turma.length > 0;
  }
  return true;
}, {
  message: "Sala e Turma são obrigatórios para estudantes",
  path: ["sala"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

function GridAnimation() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 hce-grid-bg opacity-20" />
      
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px]"
      />

      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-primary/50"
            style={{ top: `${(i + 1) * 5}%` }}
            animate={{
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Credenciais inválidas",
            description: "Email ou senha incorretos. Verifique e tente novamente.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro no login",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }
      
      toast({
        title: "Login realizado!",
        description: "Bem-vindo de volta à Base HCE.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">Email</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="seu@email.com"
          className="hce-input-glow bg-background/50 border-border/50 h-12"
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-foreground/80">Senha</label>
          <button type="button" className="text-xs text-primary hover:underline">
            Esqueci a senha
          </button>
        </div>
        <FlashlightPasswordInput
          {...register("password")}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full hce-btn-primary h-12 text-base rounded-xl"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Iniciar Expedição
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

function RegisterForm() {
  const [isStudent, setIsStudent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      isStudent: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: data.name,
            is_student: data.isStudent,
            sala: data.isStudent ? data.sala : null,
            turma: data.isStudent ? data.turma : null,
          },
        },
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Email já cadastrado",
            description: "Este email já está registrado. Tente fazer login.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erro ao criar conta",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }
      
      toast({
        title: "Conta criada!",
        description: "Bem-vindo à Base HCE. Sua expedição começa agora.",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Erro ao criar conta",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStudentChange = (checked: boolean) => {
    setIsStudent(checked);
    setValue("isStudent", checked);
    if (!checked) {
      setValue("sala", "");
      setValue("turma", "");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">Nome</label>
        <Input
          {...register("name")}
          placeholder="Seu nome completo"
          className="hce-input-glow bg-background/50 border-border/50 h-12"
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">Email</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="seu@email.com"
          className="hce-input-glow bg-background/50 border-border/50 h-12"
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground/80">Senha</label>
        <FlashlightPasswordInput
          {...register("password")}
          placeholder="Mínimo 6 caracteres"
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-3 p-4 rounded-lg bg-accent/5 border border-accent/20">
        <Checkbox
          id="isStudent"
          checked={isStudent}
          onCheckedChange={(checked) => handleStudentChange(checked as boolean)}
          className="border-accent data-[state=checked]:bg-accent data-[state=checked]:border-accent"
        />
        <label
          htmlFor="isStudent"
          className="text-sm font-medium cursor-pointer flex items-center gap-2"
        >
          <GraduationCap className="h-4 w-4 text-accent" />
          Sou estudante do Cícero Dias
        </label>
      </div>

      <AnimatePresence>
        {isStudent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-2 pb-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Sala <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register("sala")}
                    placeholder="Ex: 1°"
                    className="hce-input-glow bg-background/50 border-accent/30 h-12 focus:border-accent"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">
                    Turma <span className="text-destructive">*</span>
                  </label>
                  <Input
                    {...register("turma")}
                    placeholder="Ex: A"
                    className="hce-input-glow bg-background/50 border-accent/30 h-12 focus:border-accent"
                  />
                </div>
              </div>
              {errors.sala && (
                <p className="text-xs text-destructive">{errors.sala.message}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full hce-btn-primary h-12 text-base rounded-xl"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            Iniciar Expedição
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

export default function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/");
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-background overflow-hidden">
        <GridAnimation />
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Link to="/" className="inline-flex items-center gap-3 mb-8">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Terminal className="h-8 w-8 text-primary" />
              </div>
            </Link>

            <h1 className="text-4xl font-bold mb-4">
              Bem-vindo à{" "}
              <span className="hce-gradient-text">Base HCE</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Sua central de operações para projetos, suporte e recursos exclusivos.
            </p>

            <div className="mt-12 space-y-4 text-left max-w-sm mx-auto">
              {[
                "Acesse seus projetos e progresso",
                "Suporte prioritário e direto",
                "Recursos e templates exclusivos",
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-card">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              <span className="font-mono font-bold text-xl">HCE</span>
            </Link>
          </div>

          <div className="hce-glass hce-gradient-border p-8">
            <div className="flex rounded-xl bg-secondary/50 p-1 mb-8">
              <button
                onClick={() => setMode("login")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === "login"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setMode("register")}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === "register"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Criar Conta
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: mode === "login" ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === "login" ? 20 : -20 }}
                transition={{ duration: 0.2 }}
              >
                {mode === "login" ? <LoginForm /> : <RegisterForm />}
              </motion.div>
            </AnimatePresence>

            <p className="text-center text-xs text-muted-foreground mt-6">
              Ao continuar, você concorda com nossos{" "}
              <Link to="/termos" className="text-primary hover:underline">Termos</Link>
              {" "}e{" "}
              <Link to="/privacidade" className="text-primary hover:underline">Privacidade</Link>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              ← Voltar para o site
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
