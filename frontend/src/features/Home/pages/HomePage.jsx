import { Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../../auth/hooks/useAuth";
import Hero from "../components/Hero";
import ProductSection from "../components/ProductSection";
import MessageSection from "../components/messageSection";
import OatsSection from "../components/OatsSection";

const features = [
  {
    icon: (
      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    title: "Quality Products",
    desc: "Every item is verified for quality before it's listed on our platform.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fast Delivery",
    desc: "Get your orders delivered quickly and efficiently to your doorstep.",
  },
  {
    icon: (
      <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Secure Payments",
    desc: "Your payment information is always safe and encrypted.",
  },
];



function HomePage() {
  const { user } = useAuth();

  // if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
     <main>
      <Hero />
      <ProductSection/>
      <MessageSection/>
      <OatsSection/>
      <div className="h-screen bg-red-400"></div>
     
     </main>


    


      {/* Footer */}
      
    </div>
  );
}

export default HomePage;
