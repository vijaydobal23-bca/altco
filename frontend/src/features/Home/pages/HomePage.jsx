import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar";

import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import MessageSection from "../components/messageSection";
import OatsSection from "../components/OatsSection";
import Hero2 from "../components/Hero2";
import DrinkSection from "../components/DrinkSection";
import Footer from "../components/Footer";

import { useAuth } from "../../auth/hooks/useAuth";

function HomePage() {
  const { user } = useAuth();
  

  return (
    <div className="min-h-screen bg-blue-500">
      <Navbar />

      {/* Hero Section */}
      <main className = "bg-blue-500">
        <Hero />
        <ProductSection />
        <MessageSection />
        <OatsSection />
        <Hero2 />
        <DrinkSection />
        <Footer />
      </main>

      {/* Footer */}
    </div>
  );
}

export default HomePage;
