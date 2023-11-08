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
  // const location = useLocation();
  // const token = getToken();

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
  return (
    <div
      className={` ${isEditRoute ? "hover:border hover:border-blue-900" : " "}`}
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
          className={`h-screen sticky left-0 top-0  w-[5rem]  flex  bg-gray-900 p-3  ${
            isEditRoute ? "" : ""
          }`}
        >
          <ul className=" space-x-3   text-white">
            <li>
              <NavLink to="/" className="hover:text-gray-300">
                {details ? (
                  <p className="text-center  text-[1.5rem]  text-[#dc5a6d] pb-48">
                    {details.name}
                  </p>
                ) : (
                  <p className="text-center  text-[1.5rem]  text-[#dc5a6d] pb-48">
                    John Doe
                  </p>
                )}

                {/* <p className={`text-center  text-[1.5rem]  text-[#dc5a6d] pb-56`}>
                John Doe
              </p> */}
              </NavLink>
            </li>
            <li>
              <a
                href="#home"
                className="hover:text-[#dc5a6d] text-[1.4rem] text-center   "
              >
                <i className="fa-solid fa-house mb-5"></i>
              </a>
            </li>
            <li>
              <a
                href="#skills"
                className="hover:text-[#dc5a6d] text-[1.4rem] text-center"
              >
                <i className="fa-solid fa-pen-nib mb-5"></i>
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className="hover:text-[#dc5a6d] text-[1.4rem] text-center"
              >
                <i className="fa-solid fa-list-check mb-5"></i>
              </a>
            </li>
            <li>
              <a
                href="#contacts"
                className="hover:text-[#dc5a6d] text-[1.4rem] text-center"
              >
                <i className="fa-solid fa-phone mb-5"></i>{" "}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
