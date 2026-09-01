import { motion } from "framer-motion";
import { Megaphone, Palette, PenTool, TrendingUp, Video, Radio, Newspaper, Camera } from "lucide-react";
import aquilaLogo from "@/assets/aquila-logo.jpg";
import aquilaMediaLogo from "@/assets/aquila-media-logo.jpg";

const aquilaBrands = [
  {
    name: "Aquila PR & Design",
    logo: aquilaLogo,
    description: "Strategic public relations, graphic design, logos, and branding that amplify your organization's voice.",
    services: [
      { icon: Megaphone, label: "Public Relations" },
      { icon: Palette, label: "Graphic Design" },
      { icon: PenTool, label: "Logo & Branding" },
      { icon: TrendingUp, label: "Media Strategy" },
    ],
  },
  {
    name: "Aquila Media",
    logo: aquilaMediaLogo,
    description: "Full-service media production and content creation — helping your story reach every screen and platform.",
    services: [
      { icon: Video, label: "Video Production" },
      { icon: Camera, label: "Photography" },
      { icon: Newspaper, label: "Content Creation" },
      { icon: Radio, label: "Media Buying" },
    ],
  },
];

const Brands = () => (
  <section id="about" className="py-28">
    <div className="container mx-auto px-6 md:px-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3"
      >
        Our Brands
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl md:text-5xl font-bold mb-16 max-w-3xl"
      >
        Two wings, <span className="text-gradient">one vision</span>.
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {aquilaBrands.map((brand, i) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-2xl border border-border bg-card p-8 md:p-10 hover:border-primary/40 transition-colors"
          >
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-16 w-auto rounded-lg mb-6 object-contain"
            />
            <h3 className="font-display text-2xl font-bold mb-3">{brand.name}</h3>
            <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
              {brand.description}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {brand.services.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/50"
                >
                  <s.icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="font-body text-sm text-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Brands;
