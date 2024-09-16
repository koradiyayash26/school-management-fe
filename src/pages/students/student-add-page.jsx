import StudentForm from "@/components/student";
import { studentDetail } from "@/constant";
import { addStudent } from "@/services/student-service";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const StudentAddPage = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formattedData) => addStudent(formattedData),
    onSuccess: () => {
      setTimeout(() => {
        toast.success("Student added successfully");
      }, 1000);
      navigate("/student");
    },
    onError: (error) => {
      toast.error(error.response.data.error);
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
  return (
    <>
      <Toaster
        position="top"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <StudentForm defaultValues={studentDetail} onSubmit={onSubmit} />
    </>
  );
};

export default StudentAddPage;
