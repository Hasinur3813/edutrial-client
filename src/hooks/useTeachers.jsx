import { useQuery } from "@tanstack/react-query";
import useUserRole from "./useUserRole";
import useAxiosSecure from "../axios/useAxiosSecure";

const useTeachers = ({
  pageSize,
  currentPage,
  totalTeacher,
  setTotalTeacher,
}) => {
  const { user, isPending } = useUserRole();
  const axios = useAxiosSecure();

  const {
    data: teachers,
    isPending: isTeacherLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.userRole, "teachers", pageSize, currentPage, totalTeacher],
    enabled: !isPending,
    queryFn: async () => {
      const teachers = await axios.get(
        `/admin/teachers?page=${currentPage}&limit=${pageSize}`
      );
      setTotalTeacher(teachers.data.totalTeachers);

      return teachers.data.data;
    },
  });
  return { teachers, isTeacherLoading, refetch };
};

export default useTeachers;
