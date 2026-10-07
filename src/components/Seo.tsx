import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  path: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE_URL = "https://letssoartogether.com";

const Seo = ({ title, description, path, structuredData }: SeoProps) => {
  useEffect(() => {
    document.title = title;
    const canonicalUrl = `${SITE_URL}${path}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", canonicalUrl);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    let jsonLd = document.querySelector<HTMLScriptElement>("script[data-page-structured-data]");
    if (!jsonLd) {
      jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      jsonLd.dataset.pageStructuredData = "true";
      document.head.appendChild(jsonLd);
    }
    jsonLd.textContent = JSON.stringify(structuredData ?? {});
  }, [description, path, structuredData, title]);

  return null;
};

export const aquilaOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aquila",
  founder: { "@type": "Person", name: "James Bobik" },
  description: "Umbrella organization for Aquila Consulting, Aquila Project, Aquila Media, and related initiatives.",
  subOrganization: [
    { "@type": "Organization", name: "Aquila Consulting" },
    { "@type": "Organization", name: "Aquila Project" },
    { "@type": "Organization", name: "Aquila Media" },
  ],
  copyrightHolder: { "@type": "Person", name: "James Bobik" },
  copyrightYear: 2026,
};

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    aquilaOrganization,
    {
      "@type": "WebSite",
      name: "Let’s Soar Together",
      url: SITE_URL,
      publisher: { "@type": "Organization", name: "Aquila Project" },
      copyrightHolder: { "@type": "Person", name: "James Bobik" },
      copyrightYear: 2026,
    },
  ],
};

export default Seo;
