import { getStudent, getStudents } from "@/services/student-service";
import { useQuery } from "@tanstack/react-query";

export const useStudents = () => {
  return useQuery({
    queryKey: ["gr"],
    queryFn: getStudents,
  });
};

export const useStudent = (id) => {
  return useQuery({
    queryKey: ["student", id],
    queryFn: () => getStudent(id),
  });
};

