import headphones from "@/assets/hero-headphones.jpg";
import earbuds from "@/assets/product-earbuds.jpg";
import watch from "@/assets/product-watch.jpg";
import keyboard from "@/assets/product-keyboard.jpg";
import vr from "@/assets/product-vr.jpg";
import laptop from "@/assets/product-laptop.jpg";
import camera from "@/assets/product-camera.jpg";
import speaker from "@/assets/product-speaker.jpg";

export type Category = "Audio" | "Wearables" | "Computing" | "Imaging" | "Gaming";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  image: string;
  rating: number;
  reviews: number;
  featured?: boolean;
  badge?: string;
  inStock: boolean;
  specs: { label: string; value: string }[];
}

export const categories: { name: Category; description: string }[] = [
  { name: "Audio", description: "Immersive sound" },
  { name: "Wearables", description: "On-body intelligence" },
  { name: "Computing", description: "Pro-grade power" },
  { name: "Imaging", description: "Capture brilliance" },
  { name: "Gaming", description: "Next-gen play" },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "aurora-pro-headphones",
    name: "Aurora Pro",
    tagline: "Adaptive ANC headphones",
    description:
      "Studio-grade 40mm drivers with adaptive noise cancellation that learns your environment. 60-hour battery, spatial audio, and a magnesium frame milled to perfection.",
    price: 449,
    originalPrice: 549,
    category: "Audio",
    image: headphones,
    rating: 4.9,
    reviews: 2841,
    featured: true,
    badge: "New",
    inStock: true,
    specs: [
      { label: "Battery", value: "60h" },
      { label: "Drivers", value: "40mm" },
      { label: "Weight", value: "248g" },
      { label: "Codec", value: "LDAC / aptX" },
    ],
  },
  {
    id: "p2",
    slug: "pulse-buds",
    name: "Pulse Buds",
    tagline: "Wireless earbuds, redefined",
    description:
      "Tiny titans engineered for clarity. Multi-point pairing, transparency mode, and a charging case that tops up via wireless or USB-C.",
    price: 199,
    category: "Audio",
    image: earbuds,
    rating: 4.7,
    reviews: 1923,
    featured: true,
    inStock: true,
    specs: [
      { label: "Battery", value: "32h" },
      { label: "Drivers", value: "11mm" },
      { label: "IP Rating", value: "IPX5" },
      { label: "Charging", value: "Wireless" },
    ],
  },
  {
    id: "p3",
    slug: "nova-watch",
    name: "Nova Watch",
    tagline: "Always-on AMOLED",
    description:
      "A health platform on your wrist. ECG, SpO2, sleep architecture, and a sapphire-protected display that runs for 14 days.",
    price: 379,
    category: "Wearables",
    image: watch,
    rating: 4.8,
    reviews: 1402,
    featured: true,
    badge: "Best Seller",
    inStock: true,
    specs: [
      { label: "Battery", value: "14d" },
      { label: "Display", value: "AMOLED" },
      { label: "Glass", value: "Sapphire" },
      { label: "Sensors", value: "ECG · SpO2" },
    ],
  },
  {
    id: "p4",
    slug: "lumen-tkl",
    name: "Lumen TKL",
    tagline: "Hot-swappable mechanical",
    description:
      "Aluminium chassis, gasket-mounted plate, and per-key RGB tuned by an in-house artist. Swap switches without soldering.",
    price: 229,
    category: "Gaming",
    image: keyboard,
    rating: 4.9,
    reviews: 3210,
    featured: true,
    inStock: true,
    specs: [
      { label: "Layout", value: "TKL" },
      { label: "Switches", value: "Hot-swap" },
      { label: "Polling", value: "8000Hz" },
      { label: "Backlight", value: "RGB" },
    ],
  },
  {
    id: "p5",
    slug: "vista-vr",
    name: "Vista VR",
    tagline: "Mixed reality headset",
    description:
      "Pancake lenses, 4K per eye, and inside-out tracking with sub-millimeter precision. Built for creators, played by everyone.",
    price: 899,
    category: "Gaming",
    image: vr,
    rating: 4.6,
    reviews: 612,
    badge: "Limited",
    inStock: true,
    specs: [
      { label: "Resolution", value: "4K/eye" },
      { label: "Lenses", value: "Pancake" },
      { label: "Refresh", value: "120Hz" },
      { label: "Tracking", value: "Inside-out" },
    ],
  },
  {
    id: "p6",
    slug: "blade-15-pro",
    name: "Blade 15 Pro",
    tagline: "Carbon-aluminum laptop",
    description:
      "A 14-core CPU, 40-core GPU, and a Liquid Retina display tuned for HDR workflows. Sub-1.4kg, all-day battery.",
    price: 2499,
    originalPrice: 2799,
    category: "Computing",
    image: laptop,
    rating: 4.8,
    reviews: 894,
    inStock: true,
    specs: [
      { label: "CPU", value: "14-core" },
      { label: "GPU", value: "40-core" },
      { label: "RAM", value: "32GB" },
      { label: "Display", value: "Liquid Retina" },
    ],
  },
  {
    id: "p7",
    slug: "lyra-mirrorless",
    name: "Lyra M1",
    tagline: "Full-frame mirrorless",
    description:
      "Stacked 45MP sensor with 30fps continuous shooting and 8K60 ProRes recording. The camera professional shooters reach for first.",
    price: 3299,
    category: "Imaging",
    image: camera,
    rating: 4.9,
    reviews: 421,
    inStock: true,
    specs: [
      { label: "Sensor", value: "45MP FF" },
      { label: "Burst", value: "30fps" },
      { label: "Video", value: "8K60" },
      { label: "Stabilization", value: "8-stop" },
    ],
  },
  {
    id: "p8",
    slug: "echo-cylinder",
    name: "Echo Cylinder",
    tagline: "360° spatial speaker",
    description:
      "Six-driver array with computational audio that maps your room. Hi-Res streaming over Wi-Fi 6E.",
    price: 549,
    category: "Audio",
    image: speaker,
    rating: 4.7,
    reviews: 738,
    inStock: true,
    specs: [
      { label: "Drivers", value: "6x" },
      { label: "Power", value: "200W" },
      { label: "Wi-Fi", value: "6E" },
      { label: "Audio", value: "Hi-Res" },
    ],
  },
];

export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const getFeatured = () => products.filter((p) => p.featured);
export const getRelated = (id: string, category: Category) =>
  products.filter((p) => p.id !== id && p.category === category).slice(0, 4);
