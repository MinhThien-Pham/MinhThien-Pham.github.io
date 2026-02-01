import { ReactNode } from "react";
import { Circle } from "lucide-react";

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function TerminalWindow({ children, title = "bash", className = "" }: TerminalWindowProps) {
  return (
    <div className={`rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-[#0f1117] ${className}`}>
      {/* Title Bar */}
      <div className="px-4 py-3 bg-[#1e293b] flex items-center gap-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <Circle className="w-3 h-3 fill-red-500 text-red-500" />
          <Circle className="w-3 h-3 fill-yellow-500 text-yellow-500" />
          <Circle className="w-3 h-3 fill-green-500 text-green-500" />
        </div>
        <div className="flex-1 text-center text-xs font-mono text-muted-foreground opacity-60">
          {title}
        </div>
        <div className="w-12"></div> {/* Spacer for alignment */}
      </div>
      
      {/* Content */}
      <div className="p-4 sm:p-6 font-mono text-sm sm:text-base leading-relaxed overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
