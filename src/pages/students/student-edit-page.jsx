import Spinner from "@/components/spinner/spinner";
import StudentForm from "@/components/student";
import { studentDetail } from "@/constant";
import { useAcademicYear } from "@/hooks/use-academic-year";
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

  const {
    data: academic_year,
    isLoading: academic_yearIsloading,
    error: academic_yearError,
    refetch: academic_yearRefetch,
  } = useAcademicYear();
  const academicYear = academic_year || [];

  const mutation = useMutation({
    mutationFn: (formattedData) => updateStudent(formattedData, id),
    onSuccess: () => {
      refetch();
      academic_yearRefetch();
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

  const cleanedData = Object.fromEntries(
    Object.entries(initialData).map(([key, value]) => {
      if (key === "academic_year") {
        // Find matching academic year and use its year string
        const matchingYear = academicYear.find((year) => year.id === value);
        return [key, matchingYear ? matchingYear.year : ""];
      }
      // Handle other fields as before
      return [key, value === null ? "" : value];
    })
  );

  if (isLoading || academic_yearIsloading)
    return (
      <>
        <Spinner />
      </>
    );
  if (error || academic_yearError) return <>Error</>;
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
        defaultValues={cleanedData}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default StudentEditPage;
