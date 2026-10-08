import { useEffect, useState } from "react";
import { ArrowRight, Check, Lightbulb, Send } from "lucide-react";

const ideas = ["A website that works harder", "A clearer brand or offer", "More visibility and trust", "A plan to finally get moving"];

const Brainstorm = () => {
  const [idea, setIdea] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setIdea(localStorage.getItem("soar-vision") || ""); try { setSelected(JSON.parse(localStorage.getItem("soar-vision-selections") || "[]")); } catch { /* keep empty selections */ } }, []);
  useEffect(() => { localStorage.setItem("soar-vision-selections", JSON.stringify(selected)); }, [selected]);
  const toggle = (item: string) => setSelected((current) => current.includes(item) ? current.filter((x) => x !== item) : [...current, item]);
  const saveIdea = () => { localStorage.setItem("soar-vision", idea); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const sendBrief = () => {
    const body = `Where this came from: Vision Lab — Brainstorm starter section\nMy big idea:\n${idea}\n\nI want help with:\n${selected.join(", ") || "I am still exploring"}`;
    window.location.href = `mailto:hello@letssoartogether.com?subject=${encodeURIComponent("From the Vision Lab — my project idea")}&body=${encodeURIComponent(body)}`;
  };
  return <section id="vision-lab" className="depth-section vision-depth bg-primary py-24 text-primary-foreground">
    <div className="container mx-auto grid gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:px-12">
      <div><div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary-foreground/70"><Lightbulb className="h-5 w-5" /> The Vision Lab</div><h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">The beginning of your dream starts here.</h2><p className="mt-6 max-w-md text-lg leading-relaxed text-primary-foreground/75">You don&apos;t need all the answers. You just need the courage to begin. Bring us the dream, the challenge, or the vision you can&apos;t stop thinking about—we&apos;ll help turn it into something real.</p><p className="mt-8 text-sm text-primary-foreground/60">Your draft stays saved in this browser until you&apos;re ready to send it.</p></div>
      <div className="rounded-3xl bg-background p-6 text-foreground shadow-2xl md:p-8"><label htmlFor="idea" className="font-display text-2xl font-bold">What feels stuck right now?</label><textarea id="idea" value={idea} onChange={(e) => setIdea(e.target.value)} placeholder="Tell us what&apos;s struggling: your website, visibility, offer, brand, company, or idea. Start wherever you are..." className="mt-5 min-h-36 w-full resize-y rounded-2xl border border-border bg-card p-4 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
      <p className="mb-3 mt-6 text-sm font-semibold">Where do you need a partner to help you soar?</p><div className="grid gap-2 sm:grid-cols-2">{ideas.map((item) => <button type="button" key={item} onClick={() => toggle(item)} className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm transition ${selected.includes(item) ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"}`}>{selected.includes(item) ? <Check className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full border border-muted-foreground/40" />}{item}</button>)}</div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row"><button onClick={saveIdea} className="rounded-full border border-primary/30 px-5 py-3 text-sm font-semibold hover:bg-primary/5">{saved ? "Saved ✓" : "Save my thought"}</button><button onClick={sendBrief} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">Send my brief <Send className="h-4 w-4" /></button></div><a href="#contact" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">Prefer a quick conversation? Contact us <ArrowRight className="h-4 w-4" /></a></div>
    </div>
  </section>;
};
export default Brainstorm;
