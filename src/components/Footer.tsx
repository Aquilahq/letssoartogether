import aquilaLogo from "@/assets/aquila-logo.jpg";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="py-8">
    <div className="container mx-auto flex flex-col gap-5 px-6 md:px-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <img src={aquilaLogo} alt="Aquila logo" className="h-8 w-auto rounded" />
          <span className="font-display text-lg font-bold tracking-tight">LET&apos;S SOAR TOGETHER™</span>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-x-5 gap-y-2 font-body text-sm text-muted-foreground">
          <Link to="/intellectual-property" className="transition-colors hover:text-foreground">Intellectual Property</Link>
          <Link to="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
          <Link to="/terms" className="transition-colors hover:text-foreground">Terms</Link>
        </nav>
      </div>
      <div className="space-y-1 font-body text-sm text-muted-foreground">
        <p>© 2026 James Bobik. All rights reserved.</p>
        <p>Aquila | Aquila Consulting | Aquila Project | Aquila Media</p>
        <p>Let&apos;s Soar Together™ is an Aquila Project initiative.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
