import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { RevealObserver } from "@/components/RevealObserver";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { About } from "@/components/sections/About";
import { Contacts } from "@/components/sections/Contacts";
import { Documents } from "@/components/sections/Documents";
import { Food } from "@/components/sections/Food";
import { Gallery } from "@/components/sections/Gallery";
import { Groups } from "@/components/sections/Groups";
import { Hero } from "@/components/sections/Hero";
import { site, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ChildCare",
  name: "Детский ясли-сад «Алёнушка»",
  legalName: site.legalName,
  url: SITE_URL,
  telephone: site.phones.map((p) => p.e164),
  sameAs: [site.instagram.url],
  openingHours: "07:30-18:00",
  address: {
    "@type": "PostalAddress",
    streetAddress: "улица Самұрық, 57",
    addressLocality: "село Өрікті",
    addressRegion: "Алматинская область, Енбекшиказахский район",
    addressCountry: "KZ",
  },
};

export default function Home() {
  return (
    <>
      <div id="top" />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <About />
        <Groups />
        <Food />
        <Gallery />
        <Documents />
        <Contacts />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
