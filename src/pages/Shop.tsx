import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { products, categories, type Category } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

const sorts = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top rated" },
] as const;

const Shop = () => {
  const [params, setParams] = useSearchParams();
  const initialCategory = (params.get("category") as Category | null) ?? null;
  const initialQuery = params.get("q") ?? "";

  const [category, setCategory] = useState<Category | null>(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("featured");
  const [maxPrice, setMaxPrice] = useState(3500);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category) list = list.filter((p) => p.category === category);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, query, sort, maxPrice]);

  return (
    <div className="container py-12">
      <div className="mb-10">
        <p className="text-sm text-primary font-medium tracking-wider uppercase">Catalog</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold mt-2">Shop everything</h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          {filtered.length} products. Built to last, designed to delight.
        </p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-10">
        {/* Filters */}
        <aside className="space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm font-display font-semibold">
              <Search className="h-4 w-4" /> Search
            </div>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                const next = new URLSearchParams(params);
                e.target.value ? next.set("q", e.target.value) : next.delete("q");
                setParams(next, { replace: true });
              }}
              placeholder="Search..."
              className="h-10 w-full px-3 rounded-md bg-card-elevated border border-border/60 text-sm focus:outline-none focus:border-primary/60"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3 text-sm font-display font-semibold">
              <SlidersHorizontal className="h-4 w-4" /> Categories
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setCategory(null);
                  const next = new URLSearchParams(params);
                  next.delete("category");
                  setParams(next, { replace: true });
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  !category ? "bg-primary/10 text-primary" : "hover:bg-card-elevated text-muted-foreground"
                }`}
              >
                All products
              </button>
              {categories.map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setCategory(c.name);
                    const next = new URLSearchParams(params);
                    next.set("category", c.name);
                    setParams(next, { replace: true });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                    category === c.name
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-card-elevated text-muted-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3 text-sm font-display font-semibold">
              <span>Max price</span>
              <span className="text-primary">${maxPrice}</span>
            </div>
            <input
              type="range"
              min={100}
              max={3500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </aside>

        {/* Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
            <p className="text-sm text-muted-foreground">{filtered.length} results</p>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-card-elevated border border-border/60">
              {sorts.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSort(s.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition ${
                    sort === s.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-border rounded-2xl">
              <p className="text-muted-foreground">No products match your filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setCategory(null);
                  setQuery("");
                  setMaxPrice(3500);
                  setParams({}, { replace: true });
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
