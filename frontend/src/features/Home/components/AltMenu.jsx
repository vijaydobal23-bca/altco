import React from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useAuth } from "../../auth/hooks/useAuth";

const AltCoMenu = ({setToggleMenu}) => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();
  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "STORE", path: "/store" },
    { name: "CART", path: "/cart" },
    { name: "LOGIN", path: "/login" },
  ];

  const { contextSafe } = useGSAP(() => {
    const menuTl = gsap.timeline();
    menuTl
      .from(".alt-menu", {
        yPercent: 200,
        duration: 0.75,
      })
      .from(".alt-img img", {
        yPercent: 100,
        duration: 0.7,
      },"combine")
      .from(".menu-link", {
        y: 100,
        stagger: -0.13,
      },"combine");
  });

  const closingAnimation = contextSafe(() => {
    const closingTl = gsap.timeline({
      onComplete: () => {
        navigate(-1);
      }
    });

    closingTl
      .to(".menu-link", {
        y: 100,
        stagger: 0.1,
      })
      .to(".alt-img img", {
        yPercent: 100,
        duration: 0.5
      })
      .to(".alt-menu", {
        yPercent: 200,
        duration: 0.7
      });
  });

  return (
    <section className="bg-pink-300">
      <div className="alt-menu relative flex min-h-screen w-full flex-col overflow-hidden bg-[#FFDE00] text-[#360215]  selection:bg-[#360215] selection:text-[#FFDE00]">
      {/* Top Right Controls */}
      <div className="absolute right-8 top-8 z-10 flex items-center gap-6 md:right-12 md:top-10">
        {/* Logout Button */}
        {user && (
          <button
            onClick={() => {
              handleLogout();
              closingAnimation();
            }}
            aria-label="Logout"
            className="text-[#360215] font-bold text-lg uppercase tracking-wide transition-opacity hover:opacity-80 cursor-pointer"
          >
            Logout
          </button>
        )}

        {/* Starburst Close Button */}
        <button
          onClick={() => closingAnimation()}
          aria-label="Close Menu"
          className="flex h-14 w-14 cursor-pointer items-center justify-center bg-[#360215] font-bold text-[#FFDE00] transition-transform hover:scale-110"
          style={{
            // CSS Clip-path used to create the exact 10-point starburst shape
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        >
          <span className="text-xl">x</span>
        </button>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-1  items-center justify-center gap-12 pb-32 pt-20 md:flex-row md:gap-24 lg:gap-32">
        {/* Logo Section */}
        <div className=" alt-img w-full max-w-[220px] md:max-w-[300px] overflow-hidden">
          <img
            src="images/main-logo.svg"
            alt="Alt Co Logo"
            className="block h-auto w-full object-contain drop-shadow-sm"
          />
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-2 text-center md:text-left z-10 relative texy-white">
          {menuItems.map((item, index) => (
            <div className="overflow-hidden ">
              <div className="overflow-hidden menu-link">
                <Link
                  key={index}
                  to={item.path}
                  className={`text-6xl font-medium uppercase leading-[1.05] tracking-tight text-[#360215] transition-all hover:opacity-75 md:text-7xl lg:text-[6rem]`}
                >
                  {item.name}
                </Link>
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Bottom Scalloped Image */}
      <div className="slideanimation2 flex flex-row-reverse  bottom-0">
        <img src="images/cover2.svg" alt="" />
        <img src="images/cover2.svg" alt="" />
        <img src="images/cover2.svg" alt="" />
      </div>
    </div>
    </section>
  );
};

export default AltCoMenu;
