import { useRef, useEffect, useState } from "react";
import SkillsDetails from "../../details/SkillsDetails";
import axios from "axios";

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
export default function T1Skills({ isEditRoute }: any) {
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

  return (
    <div
      id="skills"
      className={`relative bg-black px-[1rem]  ${
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
      <p className="text-[#f056eb] text-3xl font-bold px-[8rem] mb-14">
        Skills
      </p>

      <div id="skills" className="">
        {details ? (
          <div className="flex flex-wrap">
            {details.map((skill) => (
              <div
                className={`bg-black flex gap-2  flex-col items-center skills justify-center mb-20  rounded-xl ${
                  isEditRoute ? "" : ""
                } `}
              >
                {isEditRoute ? (
                  <div className="bg-white  text-black mt-5 ml-10 rounded-full ">
                    {/* <i
                      onClick={() => showModel()}
                      className={`fa-solid fa-pen cursor-pointer p-[1rem] hover:text-[#f056eb]`}
                    ></i> */}
                    <i
                      onClick={() => deleteModel(skill.id)}
                      className={`fa-solid fa-trash font-extrabold text-2xl    cursor-pointer p-[0.5rem] hover:text-[#f056eb] `}
                    ></i>
                  </div>
                ) : null}
                <div className="flex items-center gap-4 w-1/2 ">
                  <img
                    className="rounded-full h-[7rem] w-[7rem]"
                    src={skill.iconImage}
                  />
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star font-extrabold text-2xl ${
                        i < parseInt(skill.ratings)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } mr-1 text-center `}
                    ></i>
                  ))}
                </div>
                <p className="text-white text-xl">{skill.name}</p>
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
