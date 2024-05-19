"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const onSubmitForm = (data) => {
    console.log("datalogin", data);
    console.log("Login successful");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (
      storedUser &&
      storedUser.email === data.email &&
      storedUser.password === data.password
    ) {
      dispatch(login(storedUser));
      router.push("/home");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid email or password");
    }
  };
  return (
    <>
      {/* <div className="flex  flex-col items-center"> */}
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="max-w-sm mx-auto bg-gray-50  shadow-lg rounded-lg p-9 mt-8"
      >
        <h1 className="mb-3 text-2xl font-bold">Sign In</h1>
        <div className="mb-1">
          {errorMessage && (
            <div className="mb-4 text-sm text-red-500 bg-red-50 text-center rounded-sm p-2">
              {errorMessage}
            </div>
          )}
        </div>

        <div className="mb-1">
          <label htmlFor="email" className="block mb-2 text-sm font-medium ">
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <p className="text-sm text-red-500">{errors.email?.message}</p>

        <div className="mb-1">
          <label htmlFor="password" className="block mb-2 text-sm font-medium ">
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <p className="text-sm text-red-500">{errors.password?.message}</p>

        <button
          type="submit"
          className="text-white mt-3 bg-[#26B7CD] focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center "
        >
          Submit
        </button>

        <div className="flex items-center mt-3">
          <div className="flex-1 h-0.5 bg-gray-300 "></div>
          <span className="px-2 text-[12px] ">OR</span>
          <div className="flex-1 h-0.5 bg-gray-300 "></div>
        </div>
        <div className="text-center mt-2">
          <p className="text-[12px] ">
            Don't have account?
            <span className="text-[#197A89] underline">
              <Link href="/register">Signup</Link>
            </span>
          </p>
        </div>
      </form>
      {/* </div> */}
    </>
  );
};
export default page;
