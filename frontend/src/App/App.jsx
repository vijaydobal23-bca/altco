import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import routes from "./app.routes";
import { AuthContextProvider } from "../features/auth/auth.context";
import { SellerContextProvider } from "../features/seller/seller.context";
import { CartContextProvider } from "../features/Home/home.context";


import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

function App() {

  

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5,
      effects: true,
    });
  });

  return (
    <AuthContextProvider>
      <CartContextProvider>
        <SellerContextProvider>
          <div id="smooth-wrapper">
            <div id="smooth-content">
              <RouterProvider router={routes} />
            </div>
          </div>
        </SellerContextProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#fff",
              color: "#1c1917",
              border: "1px solid #fde68a",
              borderRadius: "16px",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 4px 24px rgba(251, 191, 36, 0.15)",
            },
            success: {
              iconTheme: { primary: "#f59e0b", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
