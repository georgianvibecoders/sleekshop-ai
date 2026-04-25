import { Link, useParams } from "react-router-dom";
import { getProductBySlug, getRelated } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart, useWishlist } from "@/store/cart";
import { ArrowLeft, Check, Heart, Minus, Plus, Shield, Star, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import NotFound from "./NotFound";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = slug ? getProductBySlug(slug) : undefined;
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => (product ? s.ids.includes(product.id) : false));
  const [qty, setQty] = useState(1);

  if (!product) return <NotFound />;

  const related = getRelated(product.id, product.category);

  return (
    <div className="container py-10">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-glow scale-90 animate-glow-pulse" />
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-card-elevated border border-border/50">
            <img src={product.image} alt={product.name} width={1024} height={1024} className="h-full w-full object-cover" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-sm text-primary font-medium tracking-wider uppercase">{product.category}</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 leading-tight">{product.name}</h1>
          <p className="text-lg text-muted-foreground mt-2">{product.tagline}</p>

          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-warning text-warning" : "text-muted"}`}
                />
              ))}
              <span className="ml-2 text-sm font-medium">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">{product.reviews.toLocaleString()} reviews</span>
          </div>

          <div className="mt-8 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
                <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-success/15 text-success">
                  Save ${(product.originalPrice - product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {product.specs.map((s) => (
              <div key={s.label} className="rounded-xl border border-border/60 bg-card-elevated/50 p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <p className="font-display font-semibold mt-1">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-border/60 bg-card-elevated">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-11 w-11 flex items-center justify-center hover:text-primary"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-display font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-11 w-11 flex items-center justify-center hover:text-primary"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button
              variant="hero"
              size="lg"
              className="flex-1"
              onClick={() => {
                add(product, qty);
                toast.success(`${qty} × ${product.name} added to cart`);
              }}
            >
              Add to cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-13 w-13"
              onClick={() => {
                toggle(product.id);
                toast.success(wished ? "Removed from wishlist" : "Added to wishlist");
              }}
            >
              <Heart className={`h-4 w-4 ${wished ? "fill-secondary text-secondary" : ""}`} />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-success" /> In stock
            </div>
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-primary" /> Free shipping
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" /> 2-year warranty
            </div>
          </div>
        </motion.div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
