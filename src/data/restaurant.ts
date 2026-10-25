/** Shanti Bhavan Express — Civil Lines, Nagpur.
 *  Prices are transcribed from the restaurant's green printed menu card
 *  (Google listing photo). A 30 Apr 2026 dine-in bill matches that card for
 *  Ghee Masala Dosa ₹130, Sambar Vada ₹80 and Filter Coffee ₹60.
 *  `tableCardPrice` is the older brown table card when it differs.
 *  Do not invent items. Edit this file to update the menu.
 */

export const MAPS_URL = "https://maps.app.goo.gl/ZNkRcpYqJyLHcnX6A";

export const SWIGGY_URL =
  "https://www.swiggy.com/city/nagpur/shri-shanti-bhavan-express-sadar-civil-lines-rest1340160";

export const MAGICPIN_URL =
  "https://magicpin.in/Nagpur/Civil-Lines/Restaurant/Shanti-Bhavan-Express/store/4468aaa";

export const PHONE_DISPLAY = "+91 86690 37853";
export const PHONE_TEL = "+918669037853";

export const restaurant = {
  name: "Shanti Bhavan Express",
  tagline: "South Indian cafe · Civil Lines, Nagpur",
  cuisine: "South Indian",
  addressLines: [
    "Shop No. 42, VCA Shopping Complex",
    "Civil Lines, Nagpur, Maharashtra 440001",
  ],
  streetAddress: "Shop No. 42, VCA Shopping Complex",
  locality: "Civil Lines",
  city: "Nagpur",
  region: "Maharashtra",
  postalCode: "440001",
  /** Indexed from the Google listing via the outlet's Magicpin profile. */
  hours: {
    label: "Open daily",
    opens: "8:30 AM",
    closes: "9:40 PM",
    schemaOpens: "08:30",
    schemaCloses: "21:40",
    source: "Google listing",
  },
  /** Magicpin, attributed to Google. Not a first-party review set. */
  googleRating: { value: 4.7, count: 62 },
  /** Magicpin listing only. */
  costForTwo: 800,
  geo: { lat: 21.1577834, lng: 79.0760911 },
  mapsUrl: MAPS_URL,
  phoneDisplay: PHONE_DISPLAY,
  phoneTel: PHONE_TEL,
  swiggyUrl: SWIGGY_URL,
  magicpinUrl: MAGICPIN_URL,
} as const;

export type CategoryId = "dosa" | "snacks" | "uttapam" | "beverages";

export type MenuItem = {
  id: string;
  name: string;
  category: CategoryId;
  /** Green printed menu (aligned with the 30 Apr 2026 bill where checked). */
  price: number;
  /** Brown table card, only when it differs. */
  tableCardPrice?: number;
  description: string;
  image?: string;
  /** outlet = photographed at this restaurant. representative = not this outlet. */
  imageKind?: "outlet" | "representative";
  aliases?: string[];
};

export const categories: { id: CategoryId | "all"; label: string; image?: string; blurb: string }[] = [
  {
    id: "all",
    label: "All items",
    blurb: "The full printed menu",
  },
  {
    id: "dosa",
    label: "Dosas",
    image: "/photos/dosa-roll.jpg",
    blurb: "Ghee, benne, podi, garlic and cheese",
  },
  {
    id: "snacks",
    label: "Snacks",
    image: "/photos/pakoda.jpg",
    blurb: "Idli, vada, samosa and pakoda",
  },
  {
    id: "uttapam",
    label: "Uttapam",
    image: "/photos/uttapam-mixed.jpg",
    blurb: "Onion, tomato, mixed and cheese",
  },
  {
    id: "beverages",
    label: "Beverages",
    image: "/photos/coffee-representative.jpg",
    blurb: "Filter coffee, chai and Bournvita",
  },
];

export const menu: MenuItem[] = [
  { id: "ghee-plain-dosa", name: "Ghee Plain Dosa", category: "dosa", price: 100, tableCardPrice: 90, description: "Plain dosa finished with ghee." },
  { id: "ghee-masala-dosa", name: "Ghee Masala Dosa", category: "dosa", price: 130, tableCardPrice: 110, description: "Ghee dosa with a potato masala filling." },
  { id: "cheese-plain-dosa", name: "Cheese Plain Dosa", category: "dosa", price: 130, tableCardPrice: 120, description: "Plain dosa with cheese." },
  { id: "cheese-masala-dosa", name: "Cheese Masala Dosa", category: "dosa", price: 150, tableCardPrice: 130, description: "Masala dosa with cheese." },
  { id: "cheese-onion-masala", name: "Cheese Onion Masala", category: "dosa", price: 160, description: "Masala dosa with cheese and onion.", aliases: ["cheese onion masala dosa"] },
  { id: "cheese-garlic-masala", name: "Cheese Garlic Masala", category: "dosa", price: 170, tableCardPrice: 140, description: "Masala dosa with cheese and garlic.", aliases: ["cheese garlic masala dosa"] },
  { id: "ghee-podi-plain", name: "Ghee Podi Plain Dosa", category: "dosa", price: 130, tableCardPrice: 120, description: "Plain dosa with ghee and podi.", image: "/photos/podi-representative.jpg", imageKind: "representative" },
  { id: "ghee-podi-masala", name: "Ghee Podi Masala Dosa", category: "dosa", price: 150, tableCardPrice: 130, description: "Masala dosa with ghee and podi.", image: "/photos/podi-representative.jpg", imageKind: "representative", aliases: ["ghee podi dosa"] },
  { id: "garlic-plain-dosa", name: "Garlic Plain Dosa", category: "dosa", price: 130, tableCardPrice: 120, description: "Plain dosa with garlic." },
  { id: "garlic-masala-dosa", name: "Garlic Masala Dosa", category: "dosa", price: 140, tableCardPrice: 130, description: "Masala dosa with garlic." },
  { id: "benne-dosa", name: "Benne Dosa", category: "dosa", price: 140, description: "Benne dosa. Benne is butter.", image: "/photos/benne-representative.jpg", imageKind: "representative" },
  { id: "benne-masala-dosa", name: "Benne Masala Dosa", category: "dosa", price: 150, tableCardPrice: 140, description: "Benne dosa with a potato masala filling.", image: "/photos/benne-representative.jpg", imageKind: "representative" },
  { id: "benne-podi-plain", name: "Benne Podi Plain", category: "dosa", price: 150, tableCardPrice: 140, description: "Benne dosa with podi.", aliases: ["benne podi plain dosa"] },
  { id: "benne-podi-masala", name: "Benne Podi Masala", category: "dosa", price: 160, tableCardPrice: 150, description: "Benne masala dosa with podi.", aliases: ["benne podi masala dosa"] },
  { id: "benne-garlic-masala", name: "Benne Garlic Masala", category: "dosa", price: 170, tableCardPrice: 150, description: "Benne masala dosa with garlic.", aliases: ["benne garlic masala dosa"] },

  { id: "idli-sambar", name: "Idli-Sambar", category: "snacks", price: 60, description: "Steamed idli served with sambar.", image: "/photos/idli-representative.jpg", imageKind: "representative", aliases: ["idli sambar", "idli"] },
  { id: "butter-idli", name: "Butter Idli", category: "snacks", price: 90, tableCardPrice: 70, description: "Idli finished with butter." },
  { id: "ghee-idli", name: "Ghee Idli", category: "snacks", price: 90, description: "Idli finished with ghee." },
  { id: "thatte-idli", name: "Thatte Idli", category: "snacks", price: 110, description: "Thatte idli, as printed on the menu." },
  { id: "sambar-vada", name: "Sambar Vada", category: "snacks", price: 80, tableCardPrice: 70, description: "Vada served with sambar.", aliases: ["medu vada", "vada"] },
  { id: "samosa", name: "Samosa", category: "snacks", price: 70, description: "Samosa." },
  { id: "dahi-samosa", name: "Dahi Samosa", category: "snacks", price: 80, tableCardPrice: 70, description: "Samosa served with dahi." },
  { id: "pakoda", name: "Pakoda", category: "snacks", price: 70, description: "Pakoda. The older table card lists this item as Rawa Pakoda, at the same price.", image: "/photos/pakoda.jpg", imageKind: "outlet", aliases: ["rawa pakoda", "rava pakoda", "rava pakoda"] },
  { id: "dahi-pakoda", name: "Dahi Pakoda", category: "snacks", price: 80, tableCardPrice: 70, description: "Pakoda served with dahi." },
  { id: "dahi-vada", name: "Dahi Vada", category: "snacks", price: 70, tableCardPrice: 60, description: "Vada served with dahi." },
  { id: "ghee-upma", name: "Ghee Upma", category: "snacks", price: 80, description: "Upma finished with ghee.", aliases: ["upma"] },

  { id: "onion-uttapam", name: "Onion Uttapam", category: "uttapam", price: 130, tableCardPrice: 110, description: "Uttapam topped with onion." },
  { id: "tomato-uttapam", name: "Tomato Uttapam", category: "uttapam", price: 140, tableCardPrice: 120, description: "Uttapam topped with tomato." },
  { id: "mixed-uttapam", name: "Mixed Uttapam", category: "uttapam", price: 150, tableCardPrice: 130, description: "Uttapam with a mixed vegetable topping.", image: "/photos/uttapam-mixed.jpg", imageKind: "outlet" },
  { id: "butter-onion-uttapam", name: "Butter Onion Uttapam", category: "uttapam", price: 150, tableCardPrice: 130, description: "Onion uttapam finished with butter." },
  { id: "butter-tomato-uttapam", name: "Butter Tomato Uttapam", category: "uttapam", price: 160, tableCardPrice: 130, description: "Tomato uttapam finished with butter." },
  { id: "butter-mixed-uttapam", name: "Butter Mixed Uttapam", category: "uttapam", price: 170, tableCardPrice: 140, description: "Mixed uttapam finished with butter." },
  { id: "cheese-mixed-uttapam", name: "Cheese Mixed Uttapam", category: "uttapam", price: 180, description: "Mixed uttapam with cheese. The older table card lists a Cheese Uttapam at ₹160 instead.", image: "/photos/uttapam-cheese.jpg", imageKind: "outlet", aliases: ["cheese uttapam"] },

  { id: "filter-coffee", name: "Filter Coffee", category: "beverages", price: 60, description: "South Indian filter coffee.", image: "/photos/coffee-representative.jpg", imageKind: "representative", aliases: ["coffee", "kaapi"] },
  { id: "black-filter-coffee", name: "Black Filter Coffee", category: "beverages", price: 60, description: "Black filter coffee." },
  { id: "cold-filter-coffee", name: "Cold Filter Coffee", category: "beverages", price: 80, description: "Chilled filter coffee." },
  { id: "hot-bournvita", name: "Hot Bournvita", category: "beverages", price: 60, description: "Hot Bournvita." },
  { id: "cold-bournvita", name: "Cold Bournvita", category: "beverages", price: 70, description: "Cold Bournvita." },
  { id: "masala-chai", name: "Masala Chai", category: "beverages", price: 50, tableCardPrice: 60, description: "Masala chai. The older table card lists this at ₹60." },
  { id: "water-bottle", name: "Water Bottle", category: "beverages", price: 20, description: "Bottled water, as printed. A 500 ml bottle was billed at ₹10 on 30 April 2026 — confirm the size at the counter.", aliases: ["water"] },
];

export const signatureIds = [
  "benne-masala-dosa",
  "ghee-podi-masala",
  "idli-sambar",
  "filter-coffee",
  "mixed-uttapam",
  "cheese-mixed-uttapam",
] as const;

export function formatRupee(amount: number) {
  return `₹${amount}`;
}

export const gallery = [
  {
    src: "/photos/storefront-night.jpg",
    alt: "Night view of the Shanti Bhavan Express storefront on Civil Lines, with the illuminated sign and striped awning.",
    caption: "The Civil Lines storefront",
  },
  {
    src: "/photos/dosa-roll.jpg",
    alt: "A rolled dosa on a steel plate with chutney and sambar, served at Shanti Bhavan Express.",
    caption: "Dosa at the restaurant",
  },
  {
    src: "/photos/uttapam-mixed.jpg",
    alt: "A vegetable uttapam on a steel plate with chutney and sambar at Shanti Bhavan Express.",
    caption: "Uttapam",
  },
  {
    src: "/photos/uttapam-cheese.jpg",
    alt: "Two uttapams, one topped with cheese, served at Shanti Bhavan Express.",
    caption: "Uttapam, with cheese",
  },
  {
    src: "/photos/dosa-plate.jpg",
    alt: "A crisp triangular dosa on a compartment plate with chutney and sambar.",
    caption: "Dosa with chutney and sambar",
  },
  {
    src: "/photos/pakoda.jpg",
    alt: "Two fried snacks with sambar and chutney, served at the restaurant.",
    caption: "Snack plate",
  },
  {
    src: "/photos/seating.jpg",
    alt: "Outdoor tables and chairs in front of Shanti Bhavan Express.",
    caption: "Seating outside the cafe",
  },
  {
    src: "/photos/storefront-day.jpg",
    alt: "Daytime signboard of Shanti Bhavan Express, South Indian cafe, with the flower mark.",
    caption: "Signboard",
  },
  {
    src: "/photos/menu-card.jpg",
    alt: "The green printed menu card of Shanti Bhavan Express showing dosa, snacks, uttapam and beverage prices.",
    caption: "Printed menu card",
  },
] as const;
