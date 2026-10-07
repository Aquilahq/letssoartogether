import { FormEvent, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import Footer from "@/components/Footer";

const stages = ["Idea Stage", "Planning", "Prototype", "Existing Product", "Existing Business", "Ready for Development", "Other"];

type FormState = { name: string; email: string; phone: string; projectName: string; company: string; projectDescription: string; requestedHelp: string; projectStage: string; accessCode: string; seriousInterest: boolean; ndaAcknowledgment: boolean; termsAccepted: boolean };
const initialForm: FormState = { name: "", email: "", phone: "", projectName: "", company: "", projectDescription: "", requestedHelp: "", projectStage: "Idea Stage", accessCode: "", seriousInterest: false, ndaAcknowledgment: false, termsAccepted: false };

const WorkWithAquila = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const update = (field: keyof FormState, value: string | boolean) => setForm((current) => ({ ...current, [field]: value }));
  const submit = async (event: FormEvent) => {
    event.preventDefault(); setError(""); setSending(true);
    try {
      const response = await fetch("/api/nda-request", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(form) });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Unable to submit your request.");
      setSubmitted(true);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to submit your request."); } finally { setSending(false); }
  };
  return <div className="site-shell min-h-screen bg-background text-foreground">
    <Seo title="Work With Aquila | Let’s Soar Together™" description="Begin the Aquila collaboration process for serious project development conversations." path="/work-with-aquila" />
    <header className="container mx-auto flex items-center justify-between px-6 py-8 md:px-12"><Link to="/" className="font-display text-lg font-bold tracking-tight">LET&apos;S SOAR TOGETHER™</Link><Link to="/vision-lab" className="text-sm font-semibold text-primary">Back to Vision Lab</Link></header>
    <main className="container mx-auto px-6 pb-20 pt-8 md:px-12 md:pt-16">
      <div className="mx-auto max-w-3xl"><p className="eyebrow">Aquila collaboration process</p><h1 className="mt-3 font-display text-4xl font-bold md:text-6xl">Ready to Take Your Idea Further?</h1><p className="mt-6 text-lg leading-relaxed text-muted-foreground">Brainstorming is where the idea begins.<br />Building it requires commitment.</p><p className="mt-4 text-lg leading-relaxed text-muted-foreground">If you believe your idea is ready for serious development and you want to explore working directly with Aquila, begin the collaboration process below.</p><p className="mt-4 text-sm leading-relaxed text-muted-foreground">The Aquila Collaboration Non-Disclosure Agreement is reserved for individuals and organizations considering a working relationship with Aquila.</p>
      {submitted ? <div className="mt-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8"><p className="eyebrow">Next step</p><h2 className="mt-2 font-display text-3xl font-bold">Your Collaboration Request Has Been Received</h2><p className="mt-4 leading-relaxed text-muted-foreground">Thank you for taking the next step with Aquila.</p><p className="mt-2 leading-relaxed text-muted-foreground">Please review the Aquila Collaboration Non-Disclosure Agreement before confidential project discussions begin.</p><a href="/api/nda-download" className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90">Download Aquila Collaboration NDA</a><div><Link to="/vision-lab" className="mt-5 inline-flex min-h-12 items-center text-sm font-semibold text-primary">Return to my project →</Link></div></div> : <form onSubmit={submit} className="mt-10 space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8"><div className="grid gap-6 md:grid-cols-2"><Field label="Full Name" required value={form.name} onChange={(value) => update("name", value)} /><Field label="Email Address" type="email" required value={form.email} onChange={(value) => update("email", value)} /><Field label="Phone Number" value={form.phone} onChange={(value) => update("phone", value)} /><Field label="Project or Idea Name" required value={form.projectName} onChange={(value) => update("projectName", value)} /><Field label="Company or Organization" value={form.company} onChange={(value) => update("company", value)} /></div><TextField label="What are you building?" required value={form.projectDescription} onChange={(value) => update("projectDescription", value)} /><TextField label="What kind of help are you looking for from Aquila?" required value={form.requestedHelp} onChange={(value) => update("requestedHelp", value)} /><Field label="NDA Access Passcode" type="password" required value={form.accessCode} onChange={(value) => update("accessCode", value)} /><label className="block text-sm font-semibold">Where are you in the process? <select value={form.projectStage} onChange={(event) => update("projectStage", event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 font-normal">{stages.map((stage) => <option key={stage}>{stage}</option>)}</select></label><Check checked={form.seriousInterest} onChange={(value) => update("seriousInterest", value)}>I am seriously interested in discussing the development of this project with Aquila.</Check><Check checked={form.ndaAcknowledgment} onChange={(value) => update("ndaAcknowledgment", value)}>I understand that submitting this request or downloading the NDA does not guarantee that Aquila will accept my project.</Check><Check checked={form.termsAccepted} onChange={(value) => update("termsAccepted", value)}>I have read and agree to the <Link to="/terms" className="text-primary underline">Let’s Soar Together Terms of Use</Link>.</Check>{error && <p className="rounded-xl bg-destructive/10 p-4 text-sm text-destructive">{error}</p>}<button type="submit" disabled={sending || !form.seriousInterest || !form.ndaAcknowledgment || !form.termsAccepted} className="min-h-12 w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">{sending ? "Sending…" : "Continue to NDA"}</button></form>}
      </div>
    </main><Footer />
  </div>;
};

const Field = ({ label, value, onChange, required = false, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) => <label className="block text-sm font-semibold">{label}{required && " *"}<input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-border bg-background px-4 font-normal outline-none transition focus:border-primary" /></label>;
const TextField = ({ label, value, onChange, required }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) => <label className="block text-sm font-semibold">{label}{required && " *"}<textarea required={required} value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="mt-2 w-full rounded-xl border border-border bg-background p-4 font-normal outline-none transition focus:border-primary" /></label>;
const Check = ({ checked, onChange, children }: { checked: boolean; onChange: (value: boolean) => void; children: ReactNode }) => <label className="flex min-h-12 cursor-pointer items-start gap-3 text-sm leading-relaxed"><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary" /> <span>{children}</span></label>;

export default WorkWithAquila;
