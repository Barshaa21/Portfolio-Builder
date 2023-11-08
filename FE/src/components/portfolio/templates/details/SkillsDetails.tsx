import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
//@ts-ignore
import Pulse from "react-reveal/Pulse";

interface IFormInput {
  name: string;
  iconImage: string;
  ratings: number;
}
const getuserId = () => {
  const userId = localStorage.getItem("userId");
  return userId ? JSON.parse(userId) : "";
};

export default function SkillsDetails({
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
      skills: [
        {
          id: Math.floor(Date.now() / 1000),
          name: data.name,
          ratings: data.ratings,
          iconImage: data.iconImage,
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
  const handleButtonClose = () => {
    closeModel();
  };

  if (!showeditmodel) {
    return null;
  }

  return (
    <div
      id="container"
      className="absolute top-0   w-screen h-screen  flex justify-center items-center"
      onClick={handleClose}
    >
      <Pulse>
        <div className="flex justify-end h-screen">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 mt-[11rem] z-50 justify-end ml-[67rem] bg-white bg-opacity-90 p-[1rem] rounded-md border border-blue-800 shadow-gray-400 shadow-lg h-[25rem]"
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
                <label className="text-gray-900 font-semibold">Name</label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[20rem] text-black"
                {...register("name", {
                  required: true,
                  pattern: /^[A-Za-z0-9_. -\+]+$/,
                })}
              />
              {errors.name && (
                <p className="text-red-400">Invalid Skill Name</p>
              )}
            </div>
            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">IMAGE URL</label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[20rem] text-black"
                {...register("iconImage", {
                  required: true,
                  pattern: /^(http|https):\/\/[^\s/$.?#].[^\s]*$/i,
                })}
              />
              {errors.iconImage && <p className="text-red-400">Invalid URL</p>}
            </div>
            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">
                  Ratings [0-5]
                </label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[20rem] text-black"
                {...register("ratings", {
                  required: true,
                  pattern: /^[1-5]+$/,
                })}
              />
              {errors.ratings && (
                <p className="text-red-400">Invalid Ratings</p>
              )}
            </div>

            <div className="flex justify-center font-bold">
              <input
                type="submit"
                className="bg-[#81edc2] hover:bg-[#aaedcf]  w-[30%] rounded-md p-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 shadow-2xl dark:ring-offset-slate-900"
              />
            </div>
          </form>
        </div>
      </Pulse>
      <ToastContainer />
    </div>
  );
}
