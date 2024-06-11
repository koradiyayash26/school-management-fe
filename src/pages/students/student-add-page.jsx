import StudentForm from "@/components/student";
import { studentDetail } from "@/constant";
import { addStudent } from "@/services/student-service";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const StudentAddPage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formattedData) => addStudent(formattedData),
    onSuccess: () => {
      navigate("/student");
    },
  });

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      birth_date: format(new Date(data.birth_date), "yyyy-MM-dd"),
      left_school_date: data.left_school_date
        ? format(new Date(data.left_school_date), "yyyy-MM-dd")
        : null,
    };
    mutation.mutate(formattedData);
  };
  return <StudentForm defaultValues={studentDetail} onSubmit={onSubmit} />;
};

export default StudentAddPage;
