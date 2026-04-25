import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { ArrowUpRight } from "lucide-react";

export const CategoryStrip = () => {
  return (
    <section className="container py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-sm text-primary font-medium tracking-wider uppercase">Browse</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Shop by category</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <Link
              to={`/shop?category=${c.name}`}
              className="group block relative h-40 rounded-2xl bg-card-elevated border border-border/50 overflow-hidden p-5 hover:border-primary/50 transition-all hover:shadow-glow"
            >
              <div className="absolute inset-0 bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative h-full flex flex-col justify-between">
                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all self-end" />
                <div>
                  <h3 className="font-display font-semibold">{c.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{c.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
