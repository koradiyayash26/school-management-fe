import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { addStudentUpdateTemplateData } from "@/services/student-update";

const years = [
  { _id: "2024", name: "2024" },
  { _id: "2023", name: "2023" },
  { _id: "2022", name: "2022" },
  { _id: "2021", name: "2021" },
  { _id: "2020", name: "2020" },
  { _id: "2019", name: "2019" },
  { _id: "2018", name: "2018" },
  { _id: "2017", name: "2017" },
  { _id: "2016", name: "2016" },
  { _id: "2015", name: "2015" },
  { _id: "2014", name: "2014" },
  { _id: "2013", name: "2013" },
  { _id: "2012", name: "2012" },
  { _id: "2011", name: "2011" },
  { _id: "2010", name: "2010" },
  { _id: "2009", name: "2009" },
  { _id: "2008", name: "2008" },
  { _id: "2007", name: "2007" },
  { _id: "2006", name: "2006" },
  { _id: "2005", name: "2005" },
  { _id: "2004", name: "2004" },
  { _id: "2003", name: "2003" },
  { _id: "2002", name: "2002" },
  { _id: "2001", name: "2001" },
  { _id: "2000", name: "2000" },
];

const StudentUpdateAddPage = () => {
  const formSchema = z.object({
    year: z.string().min(1, { message: "Please select a year" }),
    standard: z.string().min(1, { message: "Please select a standard" }),
  });

  const defaultValues = {
    year: "",
    standard: "",
  };

  const navigate = useNavigate();

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

  const mutation = useMutation({
    mutationFn: (data) => addStudentUpdateTemplateData(data),
    onSuccess: () => {
      navigate("/update");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    onSubmit,
  });

  return (
    <>
      <h1>ADD STANDARD AND YEAR TEMPLATE</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>ADD STANDARD AND YEAR TEMPLATE</CardTitle>
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
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year*</FormLabel>
                        <Select
                          disabled={loading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                                placeholder="Select a Year"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {years.map((year) => (
                              <SelectItem key={year._id} value={year._id}>
                                {year.name}
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
                    name="standard"
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
                                {std == 13 ? "Balvatike" : std}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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

export default StudentUpdateAddPage;
