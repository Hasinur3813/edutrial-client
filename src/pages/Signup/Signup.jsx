import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../context/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../axios/useAxiosPublic";
import { Fade } from "react-awesome-reveal";

const Signup = () => {
  const axios = useAxiosPublic();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
    confirmPassword: "",
  });

  const {
    signup,
    updateUser,
    signInWithGoogle,
    logout,
    setCurrentUser,
    setLoading,
  } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setPageLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const length = password.length >= 6;

    if (!uppercase) return "Password must contain an uppercase letter.";
    if (!lowercase) return "Password must contain a lowercase letter.";
    if (!length) return "Password must be at least 6 characters long.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.password);

    if (passwordError) {
      setError(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");
      setPageLoading(true);
      const res = await axios.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        photoURL: formData.photoURL,
        password: formData.password,
      });
      console.log(res.data.data);
      if (res.data.data.insertedId) {
        try {
          await signup(formData.email, formData.password);
          await updateUser(formData.name, formData.photoURL, formData.email);
          setCurrentUser((user) => ({
            ...user,
            displayName: formData.name,
            photoURL: formData.photoURL,
            email: formData.email,
          }));
          setLoading(false);
          navigate("/");
          Swal.fire({
            title: "Good job!",
            text: "Registration Successful",
            icon: "success",
          });
          setPageLoading(false);
        } catch (error) {
          setError(error.code);
          setPageLoading(false);
          Swal.fire({
            title: "Error",
            text: "User is already registered!",
            icon: "error",
          });
        }
      } else {
        setError("Something went wrong");
        setPageLoading(false);
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        });
      }
    } catch {
      setError("User creation failed, please try again");
      setPageLoading(false);
      Swal.fire({
        title: "Error",
        text: "User creation failed, Please try again",
        icon: "error",
      });
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Fade>
      <div className="min-h-screen flex items-center justify-center py-6">
        <div className="max-w-md border border-primaryColor w-full shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center text-primaryColor mb-6">
            Register to EduTrial
          </h2>
          <form onSubmit={handleRegister}>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-darkGray mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
            </div>

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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            {/* Photo URL Field */}
            <div className="mb-4">
              <label
                htmlFor="photoURL"
                className="block text-sm font-semibold text-darkGray mb-1"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleInputChange}
                required
                className="input input-bordered w-full"
                placeholder="Enter your photo URL"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-darkGray mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-darkGray"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-darkGray mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-darkGray"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="btn text-lg bg-primaryColor hover:bg-secondaryColor text-lightGray w-full"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <p className="text-red font-semibold text-sm mt-4 text-center">
              {error}
            </p>
          )}

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <div className="border-t border-base-300 flex-grow"></div>
            <span className="px-4 text-sm text-base-content">OR</span>
            <div className="border-t border-base-300 flex-grow"></div>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline text-lg w-full flex items-center justify-center space-x-2"
          >
            <FcGoogle size={24} />
            <span>Register with Google</span>
          </button>

          {/* Redirect to Login */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primaryColor hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Signup;
