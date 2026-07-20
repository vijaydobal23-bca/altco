import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
const OatsSection = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Only run animation on desktop
    mm.add("(min-width: 768px)", () => {
      const splitHeading = new SplitText(".oats-section h1", { type: "chars" });
      const oatsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".oats-section",
          start: "top 0%",
          end: "top -200%",
          scrub: 1,
          pin: true,
        },
      });

      oatsTl
        .from(splitHeading.chars, {
          yPercent: 100,
          stagger: 0.3,
        })
        .from(".oats-1", {
          y: 100,
          duration: 0.5,
          ease: "power2.out",
          opacity: 0,
        })
        .from(".oats-2", {
          x: -150,
          rotate: 30,
          ease: "power2.out",
          opacity: 0,
        })
        .from(".oats-3", {
          x: 150,
          rotate: 30,
          ease: "power2.out",
          opacity: 0,
        })
        .from(".oats-4", {
          y: -100,
          ease: "power2.out",
          opacity: 0,
        });
    });
  });

  return (
    <>
      <section className="oats-section md:h-screen h-[70vh] w-screen bg-[#B16CDF] relative flex justify-center items-center">
        <h1 className="md:text-[28vw] lg:text-[30vw] text-[150px] absolute text-white font-medium overflow-hidden ">
          OATS
        </h1>

        <div className="oats-container h-full flex absolute py-10">
          <div className="h-full oats-1 flex items-end">
            <img src="/images/oats-1.png" alt="" />
          </div>
          <div className="h-full oats-2 flex items-start ">
            <img src="/images/oats-2.png" alt="" />
          </div>
          <div className="h-full oats-3 flex items-end">
            <img src="/images/oats-3.png" alt="" />
          </div>
          <div className="h-full oats-4 flex items-start">
            <img src="/images/oats-4.png" alt="" />
          </div>
        </div>
      </section>
    </>
  );
};

export default OatsSection;
