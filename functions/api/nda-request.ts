interface Env { RESEND_API_KEY?: string; NDA_SESSION_SECRET?: string; }
const EMAIL_FROM = "Let's Soar Together <hello@letssoartogether.com>";
const EMAIL_TO = "hello@letssoartogether.com";
const NDA_VERSION = "aquila-collaboration-nda-v1";
const json = (body: unknown, status = 200, headers: HeadersInit = {}) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", ...headers } });
const validEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const encode = (value: ArrayBuffer | string) => { const bytes = typeof value === "string" ? new TextEncoder().encode(value) : new Uint8Array(value); let binary = ""; bytes.forEach((byte) => { binary += String.fromCharCode(byte); }); return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); };
const sign = async (value: string, secret: string) => encode(await crypto.subtle.sign("HMAC", await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]), new TextEncoder().encode(value)));

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const input = await context.request.json() as Record<string, unknown>;
    const name = String(input.name || "").trim(); const email = String(input.email || "").trim(); const projectName = String(input.projectName || "").trim(); const projectDescription = String(input.projectDescription || "").trim(); const requestedHelp = String(input.requestedHelp || "").trim(); const projectStage = String(input.projectStage || "").trim();
    if (!name || !validEmail(email) || !projectName || !projectDescription || !requestedHelp || !projectStage || input.seriousInterest !== true || input.termsAccepted !== true || input.ndaAcknowledgment !== true) return json({ error: "Please complete every required field and acknowledgment." }, 400);
    if (!context.env.RESEND_API_KEY || !context.env.NDA_SESSION_SECRET) return json({ error: "The collaboration service is not configured yet." }, 503);
    const submittedAt = new Date().toISOString();
    const text = ["AQUILA COLLABORATION REQUEST", `NDA version: ${NDA_VERSION}`, `Submitted: ${submittedAt}`, `Source: /work-with-aquila`, "", `Name: ${name}`, `Email: ${email}`, `Phone: ${String(input.phone || "Not provided")}`, `Project: ${projectName}`, `Company: ${String(input.company || "Not provided")}`, `Stage: ${projectStage}`, "", "What they are building:", projectDescription, "", "Requested help:", requestedHelp, "", "Confirmations: serious interest, NDA acknowledgment, and Terms accepted"].join("\n").slice(0, 30000);
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${context.env.RESEND_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ to: [EMAIL_TO], from: EMAIL_FROM, reply_to: email, subject: `Aquila collaboration request: ${projectName}`, text }) });
    const result = await response.json() as { id?: string; message?: string };
    if (!response.ok || !result.id) return json({ error: result.message || "Unable to record the collaboration request." }, 502);
    const payload = encode(JSON.stringify({ email, submittedAt, exp: Date.now() + 60 * 60 * 1000, v: NDA_VERSION }));
    const token = `${payload}.${await sign(payload, context.env.NDA_SESSION_SECRET)}`;
    return json({ ok: true }, 200, { "set-cookie": `nda_session=${token}; Max-Age=3600; Path=/api; HttpOnly; Secure; SameSite=Lax` });
  } catch { return json({ error: "Unable to submit the collaboration request right now." }, 500); }
};
