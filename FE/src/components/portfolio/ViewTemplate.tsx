import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// @ts-ignore
import Pulse from "react-reveal/Pulse";
import Template1 from "./templates/template1/Template1";
import Logo from "../../assets/no bg logo.png";
import { useSelector, useDispatch } from "react-redux";

// Icons
import { FaDesktop } from "react-icons/fa";
import { BsTabletLandscape } from "react-icons/bs";
import { GiSmartphone } from "react-icons/gi";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsArrowsFullscreen } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import Template3 from "./templates/template3/Template3";
import Template2 from "./templates/template2/Template2";

interface IFormInput {
  ProductID: string;
  ImageURL: string;
  ProductName: string;
  Status: string;
  Quantity: number;
}
const getuserId = () => {
  const userId = localStorage.getItem("userId");
  return userId ? JSON.parse(userId) : "";
};
const getTemplateId = () => {
  const templateId = localStorage.getItem("templateId");
  return templateId ? JSON.parse(templateId) : "";
};

export default function ViewTemplate({
  showeditmodel,
  selectedProduct,
  closeModel,
}: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  // useEffect(() => {
  //   reset(selectedProduct);
  // }, [selectedProduct]);

  // const handleClose =(e:any){
  //   if(e.target.id === "container") {closeModel()}
  // }
  const [responsiveWidth, setResponsiveWidth] = useState("100");
  const [loading, setLoading] = useState(true);

  // const template_id = useSelector((c: any) => {
  //   return c.id.id;
  // });
  const template_id = getTemplateId();
  console.log(template_id, "id from viewtemplate");

  const handleClose = (e: any) => {
    if (e.target.id === "container") {
      closeModel();
    }
  };

  if (!showeditmodel) {
    return null;
  }

  const saveTemplateId = () => {
    const newData = {
      template_id: template_id,
      user_id: getuserId(),
    };

    axios
      .post("http://localhost:4000/user/addDetails", newData)
      .then((res) => {
        console.log(res.data);
        toast.success("You have submitted!");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Fill the information correctly");
      });
  };

  return (
    <div
      id="container"
      // className="flex justify-center items-center "
      className="absolute top-0  bg-gray-300   w-screen h-screen bg-opacity-80 backdrop-blur-sm flex justify-center items-center"
      onClick={handleClose}
    >
      <Pulse>
        <div className=" justify-center w-full ml-[10rem] mr-[12rem] bg-white ">
          <nav className="p-3 px-11 bg-gray-200 flex justify-between  sticky top-0 w-full ">
            <div className="flex gap-7">
              <button
                className=" border border-gray-500 text-gray-700 p-[0.75rem] mt-0  rounded-lg  font-bold flex gap-2 hover:bg-[#9b9696] "
                onClick={closeModel}
              >
                <BiArrowBack className="mt-1 font-bold text-lg" />
                GO BACK
              </button>
              {/* <img className="w-[10rem]" src={Logo} /> */}
              <div className="flex gap-7 mt-2">
                <FaDesktop
                  className="font-bold text-3xl cursor-pointer hover:text-[#DD6275]"
                  onClick={() => setResponsiveWidth("100")}
                />
                <BsTabletLandscape
                  className="font-bold text-3xl cursor-pointer hover:text-[#DD6275]"
                  onClick={() => setResponsiveWidth("60")}
                />
                <GiSmartphone
                  className="font-bold text-3xl cursor-pointer hover:text-[#DD6275]"
                  onClick={() => setResponsiveWidth("30")}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <NavLink
                to={`/template${template_id}`}
                target="_blank"
                className=""
              >
                <button className="bg-[#DD6275] flex gap-3 p-[0.75rem]  rounded-lg border text-white shadow-2xl font-bold hover:bg-[#ef8494]">
                  VIEW FULL SITE
                  <BsArrowsFullscreen className="font-bold text-lg mt-1" />
                </button>
              </NavLink>
              <a href={`/main/template${template_id}`} className="">
                {/* <a href="/form" className=""> */}
                <button
                  className="bg-[#DD6275] p-[0.75rem] rounded-lg text-white font-bold flex gap-2 hover:bg-[#ef8494]"
                  onClick={saveTemplateId}
                >
                  TRY THIS DESIGN
                  <AiOutlineArrowRight className="font-extrabold mt-1 text-lg" />
                </button>
              </a>
            </div>
          </nav>
          <div className="scrollbar-thin scrollbar-rounded-2xl scrollbar-thumb-gray-400 scrollbar-track-gray-200 mx-10  mb-[1.5rem] mt-[1.5rem] rounded-2xl flex align-middle justify-center h-[35rem] overflow-y-scroll  ">
            {!template_id && <Template1 responsiveWidth={responsiveWidth} />}
            {template_id === 1 && (
              <Template1 responsiveWidth={responsiveWidth} />
            )}
            {template_id === 2 && (
              <Template2 responsiveWidth={responsiveWidth} />
            )}
            {template_id === 3 && (
              <Template3 responsiveWidth={responsiveWidth} />
            )}
          </div>
        </div>
      </Pulse>
      <ToastContainer />
    </div>
  );
}
