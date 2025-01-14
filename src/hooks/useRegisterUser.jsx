import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../axios/useAxiosPublic";
import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const useRegisterUser = () => {
  const { signup, updateUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const axios = useAxiosPublic();

  return useMutation(
    async (formData) => {
      const { data } = await axios.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        photoURL: formData.photoURL,
        password: formData.password,
      });
      return data;
    },
    {
      onSuccess: async (data, formData) => {
        if (data.data.insertedId) {
          try {
            // Handle Firebase signup
            await signup(formData.email, formData.password);
            await updateUser(formData.name, formData.photoURL, formData.email);

            // Update local user state
            setCurrentUser((user) => ({
              ...user,
              displayName: formData.name,
              photoURL: formData.photoURL,
              email: formData.email,
            }));

            Swal.fire({
              title: "Good job!",
              text: "Registration Successful",
              icon: "success",
            });

            navigate("/");
          } catch {
            Swal.fire({
              title: "Error",
              text: "User is already registered!",
              icon: "error",
            });
          }
        } else {
          throw new Error("User creation failed, Please try again");
        }
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "User creation failed, Please try again";
        Swal.fire({
          title: "Error",
          text: errorMessage,
          icon: "error",
        });
      },
    }
  );
};

export default useRegisterUser;
