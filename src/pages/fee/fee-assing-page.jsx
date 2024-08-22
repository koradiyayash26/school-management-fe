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
import { Checkbox } from "@/components/ui/checkbox";
import { useParams } from "react-router-dom";
import { useFeeStudentAssignUnAssignData } from "@/hooks/use-fees";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { assignStudentUpdatePatch } from "@/services/fees-service";
import Spinner from "@/components/spinner/spinner";

const headers = [
  { label: "Id", value: "id" },
  { label: "Grno", value: "grno" },
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Middle Name", value: "middle_name" },
  { label: "Standard", value: "standard" },
  { label: "Section", value: "section" },
  { label: "City", value: "city" },
  { label: "District", value: "district" },
  { label: "Address", value: "address" },
  { label: "Gender", value: "gender" },
];

function FeesAssingPage() {
  const { id, std, year } = useParams();
  const { data, isLoading, error, refetch } = useFeeStudentAssignUnAssignData(
    id,
    std,
    year
  );

  const [selectedAssignedStudents, setSelectedAssignedStudents] = useState([]);
  const [selectedNotAssignedStudents, setSelectedNotAssignedStudents] =
    useState([]);
  const [isSelectedAssigned, setIsSelectedAssigned] = useState(false);
  const [isSelectedNotAssigned, setIsSelectedNotAssigned] = useState(false);

  const mutation = useMutation({
    mutationFn: (assigned_students_data) =>
      assignStudentUpdatePatch(assigned_students_data),
    onSuccess: (data) => {
      toast.success(data.message || "Student Assign Successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  if (isLoading) {
    return <><Spinner/></>;
  }
  if (error) {
    return <>Error</>;
  }
  const updateData = data;
  const assigned_students = data?.assigned_students || [];
  const not_assigned_students = data?.not_assigned_students || [];

  const handleSelectAllAssigned = () => {
    const allStudentIds = assigned_students.map((student) => student.id);
    setSelectedAssignedStudents(allStudentIds);
    setIsSelectedAssigned(true);
  };

  const handleUnSelectAllAssigned = () => {
    setIsSelectedAssigned(false);
    setSelectedAssignedStudents([]);
  };

  const handleSelectAssignedStudent = (id) => {
    setSelectedAssignedStudents((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id];
      return newSelected;
    });
  };

  const handleSelectAllNotAssigned = () => {
    const allStudentIds = not_assigned_students.map((student) => student.id);
    setSelectedNotAssignedStudents(allStudentIds);
    setIsSelectedNotAssigned(true);
  };

  const handleUnSelectAllNotAssigned = () => {
    setIsSelectedNotAssigned(false);
    setSelectedNotAssignedStudents([]);
  };

  const handleSelectNotAssignedStudent = (id) => {
    setSelectedNotAssignedStudents((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id];
      return newSelected;
    });
  };

  const handleUpdateAssigned = () => {
    let assigned_students_data = {
      students: selectedAssignedStudents,
      fee_type_id: updateData.fee_type_id,
      standard: updateData.standard,
      year: updateData.year,
      assign: false,
    };
    mutation.mutate(assigned_students_data);
  };

  const handleUpdateNotAssigned = () => {
    let assigned_students_data = {
      students: selectedNotAssignedStudents,
      fee_type_id: updateData.fee_type_id,
      standard: updateData.standard,
      year: updateData.year,
      assign: true,
    };
    mutation.mutate(assigned_students_data);
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
      <h1>Assigned Students</h1>
      <div>
        <Button
          onClick={handleUpdateAssigned}
          disabled={selectedAssignedStudents.length === 0}
        >
          Update
        </Button>
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">
                {selectedAssignedStudents.length === assigned_students.length &&
                selectedAssignedStudents.length !== 0 ? (
                  <Checkbox
                    className="mr-4"
                    checked={
                      isSelectedAssigned ||
                      selectedAssignedStudents.length ===
                        assigned_students.length
                    }
                    onClick={handleUnSelectAllAssigned}
                  />
                ) : (
                  <Checkbox
                    className="mr-4"
                    checked={isSelectedAssigned}
                    onClick={handleSelectAllAssigned}
                  />
                )}
              </TableHead>
              {headers.map((header, index) => (
                <TableHead key={index} className="text-center">
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {assigned_students.map((student) => {
              const isSelected = selectedAssignedStudents.includes(student.id);
              return (
                <TableRow
                  key={student.id}
                  className={isSelected ? "bg-muted" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onClick={() => handleSelectAssignedStudent(student.id)}
                    />
                  </TableCell>
                  {headers.map((header) => (
                    <TableCell key={header.value} className="text-center">
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

      <h1>Not Assigned Students</h1>
      <div>
        <Button
          onClick={handleUpdateNotAssigned}
          disabled={selectedNotAssignedStudents.length === 0}
        >
          Update
        </Button>
      </div>
      <ScrollArea className="rounded-md border w-full h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">
                {selectedNotAssignedStudents.length ===
                  not_assigned_students.length &&
                selectedNotAssignedStudents.length !== 0 ? (
                  <Checkbox
                    className="mr-4"
                    checked={
                      isSelectedNotAssigned ||
                      selectedNotAssignedStudents.length ===
                        not_assigned_students.length
                    }
                    onClick={handleUnSelectAllNotAssigned}
                  />
                ) : (
                  <Checkbox
                    className="mr-4"
                    checked={isSelectedNotAssigned}
                    onClick={handleSelectAllNotAssigned}
                  />
                )}
              </TableHead>
              {headers.map((header, index) => (
                <TableHead key={index} className="text-center">
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {not_assigned_students.map((student) => {
              const isSelected = selectedNotAssignedStudents.includes(
                student.id
              );
              return (
                <TableRow
                  key={student.id}
                  className={isSelected ? "bg-muted" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onClick={() => handleSelectNotAssignedStudent(student.id)}
                    />
                  </TableCell>
                  {headers.map((header) => (
                    <TableCell key={header.value} className="text-center">
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

export default FeesAssingPage;
