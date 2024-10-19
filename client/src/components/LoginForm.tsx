// import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema, LoginValues } from "../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: LoginValues) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      localStorage.setItem("userEmail", data.email)
      // console.log("Response: ", response);
      toast.success("Login successfull!");
      navigate("/home");
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Login failed! Please Try again Later.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="font-bold mb-2 ">Email Address</label>
          <input
            className="w-full border border-gray-400 rounded-md px-3 mt-2 py-2"
            {...register("email")}
            type="text"
          />
          {errors.email && (
            <p className="text-red-500 text-sm font-medium">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="font-bold mb-2">Password</label>
          <input
            className="w-full border border-gray-400 rounded-md px-3 mt-2 py-2"
            {...register("password")}
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm font-medium">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-3 py-2 border bg-blue-950 mt-6 text-white rounded-md"
          >
            Login
          </button>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-500 hover:underline cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <div className="text-center mt-6">
          <p>
            Dont have an account?{" "}
            <Link className="hover:underline text-gray-500" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
