import { type ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="flex min-h-screen flex-col bg-background">
    <Navbar />
    <main className="flex-1 pt-16 sm:pt-20">{children}</main>
    <Footer />
  </div>
);

export default Layout;
