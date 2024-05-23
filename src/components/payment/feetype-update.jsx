import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";

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

const FeetypeUpdate = () => {
  const formSchema = z.object({
    amount: z.coerce.number().min(1, { message: "Enter Amount" }),
    year: z.string().min(1, { message: "Please select a year" }),
    fee_master: z.string().min(1, { message: "Please select a fee type" }),
    standard: z.string().min(1, { message: "Please select a stadnard" }),
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [feeMaster, setFeeMaster] = useState([]);
  const [standard, setStandard] = useState([]);
  const [feeTypeIdData, setFeeTypeIdData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const defaultValues = {
    year: "",
    fee_master: "",
    standard: "",
    amount: "",
  };

  const getFeeTypeAddDetails = () => {
    const token = localStorage.getItem("Token");
    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };
    setIsLoading(true);
    return axios
      .get("http://127.0.0.1:8000/fee-types/add-search/", config)
      .then(function (response) {
        setFeeMaster(response.data.data.fee_master);
        setStandard(response.data.data.standard);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(true);
      });
  };

  useEffect(() => {
    getFeeTypeAddDetails();
  }, []);
  console.log(standard);
  //  get data by id
  const getFeeTypeIdDetails = () => {
    const token = localStorage.getItem("Token");

    const config = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    setIsLoading(true);

    return axios
      .get(`http://127.0.0.1:8000/fee-types/${id}/search`, config)
      .then(function (response) {
        setFeeTypeIdData(response.data.data);
        // console.log(response.data.data);
        setIsLoading(false);
        form.reset({
          year: response.data.data.year,
          fee_master: response.data.data.fee_master.name,
          standard: response.data.data.standard,
          amount: response.data.data.amount,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getFeeTypeIdDetails();
  }, []);

  const onSubmit = (data) => {
    let feeId;
    feeMaster.forEach((element) => {
      if (element.name === data.fee_master) {
        feeId = element.id;
      }
    });
    const formattedData = {
      ...data,
      fee_master: feeId,
    };
    // console.log(formattedData);

    const token = localStorage.getItem("Token");

    axios
      .patch(`http://127.0.0.1:8000/fee-types/${id}/edit/`, formattedData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(function (response) {
        navigate("/fee-type");
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
  if (isLoading) {
    return <>Loading</>;
  }
  return (
    <>
      <h1>UPDATE FEE TYPE</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>UPDATE FEE TYPE</CardTitle>
          <CardDescription>
            All Fields Are Required in This Form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                onReset={form.reset}
                className="space-y-2 w-full"
              >
                <div className="md:grid md:grid-cols-3 gap-8">
                  <FormField
                    className=""
                    control={form.control}
                    name="fee_master"
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
                                placeholder="Select Fee Type"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {feeMaster.map((fee) => (
                              <SelectItem key={fee.id} value={fee.name}>
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
                    name="standard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Standard*</FormLabel>
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
                                placeholder="Select Standard"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {standard.map((std) => (
                              <SelectItem key={std.id} value={std.name}>
                                {std.name}
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
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter className="mt-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default FeetypeUpdate;
