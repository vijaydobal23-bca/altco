import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import{SplitText} from "gsap/SplitText"
import {ScrollTrigger} from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger,useGSAP,SplitText);



const Leaf = ({ color, topText, bottomText, rotation = 20 }) => (
  <svg
    viewBox="0 0 130 80"
    style={{ transform: `rotate(${rotation}deg)` }}
    className="w-[90px] sm:w-[120px] md:w-[140px] lg:w-[160px] h-auto drop-shadow-lg"
  >
    <path d="M10,40 Q65,-5 120,40 Q65,85 10,40 Z" fill={color} />
    <line x1="15" y1="40" x2="115" y2="40" stroke="#300514" strokeWidth="1.5" />
    <text
      x="65" y="26"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#300514"
      fontSize="13"
      fontWeight="800"
      fontStyle="italic"
      fontFamily="sans-serif"
    >{topText}</text>
    <text
      x="65" y="56"
      textAnchor="middle"
      dominantBaseline="middle"
      fill="#300514"
      fontSize="13"
      fontWeight="800"
      fontStyle="italic"
      fontFamily="sans-serif"
    >{bottomText}</text>
  </svg>
);

const FeatureItem = ({ color, topText, bottomText, rotation, description }) => (
  <div className="flex flex-col items-start gap-2 sm:gap-3">
    <Leaf color={color} topText={topText} bottomText={bottomText} rotation={rotation} />
    <p className="text-white text-[11px] sm:text-[13px] md:text-[15px] leading-snug font-normal w-[22vw] sm:w-[18vw] md:w-[15vw] lg:w-[220px]">
      {description}
    </p>
  </div>
);

const MessageSection = () => {
  

  useGSAP(()=>{
    const splitMessage = SplitText.create(".message-section h1",{
    type:"words",
  });

  gsap.from(splitMessage.words,{
    y:300,
    stagger:0.1,
    duration:0.5,
    overflow:"hidden",
    ease:"power2.out",
    scrollTrigger:{
      trigger:".message-section",
      start:"top 30%",
      end:"top 0%",
    }
  });


  })

  return(
    <section className="message-section bg-[#3B0017]">
      <div className="w-full bg-[#92400e] relative">
          <div className=" slideanimation2 flex flex-row-reverse  bottom-0">
          <img src="images/cover2.svg" alt="" />
          <img src="images/cover2.svg" alt="" />
          <img src="images/cover2.svg" alt="" />
        </div>
      </div>

      <div className="message md:h-screen h-[80vh] w-full flex flex-row items-stretch overflow-hidden relative px-[3vw] sm:px-[4vw]">

        {/* Left Column */}
        <div className="flex flex-col justify-between py-[5%] w-[25vw] sm:w-[22vw] md:w-[20vw] lg:w-[18vw] shrink-0">
          <FeatureItem 
            color="#98c946" 
            topText="100%" 
            bottomText="Vegan" 
            rotation={20} 
            description="Crafted purely from plant-based ingredients for a cruelty-free and sustainable choice."
          />
          <FeatureItem 
            color="#efd510" 
            topText="Complete" 
            bottomText="Protein" 
            rotation={-20} 
            description="Packed with all essential amino acids to fuel your body and keep you energized."
          />
        </div>

        {/* Center — GOOD GUT */}
        <div className="flex-1 flex justify-center items-center">
          <h1 className="text-[#a874e5] text-[20vw] sm:text-[17vw] leading-[0.85] text-center uppercase m-0 flex flex-col tracking-tighter font-medium">
            <span className="overflow-hidden">GOOD</span>
            <span className="overflow-hidden">GUT</span>
          </h1>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between py-[5%] w-[25vw] sm:w-[22vw] md:w-[20vw] lg:w-[18vw] shrink-0 items-start">
          <FeatureItem 
            color="#f78f1e" 
            topText="Zero" 
            bottomText="Sugar" 
            rotation={20} 
            description="Naturally sweetened with zero refined sugars for a guilt-free, refreshing experience."
          />
          <FeatureItem 
            color="#56c2e6" 
            topText="Lactose" 
            bottomText="Free" 
            rotation={-20} 
            description="Perfect for sensitive stomachs, ensuring easy digestion and zero bloating."
          />
        </div>

      </div>

      <div className="w-full  relative">
          <div className=" slideanimation2 flex flex-row-reverse  bottom-0">
          <img src="images/cover3.svg" alt="" />
          <img src="images/cover3.svg" alt="" />
          <img src="images/cover3.svg" alt="" />
        </div>
      </div>

    </section>

  )
};

export default MessageSection;