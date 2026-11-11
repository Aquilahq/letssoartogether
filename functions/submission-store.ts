interface SubmissionStatement {
  bind(...values: string[]): { run(): Promise<{ success: boolean }> };
}
export interface SubmissionDatabase {
  prepare(sql: string): SubmissionStatement;
}
interface Submission {
  form: string;
  name: string;
  email: string;
  subject: string;
  body: string;
}
export async function storeSubmission(database: SubmissionDatabase | undefined, entry: Submission) {
  if (!database) return null;
  const id = crypto.randomUUID();
  const result = await database.prepare(
    "INSERT INTO submissions (id,received_at,form,name,email,subject,body,source,email_status) VALUES (?,?,?,?,?,?,?,'website','pending')"
  ).bind(id, new Date().toISOString(), entry.form, entry.name.slice(0,200),
    entry.email.slice(0,320), entry.subject.slice(0,500), entry.body).run();
  if (!result.success) throw new Error("Submission could not be saved");
  return id;
}
export async function emailSubmission(
  database: SubmissionDatabase | undefined,
  id: string | null,
  send: () => Promise<boolean>
) {
  let delivered = false;
  try { delivered = await send(); } catch { /* A stored submission remains available in the dashboard. */ }
  if (id && database) {
    try {
      await database.prepare("UPDATE submissions SET email_status=? WHERE id=?")
        .bind(delivered ? "sent" : "failed", id).run();
    } catch (error) {
      console.error("Could not record submission email status", error instanceof Error ? error.name : "Error");
    }
  }
  return delivered;
}
