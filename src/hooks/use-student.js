import { getStudent, getStudents, getStudentUpdateAcademicYearHistory } from "@/services/student-service";
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

export const useStudentUpdateAcademicYearHistory = (id) => {
  return useQuery({
    queryKey: ["studentUpdateAcademicHistory", id],
    queryFn: () => getStudentUpdateAcademicYearHistory(id),
  });
};

