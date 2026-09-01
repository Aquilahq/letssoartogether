import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import aquilaLogo from "@/assets/aquila-logo.jpg";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 px-6 py-4 backdrop-blur-md md:px-12 md:py-5">
      <div className="flex items-center justify-between">
        <a href="#" onClick={closeMenu} className="flex items-center gap-3">
          <img src={aquilaLogo} alt="Aquila logo" className="h-12 w-auto rounded opacity-80" />
          <span className="font-display text-xl font-bold tracking-tight text-foreground">AQUILA</span>
        </a>

        <div className="hidden items-center gap-8 font-body text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
        >
          Let's Talk <ArrowRight className="h-4 w-4" />
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-background/70 text-primary transition-colors hover:bg-primary/10 md:hidden"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden md:hidden"
          >
            <div className="mt-4 rounded-2xl border border-primary/10 bg-background/95 p-3 shadow-xl shadow-primary/10">
              {links.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 font-body text-base text-foreground transition-colors hover:bg-primary/10"
                >
                  {link.label}
                  <ArrowRight className="h-4 w-4 text-primary" />
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 font-body text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Let's Talk <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
