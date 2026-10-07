import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { emptyProfile, readProfile, saveProfile, type ContactProfile } from "@/lib/profile";

const Contact = () => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<ContactProfile>(emptyProfile);
  useEffect(() => { setProfile(readProfile()); }, []);
  const updateProfile = (field: keyof ContactProfile, value: string) => { const next = { ...profile, [field]: value }; setProfile(next); saveProfile(next); };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/send-notebook", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: data.get("name"), company: data.get("company"), email: data.get("email"), message: data.get("message"), subject: "New project inquiry" }) });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Unable to send your message.");
      setSent(true);
      event.currentTarget.reset();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to send your message.");
    } finally {
      setSending(false);
    }
  };
  return <section id="contact" className="depth-section bg-secondary/30 py-28"><div className="container mx-auto grid gap-14 px-6 md:grid-cols-[0.8fr_1.2fr] md:px-12">
    <div><p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">Your change starts here</p><h2 className="font-display text-4xl font-bold md:text-6xl">Ready to build what&apos;s <span className="text-gradient">next?</span></h2><p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">Is your business, website, company, or idea struggling to get off the ground? Bring us the messy version. We&apos;ll help you sort through it and find a thoughtful next step—not a sales pitch.</p><div className="mt-8 space-y-4 text-sm text-muted-foreground"><a className="flex items-center gap-3 hover:text-primary" href="#email" onClick={(event) => { event.preventDefault(); window.location.href = atob("bWFpbHRvOmhlbGxvQGxldHNzb2FydG9nZXRoZXIuY29t"); }} aria-label="Email Aquila" title="Email"><Mail className="h-5 w-5 text-primary" /></a><a className="flex items-center gap-3 hover:text-primary" href="#call" onClick={(event) => { event.preventDefault(); window.location.href = atob("dGVsOisxOTA5ODMzNjIyNw=="); }} aria-label="Call James Bobik" title="Call"><Phone className="h-5 w-5 text-primary" /></a></div></div>
    <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"><input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" /><h3 className="font-display text-2xl font-bold">Start a conversation</h3><p className="mt-2 text-sm text-muted-foreground">A few details help us make the first reply useful.</p><div className="mt-6 grid gap-4 sm:grid-cols-2"><input required name="company" value={profile.company} onChange={(e) => updateProfile("company", e.target.value)} placeholder="Company name" className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary sm:col-span-2" /><input required name="name" value={profile.name} onChange={(e) => updateProfile("name", e.target.value)} onFocus={(e) => window.setTimeout(() => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" }), 120)} placeholder="Your name" className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary" /><input required type="email" name="email" value={profile.email} onChange={(e) => updateProfile("email", e.target.value)} onFocus={(e) => window.setTimeout(() => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" }), 120)} placeholder="Email address" className="rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary" /></div><textarea required name="message" onFocus={(e) => window.setTimeout(() => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" }), 120)} placeholder="What feels stuck, and what would moving forward look like?" className="mt-4 min-h-32 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary" /><button type="submit" disabled={sending} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-semibold text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{sending ? "Sending..." : sent ? "Message sent ✓" : "Send my project details"} <ArrowRight className="h-5 w-5" /></button><p className="mt-3 text-center text-xs text-muted-foreground">Your message is sent securely to our team.</p>{error && <p role="alert" className="mt-3 text-center text-xs text-destructive">{error}</p>}</form>
  </div></section>;
};
export default Contact;
