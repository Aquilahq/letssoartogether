import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import aquilaLogo from "@/assets/aquila-logo.jpg";

interface HeroProps { heroImage: string }

const taglines = [
  "Your business breakthrough starts here.",
  "Start your business. Start your next chapter.",
  "Make your dreams impossible to ignore.",
  "The future you imagine begins today.",
  "Move forward with the goals that matter.",
  "Turn your vision into something people remember.",
  "The change your business needs starts here.",
  "Bring your idea to life—and let it soar.",
  "Build the brand your ambition deserves.",
  "This is where possibility becomes momentum.",
];

const Hero = ({ heroImage }: HeroProps) => {
  const [tagline, setTagline] = useState(() => taglines[Math.floor(Math.random() * taglines.length)]);
  useEffect(() => {
    const timer = window.setInterval(() => setTagline((current) => {
      const next = taglines[(taglines.indexOf(current) + 1) % taglines.length];
      return next;
    }), 18000);
    return () => window.clearInterval(timer);
  }, []);

  return <section className="relative flex min-h-[88vh] items-center overflow-hidden pt-24">
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 94, ease: "linear", repeat: Infinity }} className="absolute inset-y-0 left-0 flex h-full w-[200%] origin-center scale-[1.12]">
        <img src={heroImage} alt="" className="h-full w-1/2 flex-none object-cover opacity-80" />
        <img src={heroImage} alt="" className="h-full w-1/2 flex-none object-cover opacity-80" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/55 to-background" />
    </div>

    <div className="container relative z-10 mx-auto px-6 py-20 md:px-12 md:py-28">
      <motion.img src={aquilaLogo} alt="AQUILA eagle emblem drifting through the clouds" initial={{ opacity: 0, x: 40 }} animate={{ opacity: [0.1, 0.16, 0.12, 0.18, 0.1], x: [0, 14, 28, 10, 0], y: [0, -10, 4, -7, 0], rotate: [0, 1.2, -0.8, 0.7, 0] }} transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, delay: 0.25 }} className="hidden" style={{ clipPath: "inset(0 0 30% 0)", WebkitMaskImage: "radial-gradient(ellipse 72% 72% at center, black 48%, transparent 100%)", maskImage: "radial-gradient(ellipse 72% 72% at center, black 48%, transparent 100%)" }} />
      <div className="max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary backdrop-blur"><Sparkles className="h-4 w-4" /> PR, brand &amp; creative strategy</motion.div>
        <div className="min-h-[9.5rem] overflow-hidden md:min-h-[10.5rem]"><AnimatePresence mode="wait"><motion.h1 key={tagline} initial={{ opacity: 0, y: 22, scale: 0.985, filter: "blur(10px)", letterSpacing: "0.015em" }} animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", letterSpacing: "-0.02em" }} exit={{ opacity: 0, y: -18, scale: 1.012, filter: "blur(7px)", letterSpacing: "0.01em" }} transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl will-change-transform font-display text-5xl font-bold leading-[0.98] tracking-tight text-slate-950 md:text-7xl lg:text-8xl">{tagline}</motion.h1></AnimatePresence></div>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">Every breakthrough begins with a decision: this is the moment things change. We partner with businesses, brands, and big ideas ready to become clearer, stronger, and impossible to overlook.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 flex flex-col gap-4 sm:flex-row"><a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">Begin your next chapter <ArrowRight className="h-5 w-5" /></a><a href="#project-notebook" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-background/60 px-7 py-4 font-semibold backdrop-blur transition-colors hover:bg-primary/10"><Wand2 className="h-5 w-5 text-primary" /> Bring us your vision</a></motion.div>
        <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground"><span>✦ For businesses in the messy middle</span><span>✦ Practical, partner-led strategy</span><span>✦ We help ideas get airborne</span></div>
      </div>
    </div>
  </section>;
};

export default Hero;
