import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import SchoolStudentForm from "@/components/school-student/school-student-form";
import {
  useSchoolStudentsIdData,
  useSchoolStudentsName,
} from "@/hooks/use-school-student";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  schoolStudentPatch,
  schoolStudentPost,
} from "@/services/school-student-service";
import Spinner from "@/components/spinner/spinner";

const SchoolStudentUpdatePage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading, error } = useSchoolStudentsName();
  const {
    data: studentData,
    isLoading: idDataLoading,
    error: idDataErro,
    refetch,
  } = useSchoolStudentsIdData(id);

  let initialdata = studentData?.data;
  const students = data?.data || [];

  const defaultValues = {
    year: initialdata?.year || "",
    student: `${initialdata?.student?.grno} - ${initialdata?.student?.first_name} ${initialdata?.student?.last_name}`,
    note: initialdata?.note || "none",
    standard: initialdata?.standard,
    update_date: initialdata?.update_date,
  };

  const mutation = useMutation({
    mutationFn: (formattedData) => schoolStudentPatch(formattedData, id),
    onSuccess: () => {
      refetch();
      navigate("/school-student");
    },
  });

  const onSubmit = (formData) => {
    let studentId;
    // in below get grno fname and lan comibne and match that same as get data from above array to get student id
    students.forEach((student) => {
      const studentFullName = `${student.grno} - ${student.first_name} ${student.last_name}`;
      if (studentFullName === formData.student) {
        studentId = student.id;
        return studentId;
      }
    });

    const formattedData = {
      ...formData,
      student: studentId,
    };
    mutation.mutate(formattedData);
  };

  if (isLoading || idDataLoading) {
    return <><Spinner/></>;
  }

  if (error || idDataErro) {
    return <>Error</>;
  }

  return (
    <>
      <Card className="">
        <SchoolStudentForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          students={students}
          isLoading={isLoading}
          id={id}
        />
      </Card>
    </>
  );
};

export default SchoolStudentUpdatePage;
