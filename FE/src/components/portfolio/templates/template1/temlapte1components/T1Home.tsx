import { useRef, useEffect, useState } from "react";
import lottie from "lottie-web";
import animationData from "../../../../../assets/coding_animation.json";

import axios from "axios";
import HomeDetails from "../../details/HomeDetails";

const LottieAnimation = () => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      //@ts-ignore
      container: animationContainer.current,
      animationData: animationData,
      loop: true, // Set loop to true if you want the animation to loop
      autoplay: true, // Set autoplay to true if you want the animation to start automatically
    });

    // Optional: You can control the animation with the `anim` variable, e.g., anim.play(), anim.stop(), etc.

    return () => {
      // Clean up the animation when the component unmounts
      anim.destroy();
    };
  }, []);

  return <div ref={animationContainer} />;
};

// const getuserId = () => {
//   const userId = localStorage.getItem("userId");
//   return userId ? JSON.parse(userId) : "";
// };
interface IDetails {
  result: object;
  name: string;
  description: string;
}
interface UserDetails {
  result: {
    name: string;
    description: string;
    // Define other properties here if necessary
  };
}

export default function T1Home({ isEditRoute }: any) {
  const [editProductState, seteditProductStatus] = useState(false);
  const [showeditmodel, setShowEditModel] = useState(false);
  const [selectedProduct, setselectedProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [details, setDetails] = useState<UserDetails>();
  const [addProductState, setAddProductState] = useState(false);

  const handleMouseEnter = () => setIsMouseOver(true);
  const handleMouseLeave = () => setIsMouseOver(false);

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
        console.log("showDetails", response.data);
        console.log("showDetails", response.data.result.name);
        setDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
    setAddProductState(false);
  }, [addProductState]);

  const showModel = () => {
    setShowEditModel(true);
    // setselectedProduct();
  };
  const closeModel = () => {
    setShowEditModel(false);
    seteditProductStatus(true);
    // setAddProductState(true);
  };
  const changeStatus = () => {
    setAddProductState(true);
  };
  return (
    <div
      id="home"
      className={` relative bg-black text-white flex flex-col lg:flex-row justify-between align-middle px-20 h-screen ${
        isEditRoute ? "hover:border hover:border-blue-400" : ""
      } `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isEditRoute && isMouseOver ? (
        <div className="bg-white text-black text-xl flex justify-center items-center rounded absolute top-0 right-2">
          <i
            onClick={() => showModel()}
            className={`fa-solid fa-pen-to-square cursor-pointer p-[1rem] `}
          ></i>
        </div>
      ) : null}
      {loading ? (
        // <img src="https://i.pinimg.com/originals/3d/6a/a9/3d6aa9082f3c9e285df9970dc7b762ac.gif" />
        <img
          className="bg-black ml-[45%] rounded-full h-[6rem] mt-[17rem]"
          src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"
        />
      ) : (
        <>
          <div className="bg-black flex flex-col align-middle justify-center m-[5rem] w-[50%]">
            <span className="p-2  text-xl w-[15rem] hover:w-[16rem] text-center bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900 rounded-lg border border-white">
              Welcome to my Portfolio
            </span>
            <p className={`text-5xl my-5 text-[#f056eb] `}>
              {/* Hi!👋 I'm {details.result.name} */}
              {details && details.result ? (
                <p>Hi!👋 I'm {details.result.name}</p>
              ) : (
                <p>Hi!👋 I'm John Doe </p>
              )}
            </p>
            {details && details.result ? (
              <p> {details.result.description}</p>
            ) : (
              <p>
                I'm a Full Stack Developer with a passion for creating robust,
                user-friendly web applications and a keen eye for design. With a
                strong foundation in both front-end and back-end technologies, I
                strive to build seamless, innovative solutions that not only
                meet but exceed the needs of clients and users.
              </p>
            )}
            {/* <p className="text-gray-300 text-lg mb-4">
          I'm a Full Stack Developer with a passion for creating robust,
          user-friendly web applications and a keen eye for design. With a
          strong foundation in both front-end and back-end technologies, I
          strive to build seamless, innovative solutions that not only meet but
          exceed the needs of clients and users.
        </p> */}
            <button className="text-white  hover:bg-gray-400 shadow-2xl border border-white text-lg w-[10rem] hover:text-black p-2 rounded-xl mt-3 font-bold">
              Contact Me
            </button>
          </div>
          <div className="pt-10 sm:pb-[10rem] pb-0 lg:p-[1rem] ">
            <LottieAnimation />
          </div>
        </>
      )}

      <div className="fixed top-0 left-0">
        <HomeDetails
          showeditmodel={showeditmodel}
          closeModel={closeModel}
          selectedProduct={selectedProduct}
          changeStatus={changeStatus}
          selectedName={details && details.result.name}
          selectedDescription={details && details.result.description}
        />
      </div>
    </div>
  );
}
