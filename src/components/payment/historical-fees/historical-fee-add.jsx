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

const feetype = [
  { _id: "સ્કૂલ ફી", name: "સ્કૂલ ફી" },
  { _id: "bus fee", name: "bus fee" },
  { _id: "form fee", name: "form fee" },
  { _id: "other", name: "other" },
];

const HistoricalFeesAdd = () => {
  const formSchema = z.object({
    year: z.string().min(1, { message: "Please select a year" }),
    amount: z.coerce.number().min(1, { message: "Please enter amount" }),
    receipt_no: z.coerce
      .number()
      .min(1, { message: "Please enter receipt no" }),
    name: z.string().min(1, { message: "Please enter name" }),
    fee_type: z.string().min(1, { message: "Please select a fee type" }),
    date: z.string().min(1, { message: "Please select a date" }),
    standard: z.string().min(1, { message: "Please select a standard" }),
  });

  const defaultValues = {
    name: "",
    year: "",
    date: "",
    standard: "",
    amount: "",
    fee_type: "",
    receipt_no: "",
  };

  const navigate = useNavigate();

  const [studentName, setStudentName] = useState([]);

  const [loading, setLoading] = useState(false);

  const [standards] = useState([
    "Balvatika",
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
    const token = localStorage.getItem("Token");

    axios
      .post("http://127.0.0.1:8000/historical-fees/add/", data, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then(function (response) {
        navigate("/historical-fee");
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
      <h1>ADD HISTORICAL FEE</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>ADD HISTORICAL FEE</CardTitle>
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
                                {std}
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name*</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter Name"
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
                    name="fee_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fee Type*</FormLabel>
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
                                placeholder="Select a fee type"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {feetype.map((fee) => (
                              <SelectItem key={fee._id} value={fee._id}>
                                {fee.name}
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
                    name="receipt_no"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receipt No*</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter Receipt No"
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
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount*</FormLabel>
                        <FormControl>
                          <Input
                            disabled={loading}
                            placeholder="Enter Amount"
                            {...field}
                          />
                        </FormControl>
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

export default HistoricalFeesAdd;
