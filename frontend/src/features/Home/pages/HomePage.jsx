import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../../auth/hooks/useAuth";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import MessageSection from "../components/messageSection";
import OatsSection from "../components/OatsSection";
import Hero2 from "../components/Hero2";
import DrinkSection from "../components/DrinkSection";
import Footer from "../components/Footer";

function HomePage() {
  const { user } = useAuth();

  // if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <main>
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
