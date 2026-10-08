interface Env { RESEND_API_KEY?: string; }
const EMAIL_FROM = "Let's Soar Together <hello@letssoartogether.com>";
const EMAIL_TO = "hello@letssoartogether.com";
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const input = await context.request.json() as Record<string, unknown>;
    const name = String(input.name || "").trim(); const email = String(input.email || "").trim(); const projectName = String(input.projectName || "").trim(); const description = String(input.description || "").trim(); const requestedHelp = String(input.requestedHelp || "").trim(); const stage = String(input.stage || "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !projectName || !description || !requestedHelp || !stage || input.seriousInterest !== true) return json({ error: "Please complete the required fields and confirmation." }, 400);
    if (!context.env.RESEND_API_KEY) return json({ error: "Project submissions are not configured yet." }, 503);
    const submittedAt = new Date().toISOString();
    const text = ["WORK WITH AQUILA PROJECT SUBMISSION", `Submitted: ${submittedAt}`, `Source: /work-with-aquila`, "", `Name: ${name}`, `Email: ${email}`, `Phone: ${String(input.phone || "Not provided")}`, `Project: ${projectName}`, `Current stage: ${stage}`, "", "What they are building:", description, "", "Requested Aquila help:", requestedHelp, "", "Serious interest confirmed: yes"].join("\n").slice(0, 20000);
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${context.env.RESEND_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ to: [EMAIL_TO], from: EMAIL_FROM, reply_to: email, subject: `Work With Aquila | ${projectName}`, text }) });
    const result = await response.json() as { id?: string; message?: string };
    if (!response.ok || !result.id) return json({ error: result.message || "Unable to submit your project." }, 502);
    return json({ ok: true });
  } catch { return json({ error: "Unable to submit your project right now." }, 500); }
};
