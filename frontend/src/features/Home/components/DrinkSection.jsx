import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const stripItems = [
  { logo: "images/main-logo.svg", img: "images/drink-1.png", text: "altCo" },
  {
    logo: "images/main-logo.svg",
    img: "images/drink-2.png",
    text: "altCo",
  },
  {
    logo: "images/main-logo.svg",
    img: "images/drink-3.png",
    text: "altCo",
  },
  {
    logo: "images/main-logo.svg",
    img: "images/drink-4.png",
    text: "altCo",
  },
];

const renderStripContent = () => (
  <div className="flex w-max items-center h-full">
    {stripItems.map((item, i) => (
      <div
        key={i}
        className="flex items-center justify-center px-4 md:px-6 gap-4 md:gap-6 h-full"
      >
        <img
          src={item.logo}
          alt="logo"
          className="h-5 md:h-8 w-auto object-contain brightness-0"
        />
        <span className="text-black text-xl md:text-3xl font-black uppercase tracking-widest">
          {item.text}
        </span>
        <img
          src={item.img}
          alt="drink"
          className="h-10 md:h-14 w-auto object-contain"
        />
      </div>
    ))}
  </div>
);

const DrinkSection = () => {
  useGSAP(() => {
    const drinkHeading = SplitText.create(".drink-section h1", {
      type: "chars",
    });

    const drinkTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".drink-section",
        start: "top 0%",
        end: "top -100%",
        pin: true,
        scrub: 2,
      },
    });

    drinkTl
      .from(".drink-section h2", {
        y: 50,
        opacity: 0,
      })
      .from(drinkHeading.chars, {
        y: 50,
        opacity: 0,
        stagger: 0.05,
      })
      .from(".drink-section h3", {
        y: 50,
        opacity: 0,
      })
      .from(
        ".drink-section .strip-1",
        {
          xPercent: 100,
          ease: "power2.inOut",
          duration: 2,
        },
        "stripes",
      )
      .from(
        ".drink-section .strip-2",
        {
          xPercent: -100,
          ease: "power2.inOut",
          duration: 2,
        },
        "stripes",
      );

    // Only run drinkTl2 on desktop (≥1024px) — skip on mobile & tablet
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const img1 = document.querySelector(".img-1");
      const img2 = document.querySelector(".img-2");

      if (!img1 || !img2) return;

      // Get positions relative to the full document (accounts for scroll)
      const getDocCenter = (el) => {
        const rect = el.getBoundingClientRect();
        return {
          x: rect.left + window.scrollX + rect.width / 2,
          y: rect.top + window.scrollY + rect.height / 2,
        };
      };

      const center1 = getDocCenter(img1);
      const center2 = getDocCenter(img2);

      // Exact pixel distance from img-1 center → img-2 center
      const offsetX =90; // tweak this value to shift more/less to the right
      const deltaX = (center2.x - center1.x) + offsetX;
      const deltaY = center2.y - center1.y;

      const drinkTl2 = gsap.timeline({
        scrollTrigger: {
          trigger: ".drink-section-bottom",
          start: "top 40%",
          end: "top 0%",
          scrub: 2,
        },
      });

      drinkTl2.to(".drink-section .img-1", {
        x: deltaX,
        y: deltaY,
        rotate: 15, // Make it upright or match the final image rotation
        ease: "power2.out",
      });
    });
  });

  return (
    <>
      <section className="drink-section min-h-screen w-full bg-blue-400">
        <div className="deink-container h-full w-full relative">
          <div className="h-full w-full flex md:flex-row flex-col">
            <div className="drink-statement w-full md:w-1/2  p-8 md:p-14 lg:p-24 flex flex-col justify-center md:text-left text-center">
              <h2 className="text-xl font-semibold mb-2">ALT-CO DRINKS</h2>
              <h1 className="text-4xl  md:text-[4vw] lg:text-[4vw] uppercase text-white font-medium leading-tight mb-4 overflow-hidden">
                High Protein & <br /> Taste Blend <br /> in One
              </h1>
              <h3 className="text-3xl md:text-4xl font-bold mb-6">₹499</h3>
              <p className="text-base md:text-lg w-full md:w-[85%] lg:w-[70%] mb-8 text-white font-medium z-10 md:px-1 px-10">
                Alt-Co drinks are fresh, Tasty , high protein and low in
                calories and sugar, Alt-Co is the perfect guilt-free indulgence
                that keeps you hydrated and satisfied.
              </p>
              <button className="bg-black text-white px-8 py-3 rounded-full uppercase font-bold hover:bg-gray-800 transition-colors self-start">
                Try now
              </button>
            </div>
            <div className="drink-image w-full md:w-1/2 flex justify-center items-center p-8 md:p-0 relative min-h-[50vh] md:min-h-screen overflow-hidden md:overflow-visible">
              <div className="relative z-10 w-full h-full flex justify-center items-center">
                <img
                  src="/images/drink-1.png"
                  alt="Alt-Co Drink 1"
                  className="z-50 lg:h-[40vw]  rotate-15 img-1"
                />
              </div>
            </div>
          </div>
          <div className="altco-border-1 bg-[#E1FF01] h-[60px] md:h-[80px] w-[120vw] absolute bottom-[20%] -left-[10vw] rotate-[5deg] flex items-center overflow-hidden z-20 strip-1">
            <div className="flex w-max items-center stripanimation  ">
              {/* Half 1 */}
              <div className="flex w-max items-center">
                {renderStripContent()}
                {renderStripContent()}
                {renderStripContent()}
                {renderStripContent()}
              </div>
              {/* Half 2 */}
              <div className="flex w-max items-center">
                {renderStripContent()}
                {renderStripContent()}
                {renderStripContent()}
                {renderStripContent()}
              </div>
            </div>
          </div>

          <div className="altco-border-2 bg-[#E1FF01] h-[60px] md:h-[80px] w-[120vw] absolute bottom-[15%] -left-[10vw] -rotate-[6deg] flex items-center overflow-hidden z-10 strip-2 ">
            <div className="flex w-max items-center stripanimation2 ">
              {/* Half 1 */}
              <div className="flex w-max items-center">
                {renderStripContent()}
                {renderStripContent()}
                {renderStripContent()}
                {renderStripContent()}
              </div>
              {/* Half 2 */}
              <div className="flex w-max items-center">
                {renderStripContent()}
                {renderStripContent()}
                {renderStripContent()}
                {renderStripContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="z-10 drink-section-bottom bg-[#3B0017] md:h-screen">
        <div className="h-full w-full flex md:flex-row flex-col justify-center items-center">
          <div className="md:h-full h-1/2 md:w-1/2 w-full flex justify-center items-center md:justify-start p-5 relative ">
            <img
              src="images/drink-4.png"
              alt=""
              className="z-50 lg:h-[40vw] img-2"
            />
          </div>
          <div className="md:h-full h-1/2 md:w-1/2 w-full flex justify-center items-center p-5">
            <h2 className="md:text-[4.5vw] lg:text-[5vw] text-[30px]  text-white  font-medium text-center">
              ALT-CO DRINKS
              <br /> ARE BEST AND NATURAL
            </h2>
          </div>
        </div>
      </section>
    </>
  );
};

export default DrinkSection;
