import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import aquilaLogo from "@/assets/aquila-logo.jpg";

interface HeroProps {
  heroImage: string;
}

const Hero = ({ heroImage }: HeroProps) => (
  <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
    {/* Cloud background */}
    <div className="absolute inset-0 z-0">
      <motion.div
        aria-hidden="true"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 94, ease: "linear", repeat: Infinity, repeatType: "loop", repeatDelay: 0 }}
        className="absolute inset-y-0 left-0 flex h-full w-[200%] scale-[1.12] origin-center"
      >
        <img src={heroImage} alt="" className="h-full w-1/2 flex-none object-cover opacity-80" />
        <img src={heroImage} alt="" className="h-full w-1/2 flex-none object-cover opacity-80" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/45 to-background/90" />
    </div>

    <div className="relative z-10 container mx-auto px-6 md:px-12 py-20">
      <motion.img
        src={aquilaLogo}
        alt="AQUILA emblem drifting through the clouds"
        initial={{ opacity: 0, x: 40 }}
        animate={{
          opacity: [0.2, 0.28, 0.23, 0.3, 0.2],
          x: [0, 14, 28, 10, 0],
          y: [0, -10, 4, -7, 0],
          rotate: [0, 1.2, -0.8, 0.7, 0],
        }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, delay: 0.25 }}
        className="pointer-events-none absolute right-0 top-8 hidden w-[min(32vw,26.5rem)] grayscale contrast-125 mix-blend-multiply blur-[0.2px] drop-shadow-[0_5px_10px_rgba(23,59,114,0.45)] md:block lg:top-0"
        style={{ WebkitMaskImage: "radial-gradient(ellipse 72% 72% at center, black 54%, transparent 100%)", maskImage: "radial-gradient(ellipse 72% 72% at center, black 54%, transparent 100%)" }}
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6"
      >
        Public Relations &amp; Creative Studio
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight max-w-5xl"
      >
        Let's Soar
        <br />
        <span className="text-gradient">Together</span>.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-8 text-muted-foreground font-body text-lg md:text-xl max-w-xl leading-relaxed"
      >
        Strategic PR, striking design, and unforgettable branding — 
        we help organizations get the exposure they deserve.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 flex flex-wrap gap-4"
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-body font-semibold rounded-full hover:opacity-90 transition-opacity"
        >
          Start a Project <ArrowRight className="w-5 h-5" />
        </a>
        <a
          href="#work"
          className="inline-flex items-center gap-2 px-8 py-4 border border-primary/30 text-foreground font-body font-medium rounded-full hover:border-primary/60 transition-colors"
        >
          View Our Work
        </a>
      </motion.div>
    </div>
  </section>
);

export default Hero;
