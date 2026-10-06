interface Env { CLOUDFLARE_API_TOKEN: string; }

const ACCOUNT_ID = "31fb51001e557f07a14e5320e5cb612b";
const EMAIL_FROM = "hello@letssoartogether.com";
const EMAIL_TO = "hello@letssoartogether.com";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "access-control-allow-origin": "*" } });

export const onRequestOptions: PagesFunction = () => new Response(null, {
  status: 204,
  headers: { "access-control-allow-origin": "*", "access-control-allow-methods": "POST, OPTIONS", "access-control-allow-headers": "Content-Type" },
});

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const input = await context.request.json() as { name?: string; email?: string; phone?: string; preferred?: string; notebook?: Record<string, unknown> };
    if (!input.name?.trim() || !input.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) return json({ error: "Please provide a valid name and email." }, 400);
    if (!context.env.CLOUDFLARE_API_TOKEN) return json({ error: "Email delivery is not configured yet." }, 503);

    const notebook = input.notebook || {};
    const lines = [
      `Name: ${input.name.trim()}`, `Email: ${input.email.trim()}`, `Phone: ${input.phone || "Not provided"}`, `Preferred contact: ${input.preferred || "Email"}`, "",
      "PROJECT NOTEBOOK", `Path: ${notebook.path || "Not selected"}`, `Thinking style: ${Array.isArray(notebook.styles) ? notebook.styles.join(", ") : "Not selected"}`, "",
      "Brain Dump:", String(notebook.brainDump || ""), "", "Why it matters:", String(notebook.why || ""), "", "The problem:", String(notebook.problem || ""), "", "Who it helps:", String(notebook.who || ""), "", "Vision:", String(notebook.vision || ""), "", "Partners:", String(notebook.partners || ""), "", "Next step:", String(notebook.nextStep || ""), `When: ${notebook.when || "Not selected"}`,
    ];
    const text = lines.join("\n").slice(0, 30000);
    const html = `<div style="font-family:Arial,sans-serif;line-height:1.6;white-space:pre-wrap">${text.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[char] || char))}</div>`;
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/email/sending/send`, {
      method: "POST",
      headers: { Authorization: `Bearer ${context.env.CLOUDFLARE_API_TOKEN}`, "content-type": "application/json" },
      body: JSON.stringify({ to: EMAIL_TO, from: EMAIL_FROM, subject: `Project Notebook from ${input.name.trim()}`, text, html }),
    });
    const result = await response.json() as { success?: boolean; errors?: unknown[] };
    if (!response.ok || !result.success) return json({ error: "Email delivery failed.", details: result.errors || [] }, 502);
    return json({ ok: true });
  } catch {
    return json({ error: "Unable to send the notebook right now." }, 500);
  }
};
