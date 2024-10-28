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
  console.log("data", initialData);

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
    const formattedData = {
      ...data,
      academic_year: academicYearId,
      birth_date: format(new Date(data.birth_date), "yyyy-MM-dd"),
      left_school_date: data.left_school_date
        ? format(new Date(data.left_school_date), "yyyy-MM-dd")
        : null,
    };
    mutation.mutate(formattedData);
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
