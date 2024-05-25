import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ExamMarksAdd = () => {
  const formSchema = z.object({
    student: z.string().min(1, { message: "Please select a student" }),
    total_marks: z.coerce
      .number()
      .min(1, { message: "Please enter total mark" }),
    marks: z.coerce.number().min(1, { message: "Please enter total mark" }),
    sub: z.string().min(1, { message: "Please select a subject" }),
    date: z.string().min(1, { message: "Please select a date" }),
    std: z.string().min(1, { message: "Please select a standard" }),
  });

  const defaultValues = {
    student: "",
    total_marks: "",
    marks: "",
    std: "",
    sub: "",
    date: "",
  };

  const navigate = useNavigate();

  const [studentName, setStudentName] = useState([]);

  const [loading, setLoading] = useState(false);

  const [standards] = useState([
    "13",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ]);

  const getStudentData = () => {
    const token = localStorage.getItem("Token");

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    setLoading(true);

    return axios
      .get(`http://127.0.0.1:8000/students/search`, config)
      .then((response) => {
        setStudentName(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getStudentData();
  }, []);

  const onSubmit = (data) => {
    const selectedStudent = studentName.find(
      (student) => `${student.first_name} ${student.last_name}` === data.student
    );
    if (selectedStudent) {
      data.student = selectedStudent.id;
    }

    const token = localStorage.getItem("Token");

    axios
      .post("http://127.0.0.1:8000/exams/add/", data, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        navigate("/exam");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    onSubmit,
  });

  return (
    <>
      <h1>ADD EXAM MARKS</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>ADD EXAM MARKS</CardTitle>
          <CardDescription>
            All Fields Are Required in This Form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 w-full"
              >
                <div className="md:grid md:grid-cols-3 gap-8">
                  <FormField
                    className=""
                    control={form.control}
                    name="student"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student*</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Student" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {studentName.map((student) => (
                              <SelectItem
                                key={student.id}
                                value={`${student.first_name} ${student.last_name}`}
                              >
                                {`${student.first_name} ${student.last_name}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    className=""
                    control={form.control}
                    name="std"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Standard*</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Standard" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {standards.map((std) => (
                              <SelectItem key={std} value={std}>
                                {std == 13 ? "Balvatika" : std}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    className=""
                    control={form.control}
                    name="sub"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject*</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter Subject Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    className=""
                    control={form.control}
                    name="total_marks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Mark*</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter Total Mark"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    className=""
                    control={form.control}
                    name="marks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mark*</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter Mark"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    className=""
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col self-end">
                        <FormLabel>Date*</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={
                                  "pl-3 text-left font-normal" +
                                  (!field.value ? " text-muted-foreground" : "")
                                }
                              >
                                {field.value ? (
                                  format(new Date(field.value), "yyyy-MM-dd")
                                ) : (
                                  <span>Pick a Date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(date) => {
                                field.onChange(format(date, "yyyy-MM-dd"));
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="mt-4">
                  Save
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ExamMarksAdd;
