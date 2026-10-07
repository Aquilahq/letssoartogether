import { type MouseEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import aquilaLogo from "@/assets/aquila-watermark-hd.png";

const links = [
  { label: "About Aquila", href: "#about-aquila" },
  { label: "Services", href: "#services" },
  { label: "Our work", href: "#work" },
  { label: "Vision Lab", href: "#project-notebook" },
  { label: "Start", href: "/start" },
];
const menuVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.35, staggerChildren: 0.08 } }, exit: { opacity: 0, transition: { duration: 0.25 } } };
const itemVariants = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } } };

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const close = () => setMenuOpen(false);
  const handleLink = (event: MouseEvent<HTMLAnchorElement>, link: { label: string; href: string }) => {
    close();
    if (link.label === "Vision Lab") {
      event.preventDefault();
      window.location.assign("/vision-lab");
    }
  };
  return <>
    <nav className={`nav-sky-layer fixed left-0 right-0 top-0 z-50 px-6 py-2 transition-colors duration-300 md:px-12 md:py-2 ${scrolled ? "nav-scrolled text-slate-950" : "text-white"}`}>
      <div className="flex items-center justify-between">
        <a href="#" className="group brand-lockup flex items-center" onClick={close} aria-label="Let's Soar Together home"><span className="hanging-logo relative"><img src={aquilaLogo} alt="Let's Soar Together logo" className="h-28 w-auto rounded opacity-95 transition-transform duration-500 group-hover:scale-[1.03] md:h-[9.2rem]" /><span className="absolute -inset-2 -z-10 rounded-full bg-primary/20 blur-xl transition-opacity group-hover:opacity-100" /></span></a>
        <div className={`hidden items-center gap-6 rounded-full px-3 py-2 transition-all duration-300 md:flex ${scrolled ? "bg-white/90 shadow-lg shadow-slate-950/10 ring-1 ring-slate-950/10 backdrop-blur-md" : ""}`}>{links.map((link) => <a key={link.href} href={link.href} onClick={(event) => handleLink(event, link)} className={`relative text-sm font-medium transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all hover:after:w-full ${scrolled ? "text-slate-900 hover:text-slate-950" : "text-white/90 hover:text-white"}`}>{link.label}</a>)}<a href="#call" onClick={(event) => { event.preventDefault(); window.location.href = atob("dGVsOisxOTA5ODMzNjIyNw=="); }} aria-label="Call James Bobik" title="Call" className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors ${scrolled ? "text-slate-900 hover:bg-slate-950/10 hover:text-slate-950" : "text-white/90 hover:bg-white/15 hover:text-white"}`}><Phone className="h-4 w-4" /></a><a href="#contact" className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${scrolled ? "bg-slate-950 text-white shadow-md" : "bg-white/15 text-white ring-1 ring-white/50 backdrop-blur-md"}`}>Let&apos;s talk <ArrowUpRight className="h-4 w-4" /></a></div>
        <button className={`relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden ${scrolled ? "border-slate-950/30 bg-white/90 text-slate-950 shadow-md" : "border-white/60 bg-black/10 text-white hover:bg-white/15"}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
    </nav>
    <AnimatePresence>{menuOpen && <motion.div initial="hidden" animate="visible" exit="exit" variants={menuVariants} className="fixed inset-0 z-40 overflow-hidden bg-background md:hidden"><div className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" /><div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl" /><div className="relative flex h-full flex-col px-8 pb-8 pt-32"><motion.p variants={itemVariants} className="mb-10 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Your next chapter starts here</motion.p><div className="flex flex-col gap-5">{links.map((link, index) => <motion.a variants={itemVariants} key={link.href} href={link.href} onClick={(event) => handleLink(event, link)} className="group flex items-center justify-between border-b border-border/80 pb-4 font-display text-4xl font-bold tracking-tight"><span className="transition-colors group-hover:text-primary">{link.label}</span><span className="text-sm font-normal text-muted-foreground">0{index + 1}</span></motion.a>)}</div><motion.div variants={itemVariants} className="mt-auto"><a href="#call" onClick={(event) => { event.preventDefault(); close(); window.location.href = atob("dGVsOisxOTA5ODMzNjIyNw=="); }} aria-label="Call James Bobik" title="Call" className="mb-4 flex items-center justify-center rounded-2xl border border-border px-6 py-4 text-lg font-semibold text-foreground"><Phone className="h-5 w-5" /></a><a href="#contact" onClick={close} className="flex items-center justify-between rounded-2xl bg-primary px-6 py-5 text-lg font-semibold text-primary-foreground shadow-xl shadow-primary/20">Start a conversation <ArrowUpRight className="h-6 w-6" /></a><p className="mt-5 text-center text-xs text-muted-foreground">PR · branding · media · creative direction</p></motion.div></div></motion.div>}</AnimatePresence>
  </>;
};
export default Navbar;
