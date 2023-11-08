// import Lootie from "./temlapte1components/Lootie";
// import T1ContactMe from "./temlapte1components/T1ContactMe";
// import T1Home from "./temlapte1components/T1Home";
// import Navbar from "./temlapte1components/T1Navbar";
// import T1Projects from "./temlapte1components/T1Projects";
// import T1Skills from "./temlapte1components/T1Skills";

// interface Template1Props {
//   responsiveWidth: number;
// }

// export default function Template1({ responsiveWidth }: Template1Props) {
//   return (
//     <div className={`w-${responsiveWidth}rem`}>
//       <Navbar />
//       <T1Home />
//       <T1Skills />
//       <T1Projects />
//       <T1ContactMe />
//       {/* <Lootie /> */}
//     </div>
//   );
// }

import { useLocation } from "react-router-dom";
import T1ContactMe from "./temlapte1components/T1ContactMe";
import T1Home from "./temlapte1components/T1Home";
import Navbar from "./temlapte1components/T1Navbar";
import T1Projects from "./temlapte1components/T1Projects";
import T1Skills from "./temlapte1components/T1Skills";

interface Template1Props {
  responsiveWidth: string;
}

export default function Template1({ responsiveWidth }: Template1Props) {
  const location = useLocation();
  const isEditRoute = location.pathname === "/main/editPortfolio";

  //save editroute in redux
  return (
    // <div
    //   className={`w-${
    //     responsiveWidth === "full" ? "full" : parseInt(responsiveWidth)
    //   }  `}
    // >

    <div
      className={`${
        isEditRoute
          ? "overflow-y-scroll h-[40rem] scrollbar-thin scrollbar-rounded-2xl  scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          : ""
      } `}
      style={{ width: responsiveWidth + "%" }}
    >
      <Navbar isEditRoute={isEditRoute} />
      <T1Home isEditRoute={isEditRoute} />
      <T1Skills isEditRoute={isEditRoute} />
      <T1Projects isEditRoute={isEditRoute} />
      <T1ContactMe isEditRoute={isEditRoute} />
    </div>
  );
}
