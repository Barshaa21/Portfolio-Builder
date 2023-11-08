// const projects = [
//   {
//     image:
//       "https://canonicalized.com/wp-content/uploads/2023/01/Inventory-Dashboard-1024x853.png",
//     title: "Inventory Management System",
//   },
//   {
//     image:
//       "https://res.cloudinary.com/practicaldev/image/fetch/s--51RtiLTV--/c_imagga_scale,f_auto,fl_progressive,h_1080,q_auto,w_1080/https://dev-to-uploads.s3.amazonaws.com/i/in7r7auvg6xujj5fm1gm.png",
//     title: "Todos List",
//   },
//   {
//     image:
//       "https://www.lifewire.com/thmb/f5RN5B_1uGMmqlr03fCQyP6-Vjw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/vudu-free-movies-release-date-526fbd148cfb4458858c25576f6bc326.png",
//     title: "Movies Booking website",
//   },
//   {
//     image:
//       "https://www.accessone.io/Blog/image.axd?picture=/benefits-of-Flight-reservation-system.jpg",
//     title: "Todos website",
//   },
// ];
import { useRef, useEffect, useState } from "react";
import ProjectsDetails from "../../details/ProjectsDetails";
import animationData from "../../../../../assets/backrground.json";
import lottie from "lottie-web";
import axios from "axios";

interface UserDetails {
  name: string;
  description: string;
  image: string;
  id: string;

  // iconImage: string;
}
function getuserId() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    localStorage.setItem("userId", "6530b5133f9c1019f4cc64f9");
    return "6530b5133f9c1019f4cc64f9";
  }
  return userId ? JSON.parse(userId) : "";
}

export default function T1Projects({ isEditRoute }: any) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [editProductState, seteditProductStatus] = useState(false);
  const [showeditmodel, setShowEditModel] = useState(false);
  const [selectedProduct, setselectedProduct] = useState([]);
  const [addProjects, setAddProjects] = useState(false);
  const [deleteProjects, setDeleteProjects] = useState(false);
  const [details, setDetails] = useState<UserDetails[]>([]);

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
    console.log(userId, "rojects");

    axios
      // .get("http://localhost:4000/user/showDetails", userId)
      .get(`http://localhost:4000/user/showDetails?userId=${userId}`)
      .then((response) => {
        console.log("projects", response.data.result.projects);
        setDetails(response.data.result.projects);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    setAddProjects(false);
    setDeleteProjects(false);
  }, [addProjects, deleteProjects]);

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
  return (
    <div
      id="projects"
      className={`relative px-40 min-h-[30rem] py-16 bg-black ${
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

      <p className="text-3xl font-bold text-[#f056eb] mb-16">Projects</p>
      <div className="z-50 flex flex-wrap -mx-4 ">
        {details &&
          details.map((project, index) => (
            <div key={index} className="w-1/2 p-4">
              {isEditRoute ? (
                <div className="bg-black  text-white rounded-full ">
                  {/* <i
                      onClick={() => showModel()}
                      className={`fa-solid fa-pen cursor-pointer p-[1rem] hover:text-[#f056eb]`}
                    ></i> */}
                  <i
                    onClick={() => deleteModel(project.id)}
                    className={`fa-solid fa-trash font-extrabold text-2xl   cursor-pointer p-[1rem] hover:text-[#f056eb] `}
                  ></i>
                </div>
              ) : null}
              <div className="border border-white rounded-lg p-6 hover:bg-gray-800">
                <img
                  className="rounded-lg h-[20rem] w-full"
                  src={project.image}
                  alt={project.name}
                />
                <p className="font-bold text-2xl text-white">{project.name}</p>
              </div>
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
