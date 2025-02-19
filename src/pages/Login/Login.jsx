import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../axios/useAxiosPublic";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import DemoCredentials from "../../component/DemoCredential/DemoCredentials";

const demoCredentials = {
  user: {
    email: "rana@gmail.com",
    password: "Ha0000",
  },
  teacher: {
    email: "rahman@gmail.com",
    password: "Ha0000",
  },
  admin: {
    email: "sumon@gmail.com",
    password: "Ha0000",
  },
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, signInWithGoogle, logout } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxiosPublic();
  const state = location?.state;

  const handleCredentials = (e) => {
    const name = e.target.name;
    const { email, password } = demoCredentials[name];
    setCredentials({ email, password });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (formData, event) => {
    event.preventDefault();
    const { email, password } = formData;
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      Swal.fire({
        title: "Welcome back",
        text: " Successfully logged in",
        icon: "success",
      });
      setLoading(false);
      state?.path ? navigate(state?.path) : navigate("/");
    } catch (error) {
      setError(error.code);
      Swal.fire({
        title: "Error",
        text: `${error.code}`,
        icon: "error",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      const result = await signInWithGoogle();
      if (result?.user?.email) {
        const res = await axios.post("/auth/social-login", {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
        });
        if (res.data.success) {
          Swal.fire({
            title: "Welcome back",
            text: " Successfully logged in",
            icon: "success",
          });

          navigate("/");
        } else {
          await logout();
        }
      }
    } catch (error) {
      setError("Login Failed! Please try again or use another method to login");
      Swal.fire({
        title: "Error",
        text: `${
          (error?.response && error.response?.data?.message) ||
          "Login Failed! Please try again or use another method to login"
        }`,
        icon: "error",
      });
      await logout();
    }
  };

  return (
    <Fade>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-2xl dark:bg-slate-800 border border-primaryColor w-full shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-primaryColor mb-6">
            Login to EduTrial
          </h2>
          <div className="flex flex-col gap-4 lg:flex-row">
            <form onSubmit={handleSubmit(handleLogin)}>
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-darkGray dark:text-lightGray mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red">Email is required</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4 relative">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-darkGray dark:text-lightGray mb-1"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  {...register("password", { required: true })}
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-sm absolute text-red">
                    Password is required
                  </p>
                )}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-2/3 right-3 transform -translate-y-2/4 text-gray-500 hover:text-primaryColor"
                >
                  {showPassword ? (
                    <AiFillEye size={20} />
                  ) : (
                    <AiFillEyeInvisible size={20} />
                  )}
                </button>
              </div>
              {/* Error Message */}
              {error && (
                <p className="text-red font-semibold text-sm my-4 text-center">
                  {error}
                </p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn mt-4 text-lg bg-primaryColor hover:bg-secondaryColor text-lightGray w-full"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-6">
              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                className="btn btn-outline text-lg w-full flex items-center justify-center space-x-2 dark:text-lightGray"
              >
                <FcGoogle size={24} />
                <span>Login with Google</span>
              </button>

              <DemoCredentials
                handleCredentials={handleCredentials}
                credentials={credentials}
              />
              {/* Links */}
              <div className="mt-4 text-center">
                <p className="text-sm dark:text-lightGray">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primaryColor hover:underline"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Login;
