import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar() {
  const [toggleMenu , setToggleMenu] = useState(false);
    const navigate = useNavigate();
  const { user } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

 

  return (
   <>
    <nav className="h-20 bg-yellow-300 text-white">
      <div className="navbar h-full w-full flex justify-between items-center md:px-20 px-10">
        <div className="text-3xl font-bold">
          <img src="/images/main-logo.svg" alt=""className="w-10" />
        </div>
        <button 
          className="flex flex-col justify-center items-end gap-2 group focus:outline-none py-2" 
          onClick={()=>{ navigate("/alt-menu"); }}
        >
          <span className="w-12 h-1.5 bg-[#360215] rounded-full transition-all duration-300 group-hover:w-8"></span>
          <span className="w-8 h-1.5 bg-[#360215] rounded-full transition-all duration-300 group-hover:w-12"></span>
          <span className="w-12 h-1.5 bg-[#360215] rounded-full transition-all duration-300 group-hover:w-8"></span>
        </button>
      </div>
    </nav>
   </>
  );
}

export default Navbar;
