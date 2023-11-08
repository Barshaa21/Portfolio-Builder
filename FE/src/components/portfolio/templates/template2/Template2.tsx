// import Lootie from "./temlapte1components/Lootie";
// import T1ContactMe from "./temlapte1components/T1ContactMe";
// import T1Home from "./temlapte1components/T1Home";
// import Navbar from "./temlapte1components/T1Navbar";
// import T1Projects from "./temlapte1components/T1Projects";
// import T1Skills from "./temlapte1components/T1Skills";

// interface Template1Props {
//   responsiveWidth: number;
// }

import { useLocation } from "react-router-dom";
import T2Home from "./templte2components/T2Home";
import T2Projects from "./templte2components/T2Projects";
import T2Navbar from "./templte2components/T2Navbar";

interface Template1Props {
  responsiveWidth: string;
}

export default function Template2({ responsiveWidth }: Template1Props) {
  const location = useLocation();
  const isEditRoute = location.pathname === "/main/editPortfolio";

  //save editroute in redux
  return (
    <div
      className={`${
        isEditRoute
          ? "overflow-y-scroll h-[40rem] scrollbar-thin scrollbar-rounded-2xl  scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          : ""
      } `}
      style={{ width: responsiveWidth + "%" }}
    >
      {" "}
      <T2Navbar isEditRoute={isEditRoute} />
      <T2Home isEditRoute={isEditRoute} />
      <T2Projects isEditRoute={isEditRoute} />
      {/* <Lootie /> */}
    </div>
  );
}
