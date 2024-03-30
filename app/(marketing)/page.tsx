import { Footer } from "./_components/footer";
import { Heading } from "./_components/heading";
import { Heroes } from "./_components/heroes";
import { Pricing } from "./_components/pricing";
import { Research } from "./_components/research";
import { Teams } from "./_components/team";

const MarketingPage = () => {
  return (

      //flex flex-col items-center justify-center
      // <Heroes />
      <div className="min-h-full flex flex-col ">
      
      <div className=" md:justify-start text-center gap-y-8 flex-1 bg-black ">
        <Heading />
        <Heroes />
   
       <Teams/>
       <Research/>
       <Pricing/>
      </div>
      <Footer />
    </div>

  );
}

export default MarketingPage;

