import { useAuth } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../axios/useAxiosSecure";

const useTeacherStatus = () => {
  const { currentUser, loading } = useAuth();
  const axios = useAxiosSecure();

  const { data: teacherStatus, isPending: statusLoading } = useQuery({
    queryKey: [currentUser?.email, "teacherStatus"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(`/teachers/status/${currentUser?.email}`);
      const data = res.data;
      return data;
    },
  });

  return { teacherStatus, statusLoading };
};

export default useTeacherStatus;
