const projects = [
  {
    image:
      "https://canonicalized.com/wp-content/uploads/2023/01/Inventory-Dashboard-1024x853.png",
    title: "Inventory Management System",
  },
  {
    image:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--51RtiLTV--/c_imagga_scale,f_auto,fl_progressive,h_1080,q_auto,w_1080/https://dev-to-uploads.s3.amazonaws.com/i/in7r7auvg6xujj5fm1gm.png",
    title: "Todos List",
  },
  {
    image:
      "https://www.lifewire.com/thmb/f5RN5B_1uGMmqlr03fCQyP6-Vjw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vudu-free-movies-release-date-526fbd148cfb4458858c25576f6bc326.png",
    title: "Movies Booking website",
  },
  {
    image:
      "https://www.accessone.io/Blog/image.axd?picture=/benefits-of-Flight-reservation-system.jpg",
    title: "Todos website",
  },
];
import { useRef, useEffect, useState } from "react";
import ProjectsDetails from "../../details/ProjectsDetails";
import animationData from "../../../../../assets/backrground.json";
import lottie from "lottie-web";
import axios from "axios";
import { motion } from "framer-motion";

interface ProjectDetails {
  name: string;
  description: string;
  image: string;
  id: string;
}
function getuserId() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    localStorage.setItem("userId", "6530b5133f9c1019f4cc64f9");
    return "6530b5133f9c1019f4cc64f9";
  }
  return userId ? JSON.parse(userId) : "";
}

export default function T3Projects({ isEditRoute }: any) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [editProductState, seteditProductStatus] = useState(false);
  const [showeditmodel, setShowEditModel] = useState(false);
  const [selectedProduct, setselectedProduct] = useState([]);
  const [details, setDetails] = useState<ProjectDetails[]>([]);
  const [addProjects, setAddProjects] = useState(false);
  const [deleteProjects, setDeleteProjects] = useState(false);

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
    console.log(userId, "skills");

    axios
      // .get("http://localhost:4000/user/showDetails", userId)
      .get(`http://localhost:4000/user/showDetails?userId=${userId}`)
      .then((response) => {
        // console.log("showskills", response.data);
        // console.log("showskills", response.data.result.skills);

        setDetails(response.data.result.projects);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    setAddProjects(false);
    setDeleteProjects(false);
  }, [addProjects, deleteProjects]);

  const handleMouseEnter = () => setIsMouseOver(true);
  const handleMouseLeave = () => setIsMouseOver(false);
  const showModel = () => {
    setShowEditModel(true);
    // setselectedProduct();
  };
  const closeModel = () => {
    setShowEditModel(false);
    seteditProductStatus(true);
  };
  const addState = () => {
    setAddProjects(true);
  };
  const deleteModel = (ID: string) => {
    setDeleteProjects(true);
    const user_id = getuserId();
    // setdeleteProduct(true);
    axios
      .delete("http://localhost:4000/user/deleteProjects", {
        data: { Skill_ID: ID, user_id: user_id }, // Passing the data as an object
      })
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  return (
    <div
      id="projects"
      className={`relative pb-7 min-h-[30rem]   bg-[#dad9d9] ${
        isEditRoute ? "hover:border hover:border-blue-400" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isEditRoute && isMouseOver ? (
        <div className="bg-white text-black text-xl flex justify-center items-center rounded absolute top-2 right-2">
          <i
            onClick={() => showModel()}
            className={`fa-solid fa-plus cursor-pointer p-[1rem] `}
          ></i>
        </div>
      ) : null}

      <p className="text-3xl text-center underline font-bold text-[#dc5a6d] mr-[6rem] mb-[3rem]">
        Projects
      </p>

      <div className="z-50  flex flex-wrap gap-10 justify-center  ">
        {details.map((project, index) => (
          <div key={index} className=" ">
            {isEditRoute ? (
              <div className="bg-black mb-1 w-[2.3rem]  text-white rounded-full ">
                {/* <i
                      onClick={() => showModel()}
                      className={`fa-solid fa-pen cursor-pointer p-[1rem] hover:text-[#f056eb]`}
                    ></i> */}
                <i
                  onClick={() => deleteModel(project.id)}
                  className={`fa-solid fa-trash font-extrabold text-2xl cursor-pointer p-[0.5rem] hover:text-[#ef6969] `}
                ></i>
              </div>
            ) : null}
            <motion.div
              className=" box border border-black shadow-white  w-[22rem] bg-white  rounded-2xl h-[23rem] mb-5   hover:bg-gray-300"
              initial={{ opacity: 0.5, scale: 0.8 }}
              transition={{ duration: 2 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              <svg
                className="p-0 m-0 w-full rounded-2xl"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 350"
              >
                <path
                  fill="#00000"
                  fill-opacity="1"
                  d="M0,224L80,202.7C160,181,320,139,480,149.3C640,160,800,224,960,256C1120,288,1280,288,1360,288L1440,288L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
                ></path>
              </svg>
              <img
                className=" h-[15rem] px-5 rounded-3xl w-[25rem]"
                src={project.image}
                alt={project.name}
              />
              <p className="font-bold text-xl  text-center">{project.name}</p>
              <div className="w-[22rem]   rounded-b-2xl bg-[#1e1d1d] text-[#161616]">
                This div
              </div>
            </motion.div>
          </div>
        ))}
      </div>
      <div className="fixed top-0 left-0">
        {/* <p className="fixed right-0 text-red-800 font-[20rem]">Cross</p> */}
        <ProjectsDetails
          showeditmodel={showeditmodel}
          closeModel={closeModel}
          addState={addState}
          // selectedProduct={selectedProduct}
        />
      </div>
    </div>
  );
}
