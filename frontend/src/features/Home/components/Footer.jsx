import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const leftLinksRef = useRef(null);
  const rightLinksRef = useRef(null);
  const logoRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 65%',
          toggleActions: 'play none none none',
        },
      });

      // Left links: slide in from LEFT
      tl.fromTo(
        leftLinksRef.current.children,
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        0
      );

      // Logo: rise up from BOTTOM
      tl.fromTo(
        logoRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        },
        0
      );

      // Right links: slide in from RIGHT
      tl.fromTo(
        rightLinksRef.current.children,
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        0
      );

      // Bottom scallop: slide up
      tl.fromTo(
        bottomRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power2.out',
        },
        0.5
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#EF9AAA] text-[#360215] w-full pt-20 overflow-hidden min-h-[60vh] flex flex-col justify-between"
    >
      {/* Main Content Layout */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full px-10 md:px-20 z-10 flex-1 gap-12 md:gap-0 mt-10">

        {/* Left Links */}
        <div ref={leftLinksRef} className="flex flex-col items-center md:items-end md:w-1/3 gap-6">
          <Link to="#" className="uppercase font-medium text-xl md:text-2xl tracking-tight hover:opacity-75 transition-opacity">Privacy Policy</Link>
          <Link to="#" className="uppercase font-medium text-xl md:text-2xl tracking-tight hover:opacity-75 transition-opacity">Returns</Link>
          <div className="text-center md:text-right">
            <Link to="#" className="uppercase font-medium text-xl md:text-2xl tracking-tight hover:opacity-75 transition-opacity leading-tight block">Terms &<br/>Conditions</Link>
          </div>
          <Link to="#" className="uppercase font-medium text-xl md:text-2xl tracking-tight hover:opacity-75 transition-opacity">Shipping</Link>
        </div>

        {/* Center Logo */}
        <div className="flex justify-center md:w-1/3 px-4">
          <img
            ref={logoRef}
            src="images/main-logo.svg"
            alt="Alt Co"
            className="w-56 md:w-72 lg:w-96 object-contain"
          />
        </div>

        {/* Right Links */}
        <div ref={rightLinksRef} className="flex flex-col items-center md:items-start md:w-1/3 gap-6">
          <Link to="#" className="uppercase font-medium text-xl md:text-2xl tracking-tight hover:opacity-75 transition-opacity">Instagram</Link>
          <Link to="#" className="uppercase font-medium text-xl md:text-2xl tracking-tight hover:opacity-75 transition-opacity">Facebook</Link>
          <Link to="#" className="uppercase font-medium text-xl md:text-2xl tracking-tight hover:opacity-75 transition-opacity">LinkedIn</Link>
          <Link to="#" className="uppercase font-medium text-xl md:text-2xl tracking-tight hover:opacity-75 transition-opacity">Contact</Link>
        </div>

      </div>

      {/* Bottom Scalloped Border */}
      <div ref={bottomRef} className="slideanimation2 flex flex-row-reverse bottom-0 w-full mt-20">
        <img src="images/cover2.svg" alt="" className="w-full object-cover" />
        <img src="images/cover2.svg" alt="" className="w-full object-cover" />
        <img src="images/cover2.svg" alt="" className="w-full object-cover" />
      </div>
    </footer>
  );
};

export default Footer;
