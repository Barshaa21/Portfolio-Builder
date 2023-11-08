import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import Fade from "react-reveal/Fade";
import { useSelector } from "react-redux";

interface IFormInput {
  name: string;
  description: string;
  // skills: array;
  //   Status: string;
  //   Quantity: number;
}
const getuserId = () => {
  const userId = localStorage.getItem("userId");
  return userId ? JSON.parse(userId) : "";
};

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  // const history = useNavigate();

  const theme = useSelector((c: any) => {
    return c.theme.theme;
  });
  const nav = useNavigate();

  const onSubmit = (data: IFormInput) => {
    // ame: 'here', description: 'here'}
    console.log(data);
    const newData = {
      name: data.name,
      description: data.description,
      user_id: getuserId(),
    };
    axios
      .post("http://localhost:4000/user/addDetails", newData)
      .then((res) => {
        console.log(res.data);
        toast.success("You have submitted!");
        // nav("/protect/inventories");
      })
      .catch((e) => {
        console.log(e);
        toast.error("Fill the information correctly");
      });
  };

  return (
    // <Fade top>
    <div
      className={`${
        theme == "gray-200"
          ? "bg-gray-300"
          : " bg-cover bg-hero-pattern bg-no-repeat"
      }   pl-[35%]  min-h-screen pt-11 flex`}
    >
      {/* <div className="flex justify-center items-center  bg-gradient-to-r from-[#ebd6a8] to-[#faf0f8] ml-[33rem]"> */}
      <ToastContainer />
      <Fade top>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 justify-center align-middle bg-gray-400 bg-opacity-50 p-[2rem] rounded-md shadow-2xl h-[35rem]"
        >
          <p
            className="text-center font-bold text-[2rem]"
            style={{ fontFamily: "fantasy" }}
          >
            Add your details
          </p>

          {/* <div className="flex justify-between gap-4"> */}

          <div className="name flex flex-col justify-between gap-3">
            <div>
              <label className="text-gray-900 font-semibold">Name</label>
            </div>
            <input
              className="p-2 rounded-md  w-[30rem]"
              {...register("name", {
                required: true,
                maxLength: 50,
                pattern: /^[A-Za-z0-9_ ]+$/,
              })}
            />
            <div>
              {errors?.name?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}
              {errors?.name?.type === "maxLength" && (
                <p className="text-red-400">
                  ProductName cannot exceed 20 characters
                </p>
              )}
              {errors?.name?.type === "pattern" && (
                <p className="text-red-400">Invalid ProductName</p>
              )}
            </div>
          </div>
          <div className="name flex flex-col justify-between gap-3">
            <div>
              <label className="text-gray-900 font-semibold">Description</label>
            </div>
            <textarea
              className="p-2 rounded-md  w-[30rem]"
              {...register("description", {
                required: true,
                maxLength: 50,
                pattern: /^[A-Za-z0-9_ ]+$/,
              })}
            />
            <div>
              {errors?.description?.type === "required" && (
                <p className="text-red-400">This field is required</p>
              )}
              {errors?.description?.type === "maxLength" && (
                <p className="text-red-400">
                  ProductName cannot exceed 20 characters
                </p>
              )}
              {errors?.description?.type === "pattern" && (
                <p className="text-red-400">Invalid Desciprion</p>
              )}
            </div>
          </div>
          <div className="flex justify-center font-bold ">
            <input
              type="submit"
              className="bg-[#747575] hover:bg-gray-300 w-[30%] rounded-md p-2  ring-purple-500 ring-offset-4 ring-offset-slate-50 shadow-2xl dark:ring-offset-slate-900"
            />
          </div>
        </form>
      </Fade>
      {/* </div> */}
    </div>
  );
}
