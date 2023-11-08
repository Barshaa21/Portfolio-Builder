import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// @ts-ignore
import Pulse from "react-reveal/Pulse";

interface IFormInput {
  name: string;
  description: string;
}
const getuserId = () => {
  const userId = localStorage.getItem("userId");
  return userId ? JSON.parse(userId) : "";
};

export default function HomeDetails({
  showeditmodel,
  selectedProduct,
  closeModel,
  changeStatus,
  selectedDescription,
  selectedName,
}: any) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  // const onSubmit = (data: any) => {
  //   // sending only  required field from frontend
  //   const editdata = {
  //     ProductID: data.ProductID,
  //     ProductName: data.ProductName,
  //     ImageURL: data.ImageURL,
  //     Status: data.Status,
  //     Quantity: data.Quantity,
  //   };
  //   axios
  //     .put(
  //       `http://localhost:4000/user/editproduct/${selectedProduct._id}`,
  //       editdata
  //     )
  //     .then((res) => {
  //       console.log(res.data);
  //       toast.success("Product updated successfully!");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast.error("An error occurred while updating the product.");
  //     });
  // };

  const onSubmit = (data: IFormInput) => {
    // const newData = (data.role = "user");
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
        changeStatus();
      })
      .catch((e) => {
        console.log(e);
        toast.error("Fill the information correctly");
      });
  };

  // useEffect(() => {
  //   reset(selectedProduct);
  // }, [selectedProduct]);

  console.log("selectedName", selectedName);
  useEffect(() => {
    // Assuming name and description are state variables that you want to reset
    // reset({ selectedName, selectedDescription });
    reset({
      name: selectedName,
      description: selectedDescription,
    });
  }, [selectedName, selectedDescription]);

  //fix this
  const handleClose = (e: any) => {
    if (e.target.id === "container") {
      closeModel();
    }
    // closeModel();
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
      className="absolute top-0  w-screen h-screen flex justify-center items-center"
      onClick={handleClose}
    >
      <Pulse>
        <div className="flex justify-end h-screen ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            // onChange={handleSubmit(onSubmit)}
            className="z-50 flex flex-col gap-3 mt-[11rem]  justify-end ml-[60rem] bg-white bg-opacity-90 p-[1rem] rounded-md border border-blue-800 shadow-gray-400 shadow-lg h-[30rem]"
          >
            <i
              className="fa-solid fa-xmark text-xl font-bold text-black cursor-pointer "
              onClick={handleButtonClose}
            ></i>

            <p
              className="text-center text-gray-900  text-[1.5rem]"
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
                className="p-2 rounded-md border border-black   w-[25rem] text-gray-800"
                {...register("name", {
                  required: true,
                  maxLength: 50,
                  pattern: /^[A-Za-z0-9_. ]+$/,
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
                  <p className="text-red-400">Invalid Name</p>
                )}
              </div>
            </div>
            <div className="name flex flex-col justify-between gap-3">
              <div>
                <label className="text-gray-900 font-semibold">
                  Description
                </label>
              </div>
              <textarea
                className="p-1 rounded-md border h-[10rem] border-black  w-[25rem] text-gray-800"
                {...register("description", {
                  required: true,
                  // minLength: 50,
                  maxLength: 2000,
                  pattern: /^[\w\s.,'-]+$/,
                })}
              />
              <div>
                {errors?.description?.type === "required" && (
                  <p className="text-red-400">This field is required</p>
                )}
                {errors?.description?.type === "maxLength" && (
                  <p className="text-red-400">
                    ProductName cannot exceed 2000 characters
                  </p>
                )}
                {errors?.description?.type === "pattern" && (
                  <p className="text-red-400">Invalid Description</p>
                )}
              </div>
            </div>
            <div className="flex justify-center font-bold ">
              <input
                type="submit"
                className="bg-[#74e976] text-black border border-black hover:bg-gray-300 w-[30%] rounded-md p-2  ring-purple-500 ring-offset-4 ring-offset-slate-50 shadow-2xl dark:ring-offset-slate-900"
              />
            </div>
          </form>
        </div>
      </Pulse>
      <ToastContainer />
    </div>
  );
}
