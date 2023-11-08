import { useRef, useEffect, useState } from "react";
import lottie from "lottie-web";
import animationData from "../../../../../assets/template3animation.json";
import axios from "axios";
import EditTemplateContent from "../../details/HomeDetails";
import { motion, useScroll, useTransform } from "framer-motion";

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
  return userId ? JSON.parse(userId) : "";
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

export default function T3Home({ isEditRoute }: any) {
  const [editProductState, seteditProductStatus] = useState(false);
  const [showeditmodel, setShowEditModel] = useState(false);
  const [selectedProduct, setselectedProduct] = useState([]);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [loading, setLoading] = useState(true);
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
  };
  const changeStatus = () => {
    setAddProductState(true);
  };

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 5], ["0%", "400%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  return (
    <div id="home" className="bg-gray-900 pt-4 pb-0 " ref={scrollRef}>
      <div
        className={`relative  rounded-t-3xl p-2 pb-28 ml-0 bg-[#dad9d9] min-h-screen  flex flex-col lg:flex-row lg:justify-between lg:align-middle px-20  ${
          isEditRoute ? "hover:border-4 hover:border-[#dc5a6d]" : ""
        } `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isEditRoute && isMouseOver ? (
          <div className="bg-white text-black text-xl flex  justify-center items-center rounded absolute top-2 right-2">
            <i
              onClick={() => showModel()}
              className={`fa-solid fa-pen-to-square cursor-pointer p-[1rem] `}
            ></i>
          </div>
        ) : null}
        {loading ? (
          <img
            className=" ml-[45%] rounded-full h-[6rem] mt-[17rem]"
            src="https://www.superiorlawncareusa.com/wp-content/uploads/2020/05/loading-gif-png-5.gif"
          />
        ) : (
          <>
            <motion.div style={{ x: yBg }} className="lg:pt-20 lg:w-[37rem] ">
              <LottieAnimation />
            </motion.div>
            <motion.div
              style={{ x: yBg2 }}
              className="flex flex-col align-middle lg:justify-center lg:w-[45%]"
            >
              <p
                className={`lg:text-4xl text-6xl font-bold lg:my-5 my-9  text-[#dc5a6d] `}
              >
                {/* Hi!👋 I'm {details.result.name} */}
                {details && details.result ? (
                  <p>Hi!👋 I'm {details.result.name}</p>
                ) : (
                  <p>Hi!👋 I'm John Doe </p>
                )}
              </p>
              {details && details.result ? (
                <p className="text-gray-700 text-lg">
                  {details.result.description}
                </p>
              ) : (
                <p className="text-gray-700 text-lg">
                  I'm a Full Stack Developer with a passion for creating robust,
                  user-friendly web applications and a keen eye for design. With
                  a strong foundation in both front-end and back-end
                  technologies, I strive to build seamless, innovative solutions
                  that not only meet but exceed the needs of clients and users.
                </p>
              )}

              <button className="  hover:bg-[#fb8698] bg-[#dc5a6d] shadow-2xl border  text-lg w-[10rem] text-white p-2 rounded-xl mt-7 font-bold">
                Contact Me
              </button>
            </motion.div>
          </>
        )}

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
    </div>
  );
}
