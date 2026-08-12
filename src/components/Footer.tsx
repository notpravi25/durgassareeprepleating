import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { business } from "@/data/business";

const links = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "Orders", to: "/orders" },
  { label: "Contact", to: "/contact" },
];

export const Footer = () => (
  <footer className="bg-maroon-deep text-primary-foreground">
    <div className="container-narrow px-5 sm:px-8 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      <div>
        <h2 className="font-serif text-2xl">{business.name}</h2>
        <p className="mt-3 text-sm text-primary-foreground/70 max-w-xs">{business.tagline}</p>
      </div>

      <nav aria-label="Footer navigation">
        <h3 className="text-xs uppercase tracking-[0.24em] text-gold">Explore</h3>
        <ul className="mt-4 space-y-2 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="text-primary-foreground/80 hover:text-gold transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div>
        <h3 className="text-xs uppercase tracking-[0.24em] text-gold">Contact</h3>
        <ul className="mt-4 space-y-3 text-sm">
          <li>
            <a
              href={`tel:+91${business.phone}`}
              className="inline-flex items-center gap-2 text-primary-foreground/85 hover:text-gold transition-colors"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {business.phone}
            </a>
          </li>
          <li>
            <a
              href={`mailto:${business.email}`}
              className="inline-flex items-center gap-2 break-all text-primary-foreground/85 hover:text-gold transition-colors"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" /> {business.email}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="border-t border-primary-foreground/15">
      <div className="container-narrow px-5 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/60">
        <p>© 2026 {business.name}. All rights reserved.</p>
        <Link to="/admin/login" className="hover:text-gold transition-colors font-medium">
          Admin Portal
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
