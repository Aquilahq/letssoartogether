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
    body: <><p>By using this website, you agree to use it lawfully and respectfully. The site and its original materials are provided for general informational and creative purposes.</p><p>Unless otherwise identified, original website content, software, graphics, interface designs, written materials, documentation, and audiovisual works are owned by James Bobik and may not be reproduced or redistributed without permission.</p><p>Let’s Soar Together™, Vision Lab, Project Notebook, and related experiences are developed through Aquila Project.</p><h2 className="pt-4 font-display text-2xl font-bold text-foreground">IDEAS, PRIVACY AND OWNERSHIP</h2><h3 className="font-display text-xl font-semibold text-foreground">YOUR IDEAS REMAIN YOURS</h3><p>You retain ownership of the original ideas, concepts, writings, plans, strategies, projects, business concepts, and other original material you submit through Let’s Soar Together.</p><p>Using Vision Lab does not transfer ownership of your ideas to Aquila.</p><h3 className="font-display text-xl font-semibold text-foreground">PURPOSE OF VISION LAB</h3><p>Vision Lab is designed to help you brainstorm, organize, clarify, and develop ideas.</p><p>Aquila does not claim ownership simply because you used the platform.</p><h3 className="font-display text-xl font-semibold text-foreground">PRIVACY</h3><p>Information entered into private Vision Lab sessions should be handled according to the platform&apos;s privacy practices and should not be intentionally published or shared publicly by Aquila without authorization.</p><h3 className="font-display text-xl font-semibold text-foreground">ARTIFICIAL INTELLIGENCE AND DIGITAL TOOLS</h3><p>Vision Lab may use artificial intelligence, automation, and other digital technologies to help organize, analyze, or develop information submitted through the platform.</p><p>Using these tools does not transfer ownership of your original ideas to Aquila.</p><h3 className="font-display text-xl font-semibold text-foreground">DO NOT SUBMIT HIGHLY SENSITIVE INFORMATION</h3><p>Vision Lab is intended for brainstorming and development. Users should not submit passwords, Social Security numbers, banking credentials, private authentication information, highly sensitive trade secrets, unreleased source code, proprietary formulas, or other information requiring specialized confidentiality protection through the general brainstorming interface.</p><p>If you need to discuss highly confidential intellectual property or proprietary information with Aquila, begin the formal Aquila collaboration process first.</p><h3 className="font-display text-xl font-semibold text-foreground">BRAINSTORMING DOES NOT CREATE A BUSINESS RELATIONSHIP</h3><p>Using Vision Lab does not automatically create a client relationship, partnership, joint venture, development agreement, investment relationship, or other formal business relationship with Aquila.</p><p>A formal relationship begins only when Aquila and the individual or organization mutually agree to work together.</p><h3 className="font-display text-xl font-semibold text-foreground">FORMAL CONFIDENTIALITY</h3><p>A formal Non-Disclosure Agreement is available when someone reaches the stage where they want to seriously discuss working directly with Aquila. The NDA is separate from ordinary Vision Lab use.</p><h3 className="font-display text-xl font-semibold text-foreground">ACCEPTANCE</h3><p>By continuing to use Let’s Soar Together, you acknowledge and agree to these Terms of Use.</p></>,
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
