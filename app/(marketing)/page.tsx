import Navbar from "@/components/global/navbar";
import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Individual } from "./_components/individual";
import { Pricing } from "./_components/pricing";
import { Research } from "./_components/research";
import { Teams } from "./_components/team";
import { CardBody, CardContainer, CardItem } from '@/components/global/3d-card'
import { HeroParallax } from '@/components/global/connect-parallax'
import { ContainerScroll } from '@/components/global/container-scroll-animation'
import { InfiniteMovingCards } from '@/components/global/infinite-moving-cards'
import { LampComponent } from '@/components/global/lamp'
import { Button } from '@/components/ui/button'
import { Results } from "./_components/results";

const MarketingPage = () => {
  return (

      //flex flex-col items-center justify-center
      // <Heroes />
      <div className="min-h-full flex flex-col ">
      
      <div className=" md:justify-start text-center gap-y-8 flex-1 bg-black ">
      <Navbar />
      <section className="h-screen w-full  bg-neutral-950 rounded-md   !overflow-visible relative flex flex-col items-center  antialiased">
        <div className="absolute inset-0  h-full w-full items-center px-5 py-24 "></div>
        <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
          <ContainerScroll
            titleComponent={
              <div className="flex items-center flex-col">
                <Button
                  size={'lg'}
                  className="p-8 mb-8 md:mb-0 text-2xl w-full sm:w-fit border-t-2 rounded-full  bg-white group transition-all flex items-center justify-center gap-4 shadow-xl shadow-neutral-500 hover:bg-white  duration-500"
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans  ">
                    Start For Free Today
                  </span>
                </Button>
                <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold">
                  Automate Your Hiring With SILX AI
                </h1>
              </div>
            }
          />
        </div>
        
      </section>
 
      </div>
   
        <Heroes />
        <div className="border-b-[3px] border-neutral-900"> 

         </div>
        <Results/>
       <Teams/>
       <Research/>
       <Pricing/>
       <Individual/>
      <Footer />
    </div>

  );
}

export default MarketingPage;

