import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
  Menu,
  Phone,
  Search,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  categories,
  formatRupee,
  gallery,
  menu,
  restaurant,
  signatureIds,
  type CategoryId,
  type MenuItem,
} from "@/data/restaurant";

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#visit", label: "Contact" },
] as const;

const schema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: restaurant.name,
  servesCuisine: "South Indian",
  telephone: restaurant.phoneTel,
  hasMenu: "#menu",
  address: {
    "@type": "PostalAddress",
    streetAddress: restaurant.streetAddress,
    addressLocality: "Nagpur",
    addressRegion: restaurant.region,
    postalCode: restaurant.postalCode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: restaurant.geo.lat,
    longitude: restaurant.geo.lng,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: restaurant.hours.schemaOpens,
    closes: restaurant.hours.schemaCloses,
  },
  hasMap: restaurant.mapsUrl,
  url: restaurant.mapsUrl,
};

function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="currentColor">
        <ellipse cx="24" cy="8" rx="4.2" ry="7.2" />
        <ellipse cx="24" cy="8" rx="4.2" ry="7.2" transform="rotate(45 24 24)" />
        <ellipse cx="24" cy="8" rx="4.2" ry="7.2" transform="rotate(90 24 24)" />
        <ellipse cx="24" cy="8" rx="4.2" ry="7.2" transform="rotate(135 24 24)" />
      </g>
      <circle cx="24" cy="24" r="5.2" className="fill-saffron" />
      <circle cx="24" cy="24" r="2.2" className="fill-saffron-2" />
    </svg>
  );
}

function Wordmark({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-center gap-3 rounded-md">
      <Mark className={`h-10 w-10 shrink-0 ${light ? "text-ivory" : "text-forest"}`} />
      <span className="leading-none">
        <span className={`block font-serif text-lg tracking-wide ${light ? "text-ivory" : "text-forest"}`}>
          Shanti Bhavan
        </span>
        <span className={`mt-1 block text-xs font-semibold tracking-widest ${light ? "text-ivory-2" : "text-leaf"}`}>
          EXPRESS
        </span>
      </span>
    </a>
  );
}

function VegDot() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-leaf" title="Vegetarian, as printed">
      <span className="inline-grid h-3.5 w-3.5 place-items-center rounded-sm border border-leaf" aria-hidden="true">
        <span className="h-1.5 w-1.5 rounded-full bg-leaf" />
      </span>
      Veg
    </span>
  );
}

function dishAlt(item: MenuItem) {
  if (item.imageKind === "representative") {
    return `Representative photograph of ${item.name}. Not a photo taken at this restaurant.`;
  }
  if (item.imageKind === "outlet") {
    return `${item.name} served at Shanti Bhavan Express.`;
  }
  return item.name;
}

export function HomePage() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const searchId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const signRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightbox === null) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
  }, [lightbox]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return menu.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      const hay = [item.name, item.description, item.category, ...(item.aliases ?? [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [query, category]);

  const signatures = signatureIds
    .map((id) => menu.find((item) => item.id === id))
    .filter((item): item is MenuItem => Boolean(item));

  function scrollSignatures(direction: number) {
    const el = signRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.86, 640), behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-40 border-b transition-colors ${
          scrolled ? "border-line bg-ivory/95 backdrop-blur-sm" : "border-transparent bg-ivory"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Wordmark />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-ink/80 hover:text-forest">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <a
              href={`tel:${restaurant.phoneTel}`}
              className="inline-flex h-11 items-center gap-2 rounded-pill border border-line bg-paper px-4 text-sm font-medium"
            >
              <Phone className="h-4 w-4 text-forest" aria-hidden="true" />
              {restaurant.phoneDisplay}
            </a>
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-pill bg-forest px-4 text-sm font-medium text-ivory"
            >
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Get Directions
            </a>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
        {open && (
          <div id="mobile-nav" className="border-t border-line bg-paper lg:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-3" aria-label="Mobile">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="border-b border-line py-4 text-lg"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#menu" onClick={() => setOpen(false)} className="mt-4 inline-flex h-12 items-center justify-center rounded-pill bg-forest text-ivory">
                Explore Our Menu
              </a>
            </nav>
          </div>
        )}
      </header>

      <main id="main">
        <section id="home" className="scroll-mt-24">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-12 lg:py-14">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-widest text-saffron-2">SOUTH INDIAN CAFE · NAGPUR</p>
              <h1 className="mt-3 font-serif text-5xl leading-none text-ink sm:text-6xl">
                South Indian flavours, <span className="italic text-forest">made to savour.</span>
              </h1>
              <p className="mt-5 max-w-md text-muted">
                Dosas, idli, uttapam and filter coffee at Shanti Bhavan Express, Shop No. 42, VCA Shopping Complex,
                Civil Lines. The printed menu is vegetarian.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#menu" className="inline-flex h-12 items-center gap-2 rounded-pill bg-forest px-5 font-medium text-ivory">
                  <UtensilsCrossed className="h-4 w-4" aria-hidden="true" />
                  Explore Our Menu
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-12 items-center gap-2 rounded-pill border border-forest/20 bg-paper px-5 font-medium"
                >
                  <MapPin className="h-4 w-4 text-forest" aria-hidden="true" />
                  Get Directions
                </a>
                <a
                  href={`tel:${restaurant.phoneTel}`}
                  className="inline-flex h-12 items-center gap-2 rounded-pill border border-forest/20 bg-paper px-5 font-medium"
                >
                  <Phone className="h-4 w-4 text-forest" aria-hidden="true" />
                  {restaurant.phoneDisplay}
                </a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                <li>Vegetarian printed menu</li>
                <li>Dine-in</li>
                <li>Civil Lines</li>
                <li>
                  <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="underline decoration-line underline-offset-4">
                    {restaurant.googleRating.value} on Google · {restaurant.googleRating.count} reviews
                  </a>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-7">
              <figure className="relative overflow-hidden rounded-card bg-forest-2 shadow-sm">
                <img
                  src="/photos/dosa-roll.jpg"
                  alt="A rolled dosa with chutney and sambar, served at Shanti Bhavan Express."
                  className="aspect-4/3 w-full object-cover lg:min-h-96"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-pill bg-forest/90 px-4 py-2 font-serif text-lg italic text-ivory">
                  Rolled dosa
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section aria-label="Menu categories" className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.filter((item) => item.id !== "all").map((item) => (
              <li key={item.id}>
                <a
                  href="#menu"
                  onClick={() => setCategory(item.id)}
                  className="flex items-center gap-3 rounded-card border border-line bg-paper p-3 hover:border-forest/30"
                >
                  {item.image ? (
                    <img src={item.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                  ) : null}
                  <span>
                    <span className="block font-medium">{item.label}</span>
                    <span className="block text-sm text-muted">{item.blurb}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">
            Beverage and some dosa photographs are representative. Food and storefront photographs are from the restaurant’s public listing.
          </p>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-labelledby="signature-heading">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 id="signature-heading" className="font-serif text-4xl">Our signature dishes</h2>
              <p className="mt-1 text-muted">A few dishes from the printed menu.</p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper" onClick={() => scrollSignatures(-1)} aria-label="Previous dishes">
                <ArrowRight className="h-4 w-4 rotate-180" />
              </button>
              <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper" onClick={() => scrollSignatures(1)} aria-label="Next dishes">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div ref={signRef} className="flex snap-x gap-4 overflow-x-auto pb-2">
            {signatures.map((item) => (
              <article key={item.id} className="w-[78%] shrink-0 snap-start overflow-hidden rounded-card border border-line bg-paper sm:w-[46%] lg:w-[31%]">
                <div className="relative aspect-4/3 bg-ivory-2">
                  {item.image ? (
                    <img src={item.image} alt={dishAlt(item)} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="grid h-full place-items-center font-serif text-forest/70">{item.name}</div>
                  )}
                  {item.imageKind === "representative" && (
                    <span className="absolute bottom-3 left-3 rounded-pill bg-paper/90 px-2 py-1 text-xs text-muted">Representative photo</span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl leading-tight">{item.name}</h3>
                    <VegDot />
                  </div>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                  <p className="mt-4 font-medium tabular-nums">{formatRupee(item.price)}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="menu" className="scroll-mt-24 bg-forest text-ivory" aria-labelledby="menu-heading">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 id="menu-heading" className="font-serif text-4xl">Explore the menu</h2>
                <p className="mt-2 max-w-xl text-ivory/80">
                  {menu.length} items from the printed card. Prices in rupees. A 30 April 2026 dine-in bill matches this card for ghee masala dosa, sambar vada and filter coffee.
                </p>
              </div>
              <form role="search" className="relative w-full lg:max-w-sm" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor={searchId} className="sr-only">Search dishes</label>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
                <input
                  id={searchId}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search dosa, idli, coffee…"
                  className="h-12 w-full rounded-pill border border-ivory/15 bg-paper pr-4 pl-11 text-ink outline-none placeholder:text-muted"
                />
              </form>
            </div>
            <div className="mt-6 flex gap-2 overflow-x-auto pb-1" role="toolbar" aria-label="Filter by category">
              {categories.map((item) => {
                const active = category === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCategory(item.id)}
                    className={`h-11 shrink-0 rounded-pill px-4 text-sm font-medium ${
                      active ? "bg-paper text-forest" : "border border-ivory/25 text-ivory"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6" aria-live="polite">
          <p className="mb-4 text-sm text-muted">
            Showing {results.length} {results.length === 1 ? "dish" : "dishes"}
            {query ? ` for “${query.trim()}”` : ""}. An older brown table card lists some items cheaper — the counter price is the one to trust.
          </p>
          {results.length === 0 ? (
            <div className="rounded-card border border-dashed border-line bg-paper px-6 py-16 text-center">
              <p className="font-serif text-3xl">No dishes match that search.</p>
              <p className="mt-2 text-muted">Try dosa, idli, uttapam or coffee.</p>
              <button
                type="button"
                className="mt-6 inline-flex h-11 items-center rounded-pill bg-forest px-5 text-ivory"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                }}
              >
                Clear search
              </button>
            </div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => (
                <li key={item.id} className="flex gap-4 rounded-card border border-line bg-paper p-4">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-ivory-2">
                    {item.image ? (
                      <img src={item.image} alt={dishAlt(item)} className="h-full w-full object-cover" loading="lazy" />
                    ) : (
                      <div className="grid h-full place-items-center px-2 text-center text-xs font-medium tracking-wide text-forest/70">
                        {categories.find((entry) => entry.id === item.category)?.label}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium leading-snug">{item.name}</h3>
                      <VegDot />
                    </div>
                    <p className="mt-1 text-sm text-muted">{item.description}</p>
                    <p className="mt-2 font-semibold tabular-nums">{formatRupee(item.price)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="about" className="scroll-mt-24 border-t border-line">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
            <img
              src="/photos/storefront-night.jpg"
              alt="Illuminated Shanti Bhavan Express sign above the cafe entrance at night."
              className="aspect-square w-full rounded-card object-cover"
              loading="lazy"
            />
            <div>
              <h2 className="font-serif text-4xl">About Shanti Bhavan Express</h2>
              <p className="mt-4 text-muted">
                Shanti Bhavan Express is a South Indian cafe in the VCA Shopping Complex, Civil Lines, Nagpur.
                The sign reads “South Indian Cafe”. The printed menu covers dosa, idli, vada, uttapam, snacks and filter coffee, and every item on that card is vegetarian.
              </p>
              <p className="mt-3 text-muted">
                Google lists the outlet at {restaurant.googleRating.value} from {restaurant.googleRating.count} reviews.
                Magicpin lists about {formatRupee(restaurant.costForTwo)} for two. A bill dated 30 April 2026 is marked dine-in.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
                {["South Indian cafe", "Vegetarian menu", "Dine-in", "Civil Lines"].map((fact) => (
                  <li key={fact} className="rounded-xl border border-line bg-paper px-3 py-3 font-medium">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="gallery" className="scroll-mt-24 border-t border-line" aria-labelledby="gallery-heading">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <h2 id="gallery-heading" className="font-serif text-4xl">Gallery</h2>
            <p className="mt-2 max-w-2xl text-muted">
              Photographs from the restaurant’s public Google listing. These are pictures of this outlet, not stock scenes.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {gallery.map((photo, index) => (
                <li key={photo.src} className={index === 0 ? "col-span-2 md:col-span-1" : ""}>
                  <button
                    type="button"
                    className="group block w-full overflow-hidden rounded-card text-left"
                    onClick={() => setLightbox(index)}
                  >
                    <img src={photo.src} alt={photo.alt} className="aspect-4/3 w-full object-cover" loading="lazy" />
                    <span className="mt-2 block text-sm text-muted">{photo.caption}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <dialog
            ref={dialogRef}
            className="w-[min(100%,56rem)] max-w-none rounded-card bg-forest-2 p-3 text-ivory backdrop:bg-ink/70"
            onClose={() => setLightbox(null)}
            onClick={(event) => {
              if (event.target === dialogRef.current) setLightbox(null);
            }}
          >
            {lightbox !== null && (
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="px-2 text-sm">{gallery[lightbox].caption}</p>
                  <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-ink" onClick={() => setLightbox(null)} aria-label="Close photo">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <img src={gallery[lightbox].src} alt={gallery[lightbox].alt} className="max-h-[75vh] w-full rounded-xl object-contain" />
                <div className="mt-3 flex justify-between">
                  <button type="button" className="h-11 rounded-pill px-4" onClick={() => setLightbox((index) => (index === null ? 0 : (index + gallery.length - 1) % gallery.length))}>
                    Previous
                  </button>
                  <button type="button" className="h-11 rounded-pill px-4" onClick={() => setLightbox((index) => (index === null ? 0 : (index + 1) % gallery.length))}>
                    Next
                  </button>
                </div>
              </div>
            )}
          </dialog>
        </section>

        <section id="visit" className="scroll-mt-24 border-t border-line bg-paper">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-4xl">Visit us</h2>
              <address className="mt-6 not-italic">
                <p className="flex gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
                  <span>
                    {restaurant.addressLines[0]}
                    <br />
                    {restaurant.addressLines[1]}
                  </span>
                </p>
                <p className="mt-4 flex gap-3">
                  <Phone className="mt-1 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
                  <a href={`tel:${restaurant.phoneTel}`} className="font-medium underline decoration-line underline-offset-4">
                    {restaurant.phoneDisplay}
                  </a>
                </p>
                <p className="mt-4 flex gap-3">
                  <Clock className="mt-1 h-5 w-5 shrink-0 text-forest" aria-hidden="true" />
                  <span>
                    {restaurant.hours.label}, {restaurant.hours.opens} – {restaurant.hours.closes}
                    <span className="mt-1 block text-sm text-muted">Hours as listed on Google. Call to confirm today.</span>
                  </span>
                </p>
              </address>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-pill bg-forest px-5 font-medium text-ivory">
                  Get Directions
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a href={restaurant.swiggyUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center gap-2 rounded-pill border border-line px-5 font-medium">
                  Swiggy listing
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-4 max-w-sm text-sm text-muted">
                Swiggy is linked as the outlet page supplied for this restaurant. Whether delivery is open depends on Swiggy. There is no order cart on this site.
              </p>
            </div>
            <div className="overflow-hidden rounded-card border border-line lg:col-span-3">
              <iframe
                title="Map showing Shanti Bhavan Express, VCA Shopping Complex, Civil Lines, Nagpur"
                src={`https://maps.google.com/maps?q=${restaurant.geo.lat},${restaurant.geo.lng}&z=16&hl=en&output=embed`}
                className="h-80 w-full lg:h-full lg:min-h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-forest-2 pb-24 text-ivory md:pb-0">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <Wordmark light />
            <p className="mt-4 max-w-sm text-sm text-ivory/75">
              {restaurant.addressLines.join(", ")}
            </p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2 text-sm">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-ivory">
                {item.label}
              </a>
            ))}
            <a href="#menu">Menu</a>
          </nav>
          <div className="text-sm text-ivory/80">
            <a href={`tel:${restaurant.phoneTel}`} className="block hover:text-ivory">{restaurant.phoneDisplay}</a>
            <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="mt-2 block hover:text-ivory">
              Google Maps
            </a>
            <a href={restaurant.magicpinUrl} target="_blank" rel="noreferrer" className="mt-2 block hover:text-ivory">
              Magicpin listing
            </a>
          </div>
        </div>
        <div className="border-t border-ivory/15">
          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-ivory/70 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p>© {new Date().getFullYear()} Shanti Bhavan Express. All rights reserved.</p>
            <p>
              Developed by{" "}
              <a href="https://hksofttech.vercel.app" target="_blank" rel="noreferrer" className="underline underline-offset-2">
                HK SoftTech
              </a>
            </p>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-2 backdrop-blur-sm md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <a href="#menu" className="inline-flex h-12 items-center justify-center gap-1 rounded-xl bg-forest text-sm font-medium text-ivory">
            <UtensilsCrossed className="h-4 w-4" aria-hidden="true" /> Menu
          </a>
          <a href={`tel:${restaurant.phoneTel}`} className="inline-flex h-12 items-center justify-center gap-1 rounded-xl border border-line text-sm font-medium">
            <Phone className="h-4 w-4" aria-hidden="true" /> Call
          </a>
          <a href={restaurant.mapsUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-1 rounded-xl border border-line text-sm font-medium">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Directions
          </a>
        </div>
      </div>
    </div>
  );
}
