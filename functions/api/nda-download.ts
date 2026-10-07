interface Env { NDA_BUCKET?: { get: (key: string) => Promise<{ body: ReadableStream; httpEtag?: string; httpMetadata?: { contentType?: string; cacheControl?: string } } | null>; NDA_SESSION_SECRET?: string; }
const key = "aquila-collaboration-nda-v1.pdf";
const decode = (value: string) => { const normalized = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4); const binary = atob(normalized); return Uint8Array.from(binary, (char) => char.charCodeAt(0)); };
const verify = async (value: string, secret: string) => crypto.subtle.verify("HMAC", await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]), decode(value), new TextEncoder().encode(value));
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    if (!context.env.NDA_BUCKET || !context.env.NDA_SESSION_SECRET) return new Response("NDA delivery is not configured.", { status: 503 });
    const cookie = context.request.headers.get("cookie")?.split(";").map((item) => item.trim()).find((item) => item.startsWith("nda_session="))?.slice("nda_session=".length);
    if (!cookie) return new Response("Complete the collaboration request before downloading the NDA.", { status: 403 });
    const [payload, signature] = cookie.split(".");
    if (!payload || !signature || !(await verify(payload, context.env.NDA_SESSION_SECRET))) return new Response("This download session is invalid.", { status: 403 });
    const session = JSON.parse(new TextDecoder().decode(decode(payload))) as { exp?: number; v?: string };
    if (!session.exp || session.exp < Date.now() || session.v !== "aquila-collaboration-nda-v1") return new Response("This download session has expired.", { status: 403 });
    const object = await context.env.NDA_BUCKET.get(key);
    if (!object) return new Response("The NDA document is not available yet.", { status: 404 });
    return new Response(object.body, { headers: { "content-type": "application/pdf", "content-disposition": 'attachment; filename="Aquila-Collaboration-NDA.pdf"', "cache-control": "private, no-store" } });
  } catch { return new Response("Unable to deliver the NDA.", { status: 500 }); }
};
