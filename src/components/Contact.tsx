import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin } from "lucide-react";

const Contact = () => (
  <section id="contact" className="py-28 bg-secondary/30">
    <div className="container mx-auto px-6 md:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3"
        >
          Get In Touch
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-4xl md:text-6xl font-bold mb-6"
        >
          Ready to make <span className="text-gradient">noise</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground font-body text-lg mb-10 max-w-xl mx-auto"
        >
          Tell us about your project and we'll get back to you within 24 hours.
        </motion.p>

        <motion.a
          href="mailto:hello@prismstudio.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-3 px-10 py-5 bg-primary text-primary-foreground font-body font-semibold text-lg rounded-full hover:opacity-90 transition-opacity"
        >
          <Mail className="w-5 h-5" /> hello@letssoartogether.com
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center justify-center gap-2 text-muted-foreground font-body text-sm"
        >
          <MapPin className="w-4 h-4" /> New York &bull; Los Angeles &bull; London
        </motion.div>
      </div>
    </div>
  </section>
);

export default Contact;
