import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { Menu, X, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", to: "about" },
  { name: "Experience", to: "experience" },
  { name: "Projects", to: "projects" },
  { name: "Skills", to: "skills" },
  { name: "Contact", to: "contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Terminal className="w-5 h-5 text-primary" />
          </div>
          <span className="font-mono font-bold text-lg tracking-tighter">
            ~/minh-pham
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            >
              <span className="text-primary/40 mr-1">0{navItems.indexOf(item) + 1}.</span>
              {item.name}
            </Link>
          ))}
          <a
            href="/resume.pdf" // Placeholder, assuming backend might serve this or user adds it
            className="px-4 py-2 text-sm font-semibold rounded-md border border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  duration={500}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-foreground py-2 border-b border-border/50 hover:text-primary cursor-pointer"
                >
                  <span className="text-primary mr-2 font-mono">0{navItems.indexOf(item) + 1}.</span>
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
