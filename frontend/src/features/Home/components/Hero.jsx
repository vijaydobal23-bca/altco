import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin,SplitText);
const Hero = () => {
  useGSAP(()=>{
    const splitHeroHeading = new SplitText(".hero-text h1", {
      type: "lines",
    });


    const heroTl = gsap.timeline();
  heroTl.from(".hero-logo img", {
    yPercent:200,
    duration: 1,
    ease:"power2.out",
    
  }).from(splitHeroHeading.lines, {
    yPercent:200,
    duration: 0.75,
    stagger:0.2,
    rotate:10,
    ease:"power2.out",
    opacity:0,
  });
  })
  

  return (
    <>
      <section className="hero-section-1 bg-[#EF9AAA]">
        <div className="hero-content flex md:flex-row flex-col justify-center h-[70vh] w-screen items-center ">
          <div className="hero-logo md:w-[50%] w-full  h-full flex justify-center items-center overflow-hidden">
            <img src="images\main-logo.svg" className="md:w-80 w-40" />
          </div>

          <div className="hero-text md:w-[50%] w-full flex justify-center items-center h-full md:px-10 text-center">
            <h1 className="bold md:text-6xl text-4xl text-[#2c1a05] font-bold  uppercase overflow-hidden ">
              Traid and Smart , Made With Plants
            </h1> 
          </div>
        </div>
      </section>

      <section className="hero-banner md:h-screen md:w-screen h-[60vh] w-full relative overflow-hidden">
        <div className="slideanimation1 flex  absolute top-0 z-10">
          <img src="images/cover1.svg" className="" />
          <img src="images/cover1.svg" className="" />
          <img src="images/cover1.svg" className="" />
        </div>
        <div className="hero-banner-img h-full w-full">
          <img src="images/hero-img.webp" alt="" className="w-full h-full object-cover" />
        </div>

        <div className=" slideanimation2 flex flex-row-reverse absolute bottom-0  z-10">
          <img src="images/cover2.svg" alt="" />
          <img src="images/cover2.svg" alt="" />
          <img src="images/cover2.svg" alt="" />
        </div>
      </section> 

      <div className="bg-[#3B0017] text-white md:px-40 px-5  h-40 flex justify-center "><p className="text-pink-300 md:text-3xl  text-8 text-center text-bold"> Discover the delicious power of AltCo! Savor our vegan protein in Chocolatey Delight, Vanilla Dream, Berry Bliss, and Tropical Twist. Pair with our creamy Oat Milk, smooth Almond Milk, and signature Alt Milk. Embrace health and taste with AltCo!</p>
      </div>
    </>
  );
};

export default Hero;
