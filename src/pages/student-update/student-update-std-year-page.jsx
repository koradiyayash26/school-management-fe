import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useStudentUpdateStdYearData } from "@/hooks/use-student-update";
import { useParams } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { updateStudentUpdatestdandYear } from "@/services/student-update";
import { Check, X } from "lucide-react";

const headers = [
  { label: "Grno", value: "grno" },
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Year", value: "year" },
  { label: "Standard", value: "standard" },
];

function StudentUpdateStdYearPage() {
  const { std, year } = useParams();
  const { data, isLoading, error, refetch } = useStudentUpdateStdYearData(
    std,
    year
  );

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isSeleted, setIsSeleted] = useState(false);

  const mutation = useMutation({
    mutationFn: (jsonData) => updateStudentUpdatestdandYear(jsonData),
    onSuccess: () => {
      toast.success("Student Update Successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error</>;

  const students = data;

  const handleSelectAll = () => {
    const allStudentIds = students.map((student) => student.id);
    setSelectedStudents(allStudentIds);
    setIsSeleted(true);
  };

  const handleUnSelectAll = () => {
    setIsSeleted(false);
    setSelectedStudents([]);
  };

  const handleSelectStudent = (id) => {
    setSelectedStudents((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id];
      return newSelected;
    });
  };

  const handleSubmit = () => {
    const unselectedStudents = students
      .filter((student) => !selectedStudents.includes(student.id))
      .map((student) => student.grno); // Use student.grno to get the GRNO values

    const selectedStudentsGRNO = selectedStudents
      .map((id) => {
        const student = students.find((student) => student.id === id);
        return student ? student.grno : null;
      })
      .filter(Boolean);

    const logData = {
      selectedGRNOs: selectedStudentsGRNO,
      unselectedGRNOs: unselectedStudents,
    };

    let jsonData = JSON.stringify(logData, null, 2);
    mutation.mutate(jsonData);
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <h1>STUDENT UPDATE</h1>

      <div>
        <Button onClick={handleSubmit}>Update</Button>
      </div>
      <ScrollArea className="rounded-md border max-w-[1280px] h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">
                {selectedStudents.length === students.length ? (
                  <Checkbox
                    className="mr-4"
                    checked={
                      isSeleted || selectedStudents.length === students.length
                    }
                    onClick={handleUnSelectAll}
                  />
                ) : (
                  <Checkbox
                    className="mr-4"
                    checked={isSeleted}
                    onClick={handleSelectAll}
                  />
                )}
              </TableHead>
              <TableHead>Status</TableHead>
              {headers.map((header, index) => (
                <TableHead key={index} className="text-center">
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              const isSelected = selectedStudents.includes(student.id);
              return (
                <TableRow key={student.id}>
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onClick={() => handleSelectStudent(student.id)}
                    />
                  </TableCell>
                  {student.is_active ? (
                    <TableCell>
                      <Check className="w-4 h-4" />
                    </TableCell>
                  ) : (
                    <TableCell>
                      <X className="w-4 h-4" />
                    </TableCell>
                  )}
                  {headers.map((header) => (
                    <TableCell
                      key={header.value}
                      className="capitalize text-center"
                    >
                      {header.value === "standard" && student.standard === "13"
                        ? "Balvatika"
                        : student[header.value] || "None"}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}

export default StudentUpdateStdYearPage;
