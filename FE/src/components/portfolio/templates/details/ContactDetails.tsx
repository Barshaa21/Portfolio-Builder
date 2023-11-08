import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
//@ts-ignore
import Pulse from "react-reveal/Pulse";

interface IFormInput {
  facebook: string;
  linkedin: string;
  github: string;
  discord: string;
  twitter: string;
}
const getuserId = () => {
  const userId = localStorage.getItem("userId");
  return userId ? JSON.parse(userId) : "";
};

export default function ContactDetails({
  showeditmodel,
  // selectedProduct,
  closeModel,
  selected,
  changeStatus,
}: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  // console.log(selected, "this is selected");

  const onSubmit = (data: IFormInput) => {
    const newData = {
      contacts: [
        {
          name: "Facebook",
          url: data.facebook,
        },
        {
          name: "LinkedIn",
          url: data.linkedin,
        },
        {
          name: "GitHub",
          url: data.github,
        },
        {
          name: "Discord",
          url: data.discord,
        },
        {
          name: "Twitter",
          url: data.twitter,
        },
      ],
      user_id: getuserId(),
    };

    axios
      .post("http://localhost:4000/user/addDetails", newData)
      .then((res) => {
        console.log(res.data);
        toast.success("You have submitted!");
        changeStatus();
      })
      .catch((e) => {
        console.error(e);
        toast.error("Fill in the information correctly");
      });
  };
  useEffect(() => {
    if (selected) {
      const resetData = {
        facebook: selected[0]?.url || "",
        linkedin: selected[1]?.url || "",
        github: selected[2]?.url || "",
        discord: selected[3]?.url || "",
        twitter: selected[4]?.url || "",
      };

      reset(resetData);
    }
  }, [selected]);

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
      className="absolute top-32 z-50   w-screen h-screen  flex justify-center items-center"
      onClick={handleClose}
    >
      <Pulse>
        <div className="flex justify-end h-screen">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 mt-[1rem]  justify-end ml-[60rem] bg-white bg-opacity-90 p-[1rem] rounded-md border border-blue-800 shadow-gray-400 shadow-lg h-[35rem]"
          >
            <div className="flex justify-between pt-2">
              <p
                className="text-center mt-0  text-gray-900 pt-5  text-[1.5rem]"
                style={{ fontFamily: "fantasy" }}
              >
                Add your Contact details
              </p>
              <i
                className="fa-solid fa-xmark text-xl font-bold text-black cursor-pointer "
                onClick={handleButtonClose}
              ></i>
            </div>

            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">Facebook</label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[25rem] text-black"
                {...register("facebook", {
                  required: true,
                  pattern:
                    /^https?:\/\/(www\.)?facebook\.com\/[A-Za-z0-9_\-/]+$/i,
                })}
              />
              {errors.facebook && (
                <p className="text-red-400">Invalid Facebook URL</p>
              )}
            </div>

            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">LinkedIn</label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[25rem] text-black"
                {...register("linkedin", {
                  required: true,
                  pattern:
                    /^https?:\/\/(www\.)?linkedin\.com\/[A-Za-z0-9_\-/]+$/i,
                })}
              />
              {errors.linkedin && (
                <p className="text-red-400">Invalid LinkedIn URL</p>
              )}
            </div>

            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">GitHub</label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[25rem] text-black"
                {...register("github", {
                  required: true,
                  pattern: /^https?:\/\/github\.com\/[A-Za-z0-9_\-/]+$/i,
                })}
              />
              {errors.github && (
                <p className="text-red-400">Invalid GitHub URL</p>
              )}
            </div>

            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">Discord</label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[25rem] text-black"
                {...register("discord", {
                  required: false,
                  pattern: /^[A-Za-z0-9_#]+$/i,
                })}
              />
              {errors.discord && (
                <p className="text-red-400">Invalid Discord input</p>
              )}
            </div>

            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">Twitter</label>
              </div>
              <input
                className="p-2 border border-black rounded-md w-[25rem] text-black"
                {...register("twitter", {
                  required: false,
                  pattern:
                    /^https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?$/,
                })}
              />
              {errors.twitter && (
                <p className="text-red-400">Invalid Twitter URL</p>
              )}
            </div>

            <div className="flex justify-center font-bold mt-2">
              <input
                type="submit"
                className="bg-[#62e4c6] text-black border border-gray-800 hover:bg-[#88ffe3] w-[30%] rounded-md p-2 ring-purple-500 ring-offset-4 ring-offset-slate-50 shadow-2xl dark:ring-offset-slate-900"
              />
            </div>
          </form>
        </div>
      </Pulse>
      <ToastContainer />
    </div>
  );
}
