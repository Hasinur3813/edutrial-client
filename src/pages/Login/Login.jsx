import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../axios/useAxiosPublic";
import { Fade } from "react-awesome-reveal";

const Login = () => {
  const { login, signInWithGoogle, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxiosPublic();
  const state = location?.state;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
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
      setError(
        error?.response?.data?.message || " Seems you are already registered!"
      );
      Swal.fire({
        title: "Error",
        text: `${
          (error?.response && error.response?.data?.message) ||
          " Seems you are already registered!"
        }`,
        icon: "error",
      });
      await logout();
    }
  };

  return (
    <Fade>
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md border border-primaryColor w-full shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-primaryColor mb-6">
            Login to EduTrial
          </h2>
          <form onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-darkGray mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-darkGray mb-1"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input input-bordered w-full"
                placeholder="Enter your password"
              />
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
              className="btn text-lg bg-primaryColor hover:bg-secondaryColor text-white w-full"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="border-t border-base-300 flex-grow"></div>
            <span className="px-4 text-sm text-base-content">OR</span>
            <div className="border-t border-base-300 flex-grow"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline text-lg w-full flex items-center justify-center space-x-2"
          >
            <FcGoogle size={24} />
            <span>Login with Google</span>
          </button>

          {/* Links */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primaryColor hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Login;
