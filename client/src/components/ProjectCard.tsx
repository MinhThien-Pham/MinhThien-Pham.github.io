import { ExternalLink, Github, Calendar, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  // Parse description if it's JSON string, otherwise handle as needed
  const bullets = Array.isArray(project.description) 
    ? project.description as string[]
    : typeof project.description === 'string' 
      ? JSON.parse(project.description) 
      : ["No description available"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex flex-col h-full bg-card rounded-xl border border-border/50 hover:border-primary/50 transition-colors duration-300 overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
            <Code2 className="w-6 h-6" />
          </div>
          <div className="flex gap-3">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="View Source"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {/* If there was a live link, we could add ExternalLink here */}
          </div>
        </div>

        <h3 className="text-xl font-bold font-mono mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        
        {project.subtitle && (
          <p className="text-sm font-semibold text-accent mb-4">
            {project.subtitle}
          </p>
        )}

        <div className="space-y-2 text-muted-foreground text-sm mb-6 flex-1">
          {bullets.slice(0, 3).map((bullet: string, i: number) => (
            <div key={i} className="flex gap-2">
              <span className="text-primary mt-1">▹</span>
              <span>{bullet}</span>
            </div>
          ))}
        </div>

        {project.date && (
          <div className="pt-4 border-t border-border/50 flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-2" />
            {project.date}
          </div>
        )}
      </div>
    </motion.div>
  );
}
