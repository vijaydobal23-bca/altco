import gsap from "gsap";
import {ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger,SplitText,useGSAP);


const DrinkSection = ()=>{
  useGSAP(()=>{
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const drink = new SplitText(".drink-section h1", {
        type:"chars"
      });

      const statements = new SplitText(".drink-section-bottom h2", {
        type:"lines"
      });

      const drinkTl = gsap.timeline({
        scrollTrigger:{
          trigger:".drink-section",
          start:"top 0%",
          end:"top -100%",
          pin:true,
          scrub:1
        }
      });

      drinkTl.from(drink.chars,{
        yPercent:50,
        stagger:0.1,
        duration:0.5,
        ease:"power2.out",
        opacity:0,
      }).from(".drink-img-1 img",{
        delay:0.5,
        yPercent:100,
        duration:0.75
      },"<0.1").from(".drink-img-2 img",{
        yPercent:100,
        duration:0.75
      },"<0.1").from(".drink-img-3 img",{
        yPercent:100,
        duration:0.75
      },"<0.1");


      const drinkTl2 = gsap.timeline({
        scrollTrigger:{
          trigger:".drink-section-bottom",
          start:"top 50%",
          end:"top 0%",
          scrub:true
        }
      });

      drinkTl2.to(".drink-img-2",{
        yPercent:145,
        xPercent:-75,
        rotate:30,
        zIndex:10
      });

      const tl3 = gsap.timeline({
        scrollTrigger:{
          trigger:".drink-section-bottom",
          start:"top 0%",
          markers:true
        }
      });

      tl3.from(statements.lines,{
        y:100,
        duration:0.5,
        stagger:0.1,
        overflow:"hidden",
        rotate:5,
        ease:"back",
        opacity:0,
      });
    });
  });

  return(
    <>
    <section className="drink-section md:h-screen h-[80vh] w-screen bg-blue-400 ">
      <div className="relative h-full w-full flex justify-center items-center">
        <h1 className="absolute z lg:text-[400px] md:text-[300px] text-[140px] text-white overflow-hidden">DRINKS</h1>

        <div className="drink-images flex absolute   justify-center items-center">
          <div className="drink-img-1 overflow-hidden">
            <img src="/images/drink-1.png"></img>
            
          </div>
          <div className="drink-img-2 overflow-hidden">
            <img src="/images/drink-2.png " className=""></img>
           
          </div>
          <div className="drink-img-3 overflow-hidden">
            <img src="/images/drink-3.png " className=""></img>
            
          </div>
          
        </div>
      </div>

    </section>

    <section className="drink-section-bottom bg-[#3B0017] md:h-screen h-[70vh]">
      <div className="h-full w-full flex md:flex-row flex-col justify-center items-center">

       <div className="md:h-full h-1/2 md:w-1/2 w-full flex justify-center items-center md:justify-start p-5 ">
         <img src="images/drink-4.png" alt="" className="max-h-full object-contain z-20" />
       </div>
        <div className="md:h-full h-1/2 md:w-1/2 w-full flex justify-center items-center p-5">
          <h2 className="md:text-[60px] lg:text-[80px] text-[30px]  text-white  font-medium text-center">ALT-CO DRINKS<br/> ARE  BEST AND NATURAL</h2>
        </div>
      </div>
    </section>
    
    
    </>
  )
}

export default DrinkSection;