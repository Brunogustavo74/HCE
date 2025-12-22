import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlashlightPasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

const FlashlightPasswordInput = React.forwardRef<HTMLInputElement, FlashlightPasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        {/* Input field */}
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-14 hce-input-glow border-border/50 transition-all duration-300",
            showPassword && "shadow-[inset_0_0_30px_hsla(var(--primary),0.15)] border-primary/50",
            className,
          )}
          {...props}
        />

        {/* Light cone illuminating the password */}
        <AnimatePresence>
          {showPassword && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute right-12 top-0 bottom-0 left-3 pointer-events-none origin-right overflow-hidden rounded-l-md"
            >
              {/* Main light cone */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to left, 
                    hsla(var(--primary), 0.35) 0%, 
                    hsla(var(--primary), 0.2) 20%, 
                    hsla(var(--primary), 0.1) 50%, 
                    hsla(var(--primary), 0.03) 80%,
                    transparent 100%
                  )`,
                }}
              />
              {/* Highlight stripe */}
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to left, 
                    transparent 0%,
                    hsla(var(--primary), 0.3) 50%,
                    transparent 100%
                  )`,
                  width: "50%",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Flashlight button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300",
            showPassword 
              ? "bg-primary/20 text-primary" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {/* Flashlight SVG */}
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ 
              rotate: showPassword ? -90 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Flashlight body */}
            <path d="M18 6l-3 3" />
            <path d="M15 9l-6 6" />
            <path d="M9 15l-3 3" />
            <path d="M21 3l-6 6" />
            <path d="M12 12l-6 6" />
            <rect x="2" y="17" width="5" height="5" rx="1" transform="rotate(-45 4.5 19.5)" />
          </motion.svg>
          
          {/* Glow effect when active */}
          <AnimatePresence>
            {showPassword && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute inset-0 rounded-full"
                style={{
                  boxShadow: `
                    0 0 10px hsla(var(--primary), 0.6),
                    0 0 20px hsla(var(--primary), 0.4),
                    0 0 30px hsla(var(--primary), 0.2)
                  `,
                }}
              />
            )}
          </AnimatePresence>

          {/* Light burst from flashlight tip */}
          <AnimatePresence>
            {showPassword && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0.6],
                  scale: [0, 1.5, 1],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary/60 blur-sm pointer-events-none"
              />
            )}
          </AnimatePresence>
        </button>

        {/* Lens flare effect */}
        <AnimatePresence>
          {showPassword && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.4] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute right-10 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary blur-[2px] pointer-events-none"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0.3] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute right-14 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/80 blur-[1px] pointer-events-none"
              />
            </>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

FlashlightPasswordInput.displayName = "FlashlightPasswordInput";

export { FlashlightPasswordInput };
