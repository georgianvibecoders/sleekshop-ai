import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-headphones.jpg";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="container relative pt-20 pb-32 lg:pt-28 lg:pb-40">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-8">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-muted-foreground">New collection — Spring drop</span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight">
              Tech that
              <br />
              <span className="glow-text">moves you</span>
              <br />
              forward.
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
              Curated devices engineered for the obsessed. Studio-grade audio, pro-grade compute, and wearables that actually wear well.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/shop">
                <Button variant="hero" size="xl" className="group">
                  Shop the collection
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/shop?category=Audio">
                <Button variant="glass" size="xl">
                  Explore audio
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-xs text-muted-foreground">
              <div>
                <p className="font-display text-2xl font-bold text-foreground">2.4M+</p>
                <p>Happy customers</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-foreground">4.9★</p>
                <p>Average rating</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="font-display text-2xl font-bold text-foreground">120+</p>
                <p>Premium products</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-glow scale-110 animate-glow-pulse" />
            <div className="relative aspect-square rounded-3xl overflow-hidden">
              <img
                src={hero}
                alt="Aurora Pro headphones"
                width={1536}
                height={1280}
                className="h-full w-full object-cover animate-float"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 max-w-[200px] shadow-elegant"
            >
              <p className="text-xs text-muted-foreground">Featured</p>
              <p className="font-display font-semibold mt-1">Aurora Pro</p>
              <p className="text-sm text-primary font-bold mt-1">$449</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
