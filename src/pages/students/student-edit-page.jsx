import Spinner from "@/components/spinner/spinner";
import StudentForm from "@/components/student";
import { studentDetail } from "@/constant";
import { useStudent } from "@/hooks/use-student";
import { updateStudent } from "@/services/student-service";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const StudentEditPage = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useStudent(id);
  const navigate = useNavigate();

  const initialData = isLoading ? studentDetail : data?.data;

  const mutation = useMutation({
    mutationFn: (formattedData) => updateStudent(formattedData, id),
    onSuccess: () => {
      refetch();
      setTimeout(() => {
        toast.success("Student updated successfully");
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

  const cleanedData = Object.fromEntries(
    Object.entries(initialData).map(([key, value]) => [
      key,
      value === null ? "" : value,
    ])
  );

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );
  if (error) return <>Error</>;
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
      <StudentForm defaultValues={cleanedData} onSubmit={onSubmit} />
    </>
  );
};

export default StudentEditPage;
