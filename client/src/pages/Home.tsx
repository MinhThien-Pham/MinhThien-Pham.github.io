import { useResume } from "@/hooks/use-resume";
import { Link } from "react-scroll";
import { Navigation } from "@/components/Navigation";
import { TerminalWindow } from "@/components/TerminalWindow";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ContactSection } from "@/components/ContactSection";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, ChevronDown, Download } from "lucide-react";

export default function Home() {
  const { data, isLoading, error } = useResume();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary font-mono">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="animate-pulse">Loading system resources...</div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-destructive font-mono">
        Error loading portfolio data. Please try again later.
      </div>
    );
  }

  const { personalInfo, education, skills, experience, projects } = data;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-white">
      <Navigation />

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-primary mb-5 text-lg">Hi, my name is</p>
            <h1 className="text-5xl sm:text-7xl font-bold text-foreground mb-4 tracking-tight">
              {personalInfo.name}
            </h1>
            <h2 className="text-4xl sm:text-5xl font-bold text-muted-foreground mb-8">
              I build systems & APIs.
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
              {personalInfo.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="projects"
                smooth={true}
                duration={500}
                offset={-100}
                className="px-8 py-3 rounded-md bg-transparent border border-primary text-primary font-mono hover:bg-primary/10 transition-colors cursor-pointer flex items-center justify-center"
              >
                Check out my work
              </Link>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert("Resume PDF not yet uploaded."); }}
                className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-mono font-bold hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <TerminalWindow className="w-full max-w-xl mx-auto transform hover:scale-[1.02] transition-transform duration-500">
              <div className="space-y-2">
                <div className="flex gap-2 text-emerald-400">
                  <span>➜</span>
                  <span className="text-blue-400">~</span>
                  <span>whoami</span>
                </div>
                <div className="text-muted-foreground mb-4">
                  {personalInfo.title}
                </div>

                <div className="flex gap-2 text-emerald-400">
                  <span>➜</span>
                  <span className="text-blue-400">~</span>
                  <span>cat skills.json</span>
                </div>
                <div className="text-orange-300">
                  {`{`}
                  {skills.slice(0, 3).map((skillGroup, i) => {
                    const items = Array.isArray(skillGroup.items)
                      ? skillGroup.items as string[]
                      : JSON.parse(skillGroup.items as string);

                    return (
                      <div key={i} className="pl-4">
                        <span className="text-purple-400">"{skillGroup.category}":</span>
                        <span className="text-green-300"> [{items.slice(0, 3).map((s: string) => `"${s}"`).join(", ")}...]</span>,
                      </div>
                    );
                  })}
                  {`}`}
                </div>

                <div className="flex gap-2 text-emerald-400 mt-4 animate-pulse">
                  <span>➜</span>
                  <span className="text-blue-400">~</span>
                  <span className="inline-block w-2 h-5 bg-muted-foreground align-middle"></span>
                </div>
              </div>
            </TerminalWindow>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hidden md:block"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* ABOUT / EDUCATION */}
      <section id="about" className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader number="01" title="About & Education" />

        <div className="max-w-4xl">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2 space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Hello! I'm Minh, a student at the <span className="text-primary font-medium">University of Central Florida</span>.
                My journey into programming started with a curiosity about how things work under the hood, leading me to explore
                Systems Programming and Backend Development.
              </p>
              <p>
                I enjoy tackling complex problems where performance and security are critical.
                Whether it's writing a Unix shell in C or building secure REST APIs with Node.js,
                I love the process of engineering robust solutions.
              </p>
              <p>
                Fast-forward to today, and I've had the privilege of building projects that challenge my understanding of
                computing fundamentals.
              </p>
            </div>

            <div className="relative">
              <div className="border-l-2 border-border pl-6 space-y-8">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[31px] top-0 p-1.5 rounded-full bg-background border-2 border-primary">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground">{edu.school}</h3>
                    <p className="text-sm text-primary font-mono mb-1">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground mb-2">{edu.graduationDate}</p>
                    {edu.gpa && <p className="text-xs font-medium text-accent">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader number="02" title="Where I've Worked" />

        <div className="max-w-3xl">
          <div className="space-y-12">
            {experience.map((exp, idx) => {
              const bullets = Array.isArray(exp.description)
                ? exp.description as string[]
                : JSON.parse(exp.description as string);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l border-border"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-secondary" />

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {exp.title} <span className="text-primary">@ {exp.company}</span>
                    </h3>
                    <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {exp.startDate} - {exp.endDate || "Present"}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 font-mono">{exp.location}</p>

                  <ul className="space-y-2">
                    {bullets.map((bullet: string, i: number) => (
                      <li key={i} className="flex gap-2 text-muted-foreground text-sm leading-relaxed">
                        <span className="text-primary mt-1.5 text-[10px]">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader number="03" title="Some Things I've Built" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} index={idx} />
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <SectionHeader number="04" title="Technical Arsenal" />

        <div className="max-w-4xl">
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((group, idx) => {
              const items = Array.isArray(group.items)
                ? group.items as string[]
                : JSON.parse(group.items as string);

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <h3 className="text-lg font-bold font-mono text-primary mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-sm rounded-md bg-secondary/50 text-secondary-foreground font-mono hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection personalInfo={personalInfo} />

      {/* FOOTER REMOVED */}
      <div className="py-4 bg-background border-t border-border/30" />
    </div>
  );
}
