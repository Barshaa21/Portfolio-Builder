//
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/no bg logo.png";
import { useLocation } from "react-router-dom";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : "";
};

export default function Navbar() {
  const location = useLocation();
  const token = getToken();

  const hiddenPaths = [
    "/template1",
    "/template3",
    "/template2",
    "/main/template1",
    "/main/template3",
    "/main/template2",
    "/main",
    "/main/editPortfolio",
  ];

  const shouldShowNavigation = !hiddenPaths.includes(location.pathname);

  return (
    <div className="z-50">
      {shouldShowNavigation && (
        <nav className="fixed top-0 w-screen mx-auto flex items-center justify-between bg-[#1F0F53] p-4 ">
          <ul className="flex space-x-6  text-white">
            <li>
              <a href="/" className="hover:text-gray-300">
                {/* <p
       className={`text-center  text-[1.5rem]  text-[#DD6275] px-9`}
       style={{ fontFamily: "fantasy" }}
     ></p> */}
                <img className="w-[9rem]" src={Logo} />
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-gray-300 text-[1.25rem] text-center m "
                // style={{ fontFamily: "fantasy" }}
              >
                About
              </a>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-gray-300 text-[1.25rem] text-center"
                // style={{ fontFamily: "fantasy" }}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/allTemplates"
                className="hover:text-gray-300 text-[1.25rem] text-center"
                // style={{ fontFamily: "fantasy" }}
              >
                Templates
              </Link>
            </li>
          </ul>
          <Link to="/login">
            <button
              type="submit"
              className="w-[5rem] mr-3 text-white bg-[#DD6275] hover:bg-slate-200 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-gray-200"
            >
              Log In
            </button>
          </Link>
        </nav>
      )}
    </div>
  );
}
