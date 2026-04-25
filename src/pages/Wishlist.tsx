import { Link } from "react-router-dom";
import { useWishlist } from "@/store/cart";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Wishlist = () => {
  const ids = useWishlist((s) => s.ids);
  const items = products.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="container py-32 text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-card-elevated mb-6">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl font-bold">Your wishlist is empty</h1>
        <p className="text-muted-foreground mt-2">Save the products you love for later.</p>
        <Link to="/shop">
          <Button variant="hero" size="lg" className="mt-8">
            Browse products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="font-display text-4xl md:text-5xl font-bold">Wishlist</h1>
      <p className="text-muted-foreground mt-2">{items.length} saved item(s)</p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
