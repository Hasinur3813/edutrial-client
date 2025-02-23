import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";
import { useAuth } from "../context/AuthProvider";

const useUserRole = () => {
  const { currentUser, loading } = useAuth();
  const axios = useAxiosSecure();

  const { data, isPending, refetch } = useQuery({
    queryKey: [currentUser?.email, "userRole"],
    enabled: !!currentUser && !loading,
    queryFn: async () => {
      const res = await axios.get(`/users/role/${currentUser?.email}`);
      return res.data;
    },
  });
  const user = data?.data;
  return { user, isPending, refetch };
};

export default useUserRole;
