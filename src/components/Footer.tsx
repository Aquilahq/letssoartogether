import aquilaLogo from "@/assets/aquila-logo.jpg";

const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img src={aquilaLogo} alt="Aquila logo" className="h-8 w-auto rounded" />
        <span className="font-display text-lg font-bold tracking-tight">AQUILA</span>
      </div>
      <p className="font-body text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Aquila. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
