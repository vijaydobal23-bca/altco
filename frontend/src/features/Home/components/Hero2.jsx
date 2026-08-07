const Hero2 = () => {
  return (
    <>
     

      <section className="hero-banner md:h-screen md:w-screen h-[60vh] w-full relative overflow-hidden">
        <div className="slideanimation1 flex  absolute top-0 z-10">
          <img src="images/cover4.svg" className="" />
          <img src="images/cover4.svg" className="" />
          <img src="images/cover4.svg" className="" />
        </div>
        <div className="hero-banner-img h-full w-full">
          <img src="images/hero-2.png" alt="" className="w-full h-full object-cover" />
        </div>

        <div className=" slideanimation2 flex flex-row-reverse absolute bottom-0  z-10">
          <img src="images/cover2.svg" alt="" />
          <img src="images/cover2.svg" alt="" />
          <img src="images/cover2.svg" alt="" />
        </div>

        
      </section> 
      <div className="bg-[#3B0017] text-white md:px-40 px-5  h-40 flex justify-center "><p className="text-pink-300 md:text-3xl  text-8 text-center text-bold"> Discover the delicious power of AltCo! Savor our Natural Drinks in Chocolatey Delight, Vanilla Dream, Berry Bliss, and Tropical Twist. Pair with our creamy Oat Milk, smooth Almond Milk, and signature Alt Milk. Embrace health and taste with AltCo!</p>
      </div>


      
    </>
  );
};

export default Hero2;
