import { useQuery } from "@tanstack/react-query";
import useUserRole from "./useUserRole";
import useAxiosSecure from "../axios/useAxiosSecure";

const useTeachers = () => {
  const { user, isPending } = useUserRole();
  const axios = useAxiosSecure();

  const {
    data: teachers,
    isPending: isTeacherLoading,
    refetch,
    isError,
  } = useQuery({
    queryKey: [user?.userRole, "teachers"],
    enabled: !isPending && user?.userRole === "admin",
    queryFn: async () => {
      const teachers = await axios.get("/admin/teachers");
      return teachers.data.data;
    },
  });
  return { teachers, isTeacherLoading, refetch, isError };
};

export default useTeachers;
