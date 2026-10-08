import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import Seo from "./Seo";
import {
  ArrowLeft, ArrowRight, Bookmark, Check, Copy, Lightbulb,
  Mail, Menu, Minimize2, Pencil, Plus, Send, Sparkles, Star, Trash2, Upload, X
} from "lucide-react";

type Idea = { id: number; title: string; text: string; category: string; favorite: boolean };
type Notebook = {
  path: string[]; styles: string[]; brainDump: string; why: string; problem: string;
  who: string; current: string; vision: string; partners: string; nextStep: string;
  when: string; roadblocks: string[]; perspective: string; perspectiveAnswers: Record<string, string>; change: string;
  ideas: Idea[]; selected: number[]; termsAcceptedAt?: string;
};

const freshNotebook: Notebook = {
  path: [], styles: [], brainDump: "", why: "", problem: "", who: "", current: "",
  vision: "", partners: "", nextStep: "", when: "", roadblocks: [], perspective: "",
  change: "", perspectiveAnswers: {}, ideas: [], selected: [], termsAcceptedAt: "",
};

const cleanBrainDump = (value: string) => value
  .replace(/\\n(?:Question|Q):\\s*/g, "\n")
  .replace(/\\n(?:Answer|A):\\s*/g, "\n")
  .replace(/\\n/g, "\n");
const xmlEscape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");
const xmlElements = (root: Element, name: string) => Array.from(root.getElementsByTagName("*")).filter((element) => (element.localName || element.nodeName.split(":").pop() || "").toLowerCase() === name.toLowerCase());
const xmlValue = (root: Element, name: string) => xmlElements(root, name)[0]?.textContent || "";
const xmlChildren = (root: Element, parentName: string, childName: string) => {
  const parent = xmlElements(root, parentName)[0];
  return parent ? Array.from(parent.children).filter((element) => element.localName === childName) : [];
};
const htmlEscape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");
const notebookToHtml = (book: Notebook) => {
  const fields = [["My idea", book.brainDump], ["Why it matters", book.why], ["The problem", book.problem], ["Who it helps", book.who], ["Current state", book.current], ["Vision", book.vision], ["Partners", book.partners], ["Next step", book.nextStep], ["When", book.when]];
  const card = (title: string, value: string) => `<section><h2>${htmlEscape(title)}</h2><p>${htmlEscape(value || "Not answered yet.")}</p></section>`;
  const emailBody = fields.map(([title, value]) => `${title}: ${value || "Not answered yet."}`).concat(Object.entries(book.perspectiveAnswers || {}).map(([title, value]) => `${title}: ${value}`)).join("\\n\\n");
  const emailLink = `mailto:hello@letssoartogether.com?subject=${encodeURIComponent("My Let's Soar Together Vision Lab")}&body=${encodeURIComponent(emailBody)}`;
  const xmlSource = htmlEscape(notebookToXml(book));
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Let&apos;s Soar Together — Vision Lab</title><style>body{max-width:900px;margin:0 auto;padding:32px 20px 64px;background:#f7f4ef;color:#17202a;font:16px/1.6 Arial,sans-serif}header{border-bottom:4px solid #173f7a;padding:24px 0;margin-bottom:28px}h1{color:#173f7a}h2{font-size:1rem;color:#9a714f;text-transform:uppercase;letter-spacing:.08em}section{background:#fff;border:1px solid #e5ddd2;border-radius:12px;padding:10px 18px;margin:12px 0}details{margin-top:30px;background:#fff;border:1px solid #e5ddd2;border-radius:12px;padding:14px 18px}summary{cursor:pointer;color:#173f7a;font-weight:bold}pre{overflow:auto;white-space:pre-wrap;font:12px/1.5 monospace;color:#334155}footer{margin-top:30px;border-top:2px solid #d9a98c;padding-top:18px;color:#173f7a;font-weight:bold}@media print{section{break-inside:avoid}}</style></head><body><header style="position:relative"><img src="${new URL(aquilaLogo, window.location.origin).href}" alt="Aquila" style="position:absolute;top:20px;right:0;width:78px;height:78px;object-fit:contain;border-radius:12px"><h1>Let&apos;s Soar Together</h1><div>Discovery Journey · letssoartogether.com · hello@letssoartogether.com</div></header><h1>Vision Lab</h1>${fields.map(([title, value]) => card(title, value)).join("")}${Object.entries(book.perspectiveAnswers || {}).map(([title, value]) => card(title, value)).join("")}<details><summary>View the XML source</summary><pre>${xmlSource}</pre></details><footer>Ready for the next step? · letssoartogether.com<br><a href="${emailLink}" style="display:inline-block;margin-top:14px;padding:10px 16px;border-radius:999px;background:#173f7a;color:#fff;text-decoration:none">Email this Vision Lab to hello@letssoartogether.com</a></footer></body></html>`;
};
const notebookFromXml = (xml: string): Notebook => {
  const parsed = new DOMParser().parseFromString(xml, "application/xml");
  const root = parsed.documentElement;
  const parserErrors = parsed.getElementsByTagName("parsererror");
  if (parserErrors.length || !root) throw new Error("This file could not be read as XML. Please choose the downloaded Vision Lab file.");
  const answers = xmlElements(root, "answers")[0] || root;
  const perspectiveAnswers = Object.fromEntries(xmlChildren(root, "perspectiveAnswers", "perspective").map((item) => [item.getAttribute("name") || "Perspective", item.textContent || ""]));
  const ideas = xmlChildren(root, "ideas", "idea").map((item, index) => ({ id: Date.now() + index, title: xmlValue(item, "title"), text: xmlValue(item, "text"), category: item.getAttribute("category") || "Explore this", favorite: false }));
  return {
    ...freshNotebook,
    brainDump: xmlValue(answers, "brainDump"), why: xmlValue(answers, "why"), problem: xmlValue(answers, "problem"),
    who: xmlValue(answers, "who"), current: xmlValue(answers, "currentState"), vision: xmlValue(answers, "vision"),
    partners: xmlValue(answers, "partners"), nextStep: xmlValue(answers, "nextStep"), when: xmlValue(answers, "when"),
    perspectiveAnswers, perspective: Object.keys(perspectiveAnswers)[0] || "", ideas,
    path: xmlChildren(root, "paths", "item").map((item) => item.textContent || ""),
    styles: xmlChildren(root, "thinkingStyles", "item").map((item) => item.textContent || ""),
    roadblocks: xmlChildren(root, "roadblocks", "item").map((item) => item.textContent || ""),
  };
};
const notebookToXml = (book: Notebook) => {
  const xmlDocument = document.implementation.createDocument(null, "discoveryJourney");
  const root = xmlDocument.documentElement;
  root.setAttribute("version", "1.0");
  const add = (parent: Element, name: string, value = "") => { const element = xmlDocument.createElement(name); element.textContent = value || ""; parent.appendChild(element); return element; };
  const addList = (name: string, values: string[]) => { const group = add(root, name); values.forEach((value) => add(group, "item", value)); };
  const metadata = add(root, "metadata");
  add(metadata, "title", "Let's Soar Together Discovery Journey"); add(metadata, "format", "Vision Lab file"); add(metadata, "website", "https://letssoartogether.com"); add(metadata, "contact", "hello@letssoartogether.com"); add(metadata, "savedAt", new Date().toISOString());
  const answers = add(root, "answers");
  [["brainDump", book.brainDump], ["why", book.why], ["problem", book.problem], ["who", book.who], ["currentState", book.current], ["vision", book.vision], ["partners", book.partners], ["nextStep", book.nextStep], ["when", book.when]].forEach(([name, value]) => add(answers, name, value));
  const perspectiveAnswers = add(answers, "perspectiveAnswers");
  Object.entries(book.perspectiveAnswers || {}).forEach(([name, answer]) => { const perspective = add(perspectiveAnswers, "perspective", answer); perspective.setAttribute("name", name); });
  addList("paths", book.path); addList("thinkingStyles", book.styles); addList("roadblocks", book.roadblocks);
  const ideas = add(root, "ideas");
  book.ideas.forEach((idea) => { const element = add(ideas, "idea"); element.setAttribute("category", idea.category); element.setAttribute("selected", String(book.selected.includes(idea.id))); add(element, "title", idea.title); add(element, "text", idea.text); });
  const serialized = new XMLSerializer().serializeToString(xmlDocument);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
${serialized}`;
  const validation = new DOMParser().parseFromString(xml, "application/xml");
  if (validation.getElementsByTagName("parsererror").length || validation.documentElement.localName !== "discoveryJourney") throw new Error("Unable to create a valid Vision Lab XML file.");
  return xml;
};

const pages = [
  { id: "start", label: "Start here" }, { id: "dump", label: "Brain dump" },
  { id: "why", label: "The why" }, { id: "problem", label: "The problem" },
  { id: "explore", label: "Explore" }, { id: "ideas", label: "Idea wall" },
  { id: "focus", label: "Find focus" }, { id: "vision", label: "Imagine it" },
  { id: "next", label: "Next step" }, { id: "summary", label: "Summary" },
];
const paths = ["I just want help", "I want to dream and build", "I have an idea", "I want to start something", "I want to solve a problem", "I want to improve something", "I have several ideas", "I know what I want but don't know where to start", "I'm not sure yet. Help me brainstorm"];
const styles = [
  ["Big Picture", "I see where I want to go. Help me work backward."], ["Step by Step", "Give me structure and help me figure it out piece by piece."],
  ["Question Me", "Ask me questions until the idea becomes clearer."], ["Rapid Fire", "Give me prompts and let me throw ideas at the page."],
  ["Problem Solver", "Start with the problem and help me find possible solutions."], ["Storyteller", "Let me explain what I'm imagining in my own words."],
  ["Visual Thinker", "Help me organize ideas visually."], ["Dream Mode", "Forget limitations for a minute. Let me imagine what this might become."],
];
const prompts = ["What would surprise you?", "What would make this much simpler?", "Who else might see this differently?", "What are you not saying yet?", "How might we make this ten times bigger?", "What would you try with only $100?", "How might we remove the biggest obstacle?"];
const promptForAction = (action: string) => {
  if (action === "Give me another angle") return "Who else might see this differently, and what would they notice first?";
  if (action === "Challenge my thinking") return "What assumption in this idea deserves the strongest challenge?";
  if (action === "Make me think bigger") return "How might we make this ten times bigger?";
  if (action === "Make me simplify it") return "What would make this much simpler?";
  if (action === "What am I missing?") return "What are you not saying yet?";
  if (action === "Give me a crazy question") return "What would you try if the usual rules did not apply?";
  return prompts[Math.floor(Math.random() * prompts.length)];
};
const perspectives = ["The Customer", "The Beginner", "The Expert", "The Skeptic", "The Child", "The Investor", "The Competitor", "The Community", "The Future You"];
const ideaSeeds = [
  "What small detail could make this more useful or memorable?",
  "What would someone say after this helped them?",
  "What is the simplest version you could try today?",
  "What unexpected connection or analogy brings this idea to life?",
  "What would you build if you had to make it playful?",
  "Who could contribute a perspective you have not heard yet?",
];
const roadblocks = ["I don't know where to start", "Money", "Technology", "Time", "Knowledge", "Marketing", "Design", "Finding customers", "Finding partners", "Confidence", "Team", "Too many ideas", "I'm doing this alone", "Something else"];
const categories = ["Love this", "Explore this", "Question", "Problem", "Opportunity", "Needs research", "Later"];
const key = "lets-soar-creative-notebook";

const ProjectNotebook = ({ standalone = false }: { standalone?: boolean }) => {
  const [page, setPage] = useState("start");
  const [book, setBook] = useState<Notebook>(freshNotebook);
  const [draftIdea, setDraftIdea] = useState("");
  const [saved, setSaved] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showContact, setShowContact] = useState(false);
  const [showStuckGuide, setShowStuckGuide] = useState(false);
  const [showXmlViewer, setShowXmlViewer] = useState(false);
  const [printEntireNotebook, setPrintEntireNotebook] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isImmersive, setIsImmersive] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const notebookRef = useRef<HTMLElement>(null);
  const xmlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const open = () => { setIsImmersive(true); setIsRevealed(true); };
    window.addEventListener("open-vision-lab", open);
    return () => window.removeEventListener("open-vision-lab", open);
  }, []);
  useEffect(() => {
    document.body.classList.toggle("vision-lab-open", isImmersive);
    return () => document.body.classList.remove("vision-lab-open");
  }, [isImmersive]);
  useEffect(() => {
    const node = notebookRef.current;
    if (!node || typeof IntersectionObserver === "undefined") { setIsRevealed(true); return; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setIsRevealed(true); observer.disconnect(); } }, { threshold: 0.18 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => { try { const savedBook = localStorage.getItem(key); if (savedBook) { const parsed = JSON.parse(savedBook); setBook({ ...freshNotebook, ...parsed, brainDump: cleanBrainDump(parsed.brainDump || ""), perspectiveAnswers: parsed.perspectiveAnswers || {}, path: Array.isArray(parsed.path) ? parsed.path : parsed.path ? [parsed.path] : [] }); } } catch { /* a clean notebook is a good fallback */ } }, []);
  useEffect(() => { localStorage.setItem(key, JSON.stringify(book)); setSaved(true); const timer = window.setTimeout(() => setSaved(false), 1600); return () => window.clearTimeout(timer); }, [book]);
  const update = (field: keyof Notebook, value: string | string[] | number[] | Idea[] | Record<string, string>) => setBook((current) => ({ ...current, [field]: value }));
  const addQuestion = (question: string) => {
    const cleanQuestion = `${question.replace(/[\\/]/g, "").trim().replace(/[.!?]+$/, "")}?`;
    setPrompt(cleanQuestion);
    setBook((current) => ({ ...current, brainDump: `${current.brainDump.trimEnd()}${current.brainDump.trim() ? "\n\n" : ""}${cleanQuestion}` }));
  };
  const askPrompt = (action: string) => addQuestion(promptForAction(action));
  const clearInformation = () => {
    if (!window.confirm("Clear all written information from this notebook? This cannot be undone.")) return;
    setBook({ ...freshNotebook, path: [], styles: [], roadblocks: [], ideas: [], selected: [], perspectiveAnswers: {} });
    setPrompt("");
  };
  const pageIndex = pages.findIndex((item) => item.id === page);
  const go = (id: string) => { setPage(id); setMenuOpen(false); window.setTimeout(() => document.querySelector(".notebook-stage")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); };
  const next = () => go(pages[Math.min(pageIndex + 1, pages.length - 1)].id);
  const back = () => go(pages[Math.max(pageIndex - 1, 0)].id);
  const saveCard = () => { if (!draftIdea.trim()) return; setBook((current) => ({ ...current, ideas: [...current.ideas, { id: Date.now(), title: draftIdea.trim().split(/[.!?]/)[0].slice(0, 42), text: draftIdea.trim(), category: "Explore this", favorite: false }] })); setDraftIdea(""); };
  const selectedIdeas = useMemo(() => book.ideas.filter((idea) => book.selected.includes(idea.id)), [book.ideas, book.selected]);
  const toggleRoadblock = (item: string) => update("roadblocks", book.roadblocks.includes(item) ? book.roadblocks.filter((x) => x !== item) : [...book.roadblocks, item]);
  const toggleStyle = (item: string) => update("styles", book.styles.includes(item) ? book.styles.filter((x) => x !== item) : [...book.styles, item]);
  const toggleIdea = (id: number) => update("selected", book.selected.includes(id) ? book.selected.filter((x) => x !== id) : [...book.selected, id]);
  const stuck = () => setShowStuckGuide(true);
  const printEntire = () => {
    const previousTitle = document.title;
    document.title = "letssoartogether.com — Discovery Journey";
    setPrintEntireNotebook(true);
    window.setTimeout(() => {
      window.print();
      window.setTimeout(() => { document.title = previousTitle; setPrintEntireNotebook(false); }, 250);
    }, 50);
  };
  const downloadXml = () => {
    const blob = new Blob([notebookToXml(book)], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `letssoartogether-discovery-journey-${new Date().toISOString().slice(0, 10)}.xml`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const viewXml = () => setShowXmlViewer(true);
  const loadXml = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      setBook(notebookFromXml(await file.text()));
      setPrompt("");
      setPage("start");
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Unable to load that Vision Lab file.");
    }
  };
  const updateIdea = (id: number, patch: Partial<Idea>) => update("ideas", book.ideas.map((idea) => idea.id === id ? { ...idea, ...patch } : idea));

  const pageTitle = pages.find((item) => item.id === page)?.label;
  const termsAccepted = Boolean(book.termsAcceptedAt);
  const journey = book.path.includes("I’m in the middle of it") || book.path.includes("I'm in the middle of it")
    ? { dump: ["Regain your momentum", "Get everything out of your head, especially the part that feels stuck."], why: ["What will move this forward?", "Find the reason that makes the next step worth taking."], problem: ["What is blocking the next move?", "Name the friction clearly so it becomes workable."], vision: "Imagine the breakthrough", focus: ["What would create momentum?", "Choose the idea or action most likely to get you moving again."], next: ["Make the next move visible", "Turn the hump into one small, realistic step."] }
    : book.path.includes("I want to dream and build") || book.path.includes("I want to start something")
      ? { dump: ["Give the dream room", "Put the possibility on the page before you worry about making it practical."], why: ["Why is this worth building?", "Follow the energy behind the idea and the people it could help."], problem: ["What could this make possible?", "Look at the need, tension, or opportunity your idea is responding to."], vision: "See what you could build", focus: ["What wants to become real first?", "Choose the idea with the strongest pull and potential."], next: ["Give the dream a first shape", "Choose a small experiment that brings the vision closer."] }
      : { dump: ["Find the thread", "Start wherever you are. We’ll help you make sense of what is already in your head."], why: ["What would help most right now?", "Follow the thread that feels most useful, even if it is not fully clear yet."], problem: ["What needs attention first?", "Name the tension, question, or obstacle without needing to solve it yet."], vision: "Imagine a clearer way forward", focus: ["What deserves your attention now?", "Choose the idea or insight that could create the most clarity."], next: ["Find one workable next step", "Make the path forward feel smaller, clearer, and possible."] };
  const structuredData = standalone ? { "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Vision Lab", description: "A Let’s Soar Together™ experience developed through Aquila Project.", url: "https://letssoartogether.com/vision-lab", publisher: { "@type": "Organization", name: "Aquila Project" }, copyrightHolder: { "@type": "Person", name: "James Bobik" }, copyrightYear: 2026 } : undefined;
  return <section ref={notebookRef} id="project-notebook" className={`creative-notebook ${standalone ? "standalone" : ""} ${isRevealed ? "is-revealed" : ""} ${isImmersive ? "is-immersive" : ""} ${printEntireNotebook ? "print-entire-notebook" : ""}`}>
    <input ref={xmlInputRef} className="sr-only" type="file" accept=".xml,text/xml,application/xml,*/*" onChange={loadXml} />
    {!termsAccepted && <div className="fixed inset-0 z-[120] flex items-center justify-center bg-foreground/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="terms-ack-title"><div className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-2xl md:p-8"><p className="eyebrow">Before you begin</p><h2 id="terms-ack-title" className="mt-2 font-display text-3xl font-bold">YOUR VISION IS YOURS</h2><p className="mt-4 text-lg font-semibold">Your ideas belong to you.</p><p className="mt-2 text-muted-foreground">Let&apos;s Soar Together helps you organize, clarify, and develop your vision. Aquila does not claim ownership of the original ideas you create or submit through Vision Lab.</p><a className="mt-4 inline-flex font-semibold text-primary underline" href="/terms">View Terms of Use</a><label className="mt-6 flex min-h-12 cursor-pointer items-start gap-3 text-base"><input type="checkbox" checked={termsChecked} onChange={(event) => setTermsChecked(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-primary" /> <span>I agree to the Terms of Use and understand how my ideas and information are handled.</span></label><button type="button" disabled={!termsChecked} onClick={() => setBook((current) => ({ ...current, termsAcceptedAt: new Date().toISOString() }))} className="mt-6 w-full rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Continue to Vision Lab</button></div></div>}
    {standalone && <Seo title="Vision Lab | Let’s Soar Together™" description="Vision Lab, a Let’s Soar Together™ experience developed through Aquila Project." path="/vision-lab" structuredData={structuredData} />}
    {standalone && <h1 className="sr-only">Vision Lab | Let&apos;s Soar Together™</h1>}
    <div className="notebook-wrap">
      <header className="notebook-header">
        <div className="notebook-brand"><span className="notebook-mark"><BookIcon /></span><div><span className="eyebrow">Vision Lab · Project Notebook</span><strong>Your ideas, in progress.</strong></div></div>
        <div className="notebook-status">{standalone && <a className="return-to-site" href="/">← Back to site</a>}<a className="return-to-site" href="/work-with-aquila">Work With Aquila</a><span className={`save-dot ${saved ? "is-saving" : ""}`} /> {saved ? "Saved privately" : "Saved on this device"} <button className="immersive-close" onClick={() => setIsImmersive(false)} aria-label="Close Vision Lab"><Minimize2 size={17} /><span>Exit Vision Lab</span></button><button className="notebook-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open notebook pages"><Menu size={18} /></button></div>
      </header>
      {menuOpen && <nav className="notebook-menu-panel">{pages.map((item, index) => <button key={item.id} className={item.id === page ? "active" : ""} onClick={() => go(item.id)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</button>)}<details className="advanced-file-tools"><summary>Advanced file tools</summary><button className="download-xml-sidebar" onClick={() => { downloadXml(); setMenuOpen(false); }}>Download Vision Lab file (XML)</button><button className="download-xml-sidebar" onClick={() => { viewXml(); setMenuOpen(false); }}>View Vision Lab file (XML)</button><button className="download-xml-sidebar" onClick={() => { xmlInputRef.current?.click(); setMenuOpen(false); }}><Upload size={14} /> Load Vision Lab file</button></details></nav>}
      <div className="notebook-progress"><div style={{ width: `${Math.max(8, ((pageIndex + 1) / pages.length) * 100)}%` }} /></div>
      <nav className="journey-progress-pages" aria-label="Discovery Journey progress">{pages.map((item, index) => <button key={item.id} className={item.id === page ? "active" : index < pageIndex ? "complete" : ""} onClick={() => go(item.id)} aria-label={index === pages.length - 1 ? "Summary and conclusion, Page 10" : `${item.label}, Page ${index + 1}`} title={index === pages.length - 1 ? "Summary and conclusion" : item.label}><span>{index + 1}</span></button>)}</nav>

      <div className="notebook-layout">
        <aside className="notebook-sidebar"><div className="side-label">Your pages</div>{pages.map((item, index) => <button key={item.id} onClick={() => go(item.id)} className={item.id === page ? "active" : ""}><span>{index < pageIndex ? <Check size={13} /> : String(index + 1).padStart(2, "0")}</span>{item.label}</button>)}<details className="advanced-file-tools"><summary>Advanced file tools</summary><button className="download-xml-sidebar" onClick={downloadXml}>Download Vision Lab file (XML)</button><button className="download-xml-sidebar" onClick={viewXml}>View Vision Lab file (XML)</button><button className="download-xml-sidebar" onClick={() => xmlInputRef.current?.click()}><Upload size={14} /> Load Vision Lab file</button></details><div className="private-note"><Bookmark size={15} /><strong>Private by default</strong><small>Your notebook stays on this device unless you choose to share it.</small></div></aside>
        <main className="notebook-stage">
          {page !== "summary" && <div className="answer-guidance"><Sparkles size={14} /><span><strong>Helpful hint:</strong> Your answer becomes one line in your final mission statement. A few honest words are enough—“I’m not sure yet” is a useful answer too.</span></div>}
          <div className="page-kicker"><span>Page {String(pageIndex + 1).padStart(2, "0")}</span><span>{pageTitle}</span></div>
          {page === "start" && <StartPage book={book} update={update} go={go} />}
          {page === "dump" && <><PageIntro eyebrow={journey.dump[0]} title="Brain Dump" text={journey.dump[1]} /><div className="dont-judge"><Sparkles size={16} /> Don&apos;t judge the idea yet. Put it on the page first.</div><div className="answer-guidance"><Sparkles size={14} /><span><strong>Start anywhere.</strong> A word, feeling, question, or unfinished thought is enough.</span></div><div className="idea-seeds"><div className="idea-seeds-heading"><Lightbulb size={16} /><strong>Need a spark?</strong><span>Choose any question to add it to your brain dump.</span></div><div className="idea-seeds-list">{ideaSeeds.slice(0, 4).map((seed) => <button key={seed} onClick={() => addQuestion(seed)}><Lightbulb size={14} />{seed}</button>)}</div></div>{prompt && <div className="prompt-card"><Sparkles size={17} /><span>{prompt}</span><button onClick={() => setPrompt("")} aria-label="Close current question"><X size={15} /></button></div>}<div className="brain-dump-toolbar"><span>Everything you write is saved privately in this notebook.</span><button className="clear-information" onClick={clearInformation} type="button"><Trash2 size={15} /> Clear information</button></div><textarea aria-label="Your brain dump" className="notebook-writing huge" value={book.brainDump} onChange={(e) => update("brainDump", e.target.value)} placeholder="Write anything here. It does not need to be finished or perfect..." /><div className="prompt-actions"><span className="prompt-actions-label">Want another way in?</span>{["Ask me a question", "Give me another angle", "Help me simplify it", "Make it bigger"].map((item) => <button key={item} onClick={() => askPrompt(item)}>{item}</button>)}</div><div className="card-capture"><div><span className="eyebrow">See something worth keeping?</span><strong>Save a thought to your Idea Wall</strong></div><div className="inline-capture"><input value={draftIdea} onChange={(e) => setDraftIdea(e.target.value)} placeholder="A thought worth remembering..." /><button onClick={saveCard}><Plus size={16} /> Save idea</button></div></div></>}
          {page === "why" && <><PageIntro eyebrow="Follow the energy" title={journey.why[0]} text={journey.why[1]} /><Question label="What made you think about it in the first place?" value={book.why} onChange={(v) => update("why", v)} /><Question label="Who would this help?" value={book.who} onChange={(v) => update("who", v)} /><Question label="If this worked exactly the way you imagine, what would change?" value={book.current} onChange={(v) => update("current", v)} /></>}
          {page === "problem" && <><PageIntro eyebrow="Look a little closer" title={journey.problem[0]} text={journey.problem[1]} /><Question label="What problem are you trying to solve?" value={book.problem} onChange={(v) => update("problem", v)} /><Question label="How are people solving it now, and what frustrates you about that?" value={book.change} onChange={(v) => update("change", v)} /><div className="why-box"><strong>Try the Five Whys</strong><p>Choose something you wrote, then ask: <em>Why does that matter?</em> Keep going only while it helps.</p><button className="text-button" onClick={() => setPrompt("Why does that matter?")}>Start with a why <ArrowRight size={15} /></button></div></>}
          {page === "explore" && <ExplorePage book={book} update={update} perspectives={perspectives} />}
          {page === "ideas" && <IdeasPage book={book} draftIdea={draftIdea} setDraftIdea={setDraftIdea} saveCard={saveCard} updateIdea={updateIdea} toggleIdea={toggleIdea} />}
          {page === "focus" && <><PageIntro eyebrow="A little clarity, when you're ready" title={journey.focus[0]} text={journey.focus[1]} />{book.ideas.length === 0 ? <EmptyIdeas onClick={() => go("dump")} /> : <div className="idea-grid">{book.ideas.map((idea) => <button key={idea.id} className={`focus-card ${book.selected.includes(idea.id) ? "chosen" : ""}`} onClick={() => toggleIdea(idea.id)}><span>{book.selected.includes(idea.id) ? <Check size={15} /> : <span className="circle" />}</span><strong>{idea.title}</strong><p>{idea.text}</p></button>)}</div>} {selectedIdeas.length > 0 && <div className="selected-reflection"><span className="eyebrow">For the ideas you've picked</span><Question label="What is the smallest version you could start with?" value={book.nextStep} onChange={(v) => update("nextStep", v)} compact /><Question label="What is the biggest unknown?" value={book.change} onChange={(v) => update("change", v)} compact /></div>}</>}
          {page === "vision" && <><PageIntro eyebrow="Let yourself see it" title={journey.vision} text="It is three years from now and this worked. What happened?" /><Question label="What does it look like? Who is involved? Who did it help?" value={book.vision} onChange={(v) => update("vision", v)} large /><div className="sentence-builder"><span className="eyebrow">My idea in one sentence</span><p>I want to <input placeholder="..." /> for <input placeholder="..." /> because <input placeholder="..." />.</p><textarea value={book.current} onChange={(e) => update("current", e.target.value)} placeholder="Rewrite it in your own words if you like..." /></div></>}
          {page === "next" && <><PageIntro eyebrow="Make it yours" title={journey.next[0]} text={journey.next[1]} /><div className="choice-grid">{roadblocks.map((item) => <button key={item} className={book.roadblocks.includes(item) ? "selected" : ""} onClick={() => toggleRoadblock(item)}>{book.roadblocks.includes(item) && <Check size={15} />}{item}</button>)}</div><div className="partnership"><PageIntro eyebrow="You don't have to build alone" title="Who would help this idea grow?" text="What do you already do well? What part would you rather not do yourself?" /><textarea className="notebook-writing" value={book.partners} onChange={(e) => update("partners", e.target.value)} placeholder="A designer, developer, strategist, mentor... or someone who just gets it." /><div className="next-step"><span className="eyebrow">One small step</span><Question label="What is one thing you could do next?" value={book.nextStep} onChange={(v) => update("nextStep", v)} compact /><div className="choice-row">{["Today", "This week", "This month", "I'm still thinking"].map((item) => <button key={item} className={book.when === item ? "selected" : ""} onClick={() => update("when", item)}>{item}</button>)}</div></div></div></>}
          {page === "summary" && <><Summary book={book} onShare={() => { setShowContact(true); }} onPrintEntire={printEntire} onDownloadXml={downloadXml} /><div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-center"><strong className="block font-display text-xl">Ready to build this with Aquila?</strong><a href="/work-with-aquila" className="mt-2 inline-flex min-h-11 items-center font-semibold text-primary">Explore Working With Aquila →</a></div></>}
          {showContact && <ContactPanel onClose={() => setShowContact(false)} book={book} />}
          {showXmlViewer && <div className="xml-viewer-overlay"><div className="xml-viewer-panel"><button className="close-panel" onClick={() => setShowXmlViewer(false)} aria-label="Close Vision Lab viewer"><X size={20} /></button><iframe title="Formatted Vision Lab file" srcDoc={notebookToHtml(book)} /></div></div>}
          {showStuckGuide && <StuckGuide onClose={() => setShowStuckGuide(false)} onSave={(note) => { update("brainDump", note); setShowStuckGuide(false); go("dump"); }} />}
          {page !== "summary" && <div className="notebook-nav" aria-label="Discovery journey navigation"><button onClick={back} disabled={pageIndex === 0}><ArrowLeft size={16} /> {pageIndex === 0 ? "Back" : `Back to ${pages[pageIndex - 1].label}`}</button><span className="journey-step">Step {pageIndex + 1} of {pages.length}</span><button className="stuck" onClick={stuck}><Sparkles size={15} /> I&apos;m stuck</button><button className="next-button" onClick={next}>{pageIndex === pages.length - 1 ? "Finish" : `Next: ${pages[pageIndex + 1].label}`}<ArrowRight size={16} /></button></div>}
        </main>
      </div>
    </div>
    <div className="notebook-legal-footer"><strong>{standalone ? "Vision Lab" : "Project Notebook"}</strong><span>A Let&apos;s Soar Together™ experience developed through Aquila Project.</span><span>© 2026 James Bobik. All rights reserved.</span></div>
  </section>;
};

const BookIcon = () => <span className="book-icon">✦</span>;
const PageIntro = ({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) => <div className="page-intro"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2><p>{text}</p></div>;
const Question = ({ label, value, onChange, large = false, compact = false }: { label: string; value: string; onChange: (value: string) => void; large?: boolean; compact?: boolean }) => <label className={`notebook-question ${large ? "large" : ""} ${compact ? "compact" : ""}`}><span>{label}</span><textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="Write whatever comes to mind..." /></label>;
const StartPage = ({ book, update, go }: { book: Notebook; update: (field: keyof Notebook, value: string | string[] | number[] | Idea[]) => void; go: (id: string) => void }) => <><PageIntro eyebrow="A quiet place to think" title="What's been on your mind?" text="Everyone has ideas. Some have been sitting in your head for days. Others have been there for years. This notebook gives you a place to get them out of your head, explore them, organize them, and decide what you want to do next." /><div className="form-guide"><span className="eyebrow">How this works</span><h3>By the end, you’ll have your own mission statement.</h3><p>Each page asks one gentle question. You can answer with a sentence, a few words, or “I’m not sure yet.” There are no wrong answers—the more honest and specific you are, the more useful your final Mad Lib will feel.</p><div className="form-guide-steps"><span><b>1</b> Get thoughts out</span><span><b>2</b> Notice what matters</span><span><b>3</b> Turn it into direction</span></div></div><div className="start-block"><h3>What would you like to explore today?</h3><p className="helper">Choose as many as feel true. Ideas rarely fit in just one box.</p><div className="path-grid">{paths.map((path) => <button key={path} className={book.path.includes(path) ? "selected" : ""} onClick={() => update("path", book.path.includes(path) ? book.path.filter((item) => item !== path) : [...book.path, path])}>{book.path.includes(path) && <Check size={15} />}{path}</button>)}</div></div><div className="start-block style-block"><h3>How do you like to think?</h3><p className="helper">Choose one or several. This helps shape the prompts that follow.</p><div className="style-list">{styles.map(([title, text]) => <button key={title} className={book.styles.includes(title) ? "selected" : ""} onClick={() => update("styles", book.styles.includes(title) ? book.styles.filter((x) => x !== title) : [...book.styles, title])}><span className="style-check">{book.styles.includes(title) ? <Check size={14} /> : <Lightbulb size={14} />}</span><span><strong>{title}</strong><small>{text}</small></span></button>)}</div><button className="start-cta" onClick={() => go("dump")}>Start with the brain dump <ArrowRight size={17} /></button></div></>;
const ExplorePage = ({ book, update, perspectives }: { book: Notebook; update: (field: keyof Notebook, value: string | string[] | number[] | Idea[] | Record<string, string>) => void; perspectives: string[] }) => <><PageIntro eyebrow="Change the angle" title="Look at it differently" text="Choose any perspective and answer its simple question. Each answer is saved separately and included in your final document." /><div className="perspective-pills">{perspectives.map((item) => <button key={item} className={book.perspective === item ? "selected" : ""} onClick={() => update("perspective", item)}>{item}</button>)}</div><Question label={book.perspective ? `What would ${book.perspective} notice, question, or change?` : "Choose a perspective, then write what it sees."} value={book.perspective ? (book.perspectiveAnswers || {})[book.perspective] || "" : ""} onChange={(v) => { if (book.perspective) update("perspectiveAnswers", { ...(book.perspectiveAnswers || {}), [book.perspective]: v }); }} large /></>;
const IdeasPage = ({ book, draftIdea, setDraftIdea, saveCard, updateIdea, toggleIdea }: { book: Notebook; draftIdea: string; setDraftIdea: (value: string) => void; saveCard: () => void; updateIdea: (id: number, patch: Partial<Idea>) => void; toggleIdea: (id: number) => void }) => <><PageIntro eyebrow="Thoughts worth keeping" title="Your Idea Wall" text="Save individual thoughts as cards. Move them around, notice connections, and let the good ones find you again." /><div className="idea-capture"><input value={draftIdea} onChange={(e) => setDraftIdea(e.target.value)} onKeyDown={(e) => e.key === "Enter" && saveCard()} placeholder="Add an idea card..." /><button onClick={saveCard}><Plus size={16} /> Add card</button></div>{book.ideas.length === 0 ? <EmptyIdeas /> : <div className="idea-wall">{book.ideas.map((idea) => <article className="idea-card" key={idea.id}><div className="idea-card-top"><button onClick={() => updateIdea(idea.id, { favorite: !idea.favorite })} aria-label="Favorite idea"><Star size={17} fill={idea.favorite ? "currentColor" : "none"} /></button><button onClick={() => updateIdea(idea.id, { text: `${idea.text} ` })} aria-label="Edit idea"><Pencil size={15} /></button><button onClick={() => updateIdea(idea.id, { text: "" })} aria-label="Clear idea"><Trash2 size={15} /></button></div><input className="idea-title" value={idea.title} onChange={(e) => updateIdea(idea.id, { title: e.target.value })} /><textarea value={idea.text} onChange={(e) => updateIdea(idea.id, { text: e.target.value })} /><select value={idea.category} onChange={(e) => updateIdea(idea.id, { category: e.target.value })}>{categories.map((category) => <option key={category}>{category}</option>)}</select><button className={`card-select ${book.selected.includes(idea.id) ? "selected" : ""}`} onClick={() => toggleIdea(idea.id)}>{book.selected.includes(idea.id) ? <Check size={14} /> : <Copy size={14} />} {book.selected.includes(idea.id) ? "Picked for focus" : "Pick for focus"}</button></article>)}</div>}</>;
const EmptyIdeas = ({ onClick }: { onClick?: () => void }) => <div className="empty-ideas"><Lightbulb size={28} /><strong>Your wall is waiting.</strong><p>Save a thought from your Brain Dump and it will land here.</p>{onClick && <button onClick={onClick}>Go to Brain Dump <ArrowRight size={15} /></button>}</div>;
const StuckGuide = ({ onClose, onSave }: { onClose: () => void; onSave: (note: string) => void }) => {
  const [step, setStep] = useState(0);
  const [feeling, setFeeling] = useState("");
  const [note, setNote] = useState("");
  const [tinyWin, setTinyWin] = useState("");
  const feelings = ["Too many ideas", "I don't know where to begin", "I'm worried it won't be good enough", "I need more information", "Something else"];
  const finish = () => onSave([feeling && `What feels stuck: ${feeling}`, note && `What I’m carrying: ${note}`, tinyWin && `A tiny next step: ${tinyWin}`].filter(Boolean).join("\n\n"));
  return <div className="stuck-overlay" role="dialog" aria-modal="true" aria-labelledby="stuck-title"><div className="stuck-panel"><button className="close-panel" onClick={onClose} aria-label="Close stuck guide"><X size={20} /></button>{step === 0 && <><span className="eyebrow">You are not behind</span><h2 id="stuck-title">Let’s slow this down together.</h2><p className="stuck-lead">Feeling stuck is useful information, not a personal failure. You do not need a perfect idea today. We’ll make a little room, name what is here, and look for one kind, manageable next step.</p><div className="stuck-breathe"><strong>First, take one gentle breath.</strong><span>In for four · hold for two · out for six</span></div><button className="next-button" onClick={() => setStep(1)}>Okay, let’s begin <ArrowRight size={16} /></button></>}{step === 1 && <><span className="eyebrow">Step 1 of 2</span><h2 id="stuck-title">What kind of stuck feels closest?</h2><p className="stuck-lead">There is no wrong answer. Choosing a starting point helps us be more helpful without judging the idea.</p><div className="stuck-choices">{feelings.map((item) => <button key={item} className={feeling === item ? "selected" : ""} onClick={() => setFeeling(item)}>{item}</button>)}</div><div className="stuck-actions"><button className="back-button" onClick={() => setStep(0)}>Back</button><button className="next-button" disabled={!feeling} onClick={() => setStep(2)}>That’s it <ArrowRight size={16} /></button></div></>}{step === 2 && <><span className="eyebrow">Step 2 of 2</span><h2 id="stuck-title">Put the messy version here.</h2><p className="stuck-lead">Brainstorming is not about sounding smart. It is about getting thoughts out where you can see them. Write in fragments, questions, or contradictions—we’ll make sense of them together.</p><label className="stuck-label" htmlFor="stuck-note">What is on your mind right now?</label><textarea id="stuck-note" className="stuck-textarea" autoFocus value={note} onChange={(e) => setNote(e.target.value)} placeholder="I keep thinking about…" /><label className="stuck-label" htmlFor="stuck-win">What would feel like a tiny win?</label><input id="stuck-win" className="stuck-input" value={tinyWin} onChange={(e) => setTinyWin(e.target.value)} placeholder="Even just…" /><div className="stuck-actions"><button className="back-button" onClick={() => setStep(1)}>Back</button><button className="next-button" disabled={!note.trim()} onClick={finish}>Save this starting point <Check size={16} /></button></div></>}</div></div>;
};
const MissionStatement = ({ book }: { book: Notebook }) => {
  const say = (value: string, fallback: string) => value.trim() || `[${fallback}]`;
  const ideas = book.ideas.map((idea) => idea.title).join(", ");
  return <div className="mission-statement"><span className="eyebrow">Your big-picture story</span><h3>My mission, in my own words</h3><p>I’m exploring <strong>{say(book.path.join(", "), "what I want to explore")}</strong> because <strong>{say(book.why, "why this matters to me")}</strong>.</p><p>The idea taking shape is <strong>{say(book.brainDump, "the idea or thought in my head")}</strong>. It could help <strong>{say(book.who, "the people I want to help")}</strong> with <strong>{say(book.problem, "the problem I want to make better")}</strong>.</p><p>Right now, I’m starting from <strong>{say(book.current, "where I am today")}</strong>. I imagine <strong>{say(book.vision, "what I want this to become")}</strong>, creating <strong>{say(book.change, "the change I hope to make")}</strong>.</p><p>I want to explore <strong>{say(ideas, "the ideas I want to explore")}</strong>, with support from <strong>{say(book.partners, "the people or skills I may need")}</strong>. I may need to work through <strong>{say(book.roadblocks.join(", "), "what might get in the way")}</strong>.</p><p>My best way of thinking is <strong>{say(book.styles.join(", "), "how I want to brainstorm")}</strong>. From the perspective of <strong>{say(book.perspective, "the perspective I want to remember")}</strong>, my first small step is <strong>{say(book.nextStep, "one next step")}</strong> <strong>{say(book.when, "when I want to take it")}</strong>.</p><div className="mission-note"><Sparkles size={16} /> This is not a final answer. It is a kind, useful starting point you can keep revising.</div></div>;
};
const Summary = ({ book, onShare, onPrintEntire, onDownloadXml }: { book: Notebook; onShare: () => void; onPrintEntire: () => void; onDownloadXml: () => void }) => <><div className="print-notebook-heading"><span>Let's Soar Together · Project Notebook</span><strong>My ideas, in progress.</strong><small>Designed with Let's Soar Together · hello@letssoartogether.com · letssoartogether.com<br />Private working notes · {new Date().toLocaleDateString()}</small></div><PageIntro eyebrow="A big Mad Lib for your future" title="Your Notebook Summary" text="You answered the questions one small piece at a time. Here they come together as a clear, human mission statement—not a test, and not a promise to have everything figured out." /><MissionStatement book={book} /><div className="summary-paper"><span className="eyebrow">The building blocks</span><SummaryItem title="My idea" text={book.brainDump || "Still taking shape..."} /><SummaryItem title="Why it matters" text={book.why || "You haven't written this part yet."} /><SummaryItem title="The problem & who it helps" text={[book.problem, book.who].filter(Boolean).join(" — ") || "Still exploring..."} /><SummaryItem title="Ideas I want to explore" text={book.ideas.map((idea) => idea.title).join(", ") || "Your Idea Wall is waiting."} /><SummaryItem title="Different perspectives" text={Object.entries(book.perspectiveAnswers || {}).map(([perspective, answer]) => `${perspective}: ${answer}`).join(" · ") || "Choose perspectives to add your answers."} /><SummaryItem title="What I need" text={book.roadblocks.join(", ") || "Not named yet."} /><SummaryItem title="My first step" text={book.nextStep || "A next step will appear when you're ready."} /></div><div className="full-notebook-print"><div className="print-branding"><strong>Let’s Soar Together</strong><span>Creative strategy, branding &amp; ideas</span><small>hello@letssoartogether.com · letssoartogether.com</small></div><h2>Discovery Journey</h2><p className="full-notebook-subtitle">A clear, thoughtful path from first idea to next step.</p><p className="full-notebook-date">Prepared at letssoartogether.com · {new Date().toLocaleDateString()}</p><MissionStatement book={book} />{[["Where I want to go", book.path.join(", ")], ["How I want to brainstorm", book.styles.join(", ")], ["The idea in my head", book.brainDump], ["Why this matters", book.why], ["The problem I want to improve", book.problem], ["Who I want to help", book.who], ["Where I am today", book.current], ["What I imagine this becoming", book.vision], ["The change I hope to make", book.change], ["People or skills I may need", book.partners], ["What might get in the way", book.roadblocks.join(", ")], ["Perspective I want to remember", book.perspective], ["Perspective answers", Object.entries(book.perspectiveAnswers || {}).map(([perspective, answer]) => `${perspective}: ${answer}`).join(" · ")], ["My next small step", book.nextStep], ["When I want to take it", book.when]].map(([title, text]) => <SummaryItem key={title} title={title} text={text || "Not answered yet."} />)}<SummaryItem title="Ideas I want to explore" text={book.ideas.map((idea) => `${idea.title}: ${idea.text}`).join(" · ") || "Not answered yet."} /><SummaryItem title="Ideas I chose to focus on" text={book.ideas.filter((idea) => book.selected.includes(idea.id)).map((idea) => idea.title).join(", ") || "Not selected yet."} /><div className="print-cta"><strong>Ready for the next step?</strong><span>Let&apos;s turn your thinking into meaningful action.</span><b>hello@letssoartogether.com · letssoartogether.com</b></div></div><div className="summary-actions"><p className="share-encouragement"><strong>Want to keep going?</strong> Share your notebook with Aquila and we can help you turn these thoughts into a real next step. Your information stays private unless you choose to send it.</p><details className="advanced-file-tools"><summary>Advanced file tools</summary><button className="keep-button" onClick={onDownloadXml}><Bookmark size={16} /> Download Vision Lab file (XML)</button><button className="keep-button" onClick={viewXml}><Bookmark size={16} /> View Vision Lab file (XML)</button></details><button className="keep-button" onClick={() => window.print()}><Bookmark size={16} /> Print summary / save as PDF</button><button className="keep-button" onClick={onPrintEntire}><Bookmark size={16} /> Print entire notebook</button><button className="share-button" onClick={onShare}><Send size={16} /> Let's talk about it</button><small className="print-hint">For a clean PDF, turn off “Headers and footers” in your browser’s print settings.</small></div></>;
const SummaryItem = ({ title, text }: { title: string; text: string }) => <div><span>{title}</span><p>{text}</p></div>;
const ContactPanel = ({ onClose, book }: { onClose: () => void; book: Notebook }) => {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferred, setPreferred] = useState("Email");
  const send = async () => {
    setSending(true); setError("");
    try {
      const response = await fetch("/api/send-notebook", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, company, email, phone, preferred, notebook: book, notebookXml: notebookToXml(book) }) });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Unable to send the notebook.");
      setSent(true);
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to send the notebook right now."); }
    finally { setSending(false); }
  };
  return <div className="contact-overlay"><div className="contact-panel"><button className="close-panel" onClick={onClose}><X size={20} /></button>{sent ? <><div className="sent-mark"><Check size={25} /></div><PageIntro eyebrow="Thank you" title="Your notebook is on its way." text="We'll read what you've shared and start a thoughtful conversation." /></> : <><PageIntro eyebrow="If you want a partner" title="Let’s work on this together." text="Your notebook stays yours until you choose to share it. Sending it gives Aquila permission to read what you’ve explored and help you shape a thoughtful next step." /><label>Name<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></label><label>Company <span>(optional)</span><input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company or organization" /></label><label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label><label>Phone <span>(optional)</span><input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="" /></label><label>Preferred way to contact you<select value={preferred} onChange={(e) => setPreferred(e.target.value)}><option>Email</option><option>Phone</option><option>Either is fine</option></select></label>{error && <p className="contact-error">{error}</p>}<button className="send-notebook" onClick={send} disabled={!name || !email || sending}><Mail size={16} /> {sending ? "Sending your notebook…" : "Send my notebook to Aquila"}</button><button className="cancel-share" onClick={onClose}>Keep it for myself</button></>}</div></div>;
};

export default ProjectNotebook;
