import { Link } from "react-router-dom";
import { useCart } from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const Cart = () => {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const subtotal = useCart((s) => s.subtotal());
  const shipping = subtotal > 99 || subtotal === 0 ? 0 : 12;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container py-32 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-card-elevated mb-6">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2">Start exploring our collection.</p>
        <Link to="/shop">
          <Button variant="hero" size="lg" className="mt-8">
            Browse products
            <ArrowRight />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="font-display text-4xl md:text-5xl font-bold">Cart</h1>
      <p className="text-muted-foreground mt-2">{items.length} item(s)</p>

      <div className="grid lg:grid-cols-[1fr_380px] gap-10 mt-10">
        <ul className="space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.li
                key={item.product.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 p-4 rounded-2xl border border-border/60 bg-card-elevated/40"
              >
                <Link to={`/product/${item.product.slug}`} className="shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-24 w-24 rounded-xl object-cover bg-card"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="font-display font-semibold hover:text-primary transition"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.product.tagline}</p>
                  <p className="font-display font-bold mt-2">
                    ${(item.product.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => {
                      remove(item.product.id);
                      toast.success("Removed");
                    }}
                    className="text-muted-foreground hover:text-destructive transition"
                    aria-label="Remove"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="flex items-center rounded-lg border border-border/60">
                    <button
                      onClick={() => setQty(item.product.id, item.quantity - 1)}
                      className="h-8 w-8 flex items-center justify-center hover:text-primary"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => setQty(item.product.id, item.quantity + 1)}
                      className="h-8 w-8 flex items-center justify-center hover:text-primary"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <aside className="rounded-2xl border border-border/60 bg-card-elevated/50 p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl font-bold">Order summary</h2>
          <dl className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium">${subtotal.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium">{shipping === 0 ? "Free" : `$${shipping}`}</dd>
            </div>
            <div className="border-t border-border/60 pt-3 flex justify-between">
              <dt className="font-display font-semibold">Total</dt>
              <dd className="font-display text-xl font-bold">${total.toLocaleString()}</dd>
            </div>
          </dl>
          <Button
            variant="hero"
            size="lg"
            className="w-full mt-6"
            onClick={() => toast.info("Checkout coming soon — connect Lovable Cloud + Stripe to enable.")}
          >
            Checkout
            <ArrowRight />
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Secure checkout. Free returns within 30 days.
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
