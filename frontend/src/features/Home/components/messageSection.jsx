import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const LeafShape = ({ color, topText, bottomText, topTextSize = 12, bottomTextSize = 12, rotationClass }) => (
  <div className={`max-sm:scale-90 w-[35vw] sm:w-48 md:w-56 lg:w-64 flex justify-center items-center ${rotationClass} drop-shadow-xl mb-2 sm:mb-0`}>
    <svg viewBox="0 0 120 70" className="w-full h-auto">
      <path d="M10,35 Q60,-5 110,35 Q60,75 10,35 Z" fill={color} />
      <line x1="15" y1="35" x2="105" y2="35" stroke="#300514" strokeWidth="1.5" />
      <text x="60" y="21" textAnchor="middle" alignmentBaseline="middle" fill="#300514" fontSize={topTextSize} className="font-sans font-black tracking-tight">{topText}</text>
      <text x="60" y="50" textAnchor="middle" alignmentBaseline="middle" fill="#300514" fontSize={bottomTextSize} className="font-sans font-black tracking-tight">{bottomText}</text>
    </svg>
  </div>
);

const MessageSection = () => {

  useGSAP(()=>{
    
  })

  return(
    <section className="message-section bg-[#300514]">
      <div className="w-full bg-[#92400e] relative">
          <div className=" slideanimation2 flex flex-row-reverse  bottom-0">
          <img src="images/cover2.svg" alt="" />
          <img src="images/cover2.svg" alt="" />
          <img src="images/cover2.svg" alt="" />
        </div>
      </div>

      <div className="message md:h-screen h-[80vh] w-full  flex justify-center items-center overflow-hidden relative">
        
        <h1 className="text-[#a874e5] text-[20vw] sm:text-[17vw] leading-[0.85] text-center uppercase m-0 flex flex-col tracking-tighter relative z-0 font-medium">
          <span>GOOD</span>
          <span>GUT</span>
        </h1>

        <div className="leaf-con absolute top-0 sm:top-1/2 left-1/2 -translate-x-1/2 translate-y-[40%] sm:-translate-y-1/2 flex flex-col gap-[8vw] sm:gap-[10vw] -mt-[1vw] z-10 w-full pointer-events-none">
          <div className="flex w-[85vw] sm:w-[70vw] justify-between mx-auto pointer-events-auto" style={{maxWidth: '1075.2px'}}>
            <div className="leaf flex flex-col items-center sm:gap-5" style={{opacity: 1}}>
              <LeafShape color="#98c946" topText="100%" bottomText="Vegan" rotationClass="rotate-[20deg]" />
              <p className="text-white font-neuhas w-[30vw] sm:w-[20vw] text-[10px] md:text-[15px] text-center mt-2 sm:mt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. At, in.</p>
            </div>
            <div className="leaf flex flex-col items-center sm:gap-5" style={{opacity: 1}}>
              <LeafShape color="#98c946" topText="100%" bottomText="Vegan" rotationClass="rotate-[20deg]" />
              <p className="text-white font-neuhas w-[30vw] sm:w-[20vw] text-[10px] md:text-[15px] text-center mt-2 sm:mt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. At, in.</p>
            </div>
          </div>
          <div className="flex w-[85vw] sm:w-[70vw] justify-between mx-auto pointer-events-auto" style={{maxWidth: '1075.2px'}}>
            <div className="leaf flex flex-col items-center sm:gap-5" style={{opacity: 1}}>

              <LeafShape color="#efd510" topText="Complete" bottomText="Protein" topTextSize={10.5} bottomTextSize={11.5} rotationClass="-rotate-[20deg]" />
              <p className="text-white font-neuhas w-[30vw] sm:w-[20vw] text-[10px] md:text-[15px] text-center mt-2 sm:mt-0">Lorem ipsum dolor sit amet consectetur adipisicing </p>
            </div>
            <div className="leaf flex flex-col items-center sm:gap-5" style={{opacity: 1}}>

              <LeafShape color="#efd510" topText="Complete" bottomText="Protein" topTextSize={10.5} bottomTextSize={11.5} rotationClass="-rotate-[20deg]" />
              <p className="text-white font-neuhas w-[30vw] sm:w-[20vw] text-[10px] md:text-[15px] text-center mt-2 sm:mt-0">Lorem ipsum dolor sit amet consectetur adipisicing </p>
            </div>
          </div>
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