import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart, useWishlist } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.ids.includes(product.id));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.19, 1, 0.22, 1] }}
      className="group relative"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-card-elevated border border-border/50 product-glow">
          <div className="absolute inset-0 bg-gradient-card opacity-60" />
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width={1024}
            height={1024}
            className="relative h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {product.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-gradient-primary text-primary-foreground">
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
              toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
            }}
            aria-label="Toggle wishlist"
            className="absolute top-3 right-3 h-9 w-9 rounded-full glass flex items-center justify-center hover:scale-110 transition"
          >
            <Heart
              className={`h-4 w-4 transition ${wished ? "fill-secondary text-secondary" : "text-foreground"}`}
            />
          </button>
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{product.category}</p>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display font-semibold text-lg leading-tight">{product.name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0 mt-1">
              <Star className="h-3 w-3 fill-warning text-warning" />
              {product.rating}
            </div>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">{product.tagline}</p>
        </div>
      </Link>

      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-bold">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <Button
          size="sm"
          variant="neon"
          onClick={() => {
            add(product);
            toast.success(`${product.name} added to cart`);
          }}
        >
          Add
        </Button>
      </div>
    </motion.div>
  );
};
