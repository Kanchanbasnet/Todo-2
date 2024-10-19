import { useForm } from "react-hook-form";
import { SignUpValues, signUpSchema } from "../schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpValues) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/users`, {
        email: data.email,
        name: data.name,
        address: data.address,
        password: data.password,
      });
      toast.success("Registration Successful!");
      navigate("/");
    } catch (error) {
      console.log("Error::", error);
      toast.error("Registration Failed! Please Try Again Later.");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="font-bold mb-2">Email Address</label>
          <input
            className="w-full border border-gray-400 rounded-md px-3 mt-2 py-2"
            {...register("email")}
            type="text"
          />
          {errors.email && (
            <p className="text-red-500 font-bold text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label className="font-bold mb-2">Name</label>
          <input
            className="w-full border border-gray-400 rounded-md px-3 mt-2 py-2"
            {...register("name")}
            type="text"
          />
          {errors.name && (
            <p className="text-red-500 font-bold text-sm">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label className="font-bold mb-2">Address</label>
          <input
            className="w-full border border-gray-400 rounded-md px-3 mt-2 py-2"
            {...register("address")}
            type="text"
          />
          {errors.address && (
            <p className="text-red-500 font-bold text-sm">
              {errors.address.message}
            </p>
          )}
        </div>
        <div className="mt-4">
          <label className="font-bold mb-2">Password</label>
          <input
            className="w-full border border-gray-400 rounded-md px-3 mt-2 py-2"
            {...register("password")}
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 font-bold text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-3 py-2 border bg-blue-950 mt-6 text-white rounded-md"
          >
            Sign Up
          </button>
        </div>
        <div className="text-center mt-6">
          <Link className="hover:underline text-gray-500" to="/">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
