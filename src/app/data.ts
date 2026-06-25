export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: "pickles" | "pachadies" | "podies" | "fryums" | "combos" | "no-garlic";
  price: number;
  comparePrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  weights: { label: string; price: number }[];
  spiceLevels: string[];
  description: string;
  ingredients: string;
  shelfLife: string;
  bestSeller?: boolean;
  newArrival?: boolean;
  soldOut?: boolean;
  tags: string[];
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  image: string;
  count: number;
};

export type Testimonial = {
  id: string;
  name: string;
  city: string;
  rating: number;
  text: string;
  avatar: string;
  product: string;
};

export const BRAND = {
  name: "Amrutham",
  fullName: "AMRUTHAM PICKLES & SPICES",
  subline: "PICKLES, SPICES & MORE",
  whatsapp: "919999999999",
  announcement: "SMALL BATCH TRADITION · MADE TO ORDER  ·  ",
  instagram: "@amruthampicklesandspices",
  email: "hello@amrutham.in",
  phone: "+91 99999 88888",
};

export const CATEGORIES: Category[] = [
  {
    id: "pickles",
    slug: "pickles",
    name: "Pickles",
    tagline: "Bold, sun-cured, unapologetically Andhra",
    image: "https://images.unsplash.com/photo-1664791461482-79f5deee490f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    count: 14,
  },
  {
    id: "pachadies",
    slug: "pachadies",
    name: "Pachadies",
    tagline: "A gastronomic gourmet experience",
    image: "https://images.unsplash.com/photo-1601702538934-efffab67ab65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    count: 9,
  },
  {
    id: "podies",
    slug: "podies",
    name: "Podies",
    tagline: "Stone-ground flavour in every spoonful",
    image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    count: 11,
  },
  {
    id: "fryums",
    slug: "fryums",
    name: "Fryums",
    tagline: "Sun-dried, crispy & full of tradition",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    count: 6,
  },
  {
    id: "combos",
    slug: "combos",
    name: "Gift / Trial Combos",
    tagline: "Send the taste of Andhra home",
    image: "https://images.unsplash.com/photo-1729698597774-5c9f7aed07d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    count: 7,
  },
  {
    id: "no-garlic",
    slug: "no-garlic",
    name: "No Garlic No Onions",
    tagline: "Pure, sattvic, full of flavour",
    image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80",
    count: 8,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "avakaya-mango-pickle",
    name: "Avakaya Mango Pickle",
    tagline: "The original bold Andhra mango pickle",
    category: "pickles",
    price: 220,
    comparePrice: 260,
    rating: 4.9,
    reviewCount: 342,
    image: "/prod_jar_dark.jpg",
    images: [
      "/prod_jar_dark.jpg",
      "/prod_jar_beige.jpg",
    ],
    weights: [
      { label: "250g", price: 220 },
      { label: "500g", price: 420 },
      { label: "1kg", price: 800 },
    ],
    spiceLevels: ["Medium", "Hot", "Extra Hot"],
    description: "Made from hand-picked raw Totapuri mangoes from Guntur farms, cut into chunky pieces and cured with premium Guntur chilli powder, cold-pressed sesame oil, and Himalayan rock salt. Fermented for 21 days. No preservatives.",
    ingredients: "Raw mango, Guntur chilli powder, Mustard seeds, Rock salt, Cold-pressed sesame oil, Fenugreek, Turmeric, Asafoetida",
    shelfLife: "12 months from manufacture",
    bestSeller: true,
    tags: ["bestseller", "mango", "andhra"],
  },
  {
    id: "2",
    slug: "green-chilly-pachadi",
    name: "Green Chilly Pachadi",
    tagline: "Classic Andhra pachadi with a fiery kick",
    category: "pachadies",
    price: 180,
    rating: 4.8,
    reviewCount: 218,
    image: "/prod_jars_pyramid.jpg",
    images: [
      "/prod_jars_pyramid.jpg",
      "/prod_jar_dark.jpg",
    ],
    weights: [
      { label: "200g", price: 180 },
      { label: "400g", price: 340 },
    ],
    spiceLevels: ["Medium", "Hot"],
    description: "Freshly made green chilly pachadi — smooth, tangy, intensely flavoured. A staple on every Andhra breakfast plate next to idli or dosa.",
    ingredients: "Green chilli, Tamarind, Garlic, Sesame seeds, Mustard, Curry leaves, Salt, Sesame oil",
    shelfLife: "6 months from manufacture",
    bestSeller: true,
    tags: ["bestseller", "pachadi", "andhra"],
  },
  {
    id: "3",
    slug: "kandi-podi",
    name: "The Famous Dhal Podi",
    tagline: "Toor dal gunpowder — the real Andhra breakfast",
    category: "podies",
    price: 180,
    rating: 4.9,
    reviewCount: 412,
    image: "/prod_jar_dark.jpg",
    images: [
      "/prod_jar_dark.jpg",
      "/prod_jars_pyramid.jpg",
    ],
    weights: [
      { label: "100g", price: 180 },
      { label: "200g", price: 320 },
      { label: "500g", price: 720 },
    ],
    spiceLevels: ["Medium", "Hot", "Extra Hot"],
    description: "Stone-ground toor dal podi with roasted red chillies, curry leaves, and garlic. Mix with hot rice and ghee for the quintessential Andhra breakfast experience. No fillers.",
    ingredients: "Toor dal, Red chilli, Garlic, Curry leaves, Cumin, Black pepper, Rock salt, Sesame seeds",
    shelfLife: "6 months from manufacture",
    bestSeller: true,
    tags: ["bestseller", "podi", "dal"],
  },
  {
    id: "4",
    slug: "idly-podi-2",
    name: "Idly Podi 2.0",
    tagline: "No garlic · contains white sesame",
    category: "podies",
    price: 180,
    rating: 4.8,
    reviewCount: 234,
    image: "/prod_jar_beige.jpg",
    images: [
      "/prod_jar_beige.jpg",
      "/prod_jar_dark.jpg",
    ],
    weights: [
      { label: "100g", price: 180 },
      { label: "200g", price: 320 },
    ],
    spiceLevels: ["Mild", "Medium"],
    description: "Our next-generation Idly Podi — no garlic, white sesame base, bright and nutty. Perfect for sattvic households. The crunch will make your mornings.",
    ingredients: "White sesame, Red chilli, Urad dal, Rock salt, Curry leaves, Asafoetida",
    shelfLife: "4 months from manufacture",
    newArrival: true,
    tags: ["no-garlic", "podi", "new"],
  },
  {
    id: "5",
    slug: "spiced-peanut-podi",
    name: "Spiced Peanut Podi",
    tagline: "Contains garlic · rich, nutty, addictive",
    category: "podies",
    price: 199,
    rating: 4.7,
    reviewCount: 167,
    image: "/prod_jar_beige.jpg",
    images: [
      "/prod_jar_beige.jpg",
      "/prod_jar_beige.jpg",
    ],
    weights: [
      { label: "100g", price: 199 },
      { label: "200g", price: 380 },
    ],
    spiceLevels: ["Mild", "Medium", "Hot"],
    description: "Roasted peanuts stone-ground with spices, garlic, and chillies into a robust, coarse podi. Spectacular on dosa or mixed with hot rice and oil.",
    ingredients: "Peanuts, Red chilli, Garlic, Curry leaves, Cumin, Salt, Tamarind",
    shelfLife: "3 months from manufacture",
    newArrival: true,
    tags: ["podi", "peanut", "new"],
  },
  {
    id: "6",
    slug: "sago-fryums",
    name: "Sago Fryums",
    tagline: "Sun-dried, crispy sabudhana wafers",
    category: "fryums",
    price: 120,
    rating: 4.6,
    reviewCount: 89,
    image: "/prod_jar_dark.jpg",
    images: [
      "/prod_jar_dark.jpg",
      "/prod_jar_beige.jpg",
    ],
    weights: [
      { label: "100g", price: 120 },
      { label: "250g", price: 280 },
    ],
    spiceLevels: ["Plain", "Spiced"],
    description: "Traditional tapioca / sabudhana fryums, sun-dried and ready to fry. Crispy, light, and satisfying — a classic Andhra accompaniment.",
    ingredients: "Sabudhana (sago), Rice flour, Salt, Cumin, Green chilli",
    shelfLife: "6 months from manufacture",
    soldOut: false,
    tags: ["fryums", "traditional"],
  },
  {
    id: "7",
    slug: "gods-own-pulihora-mix",
    name: "God's Own Pulihora Mix",
    tagline: "Temple-style tamarind rice spice mix",
    category: "podies",
    price: 160,
    rating: 4.8,
    reviewCount: 145,
    image: "/prod_jars_pyramid.jpg",
    images: [
      "/prod_jars_pyramid.jpg",
      "/prod_jar_dark.jpg",
    ],
    weights: [
      { label: "100g", price: 160 },
      { label: "200g", price: 290 },
    ],
    spiceLevels: ["Medium"],
    description: "Our signature Pulihora spice mix modelled on temple prasadam — balanced, fragrant, and deeply satisfying. Just add cooked rice and tamarind paste.",
    ingredients: "Channa dal, Urad dal, Red chilli, Mustard, Curry leaves, Turmeric, Tamarind, Sesame seeds, Groundnuts",
    shelfLife: "4 months from manufacture",
    newArrival: true,
    tags: ["podi", "pulihora", "new"],
  },
  {
    id: "8",
    slug: "amrutham-essentials-combo",
    name: "Amrutham Essentials Box",
    tagline: "3 bestsellers · 1 keepsake box · zero regrets",
    category: "combos",
    price: 620,
    comparePrice: 699,
    rating: 4.9,
    reviewCount: 523,
    image: "/prod_jar_dark.jpg",
    images: [
      "/prod_jar_dark.jpg",
      "/prod_jar_beige.jpg",
    ],
    weights: [{ label: "Combo Box", price: 620 }],
    spiceLevels: ["Medium", "Hot"],
    description: "Our most-gifted set: Avakaya (250g) + Green Chilly Pachadi (200g) + Dhal Podi (100g), packed in a handcrafted box with a greeting card. Perfect for gifting.",
    ingredients: "Contains: Avakaya 250g, Green Chilly Pachadi 200g, Dhal Podi 100g",
    shelfLife: "See individual products",
    bestSeller: true,
    tags: ["combo", "gifting", "bestseller"],
  },
  {
    id: "9",
    slug: "gongura-pachadi",
    name: "Gongura Pachadi",
    tagline: "Sorrel leaf chutney — tangy, fiery, legendary",
    category: "pachadies",
    price: 200,
    rating: 4.8,
    reviewCount: 287,
    image: "/prod_jar_beige.jpg",
    images: [
      "/prod_jar_beige.jpg",
      "/prod_jars_pyramid.jpg",
    ],
    weights: [
      { label: "200g", price: 200 },
      { label: "400g", price: 380 },
    ],
    spiceLevels: ["Mild", "Medium", "Hot"],
    description: "Freshly harvested red sorrel leaves slow-cooked with premium chilli, garlic, and sesame. A staple on every Andhra dining table.",
    ingredients: "Gongura (sorrel), Red chilli, Garlic, Sesame seeds, Mustard, Curry leaves, Salt, Sesame oil",
    shelfLife: "6 months from manufacture",
    bestSeller: true,
    tags: ["bestseller", "gongura", "pachadi"],
  },
  {
    id: "10",
    slug: "lemon-ginger-pickle",
    name: "Nimboo Adrak Achar",
    tagline: "Sun-kissed lemon meets fiery ginger",
    category: "pickles",
    price: 190,
    rating: 4.6,
    reviewCount: 198,
    image: "/prod_jar_beige.jpg",
    images: [
      "/prod_jar_beige.jpg",
      "/prod_jar_beige.jpg",
    ],
    weights: [
      { label: "250g", price: 190 },
      { label: "500g", price: 360 },
    ],
    spiceLevels: ["Mild", "Medium"],
    description: "Thin-skinned hill lemons salt-cured for 30 days, combined with fresh ginger julienne and whole spices in cold-pressed groundnut oil.",
    ingredients: "Lemon, Ginger, Green chilli, Mustard seeds, Turmeric, Rock salt, Groundnut oil, Asafoetida",
    shelfLife: "12 months from manufacture",
    bestSeller: true,
    tags: ["pickle", "lemon", "digestive"],
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    name: "Priya Ramachandran",
    city: "Chennai, TN",
    rating: 5,
    text: "Been searching for this taste since I left Vizag 15 years ago. The Avakaya brought back my grandmother's kitchen in one bite. Shipping to Singapore was quick and beautifully packed.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    product: "Avakaya Mango Pickle",
  },
  {
    id: "2",
    name: "Kiran Reddy",
    city: "Hyderabad, TS",
    rating: 5,
    text: "I order the Dhal Podi every month without fail. Mixed with ghee on hot rice — I could eat a whole pot. The stone-ground texture is incomparable to store-bought.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    product: "The Famous Dhal Podi",
  },
  {
    id: "3",
    name: "Ananya Krishnamurthy",
    city: "Bangalore, KA",
    rating: 5,
    text: "Gifted the Essentials Box to my colleagues and they absolutely loved it. Beautiful packaging, and the products are genuinely top-notch. Will order again.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    product: "Amrutham Essentials Box",
  },
  {
    id: "4",
    name: "Suresh Babu",
    city: "Dubai, UAE",
    rating: 5,
    text: "The Gongura Pachadi is unlike anything I've tasted outside Andhra Pradesh. Fast international shipping, arrived in perfect condition.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    product: "Gongura Pachadi",
  },
  {
    id: "5",
    name: "Lakshmi Devi",
    city: "Mumbai, MH",
    rating: 5,
    text: "Moved from Nellore 20 years ago. The Green Chilly Pachadi is EXACTLY what I remember from home. My husband literally teared up.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80&q=80",
    product: "Green Chilly Pachadi",
  },
];

export const INSTAGRAM_POSTS = [
  { id: "1", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", likes: 1247 },
  { id: "2", image: "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", likes: 832 },
  { id: "3", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", likes: 2103 },
  { id: "4", image: "https://images.unsplash.com/photo-1506368249639-73a05d6f6488?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", likes: 956 },
  { id: "5", image: "https://images.unsplash.com/photo-1664791461482-79f5deee490f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", likes: 1789 },
  { id: "6", image: "https://images.unsplash.com/photo-1729698597774-5c9f7aed07d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80", likes: 643 },
];

export const HERO_SLIDES = [
  {
    id: "1",
    image: "/hero_slide_pickles.jpg",
    eyebrow: "Taste of Andhra in Every Bite",
    headline: "Pickles",
    subhead: "Sun-cured, stone-ground, unapologetically bold",
    cta: "Explore Pickles",
    ctaLink: "/collections/pickles",
  },
  {
    id: "2",
    image: "/hero_slide_podies.jpg",
    eyebrow: "Zero Preservatives · 100% Natural",
    headline: "Podies",
    subhead: "Stone-ground flavour in every spoonful",
    cta: "Shop Podies",
    ctaLink: "/collections/podies",
  },
  {
    id: "3",
    image: "/hero_slide_pachadies.jpg",
    eyebrow: "Small Batch · Made to Order",
    headline: "Pachadies",
    subhead: "A Gastronomic Gourmet Experience",
    cta: "Shop Now",
    ctaLink: "/collections/pachadies",
  },
];

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Pickles", href: "/collections/pickles" },
  { label: "Pachadies", href: "/collections/pachadies" },
  { label: "Podies", href: "/collections/podies" },
  { label: "Fryums", href: "/collections/fryums" },
  { label: "Gift / Trial Combos", href: "/collections/combos" },
  { label: "No Garlic No Onions", href: "/collections/no-garlic" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faq" },
];

export const TRENDING_SEARCHES = ["pickles", "podies", "pachadies", "fryums", "combos", "avakaya", "gongura"];

/** Chips shown in the Search panel "TRENDING NOW" row.
 *  href maps to the existing /collections/:category routes. */
export const TRENDING_CHIPS = [
  { label: "Pickles",   href: "/collections/pickles" },
  { label: "Podies",    href: "/collections/podies" },
  { label: "Pachadies", href: "/collections/pachadies" },
  { label: "Fryums",    href: "/collections/fryums" },
  { label: "Combos",    href: "/collections/combos" },
  { label: "Specials",  href: "/collections/no-garlic" },
] as const;

/** Popular products surfaced in the search panel — top 6 best-sellers. */
export const POPULAR_PRODUCTS = PRODUCTS.filter((p) => p.bestSeller).slice(0, 6);

