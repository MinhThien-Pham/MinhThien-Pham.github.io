import { motion } from "framer-motion";

interface SectionHeaderProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionHeader({ number, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex items-center gap-4 mb-12 ${className}`}>
      <motion.span 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="font-mono text-primary text-xl md:text-2xl font-bold"
      >
        {number}.
      </motion.span>
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-2xl md:text-3xl font-bold text-foreground"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="h-px bg-border flex-1 max-w-[200px] origin-left"
      />
    </div>
  );
}
