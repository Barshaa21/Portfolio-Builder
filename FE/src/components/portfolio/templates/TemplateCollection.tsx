import Carousel from "react-elastic-carousel";
// import Template1 from "./template1/Template1";
import { useEffect, useState } from "react";
//@ts-ignore
import Pulse from "react-reveal/Pulse";
import { GoScreenNormal } from "react-icons/go";
import ViewTemplate from "../ViewTemplate";
import Template1 from "../../../assets/portfolio-1.jpg";
import Template3 from "../../../assets/template2.jpg";
import Template2 from "../../../assets/template3.jpg";

import TemplateCard from "../TemplateCard";

const templateData = [
  {
    id: 1,
    imageSrc: Template1,
    template: "<Template1>",
  },
  {
    id: 2,
    imageSrc: Template2,
    template: "<Template2>",
  },
  {
    id: 3,
    imageSrc: Template3,
    template: "<Template3>",
  },
  {
    id: 4,
    imageSrc:
      "https://i.pinimg.com/564x/f0/49/dd/f049dde02dfc98bd846149569a048167.jpg",
  },
  {
    id: 5,
    imageSrc:
      "https://i.pinimg.com/564x/bb/8e/82/bb8e821d2a2b598236aba9e1749fbbef.jpg",
  },
];
interface ITemplate {
  _id: string;
}
export default function TemplateCollection() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [editProductState, seteditProductStatus] = useState(false);
  const [showeditmodel, setShowEditModel] = useState(false);
  const [selectedProduct, setselectedProduct] = useState<ITemplate[]>([]);
  const [templateID, settemplateID] = useState(1);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 3 },
  ];
  const showModel = (template: any) => {
    setSelectedTemplate(template);
    setShowEditModel(true);
    // setselectedProduct();
  };
  const closeModel = () => {
    setShowEditModel(false);
    seteditProductStatus(true);
  };
  const handleKeyPress = (event: any) => {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      // Prevent default behavior of arrow keys (e.g., scrolling the page)
      event.preventDefault();

      // Navigate to the next or previous slide based on the key press
      if (event.key === "ArrowRight") {
        carousel.slideNext();
      } else if (event.key === "ArrowLeft") {
        carousel.slidePrev();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  let carousel: any;

  return (
    <div className="bg-[#1F0F53] h-screen pt-[4.5rem]">
      {/* <p>Choose a template</p> */}
      <div className="flex justify-between px-[1rem]">
        <Carousel
          className="p-4 pt-10 rounded-3xl inset-6 custom-carousel"
          ref={(ref) => (carousel = ref)}
          breakPoints={breakPoints}
          onKeyDown={handleKeyPress}
        >
          {templateData.map((template, index) => (
            <TemplateCard
              id={template.id}
              key={index}
              imageSrc={template.imageSrc}
              template={template.template}
              showModel={() => showModel(template)}
            />
          ))}
        </Carousel>
      </div>
      <div className="fixed top-0 left-0">
        {/* <p className="fixed right-0 text-red-800 font-[20rem]">Cross</p> */}
        <ViewTemplate
          showeditmodel={showeditmodel}
          closeModel={closeModel}
          selectedProduct={selectedProduct}
        />
      </div>
    </div>
  );
}
