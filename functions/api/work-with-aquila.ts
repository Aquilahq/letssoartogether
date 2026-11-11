import { emailSubmission, storeSubmission, type SubmissionDatabase } from "../submission-store.ts";
interface Env { RESEND_API_KEY?: string; SOAR_SUBMISSIONS?: SubmissionDatabase; }
const EMAIL_FROM = "Let's Soar Together <hello@letssoartogether.com>";
const EMAIL_TO = "hello@letssoartogether.com";
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const input = await context.request.json() as Record<string, unknown>;
    const name = String(input.name || "").trim(); const email = String(input.email || "").trim(); const projectName = String(input.projectName || "").trim(); const description = String(input.description || "").trim(); const requestedHelp = String(input.requestedHelp || "").trim(); const stage = String(input.stage || "").trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !projectName || !description || !requestedHelp || !stage || input.seriousInterest !== true) return json({ error: "Please complete the required fields and confirmation." }, 400);
    if (!context.env.RESEND_API_KEY && !context.env.SOAR_SUBMISSIONS) return json({ error: "Project submissions are not configured yet." }, 503);
    const submittedAt = new Date().toISOString();
    const text = ["WORK WITH AQUILA PROJECT SUBMISSION", `Submitted: ${submittedAt}`, `Origin: Work With Aquila page`, "",   `Name: ${name}`, `Email: ${email}`, `Phone: ${String(input.phone || "Not provided")}`, `Project: ${projectName}`, `Current stage: ${stage}`, "", "What they are building:", description, "", "Requested Aquila help:", requestedHelp, "", "Serious interest confirmed: yes"].join("\n").slice(0, 20000);
    const subject = `Work With Aquila | From: Work With Aquila page | ${projectName}`;
    const database = context.env.SOAR_SUBMISSIONS;
    const id = await storeSubmission(database, { form: "Work With Aquila", name, email, subject, body: text });
    const delivered = await emailSubmission(database, id, async () => {
      if (!context.env.RESEND_API_KEY) return false;
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST", signal: AbortSignal.timeout(10000),
        headers: { Authorization: `Bearer ${context.env.RESEND_API_KEY}`, "content-type": "application/json" },
        body: JSON.stringify({ to: [EMAIL_TO], from: EMAIL_FROM, reply_to: email, subject, text })
      });
      const result = await response.json() as { id?: string };
      return response.ok && Boolean(result.id);
    });
    if (!id && !delivered) return json({ error: "Unable to submit your project right now." }, 502);
    return json({ ok: true });
  } catch { return json({ error: "Unable to submit your project right now." }, 500); }
};
