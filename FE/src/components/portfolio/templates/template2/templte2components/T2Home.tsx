import { useRef, useEffect, useState } from "react";
import lottie from "lottie-web";
import animationData from "../../../../../assets/Photo background.json";

import axios from "axios";
import EditTemplateContent from "../../details/HomeDetails";
import { motion, useScroll, useTransform } from "framer-motion";
import { useSelector } from "react-redux";

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

const getuserId = () => {
  const userId = localStorage.getItem("userId");
  return userId ? JSON.parse(userId) : "6530b5133f9c1019f4cc64f9";
};
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

export default function T2Home({ isEditRoute }: any) {
  const [editProductState, seteditProductStatus] = useState(false);
  const [showeditmodel, setShowEditModel] = useState(false);
  const [selectedProduct, setselectedProduct] = useState([]);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [details, setDetails] = useState<UserDetails>();
  const [CurrentColor, setCurrentColor] = useState("");
  const [loading, setLoading] = useState(true);
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

  const color = useSelector((c: any) => {
    return c.name.name;
  });

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 2], ["0%", "200%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  const showModel = () => {
    setShowEditModel(true);
    // setselectedProduct();
  };
  const closeModel = () => {
    setShowEditModel(false);
    seteditProductStatus(true);
  };
  const changeStatus = () => {
    setAddProductState(true);
  };

  return (
    <div
      ref={scrollRef}
      className={`relative bg-gray-200 text-black   justify-between align-middle  lg:h-screen ${
        isEditRoute ? "hover:border hover:border-blue-400" : ""
      } `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        className="absolute "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#18778F"
          // fill={CurrentColor}
          fill-opacity="0.3"
          d="M0,256L48,234.7C96,213,192,171,288,160C384,149,480,171,576,192C672,213,768,235,864,245.3C960,256,1056,256,1152,224C1248,192,1344,128,1392,96L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <div className="flex  justify-center align-middle">
        <motion.div
          style={{ x: yBg }}
          className="absolute top-32 left-[43%] w-[15rem] "
        >
          {/* <p className="bg-black w-5 ml-[30rem]">{color}</p> */}

          <img
            className="rounded-full border-4 shadow-2xl shadow-black border-black"
            src="https://old.hcu.edu.iq/modules/staf/image/avatar7.png"
          />
        </motion.div>

        <div className="pt-[22rem]  w-[50%]">
          {/* <span className="p-2  text-xl w-[15rem] hover:w-[16rem] text-center bg-gradient-to-r from-purple-100 via-indigo-300 to-pink-200 rounded-lg border border-white">
            Welcome to my Portfolio
          </span> */}
          <motion.p
            style={{ x: yBg2 }}
            className={`text-5xl text-center  my-5 text-[#18778F] `}
          >
            {/* Hi!👋 I'm {details.result.name} */}
            {details && details.result ? (
              <p>Hi!👋 I'm {details.result.name}</p>
            ) : (
              <p>Hi!👋 I'm John Doe </p>
            )}
          </motion.p>
          {details && details.result ? (
            <p className="text-xl text-center text-gray-600">
              {" "}
              {details.result.description}
            </p>
          ) : (
            <p>
              I'm a Full Stack Developer with a passion for creating robust,
              user-friendly web applications and a keen eye for design. With a
              strong foundation in both front-end and back-end technologies, I
              strive to build seamless, innovative solutions that not only meet
              but exceed the needs of clients and users.
            </p>
          )}
        </div>
      </div>

      <svg
        className="absolute bottom-0 "
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          // fill="#18778F"
          fill="#18778F"
          fill-opacity="0.2"
          d="M0,256L48,234.7C96,213,192,171,288,160C384,149,480,171,576,192C672,213,768,235,864,245.3C960,256,1056,256,1152,224C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      {isEditRoute && isMouseOver ? (
        <div className="bg-white cursor-pointer text-black text-xl flex justify-center items-center rounded absolute top-28 right-2">
          <i
            onClick={() => showModel()}
            className={`fa-solid fa-pen-to-square cursor-pointer p-[1rem] `}
          ></i>
        </div>
      ) : null}

      <div className="fixed top-0 left-0">
        {/* <p className="fixed right-0 text-red-800 font-[20rem]">Cross</p> */}
        <EditTemplateContent
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
