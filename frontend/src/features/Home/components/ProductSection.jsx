import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);


const ProductSection = () => {
  const data = [{
    name:"BERRY",
    img:"images/protine-1.webp",
    x:-50,
    y:-50,
    color:"purple-500"
  },{
    name:"CLASSIC",
    img:"images/protine-2.webp",
    x:50,
    y:50,
    color:"blue-500"
  },{
    name:"VANILA",
    img:"images/protine-3.webp",
    y:50,
    color:"orange-500"
  },{
    name:"MADG'R",
    img:"images/protine-4.webp" ,
    x:-50,
    y:-50,
    color:"brown-500"
  }];

  const colorMap = {
    "purple-500": "#8d26edff",
    "blue-500":   "#1267efff",
    "orange-500": "#f97316",
    "brown-500":  "#92400e",
  };

  useGSAP(()=>{
    // Fix iOS Safari & mobile scroll interference
    ScrollTrigger.normalizeScroll(true);

    const tl1 = gsap.timeline({
      scrollTrigger:{
        trigger:".product-showcase",
        scrub:2,
        pin:true,
        anticipatePin:1,
        invalidateOnRefresh:true,
        start:"top 0%",
        end:"top -300%"
      }
    });

      tl1.to(".protine-section",{
       x:"-300%",
       duration: 3,
      }, 0);

      // Set initial background to first item's color
      gsap.set(".product-showcase", { backgroundColor: colorMap[data[0].color] });

      data.forEach((item, index) => {
        const startAt = Math.max(0, index * 0.65 - 0.3);

        // Skip entry animation for first image
        if (index !== 0) {
          tl1.fromTo(`.protine-${index}`, {
            x: `${item.x || 0}%`,
            y: `${item.y || 0}%`,
            opacity: 0
          },{
            x: "0%",
            y: "0%",
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          }, startAt);
        }

        // Animate background color as each image enters
        tl1.to(".product-showcase", {
          backgroundColor: colorMap[item.color],
          duration: 0.5,
          ease: "none",
        }, startAt);
      });
   
  }) 
 
  return (

  
    <>
      <section className="product-showcase h-screen w-screen">
        <div className="protine-section  h-screen flex  ">
          {data.map((item,index)=>{
            return(
              <div key={index} className={`protine-item h-full  w-screen shrink-0 flex  justify-center items-center relative protine-container-${index}`}>
                <div className="protine absolute z-10">
                  <img src={item.img} alt="" className={`md:w-150 w-100 protine-${index}`} />
                </div>
                <h2 className="text-white md:text-[25vw] lg:text-[28vw] text-[100px]  font-medium tracking-tighter">{item.name}</h2>
                </div>
            )
          })}
          </div>

      </section>
    </>
  )
}

export default ProductSection; 