import Spinner from "@/components/spinner/spinner";
import StudentForm from "@/components/student";
import { studentDetail } from "@/constant";
import { useAcademicYear } from "@/hooks/use-academic-year";
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

  const { data, isLoading, error, refetch } = useAcademicYear();
  const academicYear = data || [];

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }
  if (error) {
    return <>{error.message}</>;
  }

  const onSubmit = (data) => {
    let academicYearId = null;
    academicYear.forEach((year) => {
      if (year.year === data.academic_year) {
        academicYearId = year.id;
      }
    });

    const formattedData = {
      ...data,
      academic_year: academicYearId, // Send the matched ID
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
      <StudentForm
        academicYear={academicYear}
        defaultValues={studentDetail}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default StudentAddPage;
