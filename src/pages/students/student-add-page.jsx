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

    // Create FormData to handle file upload
    const formData = new FormData();

    // Add all form fields to FormData
    Object.keys(data).forEach((key) => {
      if (key === "student_img" && data[key] instanceof File) {
        formData.append("student_img", data[key]);
      } else if (key === "birth_date") {
        formData.append(
          "birth_date",
          format(new Date(data[key]), "yyyy-MM-dd")
        );
      } else if (key === "left_school_date" && data[key]) {
        formData.append(
          "left_school_date",
          format(new Date(data[key]), "yyyy-MM-dd")
        );
      } else if (key === "academic_year") {
        formData.append("academic_year", academicYearId);
      } else {
        formData.append(key, data[key]);
      }
    });

    mutation.mutate(formData);
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
