import { Link, NavLink } from "react-router-dom";
// import Logout from "../Logout";
import { useSelector } from "react-redux";
import { RiLogoutBoxLine } from "react-icons/ri";
import Logo from "../../assets/logo-main-2.png";
import { BiEdit } from "react-icons/bi";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setId } from "../../features/IdSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Template1 from "../../assets/portfolio-1.jpg";
import Template3 from "../../assets/template2.jpg";
import Template2 from "../../assets/template3.jpg";
import { setName } from "../../features/ColorSlice";

interface Iprops {
  ShowSidebar: boolean;
  viewSidebar: () => void;
}

const getuserId = () => {
  const userId = localStorage.getItem("userId");
  return userId ? JSON.parse(userId) : "";
};
const getTemplateId = () => {
  const templateId = localStorage.getItem("templateId");
  return templateId ? JSON.parse(templateId) : "";
};
const classNameFunc = ({ isActive }: any) =>
  // isActive
  //   ? // ? "active_link bg-white font-bold  inset-0 flex text-center w-full bg-opacity-50 backdrop-blur-lg  border border-gray-300"
  //     "active_link bg-[#DD6275]  font-bold  underline underline-white  flex text-center w-full rounded-full rounded-tr-none rounded-br-none  border-l border-gray-300"
  //   : " flex text-center text-center w-full";
  isActive
    ? // ? "active_link bg-white font-bold  inset-0 flex text-center w-full bg-opacity-50 backdrop-blur-lg  border border-gray-300"
      "active_link bg-gray-800 p-2  font-bold  underline underline-white  flex text-center rounded-tr-none rounded-br-none  border-l border-gray-300"
    : " flex text-center text-center w-full";

export default function SideBar({ ShowSidebar, viewSidebar }: Iprops) {
  const [templateOpen, setTemplateOpen] = useState(false);
  const [ColorPlatteOpen, setColorPlatteOpen] = useState(false);
  const [CurrentColor, setCurrentColor] = useState("");

  const toggle = () => {
    setTemplateOpen(!templateOpen);
  };

  const toggleColor = () => {
    setColorPlatteOpen(!ColorPlatteOpen);
  };
  const dispatch = useDispatch();

  const theme = useSelector((c: any) => {
    // console.log(c.theme.theme);
    return c.theme.theme;
  });
  const data = useSelector((c: any) => {
    return c.admin.value;
  });

  // const showid = (id: any) => {
  //   dispatch(setId(id));
  //   localStorage.setItem("templateId", JSON.stringify(id));
  //   console.log(id, "template");
  //   // console.log(template, "template");
  // };

  const saveTemplateId = (id: any) => {
    const newData = {
      template_id: id,
      user_id: getuserId(),
    };
    dispatch(setId(id));
    localStorage.setItem("templateId", JSON.stringify(id));
    console.log(id, "template");

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

  useEffect(() => {
    const currentColor = localStorage.getItem("color");
    dispatch(setName(currentColor));
    if (currentColor) {
      setCurrentColor(currentColor);
    }
  });

  const handleColor = (color: any) => {
    setCurrentColor(color);
    localStorage.setItem("template-color", color);
  };

  return (
    <div
      className={`bg-cover  ${
        theme == "gray-200" ? "bg-gray-600" : "bg-white "
      } bg-no-repeat`}
    >
      {templateOpen ? (
        <div className=" bg-gray-200 border-4 flex flex-wrap gap-3 w-[34rem] border-black rounded-2xl absolute z-[99999] top-20 left-[6rem] p-5">
          <p className="text-center text-gray-200">Choose a template </p>
          <a
            href={`/main/template1`}
            className="flex flex-col justify-center align-middle"
          >
            {/* <a href="/form" className=""> */}
            <img
              onClick={() => saveTemplateId(1)}
              className="h-[10rem] w-[15rem] border-4 border-black rounded-2xl mb-1"
              src={Template1}
            />
            <button
              className="bg-[#383636] text-center  p-[0.75rem] rounded-lg text-white  hover:bg-[#7f7d7d]"
              // onClick={saveTemplateId}
              onClick={() => saveTemplateId(1)}
            >
              TRY TEMPLATE 1
            </button>
          </a>
          <a href={`/main/template2`} className="flex flex-col">
            <img
              onClick={() => saveTemplateId(2)}
              className="h-[10rem] w-[15rem] rounded-2xl mb-1  border-4 border-black"
              src={Template2}
            />
            <button
              className="bg-[#383636] text-center  p-[0.75rem] rounded-lg text-white   hover:bg-[#7f7d7d]"
              // onClick={saveTemplateId}
              onClick={() => saveTemplateId(2)}
            >
              TRY TEMPLATE 2
            </button>
          </a>
          <a href={`/main/template3`} className="flex flex-col">
            <img
              onClick={() => saveTemplateId(3)}
              className="h-[10rem] w-[15rem] rounded-2xl mb-1 border-4 border-black"
              src={Template3}
            />
            <button
              className="bg-[#383636] text-center  p-[0.75rem] rounded-lg text-white  hover:bg-[#7f7d7d]"
              // onClick={saveTemplateId}
              onClick={() => saveTemplateId(3)}
            >
              TRY TEMPLATE 3
            </button>
          </a>

          {/* <div onClick={() => showid(1)}>Template1</div>
          <div onClick={() => showid(2)}>Template2</div>
          <div onClick={() => showid(3)}>Template3</div> */}
        </div>
      ) : (
        ""
      )}
      {ColorPlatteOpen ? (
        <div className=" bg-gray-200 border-4 flex flex-wrap gap-3 w-[15rem] border-black rounded-2xl absolute z-[99999] top-20 left-[6rem] p-5">
          <p className="font-bold">Choose a Template color</p>
          <div className="bg-white p-2 flex flex-wrap gap-2 rounded-2xl">
            <div
              className="bg-[#232323] w-7 h-7 rounded-full"
              onClick={() => handleColor("#232323")}
            >
              1
            </div>
            <div
              className="bg-[#e94343] w-7 h-7 rounded-full"
              onClick={() => handleColor("#e94343")}
            >
              {" "}
            </div>
            <div className="bg-[#52d54b] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#59a6fe] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#bce24b] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#e054b4] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#232323] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#232323] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#232323] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#232323] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#232323] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#232323] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#232323] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#43d75e] w-7 h-7 rounded-full"> </div>
            <div className="bg-[#72aebd] w-7 h-7 rounded-full"> </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* <div className={`bg-[${CurrentColor}]`}>this is colotester</div> */}
      {ShowSidebar ? (
        <>
          <div
            className={`navbar cursor-pointer  bg-cover ${
              theme == "gray-200" ? "bg-[#232323]" : "bg-black"
            }
            bg-no-repeat`}
            // bg-hero-pattern
          >
            <li className="flex gap-7">
              <a href="/">
                <img
                  className="w-[3rem] mt-5 p-1 rounded-2xl ml-4 bg-gray-200 mb-[2rem]"
                  src={Logo}
                />
              </a>
            </li>

            <li className={`text-gray-700  text-center w-full `}>
              {/* <NavLink
                className={classNameFunc}
                to="/  main/editPortfolio"
                // className="flex text-center"
              > */}
              <div className="mb-7" onClick={toggle}>
                <i
                  className={`fa-solid fa-palette   text-[1.5rem] ${
                    theme == "gray-200" ? "text-white" : "text-white "
                  }`}
                ></i>
                <p
                  className={`text-gray-700 px-3  text-sm ${
                    theme == "gray-200" ? "text-white" : "text-white"
                  }`}
                >
                  Templates
                </p>
              </div>
              {/* </NavLink> */}
            </li>
            <li className={`text-gray-700  text-center w-full `}>
              <NavLink
                className={classNameFunc}
                to="/main/editPortfolio"
                // className="flex text-center"
              >
                <div className="">
                  <i
                    className={`fa-solid fa-pen-to-square cursor-pointer  ml-[1.9rem] text-[1.4rem] ${
                      theme == "gray-200" ? "text-white" : "text-white "
                    }`}
                  ></i>
                  <p
                    className={`text-gray-700 pl-6 text-sm ${
                      theme == "gray-200" ? "text-white" : "text-white"
                    }`}
                  >
                    Edit
                  </p>
                </div>
              </NavLink>
            </li>
            {/* <li className={`text-gray-700  text-center w-full `}>
              <div className="mb-7" onClick={toggleColor}>
                <i
                  className={`fa-solid fa-palette   text-[1.5rem] ${
                    theme == "gray-200" ? "text-white" : "text-white "
                  }`}
                ></i>
                <p
                  className={`text-gray-700 px-3  text-sm ${
                    theme == "gray-200" ? "text-white" : "text-white"
                  }`}
                >
                  Templates
                </p>
              </div>
            </li> */}

            <button className="bg-[#a6a6a6]  p-3 h-[3rem] border fixed bottom-7 left-[1rem] rounded-xl hover:bg-[#eb7c7c] shadow-lg hover:border-red-400 ">
              <Link to="/logout">
                <div className="flex  items-center gap-2">
                  {/* <i className="fa-solid fa-right-from-bracket text-xl p-0 "></i> */}
                  <RiLogoutBoxLine className="text-white font-bold " />
                  {/* <span className="text-[1rem] text-white"></span> */}
                </div>
              </Link>
            </button>
          </div>
        </>
      ) : (
        <i
          className="fa-solid fa-bars text-white cursor-pointer text-[1.5rem] m-2.5"
          onClick={viewSidebar}
        ></i>
      )}
    </div>
  );
}
