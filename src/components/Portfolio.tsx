import { motion } from "framer-motion";

const projects = [
  {
    title: "Vanguard Rebranding",
    category: "Branding & Logo",
    color: "from-primary/20 to-primary/5",
  },
  {
    title: "Metro Arts Festival",
    category: "PR Campaign",
    color: "from-primary/15 to-transparent",
  },
  {
    title: "Horizon Tech Launch",
    category: "Media Strategy",
    color: "from-primary/10 to-primary/20",
  },
];

const Portfolio = () => (
  <section id="work" className="py-28">
    <div className="container mx-auto px-6 md:px-12">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3"
      >
        Selected Work
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-4xl md:text-5xl font-bold mb-16"
      >
        Results that <span className="text-gradient">speak</span>.
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border hover:border-primary/40 transition-colors cursor-pointer"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="text-primary font-body text-xs tracking-widest uppercase mb-2">
                {p.category}
              </p>
              <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
                {p.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Portfolio;
