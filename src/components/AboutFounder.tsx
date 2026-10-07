import { Cpu, Lightbulb, Trophy } from "lucide-react";

const AboutFounder = () => (
  <section id="about-aquila" className="depth-section py-28">
    <div className="container mx-auto px-6 md:px-12">
      <div className="mx-auto mb-16 max-w-4xl">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">About Aquila</p>
        <h2 className="font-display text-4xl font-bold md:text-6xl">A place for possibility to <span className="text-gradient">take flight.</span></h2>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">Aquila exists because ideas deserve more than a contact form and more than a quick answer. Aquila brings consulting, technology, media, design, and creative problem-solving together so people can move what is in their head toward something real.</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Aquila Consulting supports professional services. Aquila Project builds technology, systems, Vision Lab, Project Notebook, and Let&apos;s Soar Together™. Aquila Media develops stories and content. Together, they create a connected way to think, build, and grow.</p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">Aquila is also developing a platform for people with ADHD and ADD, including highly capable business owners, builders, and strategists who need space to think, organize, create, and turn complex ideas into forward motion.</p>
      </div>
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-primary">The person behind the possibilities</p>
          <h2 className="font-display text-4xl font-bold md:text-6xl">Who is <span className="text-gradient">James Bobik?</span></h2>
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>James Bobik has been building logos, brands, technology, businesses, and solutions since 1995—long before the tools became easy to access. At eighteen, he worked with Port, an organization associated with Toshiba accessories and parts. When someone asked how old he was in a meeting, he answered, “Old enough to work here.” His work has lived in computer stores, retail environments, and products used by people around the world.</p>
          <p>As a marketing director, developer, designer, and builder, James worked with Max Media on the Lutro box and with Sigma Designs on MPEG technology at a time when computers were not yet powerful enough to process video in software alone. The work involved hardware-based video processing, including the ZV/Zoom Video technology era that preceded practical software MPEG processing.</p>
          <p>His work with Kingmax Micro Technology and later Billington Corporation included technology, branding, and a Dell project where he received an award for developing the best process. Related technology later moved through MARGI Systems and into the Apple QuickTime era. That experience—seeing a technical possibility, making it understandable, and moving it into the real world—is part of what became Aquila Project.</p>
        </div>
      </div>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6"><Lightbulb className="mb-5 text-primary" /><h3 className="font-display text-xl font-bold">A visioneer</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Seeing connections, structure, and pathways where an idea may still feel scattered.</p></div>
        <div className="rounded-2xl border border-border bg-card p-6"><Cpu className="mb-5 text-primary" /><h3 className="font-display text-xl font-bold">Technology &amp; design</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Bringing hardware, software, identity, and human needs together into something useful.</p></div>
        <div className="rounded-2xl border border-border bg-card p-6"><Trophy className="mb-5 text-primary" /><h3 className="font-display text-xl font-bold">Built through experience</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Decades of building, learning, failing, rebuilding, and helping ideas move forward.</p></div>
      </div>
    </div>
  </section>
);

export default AboutFounder;
