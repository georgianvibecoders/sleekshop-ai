import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Moon, Search, ShoppingBag, Sun, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, useWishlist } from "@/store/cart";
import { useTheme } from "@/hooks/use-theme";
import { motion } from "framer-motion";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/shop?category=Audio", label: "Audio" },
  { to: "/shop?category=Computing", label: "Computing" },
];

export const Navbar = () => {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const { theme, toggle } = useTheme();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 glass border-b border-border/40" />
      <div className="container relative flex h-16 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Zap className="h-6 w-6 text-primary transition-transform group-hover:scale-110" fill="currentColor" />
            <div className="absolute inset-0 bg-primary/40 blur-lg opacity-60 group-hover:opacity-100 transition" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">VOLTIX</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate(`/shop?q=${encodeURIComponent(query)}`);
            }}
            className="hidden lg:flex items-center relative"
          >
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="h-9 w-56 pl-9 pr-3 rounded-md bg-card-elevated/60 border border-border/60 text-sm focus:outline-none focus:border-primary/60 focus:bg-card-elevated transition"
            />
          </form>

          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Link to="/wishlist" aria-label="Wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-4 w-4" />
              {wishCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-secondary text-[10px] font-bold flex items-center justify-center text-secondary-foreground"
                >
                  {wishCount}
                </motion.span>
              )}
            </Button>
          </Link>

          <Link to="/cart" aria-label="Cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-primary-foreground"
                >
                  {count}
                </motion.span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
