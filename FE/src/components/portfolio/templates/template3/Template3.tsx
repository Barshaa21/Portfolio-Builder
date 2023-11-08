import { useLocation } from "react-router-dom";
import T3Home from "./template3components/T3Home";
import T3Sidebar from "./template3components/T3Sidebar";
import T3Contacts from "./template3components/T3Contacts";
import T3Skills from "./template3components/T3Skills";
import T3Projects from "./template3components/T3Projects";

interface Template3Props {
  responsiveWidth: string;
}

export default function Template3({ responsiveWidth }: Template3Props) {
  const location = useLocation();
  const isEditRoute = location.pathname === "/main/editPortfolio";

  //save editroute in redux
  return (
    // <div
    //   className={`w-${
    //     responsiveWidth === "full" ? "full" : parseInt(responsiveWidth)
    //   }  `}
    // >
    <div className="" style={{ width: responsiveWidth + "%" }}>
      <div
        className={`${
          isEditRoute
            ? "overflow-y-scroll h-[40rem] scrollbar-thin scrollbar-rounded-2xl  scrollbar-thumb-gray-400 scrollbar-track-gray-200"
            : ""
        } `}
        style={{ width: responsiveWidth + "%" }}
      >
        <div className="flex">
          <T3Sidebar isEditRoute={isEditRoute} />
          <div>
            <T3Home isEditRoute={isEditRoute} />
            <T3Skills isEditRoute={isEditRoute} />
            <T3Projects isEditRoute={isEditRoute} />
            <T3Contacts isEditRoute={isEditRoute} />
          </div>
        </div>
      </div>
    </div>
  );
}
