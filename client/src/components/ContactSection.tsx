import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@shared/routes";
import { Loader2, Send, Mail, MapPin, Linkedin, Github, Phone } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { motion } from "framer-motion";

const formSchema = api.contact.send.input;
type FormData = z.infer<typeof formSchema>;

export function ContactSection({ personalInfo }: { personalInfo: any }) {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setIsPending(true);

    // Simulate processing
    setTimeout(() => {
      const subject = `Portfolio Contact from ${data.name}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
      const mailtoLink = `mailto:${personalInfo?.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoLink;

      setSuccess(true);
      setIsPending(false);
      form.reset();
      setTimeout(() => setSuccess(false), 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
      <SectionHeader number="05" title="Get In Touch" />

      <div className="max-w-4xl">
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground text-lg mb-8">
              I'm currently looking for internships and new opportunities in backend development and systems programming.
              Whether you have a question or just want to say hi, my inbox is always open!
            </p>

            <div className="space-y-4">
              {/* Primary Email */}
              <a
                href={`mailto:${personalInfo?.email}`}
                className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-mono mb-0.5">Primary Email</div>
                  <div className="font-medium text-sm sm:text-base break-all">{personalInfo?.email || "loading..."}</div>
                </div>
              </a>

              {/* Secondary Email */}
              {personalInfo?.secondaryEmail && (
                <a
                  href={`mailto:${personalInfo.secondaryEmail}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-mono mb-0.5">Secondary Email</div>
                    <div className="font-medium text-sm sm:text-base break-all">{personalInfo.secondaryEmail}</div>
                  </div>
                </a>
              )}

              {/* Phone */}
              {personalInfo?.phone && (
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all group"
                >
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-mono mb-0.5">Phone</div>
                    <div className="font-medium">{personalInfo.phone}</div>
                  </div>
                </a>
              )}

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-mono mb-0.5">Location</div>
                  <div className="font-medium">{personalInfo?.location || "Orlando, FL"}</div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {personalInfo?.githubUrl && (
                  <a
                    href={personalInfo.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {personalInfo?.linkedinUrl && (
                  <a
                    href={personalInfo.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-card border border-border hover:border-primary hover:text-primary transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Send a Message</h3>
              <p className="text-sm text-muted-foreground mb-6">
                This form will open your default email client with your message pre-filled.
              </p>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                  <input
                    {...form.register("name")}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                  <input
                    {...form.register("email")}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                  <textarea
                    {...form.register("message")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="Hello! I'd like to discuss..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending || success}
                  className={`
                  w-full py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2
                  transition-all duration-300
                  ${success
                      ? "bg-green-500 text-white"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"}
                  disabled:opacity-70 disabled:cursor-not-allowed
                `}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Opening Email Client...
                    </>
                  ) : success ? (
                    "Email Client Opened!"
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Draft Email
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
