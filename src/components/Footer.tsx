import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border/40 mt-32">
      <div className="container py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" fill="currentColor" />
            <span className="font-display font-bold tracking-tight">VOLTIX</span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs">
            Engineered for the next decade. Premium tech, designed without compromise.
          </p>
        </div>
        {[
          { title: "Shop", links: ["Audio", "Wearables", "Computing", "Imaging", "Gaming"] },
          { title: "Support", links: ["Help center", "Shipping", "Returns", "Warranty"] },
          { title: "Company", links: ["About", "Careers", "Press", "Sustainability"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-sm mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l}>
                  <Link
                    to="/shop"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/40">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Voltix. All rights reserved.</p>
          <p>Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
};
