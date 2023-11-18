import { ReactElement } from "react";
// import Slide from "react-reveal/Slide";
// @ts-ignore
import Zoom from "react-reveal/Zoom";
import Template1 from "./portfolio/templates/template1/Template1";
import { Link } from "react-router-dom";
import { useTypewriter, Cursor } from "react-simple-typewriter";

// interface NavbarProps {
//   onClick: (action: string) => void;
// }
// interface TypewriterConfig {
//   words: string[];
//   loop?: {};
// }

export default function Home(): ReactElement {
  const [headingText] = useTypewriter({
    words: ["Awesome", "Customized", "Beautiful"],
    loop: Infinity,
    typeSpeed: 100,
    deleteSpeed: 40,
  });
  return (
    <div className="h-screen pt-[4.5rem]">
      <div>
 
        <div className="bg-[#1F0F53]">
          <div className=" h-full text-white text-center">
            <span className="text-[6rem]">
              Make an
              <span
                className=" text-transparent ml-5"
                style={{
                  background:
                    "linear-gradient(45deg, red, orange, yellow, green, pink, purple)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {headingText}
              </span>
              {/* <span className=""> </span> */}
              <br /> Portfolio website
            </span>
          </div>
          <div className="w-[100%] flex align-middle justify-center">
            <button className="bg-[#DD6275] rounded-lg p-3 w-48 font-bold hover:bg-[#f48091] text-white">
              Get Started
            </button>
          </div>

          <div className="w-[100%] flex align-middle justify-center mt-[2rem]">
            <div className="bg-white w-[80%] rounded-3xl p-6 border-[5px] border-[#FFDB99]">
              <div className="flex justify-between">
                <img
                  className="portfolio_photo rounded-2xl"
                  src="https://i.pinimg.com/564x/f0/49/dd/f049dde02dfc98bd846149569a048167.jpg"
                  alt="portfolio"
                />
                <img
                  className="portfolio_photo rounded-2xl  border border-gray-500"
                  src="https://i.pinimg.com/564x/bb/8e/82/bb8e821d2a2b598236aba9e1749fbbef.jpg"
                  alt="portfolio"
                />
              </div>

              {/* <div>
                <Template1 />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
