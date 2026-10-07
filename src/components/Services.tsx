import { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Palette, PenTool, TrendingUp } from "lucide-react";
import ServiceQuestionnaire from "./ServiceQuestionnaire";

const services = [
  {
    icon: Megaphone,
    title: "Public Relations",
    description: "Strategic media placements, press releases, and crisis management to build and protect your reputation.",
    questions: ["What story or message needs to reach people?", "Who needs to hear it, and what should they do next?", "What has already been tried?"],
  },
  {
    icon: Palette,
    title: "Graphic Design",
    description: "Visual storytelling through print and digital design that captures attention and communicates clearly.",
    questions: ["What do you need designed, and where will it be used?", "What should the design make people feel or do?", "Which visual references, colors, or styles feel right to you?"],
  },
  {
    icon: PenTool,
    title: "Logo & Branding",
    description: "Distinctive logos and comprehensive brand identities that make your organization instantly recognizable.",
    questions: ["What should your brand be known for?", "Who are you trying to connect with?", "What feels right—or wrong—about your current identity?"],
  },
  {
    icon: TrendingUp,
    title: "Media Strategy",
    description: "Data-driven campaigns that maximize your reach and connect you with the audiences that matter most.",
    questions: ["Which channels or platforms matter most to your audience?", "What are you trying to grow, launch, or change?", "What content has performed well—or felt difficult to sustain?"],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<(typeof services)[number] | null>(null);
  return <>
  <section id="services" className="depth-section py-28 bg-secondary/30">
    <div className="container mx-auto px-6 md:px-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3"
      >
        What We Do
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl md:text-5xl font-bold mb-16 max-w-2xl"
      >
        Services built around <span className="text-gradient">your growth</span>.
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="depth-card group flex flex-col p-8 rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <s.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
            <p className="flex-1 font-body text-muted-foreground text-sm leading-relaxed">{s.description}</p><button type="button" onClick={() => setSelectedService(s)} className="mt-6 inline-flex text-sm font-semibold text-primary opacity-80 transition-opacity hover:opacity-100">Open questionnaire →</button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  {selectedService && <ServiceQuestionnaire service={selectedService} onClose={() => setSelectedService(null)} />}
  </>;
};

export default Services;
