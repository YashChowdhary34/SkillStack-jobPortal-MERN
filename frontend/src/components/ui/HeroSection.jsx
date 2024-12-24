import { Button } from "./button";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <>
      <div className="text-center">
        <div className="flex flex-col gap-5 my-10">
          <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-bold">
            Personalised Job Hunt Website
          </span>
          <h1 className="text-5xl font-bold">
            Search, Apply & <br /> Get Your{" "}
            <span className="text-[#6438C2]"> Dream Job</span>
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius vel
            quis aut velit quisquam blanditiis molestias minus obcaecati soluta
            omnis ea, deserunt dicta enim magnam tenetur dolores repellat
            architecto quae.
          </p>
          <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
            <input
              type="text"
              placeholder="Find your dream job"
              className="outline-none border-none w-full"
            />
            <Button className="rounded-r-full bg-[#6A38C2]">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
