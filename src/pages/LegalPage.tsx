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
    body: <><p>By using this website, you agree to use it lawfully and respectfully. The site and its original materials are provided for general informational and creative purposes.</p><p>Unless otherwise identified, original website content, software, graphics, interface designs, written materials, documentation, and audiovisual works are owned by James Bobik and may not be reproduced or redistributed without permission.</p><p>Let’s Soar Together™, Vision Lab, Project Notebook, and related experiences are developed through Aquila Project.</p><h2 className="pt-4 font-display text-2xl font-bold text-foreground">Ideas, Confidentiality and Collaboration</h2><h3 className="font-display text-xl font-semibold text-foreground">Your Ideas Belong to You</h3><p>You retain ownership of the original ideas, concepts, plans, writings, strategies, projects, business concepts, inventions, and other original material you submit through the platform.</p><p>Submitting information through Let’s Soar Together does not transfer ownership of your ideas to Aquila.</p><h3 className="font-display text-xl font-semibold text-foreground">Private Brainstorming</h3><p>Information entered into private brainstorming tools is intended to remain private within the operation of the platform.</p><p>Aquila will not intentionally sell, publish, disclose, or use your confidential ideas to create a competing project without your authorization.</p><h3 className="font-display text-xl font-semibold text-foreground">Platform Tools</h3><p>Let’s Soar Together uses digital tools, automation, and artificial intelligence to help users organize, analyze, develop, and refine their ideas.</p><p>Using these tools does not give Aquila ownership of your original ideas.</p><h3 className="font-display text-xl font-semibold text-foreground">Brainstorming Is Not a Business Relationship</h3><p>Using Let’s Soar Together does not automatically create a partnership, joint venture, client relationship, employment relationship, development agreement, or other formal business relationship with Aquila.</p><p>A formal relationship begins only when Aquila and the participant mutually agree to move forward.</p><h3 className="font-display text-xl font-semibold text-foreground">Working With Aquila</h3><p>If you decide you are serious about developing your project with Aquila, you will have the opportunity to begin the Aquila collaboration process.</p><p>At that stage, additional agreements may be provided covering confidentiality, development, intellectual property, responsibilities, compensation, ownership, licensing, and other project-specific terms.</p><p>Aquila’s Collaboration Non-Disclosure Agreement is reserved for individuals or organizations entering a serious discussion regarding working directly with Aquila.</p><h3 className="font-display text-xl font-semibold text-foreground">Acceptance</h3><p>By continuing to use Let’s Soar Together, you acknowledge and agree to these Terms of Use.</p></>,
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
