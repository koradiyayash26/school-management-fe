import {
  getSchoolStudents,
  getSchoolStudentsIdData,
  getSchoolStudentsNames,
} from "@/services/school-student-service";
import { useQuery } from "@tanstack/react-query";

export const useSchoolStudents = () => {
  return useQuery({
    queryKey: ["schoolstudent"],
    queryFn: getSchoolStudents,
  });
};

export const useSchoolStudentsName = () => {
  return useQuery({
    queryKey: ["schoolstudentname"],
    queryFn: getSchoolStudentsNames,
  });
};

export const useSchoolStudentsIdData = (id) => {
  return useQuery({
    queryKey: ["schoolstudentiddata", id],
    queryFn: () => getSchoolStudentsIdData(id),
  });
};
