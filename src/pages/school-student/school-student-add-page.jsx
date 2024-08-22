import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import SchoolStudentForm from "@/components/school-student/school-student-form";
import { useSchoolStudentsName } from "@/hooks/use-school-student";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { schoolStudentPost } from "@/services/school-student-service";
import Spinner from "@/components/spinner/spinner";

const SchoolStudentAddPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useSchoolStudentsName();
  const students = data?.data || [];

  const defaultValues = {
    year: "",
    student: "",
    note: "None",
    standard: "",
    update_date: "2024",
  };

  const mutation = useMutation({
    mutationFn: (formattedData) => schoolStudentPost(formattedData),
    onSuccess: () => {
      navigate("/school-student");
    },
  });

  const onSubmit = (formData) => {
    let studentId;
    // in below get grno fname and lan comibne and match that same as get data from above array to get student id
    students.forEach((student) => {
      const studentFullName = `${student.grno} - ${student.first_name} ${student.last_name}`;
      if (studentFullName === formData.student) {
        console.log(student.id);
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

  if (isLoading) {
    return <><Spinner/></>;
  }

  if (error) {
    return <>Error</>;
  }

  return (
    <>
      <h1>ADD SCHOOL STUDENT</h1>
      <Card className="">
        <SchoolStudentForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          students={students}
          isLoading={isLoading}
        />
      </Card>
    </>
  );
};

export default SchoolStudentAddPage;
