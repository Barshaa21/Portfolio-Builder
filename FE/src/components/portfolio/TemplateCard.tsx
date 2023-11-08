import { useState } from "react";
import { GoScreenNormal } from "react-icons/go";
import { useDispatch } from "react-redux";
import { setId } from "../../features/IdSlice";

export default function TemplateCard({
  imageSrc,
  showModel,
  id,
  template,
}: any) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const dispatch = useDispatch();

  const showid = () => {
    dispatch(setId(id));
    localStorage.setItem("templateId", JSON.stringify(id));
    console.log(id, "template");
    console.log(template, "template");
  };

  return (
    <div className="group relative bg-white h-[35rem] w-[25rem] rounded-xl transform hover:scale-105 transition-transform duration-300">
      <div className={`h-full hover:blur-sm ${isHovered ? "blur-sm" : "none"}`}>
        <img
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="portfolio_photo rounded-2xl h-full w-full btn-hover:blur border shadow-2xl"
          src={imageSrc}
          alt="portfolio"
        />
      </div>
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={showModel}
        className="border shadow-2xl opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-[#DD6275] hover:bg-[#ef8d9c] hover:text-white transition-opacity duration-300 ease-in-out"
      >
        <div className="flex text-lg gap-3 font-semibold" onClick={showid}>
          View Template
          <GoScreenNormal className="font-bold text-2xl mt-1" />
        </div>
      </button>
    </div>
  );
}
