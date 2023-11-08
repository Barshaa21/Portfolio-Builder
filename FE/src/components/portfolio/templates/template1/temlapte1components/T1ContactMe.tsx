import { useState, useEffect } from "react";
import axios from "axios";
import ContactDetails from "../../details/ContactDetails";

interface UserDetails {
  name: string;
  url: string;
  // Define other properties here if necessary
}

export default function T1ContactMe({ isEditRoute }: any) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [details, setDetails] = useState<UserDetails[]>([]);
  const [selectedProduct, setselectedProduct] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [showeditmodel, setShowEditModel] = useState(false);
  const [addContactState, setAddContactState] = useState(false);

  const handleMouseEnter = () => setIsMouseOver(true);
  const handleMouseLeave = () => setIsMouseOver(false);

  // const getuserId = () => {
  //   const userId = localStorage.getItem("userId");
  //   return userId ? JSON.parse(userId) : "";
  // };
  const showModel = () => {
    setShowEditModel(true);
    // setselected();
  };
  const closeModel = () => {
    setShowEditModel(false);
    // seteditProductStatus(true);
  };
  useEffect(() => {
    const getUserId = () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        const defaultUserId = "6530b5133f9c1019f4cc64f9";
        localStorage.setItem("userId", JSON.stringify(defaultUserId));
        return defaultUserId;
      }
      return userId ? JSON.parse(userId) : "";
    };
    const userId = getUserId();
    console.log(userId, "tqhome");
    axios
      .get(`http://localhost:4000/user/showDetails?userId=${userId}`)
      .then((response) => {
        console.log("showContacts", response.data.result.contacts);
        setDetails(response.data.result.contacts);
        setLoadingTable(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoadingTable(false);
        // setAddContactState(false);
      });
    setAddContactState(false);
  }, [addContactState]);

  const changeStatus = () => {
    setAddContactState(true);
  };
  return (
    <div
      id="contacts"
      className={`bg-black ${
        isEditRoute ? "hover:border hover:border-blue-400" : ""
      } text-white px-[10rem] py-[2rem] relative`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isEditRoute && isMouseOver ? (
        <div className="bg-white text-black text-xl flex justify-center items-center rounded absolute top-2 right-2">
          <i
            onClick={() => showModel()}
            className={`fa-solid fa-pen-to-square cursor-pointer p-[1rem] `}
          ></i>
        </div>
      ) : null}

      <p className="text-[#f056eb] text-3xl font-bold mb-3">Contact Me</p>
      <p className="text-gray-300 text-xl flex mb-5">
        Get in touch with me through SOCIAL MEDIA!!
      </p>
      {/* <div className="flex ">
        <div className="flex gap-6">
          <div className="flex  ">
            <i
              className="fa-brands fa-facebook text-4xl   cursor-pointer hover:text-[#f056eb] "
              onClick={() => window.open("https://www.facebook.com", "_blank")}
            ></i>
          </div>
          <div className="flex">
            <i
              className="fa-brands fa-linkedin text-4xl  cursor-pointer hover:text-[#f056eb] "
              onClick={() => window.open("https://www.linkedin.com", "_blank")}
            ></i>
          </div>
          <div className="flex">
            <i
              className="fa-brands fa-github text-4xl cursor-pointer hover:text-[#f056eb] "
              onClick={() => window.open("https://www.github.com", "_blank")}
            ></i>
          </div>
          <div className="flex">
            <i
              className="fa-regular fa-envelope text-4xl cursor-pointer hover:text-[#f056eb] "
              onClick={() => window.open("https://www.email.com", "_blank")}
            ></i>
          </div>
          <div className="flex">
            <i
              className="fa-brands fa-twitter text-4xl cursor-pointer hover:text-[#f056eb] "
              onClick={() => window.open("https://www.twitter.com", "_blank")}
            ></i>{" "}
          </div>
        </div>
      </div> */}

      {loadingTable ? (
        "loading..."
      ) : (
        <div className="flex">
          <div className="flex gap-6">
            {details &&
              details.map((contact, index) => (
                <div className="flex" key={index}>
                  <i
                    className={`fa-brands fa-${contact.name.toLowerCase()} text-4xl cursor-pointer hover:text-[#f056eb]`}
                    onClick={() => window.open(contact.url, "_blank")}
                  ></i>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="fixed top-0 left-0">
        {/* <p className="fixed right-0 text-red-800 font-[20rem]">Cross</p> */}
        <ContactDetails
          showeditmodel={showeditmodel}
          closeModel={closeModel}
          changeStatus={changeStatus}
          selectedProduct={selectedProduct}
          selected={details && details}
        />
      </div>
    </div>
  );
}
