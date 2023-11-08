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
        <header>
          {/* <nav className=" mx-auto flex items-center justify-between bg-black p-4">
            <ul className="flex space-x-6  text-white">
              <li>
                <a href="/" className="hover:text-gray-300">
                  <p
                    className={`text-center  text-[1.5rem]  text-gray-300 px-9`}
                    style={{ fontFamily: "fantasy" }}
                  >
                    Portico
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-gray-300 text-[1.5rem] text-center m "
                  style={{ fontFamily: "fantasy" }}
                >
                  About
                </a>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-gray-300 text-[1.5rem] text-center"
                  style={{ fontFamily: "fantasy" }}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/allTemplates"
                  className="hover:text-gray-300 text-[1.5rem] text-center"
                  style={{ fontFamily: "fantasy" }}
                >
                  Templates
                </Link>
              </li>
            </ul>
            <button
              type="submit"
              className="w-[5rem] bg-white hover:bg-slate-200 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-gray-200"
            >
              Log In
            </button>
          </nav> */}
        </header>
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
