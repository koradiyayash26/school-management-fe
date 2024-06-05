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
import {
  updateStudentUpdatestdandYearSeleted,
  updateStudentUpdatestdandYearUnseleted,
} from "@/services/student-update";
import { Check, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

  const [selectedActiveStudents, setSelectedActiveStudents] = useState([]);
  const [selectedInactiveStudents, setSelectedInactiveStudents] = useState([]);
  const [isSelectedActive, setIsSelectedActive] = useState(false);
  const [isSelectedInactive, setIsSelectedInactive] = useState(false);

  const mutation = useMutation({
    mutationFn: (jsonData) => updateStudentUpdatestdandYearSeleted(jsonData),
    onSuccess: () => {
      toast.success("Student Update Successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  const mutationUnseleted = useMutation({
    mutationFn: (jsonData) => updateStudentUpdatestdandYearUnseleted(jsonData),
    onSuccess: () => {
      toast.success("Student Refetch Successfully");
      refetch();
    },
    onError: (error) => {
      toast.error(`Update failed: ${error.message}`);
    },
  });

  if (isLoading) return <>Loading...</>;
  if (error) return <>Error</>;

  const students = data?.data;
  const activeStudents = students.filter((student) => student.is_active);
  const inactiveStudents = students.filter((student) => !student.is_active);

  const handleSelectAllActive = () => {
    const allStudentIds = activeStudents.map((student) => student.id);
    setSelectedActiveStudents(allStudentIds);
    setIsSelectedActive(true);
  };

  const handleUnSelectAllActive = () => {
    setIsSelectedActive(false);
    setSelectedActiveStudents([]);
  };

  const handleSelectActiveStudent = (id) => {
    setSelectedActiveStudents((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id];
      return newSelected;
    });
  };

  const handleSelectAllInactive = () => {
    const allStudentIds = inactiveStudents.map((student) => student.id);
    setSelectedInactiveStudents(allStudentIds);
    setIsSelectedInactive(true);
  };

  const handleUnSelectAllInactive = () => {
    setIsSelectedInactive(false);
    setSelectedInactiveStudents([]);
  };

  const handleSelectInactiveStudent = (id) => {
    setSelectedInactiveStudents((prevSelected) => {
      const newSelected = prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id];
      return newSelected;
    });
  };

  const handleSubmitActive = () => {
    const selectedStudentsGRNO = selectedActiveStudents
      .map((id) => {
        const student = activeStudents.find((student) => student.id === id);
        return student ? student.grno : null;
      })
      .filter(Boolean);

    const logData = {
      selectedGRNOs: selectedStudentsGRNO,
    };

    let jsonData = JSON.stringify(logData, null, 2);
    console.log(jsonData + "Unseleted");
    mutationUnseleted.mutate(jsonData);
  };

  const handleSubmitInactive = () => {
    const selectedStudentsGRNO = selectedInactiveStudents
      .map((id) => {
        const student = inactiveStudents.find((student) => student.id === id);
        return student ? student.grno : null;
      })
      .filter(Boolean);

    const logData = {
      selectedGRNOs: selectedStudentsGRNO,
    };

    let jsonData = JSON.stringify(logData, null, 2);
    console.log(jsonData + "seleted");
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
      <Alert className="">
        <AlertTitle>Notice :</AlertTitle>
        <AlertDescription className="capitalize">
          When you update standard and year that update on
          <p className="inline uppercase underline font-semibold">
            &nbsp;general register&nbsp;
          </p>
          also that under data can remove.
        </AlertDescription>
      </Alert>
      <h1>STUDENT NOT UPDATED</h1>
      <div>
        <Button
          onClick={handleSubmitInactive}
          disabled={selectedInactiveStudents.length === 0}
        >
          Update
        </Button>
      </div>
      <ScrollArea className="rounded-md border max-w-[1280px] h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">
                {selectedInactiveStudents.length === inactiveStudents.length ? (
                  <Checkbox
                    className="mr-4"
                    checked={
                      isSelectedInactive ||
                      selectedInactiveStudents.length ===
                        inactiveStudents.length
                    }
                    onClick={handleUnSelectAllInactive}
                  />
                ) : (
                  <Checkbox
                    className="mr-4"
                    checked={isSelectedInactive}
                    onClick={handleSelectAllInactive}
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
            {inactiveStudents.map((student) => {
              const isSelected = selectedInactiveStudents.includes(student.id);
              return (
                <TableRow
                  key={student.id}
                  className={isSelected ? "bg-muted" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onClick={() => handleSelectInactiveStudent(student.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <X className="w-4 h-4" />
                  </TableCell>
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
      <h1>STUDENT UPDATED</h1>
      <div>
        <Button
          onClick={handleSubmitActive}
          disabled={selectedActiveStudents.length === 0}
        >
          Update
        </Button>
      </div>
      <ScrollArea className="rounded-md border max-w-[1280px] h-[calc(80vh-120px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">
                {selectedActiveStudents.length === activeStudents.length ? (
                  <Checkbox
                    className="mr-4"
                    checked={
                      isSelectedActive ||
                      selectedActiveStudents.length === activeStudents.length
                    }
                    onClick={handleUnSelectAllActive}
                  />
                ) : (
                  <Checkbox
                    className="mr-4"
                    checked={isSelectedActive}
                    onClick={handleSelectAllActive}
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
            {activeStudents.map((student) => {
              const isSelected = selectedActiveStudents.includes(student.id);
              return (
                <TableRow
                  key={student.id}
                  className={isSelected ? "bg-muted" : ""}
                >
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onClick={() => handleSelectActiveStudent(student.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Check className="w-4 h-4" />
                  </TableCell>
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
