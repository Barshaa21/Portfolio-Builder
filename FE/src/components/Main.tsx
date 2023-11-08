import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import SideBar from "./portfolio/SideBar";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : "";
};

export default function Main() {
  const [ShowSidebar, setShowSidebar] = useState(true);

  const viewSidebar = () => {
    setShowSidebar(!ShowSidebar);
  };
  const tokens = getToken();
  const isEditRoute = location.pathname === "/main/editPortfolio";

  return (
    <>
      <div>
        {tokens ? (
          <div className="">
            {/* <Product /> */}
            <SideBar ShowSidebar={ShowSidebar} viewSidebar={viewSidebar} />
            <div
              className={`ml-[5rem] px-[2rem]   bg-gray-200 min-h-screen ${
                isEditRoute ? "py-[3rem]" : "py-[1.5rem]"
              }`}
            >
              <Outlet context={[ShowSidebar]} />
            </div>
          </div>
        ) : (
          <div>
            <Navigate to="/login" />
          </div>
        )}
      </div>
    </>
  );
}
