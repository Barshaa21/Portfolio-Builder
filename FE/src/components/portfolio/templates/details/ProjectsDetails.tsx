import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
//@ts-ignore
import Pulse from "react-reveal/Pulse";
import Multer from "./Multer";

interface IFormInput {
  name: string;
  description: string;
  // url: string;
  image: string;
  // discord: string;
  // twitter: string;
}
const getuserId = () => {
  const userId = localStorage.getItem("userId");
  return userId ? JSON.parse(userId) : "";
};

export default function ProjectsDetails({
  showeditmodel,
  selectedProduct,
  closeModel,
  addState,
}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    const newData = {
      projects: [
        {
          id: Math.floor(Date.now() / 1000),
          name: data.name,
          description: data.description,
          image: data.image,
          // iconImage: data.iconImage,
        },
      ],
      user_id: getuserId(),
    };

    axios
      .post("http://localhost:4000/user/addDetails", newData)
      .then((res) => {
        console.log(res.data);
        toast.success("You have submitted!");
        addState();
      })
      .catch((e) => {
        console.error(e);
        toast.error("Fill in the information correctly");
      });
  };

  const handleClose = (e: any) => {
    if (e.target.id === "container") {
      closeModel();
    }
  };

  if (!showeditmodel) {
    return null;
  }
  const handleButtonClose = () => {
    closeModel();
  };

  return (
    <div
      id="container"
      className="absolute top-0 w-screen h-screen  flex justify-center items-center"
      onClick={handleClose}
    >
      <Pulse>
        <div className="flex justify-end h-screen">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex z-[50] flex-col gap-1 mt-[8rem]  justify-end ml-[62rem] bg-white bg-opacity-90 p-[1rem] rounded-md border border-blue-800 shadow-gray-400 shadow-lg h-[33rem]"
          >
            <div className="flex justify-between pt-2">
              <p
                className="text-center mt-0  text-gray-900 pt-5  text-[1.5rem]"
                style={{ fontFamily: "fantasy" }}
              >
                Add your Skills details
              </p>
              <i
                className="fa-solid fa-xmark text-xl font-bold text-black cursor-pointer "
                onClick={handleButtonClose}
              ></i>
            </div>

            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">
                  {" "}
                  Project Name
                </label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[20rem] text-black"
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-z0-9_ .-]+$/,
                })}
              />
              {errors.name && (
                <p className="text-red-400">Invalid Project Name</p>
              )}
            </div>
            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">
                  Project Description
                </label>
              </div>
              <textarea
                className="p-1 rounded-md border h-[10rem] border-black  w-[20rem] text-gray-800"
                {...register("description", {
                  required: true,
                  // minLength: 50,
                  maxLength: 2000,
                  // pattern: /^[A-Za-z0-9 ',.-]+$/,
                  pattern: /^[A-Za-z0-9 ',.\-]+$/,
                })}
              />
              <div>
                {errors?.description?.type === "required" && (
                  <p className="text-red-400">This field is required</p>
                )}
                {errors?.description?.type === "maxLength" && (
                  <p className="text-red-400">
                    Description cannot exceed 2000 characters
                  </p>
                )}
                {errors?.description?.type === "pattern" && (
                  <p className="text-red-400">Invalid Description</p>
                )}
              </div>
            </div>

            {/* <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">
                  Project Image
                </label>
              </div>
              <Multer />
            </div> */}
            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">
                  {" "}
                  Project Image URLs
                </label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[20rem] text-black"
                {...register("image", {
                  required: true,
                  pattern: /^https?:\/\/[^\s]+$/i,
                })}
              />
              {errors.name && <p className="text-red-400">Invalid Image URL</p>}
            </div>

            <div className="flex justify-center font-bold">
              <input
                type="submit"
                className="bg-[#72df7d] border border-black hover:bg-[#96ee9f] w-[30%] rounded-md p-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 shadow-2xl dark:ring-offset-slate-900"
              />
            </div>
          </form>
        </div>
      </Pulse>
      <ToastContainer />
    </div>
  );
}
