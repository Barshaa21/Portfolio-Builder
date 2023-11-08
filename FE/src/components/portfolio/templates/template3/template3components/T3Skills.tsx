import { useRef, useEffect, useState } from "react";
import SkillsDetails from "../../details/SkillsDetails";
import axios from "axios";
import { motion, useScroll, useTransform } from "framer-motion";

// const getuserId = () => {
//   const userId = localStorage.getItem("userId");
//   return userId ? JSON.parse(userId) : "";
// };
function getuserId() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    localStorage.setItem("userId", "6530b5133f9c1019f4cc64f9");
    return "6530b5133f9c1019f4cc64f9";
  }
  return userId ? JSON.parse(userId) : "";
}

interface UserDetails {
  name: string;
  ratings: string;
  iconImage: string;
  id: string;
}
export default function T3Skills({ isEditRoute }: any) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [editProductState, seteditProductStatus] = useState(false);
  const [showeditmodel, setShowEditModel] = useState(false);
  // const [selectedProduct, setselectedProduct] = useState<UserDetails[]>([]);
  const [details, setDetails] = useState<UserDetails[]>([]);
  const [addSkkils, setAddSkills] = useState(false);
  const [deleteSkils, setDeleteSkills] = useState(false);

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

        setDetails(response.data.result.skills);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
    setAddSkills(false);
    setDeleteSkills(false);
  }, [addSkkils, deleteSkils]);

  const deleteModel = (ID: string) => {
    setDeleteSkills(true);
    const user_id = getuserId();
    // setdeleteProduct(true);
    axios
      .delete("http://localhost:4000/user/deleteSkills", {
        data: { Skill_ID: ID, user_id: user_id }, // Passing the data as an object
      })
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  const addState = () => {
    setAddSkills(true);
  };
  //framer motion
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 5], ["0%", "200%"]);
  const yBg2 = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <div
      ref={scrollRef}
      id="skills"
      className={`relative  bg-[#dad9d9]   ${
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
      <p className="text-[#dc5a6d] text-center text-4xl underline pr-12 font-bold mb-[7rem]">
        Skills
      </p>

      <div id="skills" className="ml-14">
        {details ? (
          <div className="flex flex-wrap">
            {details.map((skill) => (
              <div
                className={` flex gap-2 flex-wrap  flex-col items-center skills justify-center mb-20  rounded-xl ${
                  isEditRoute ? "" : ""
                } `}
              >
                {isEditRoute ? (
                  <div className="bg-black ml-[16rem] text-white w-[2.3rem]   rounded-full ">
                    <i
                      onClick={() => deleteModel(skill.id)}
                      className={`fa-solid fa-trash text-white font-extrabold text-2xl cursor-pointer p-[0.5rem] hover:text-[#d55d5d] `}
                    ></i>
                  </div>
                ) : null}

                <motion.div
                  style={{ x: yBg }}
                  initial={{ scale: 0.9 }}
                  transition={{ duration: 2 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative h-[10rem] flex flex-col  px-[4rem]  pt-5 border-2 border-[#dc5a6d]  bg-gray-900 hover:bg-gray-700  shadow-2xl items-center  rounded-2xl "
                >
                  <img
                    className="absolute bottom-[6.5rem]  m-2 border-t-4 border-l-4 border-[#dc5a6d] rounded-full bg-white h-[7rem] w-[7rem]"
                    src={skill.iconImage}
                  />
                  <p className="text-white text-center pt-7 pb-0 font-bold text-2xl">
                    {skill.name}
                  </p>
                  <br />
                  <div className=" flex">
                    {[...Array(5)].map((_, i) => (
                      <div className="">
                        {" "}
                        <i
                          key={i}
                          className={`fa-solid fa-star font-extrabold mr-3 text-2xl ${
                            i < parseInt(skill.ratings)
                              ? "text-yellow-500"
                              : "text-white"
                          } mr-1 text-center `}
                        ></i>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white">No skills to show</div>
        )}
      </div>

      <div className="fixed top-0 left-0">
        {/* <p className="fixed right-0 text-red-800 font-[20rem]">Cross</p> */}
        <SkillsDetails
          showeditmodel={showeditmodel}
          closeModel={closeModel}
          addState={addState}
          // selectedProduct={selectedProduct}
        />
      </div>
    </div>
  );
}
