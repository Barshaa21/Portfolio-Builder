import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : "";
};
interface UserDetails {
  name: string;
  description: string;
  // Define other properties here if necessary
}

export default function Navbar({ isEditRoute }: any) {
  const [details, setDetails] = useState<UserDetails>();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserId = () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        // Set a default userId when it's not found in local storage
        const defaultUserId = "6530b5133f9c1019f4cc64f9";
        localStorage.setItem("userId", JSON.stringify(defaultUserId));
        return defaultUserId;
      }
      return userId ? JSON.parse(userId) : "";
    };
    const userId = getUserId();
    axios
      .get(`http://localhost:4000/user/showDetails?userId=${userId}`)
      .then((response) => {
        console.log("navbar", response.data.result.name);
        setDetails(response.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);
  // const location = useLocation();
  // const token = getToken();
  return (
    <div
      // className={`  fixed top-0 z-50 w-screen ${
      className={`  sticky top-0 z-10  ${
        isEditRoute ? "hover:border hover:border-blue-300" : " "
      }`}
    >
      {Loading ? (
        <div className="bg-black w-full flex justify-center">
          <img
            className="h-7 w-7  "
            src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"
          />
        </div>
      ) : (
        <nav
          className={`sticky top-0 mx-auto flex items-center justify-between bg-black p-3  ${
            isEditRoute ? "rounded-t-3xl" : ""
          }`}
        >
          <ul className="flex space-x-6  text-white">
            <li>
              <NavLink to="/" className="hover:text-gray-300">
                <p
                  className={`text-center  text-[1.5rem]  text-[#f056eb] px-9`}
                >
                  {details ? <p> {details.name}</p> : <p>John Doe </p>}
                </p>
              </NavLink>
            </li>
            <li>
              <a
                href="#home"
                className="hover:text-[#f056eb] text-[1.4rem] text-center m "
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="hover:text-[#f056eb] text-[1.4rem] text-center"
              >
                Skills
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-[#f056eb] text-[1.4rem] text-center"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                href="#contacts"
                className="hover:text-[#f056eb] text-[1.4rem] text-center"
              >
                Contacts
              </a>
            </li>
          </ul>
          <button
            type="submit"
            className="w-[10rem] text-black bg-white  hover:bg-slate-200 font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue active:bg-gray-200"
          >
            Let's Connect
          </button>
        </nav>
      )}
    </div>
  );
}
