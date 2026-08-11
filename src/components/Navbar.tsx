import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { business } from "@/data/business";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Categories", to: "/categories" },
  { label: "Orders", to: "/orders" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/92 backdrop-blur-md border-b border-border shadow-soft"
          : "bg-background/60 backdrop-blur-sm",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <Link to="/" className="flex flex-col leading-tight" aria-label={`${business.name} home`}>
          <span className="font-serif text-lg sm:text-2xl font-semibold text-primary">Durga's</span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Saree Pre-Pleating
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "relative text-sm tracking-wide transition-colors hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-accent after:transition-all",
                    isActive
                      ? "text-primary after:w-full"
                      : "text-muted-foreground after:w-0 hover:after:w-full",
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex rounded-full px-5">
            <Link to="/orders">Book Now</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[82vw] max-w-xs bg-background p-0">
              <div className="flex h-16 items-center justify-between border-b border-border px-5">
                <span className="font-serif text-xl text-primary">Menu</span>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>
              <ul className="flex flex-col p-5 gap-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-lg px-3 py-3 font-serif text-xl transition-colors",
                          isActive ? "bg-secondary text-primary" : "text-foreground hover:bg-secondary",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
                <li className="pt-4">
                  <Button asChild className="w-full rounded-full" size="lg">
                    <Link to="/orders">Book Now</Link>
                  </Button>
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
