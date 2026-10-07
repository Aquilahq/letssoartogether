import { ArrowRight, Monitor, Smartphone, Tablet } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Seo, { aquilaOrganization } from "../components/Seo";

const StartPage = () => (
  <div className="site-shell min-h-screen bg-background text-foreground">
    <Seo
      title="Start | Let’s Soar Together™"
      description="Start your Let’s Soar Together™ journey with Aquila Project. Begin on the web today; mobile and tablet experiences are coming soon."
      path="/start"
      structuredData={{ "@context": "https://schema.org", "@type": "WebPage", name: "Start | Let’s Soar Together", url: "https://letssoartogether.com/start", publisher: aquilaOrganization, copyrightHolder: "James Bobik", copyrightYear: 2026 }}
    />
    <header className="container mx-auto flex items-center justify-between px-6 py-8 md:px-12">
      <Link to="/" className="font-display text-lg font-bold tracking-tight">LET&apos;S SOAR TOGETHER™</Link>
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Back to site</Link>
    </header>
    <main className="container mx-auto px-6 pb-20 pt-10 md:px-12 md:pt-20">
      <section className="mx-auto max-w-5xl">
        <p className="eyebrow">Aquila Project</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl font-bold leading-tight md:text-7xl">Let&apos;s Soar Together™ starts wherever you are.</h1>
        <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground">This is not a contact form. It is a journey for people with ideas, dreams, problems to solve, businesses to build, or a feeling that they need to move forward but do not know where to begin.</p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <Link to="/vision-lab" className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-transform hover:-translate-y-1">
            <p className="eyebrow">Something is already taking shape</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Help me turn it into something real.</h2>
            <p className="mt-3 text-muted-foreground">Bring the idea, business, project, or problem you have been carrying. Vision Lab and Project Notebook help you explore it, challenge it, and give it structure.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">Shape my idea <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></span>
          </Link>
          <Link to="/vision-lab" className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-transform hover:-translate-y-1">
            <p className="eyebrow">There&apos;s a spark, but no map yet</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Help me discover what&apos;s next.</h2>
            <p className="mt-3 text-muted-foreground">You do not need a finished plan or all the answers. Start with a question, a feeling, or a blank page and let the journey help you find your next direction.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">Find my starting point <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></span>
          </Link>
          <Link to="/vision-lab" className="group rounded-2xl border border-border bg-card p-7 shadow-sm transition-transform hover:-translate-y-1">
            <p className="eyebrow">I&apos;m in the middle of it</p>
            <h2 className="mt-3 font-display text-2xl font-bold">Help me get over the hump.</h2>
            <p className="mt-3 text-muted-foreground">You have started, but momentum is harder to find. Bring the messy middle and we&apos;ll help you untangle the next move.</p>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">Find my next move <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></span>
          </Link>
        </div>

        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-display text-3xl font-bold">Built for the way ideas move.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">There is a web experience today, with mobile and tablet experiences coming soon, so your ideas can stay with you wherever you are thinking, planning, or creating.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <Link to="/vision-lab" className="rounded-xl border border-primary/30 bg-primary/5 p-5"><Monitor size={20} className="text-primary" /><strong className="mt-3 block">Start on the Web</strong><span className="mt-1 block text-sm text-muted-foreground">Begin Vision Lab now.</span></Link>
            <Link to="/vision-lab" className="rounded-xl border border-border p-5"><Smartphone size={20} className="text-primary" /><strong className="mt-3 block">Mobile App</strong><span className="mt-1 block text-sm text-muted-foreground">Coming soon. Start on the web today.</span></Link>
            <Link to="/vision-lab" className="rounded-xl border border-border p-5"><Tablet size={20} className="text-primary" /><strong className="mt-3 block">Tablet App</strong><span className="mt-1 block text-sm text-muted-foreground">Coming soon. Start on the web today.</span></Link>
          </div>
          <p className="mt-6 text-sm font-medium text-muted-foreground">Your journey stays connected across every device.</p>
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default StartPage;
