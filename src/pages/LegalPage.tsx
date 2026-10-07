import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Seo, { aquilaOrganization } from "../components/Seo";

type LegalPageProps = { kind: "intellectual-property" | "privacy" | "terms" };

const content = {
  "intellectual-property": {
    title: "Intellectual Property | Aquila Project",
    description: "Intellectual property and copyright information for Let’s Soar Together and Aquila Project.",
    heading: "Intellectual Property",
    body: <>
      <p>Let’s Soar Together™, Vision Lab, Project Notebook, and related original works are developed through Aquila Project.</p>
      <p>Unless otherwise identified, original website content, software, source code, graphics, interface designs, written materials, documentation, audiovisual works, and other copyrightable materials are owned by James Bobik.</p>
      <p>© 2026 James Bobik. All rights reserved.</p>
      <p>Aquila is the umbrella brand for Aquila Consulting, Aquila Project, and Aquila Media. Brand names and marks are used to identify their respective initiatives and services.</p>
    </>,
  },
  privacy: {
    title: "Privacy | Let’s Soar Together",
    description: "Privacy information for visitors and users of Let’s Soar Together, an Aquila Project initiative.",
    heading: "Privacy",
    body: <><p>Let’s Soar Together is an Aquila Project initiative. We respect your privacy and collect only information needed to respond to inquiries, provide requested experiences, and maintain the site.</p><p>We do not sell personal information. Information submitted through forms is used for the purpose described alongside the form and retained only as reasonably necessary.</p><p>Questions about privacy can be directed through the contact options on this website.</p></>,
  },
  terms: {
    title: "Terms | Let’s Soar Together",
    description: "Terms of use for Let’s Soar Together, an Aquila Project initiative.",
    heading: "Terms",
    body: <><p>By using this website, you agree to use it lawfully and respectfully. The site and its original materials are provided for general informational and creative purposes.</p><p>Unless otherwise identified, original website content, software, graphics, interface designs, written materials, documentation, and audiovisual works are owned by James Bobik and may not be reproduced or redistributed without permission.</p><p>Let’s Soar Together™, Vision Lab, Project Notebook, and related experiences are developed through Aquila Project.</p></>,
  },
} as const;

const LegalPage = ({ kind }: LegalPageProps) => {
  const page = content[kind];
  const path = `/${kind}`;
  return <div className="site-shell min-h-screen bg-background text-foreground flex flex-col">
    <Seo title={page.title} description={page.description} path={path} structuredData={{ "@context": "https://schema.org", "@type": "WebPage", name: page.heading, url: `https://letssoartogether.com${path}`, publisher: aquilaOrganization, copyrightHolder: "James Bobik", copyrightYear: 2026 }} />
    <header className="container mx-auto px-6 py-8 md:px-12"><Link to="/" className="font-display text-lg font-bold tracking-tight">LET&apos;S SOAR TOGETHER™</Link></header>
    <main className="container mx-auto flex-1 px-6 py-12 md:px-12 md:py-20">
      <article className="mx-auto max-w-3xl space-y-8"><p className="eyebrow">Aquila Project</p><h1 className="font-display text-4xl font-bold md:text-6xl">{page.heading}</h1><div className="space-y-5 text-lg leading-relaxed text-muted-foreground">{page.body}</div></article>
    </main>
    <Footer />
  </div>;
};

export default LegalPage;
