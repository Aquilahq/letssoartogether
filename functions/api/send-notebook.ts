interface Env { RESEND_API_KEY: string; }

const EMAIL_FROM = "Let's Soar Together <hello@letssoartogether.com>";
const EMAIL_TO = "hello@letssoartogether.com";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });

export const onRequestOptions: PagesFunction = () => new Response(null, {
  status: 204,
  headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "POST, OPTIONS", "access-control-allow-headers": "Content-Type" },
});

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const input = await context.request.json() as { name?: string; company?: string; email?: string; phone?: string; preferred?: string; message?: string; subject?: string; origin?: string; website?: string; notebook?: Record<string, unknown> };
    if (input.website?.trim()) return json({ ok: true });
    if (!input.name?.trim() || !input.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) return json({ error: "Please provide a valid name and email." }, 400);
    if (!context.env.RESEND_API_KEY) return json({ error: "Email delivery is not configured yet." }, 503);

    const notebook = input.notebook || {};
    const origin = String(input.origin || "").trim();
    const originLabel = origin.includes("/project-notebook") || origin.includes("/vision-lab") ? "Vision Lab — Project Notebook" : origin.includes("/start/quick-information") ? "Start page — just a little information" : origin.includes("/contact") ? "Contact section" : origin || "Unspecified site section";
    const perspectiveAnswers = notebook.perspectiveAnswers && typeof notebook.perspectiveAnswers === "object" ? JSON.stringify(notebook.perspectiveAnswers) : "Not recorded";
    const ideas = Array.isArray(notebook.ideas) ? notebook.ideas.map((idea) => typeof idea === "object" ? JSON.stringify(idea) : String(idea)).join("\n") : "Not recorded";
    const lines = [
      `Origin: ${originLabel}`, `Name: ${input.name.trim()}`, `Company: ${input.company || "Not provided"}`,  `Email: ${input.email.trim()}`, `Phone: ${input.phone || "Not provided"}`, `Preferred contact: ${input.preferred || "Email"}`, "",
      "PROJECT NOTEBOOK", `Path: ${Array.isArray(notebook.path) ? notebook.path.join(", ") : notebook.path || "Not selected"}`, `Thinking style: ${Array.isArray(notebook.styles) ? notebook.styles.join(", ") : "Not selected"}`, `Selected perspectives: ${perspectiveAnswers}`, `Selected ideas:\n${ideas}`, `Roadblocks: ${Array.isArray(notebook.roadblocks) ? notebook.roadblocks.join(", ") : "Not selected"}`, "",
      "Message:", String(input.message || "Not provided"), "", "Brain Dump:", String(notebook.brainDump || ""), "", "Why it matters:", String(notebook.why || ""), "", "The problem:", String(notebook.problem || ""), "", "Who it helps:", String(notebook.who || ""), "", "Vision:", String(notebook.vision || ""), "", "Current state:", String(notebook.current || ""), "", "Desired change:", String(notebook.change || ""), "", "Partners:", String(notebook.partners || ""), "", "Next step:", String(notebook.nextStep || ""), `When: ${notebook.when || "Not selected"}`, `Terms accepted: ${notebook.termsAcceptedAt || "Not recorded"}`, 
    ];
    const text = lines.join("\n").slice(0, 30000);
    const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;white-space:pre-wrap">${text.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char] || char))}</div>`;
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${context.env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ to: [EMAIL_TO], from: EMAIL_FROM, reply_to: input.email.trim(), subject: `${input.subject || "Vision Lab | Project Notebook"} | From: ${originLabel} | ${input.name.trim()}`, text, html }),
    });
    const result = await response.json() as { id?: string; message?: string };
    if (!response.ok || !result.id) return json({ error: result.message || "Email delivery failed." }, 502);
    return json({ ok: true });
  } catch {
    return json({ error: "Unable to send the notebook right now." }, 500);
  }
};
