import { Hero } from "@/components/Hero";
import { CategoryStrip } from "@/components/CategoryStrip";
import { ProductCard } from "@/components/ProductCard";
import { getFeatured } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Truck, RefreshCw, Headphones } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const featured = getFeatured();

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-y border-border/40 bg-card-elevated/30">
        <div className="container py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: "Free shipping", sub: "Orders over $99" },
            { icon: Shield, title: "2-year warranty", sub: "On every device" },
            { icon: RefreshCw, title: "30-day returns", sub: "No questions asked" },
            { icon: Headphones, title: "24/7 support", sub: "Real humans" },
          ].map((f) => (
            <div key={f.title} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <f.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CategoryStrip />

      {/* Featured */}
      <section className="container py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm text-primary font-medium tracking-wider uppercase">Curated</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Featured products</h2>
          </div>
          <Link to="/shop">
            <Button variant="ghost" className="group">
              View all
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border border-border/50 p-12 md:p-20 text-center"
        >
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative">
            <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight max-w-3xl mx-auto">
              Built for the people who <span className="glow-text">notice the details.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
              Every product is chosen by hand. No filler, no compromise — just the gear we'd buy ourselves.
            </p>
            <div className="mt-8">
              <Link to="/shop">
                <Button variant="hero" size="xl">
                  Start shopping
                  <ArrowRight />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Index;
