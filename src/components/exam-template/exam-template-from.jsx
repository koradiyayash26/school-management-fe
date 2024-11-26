import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ExamTemplateForm = ({ defaultValues, onSubmit, loading }) => {
  const formSchema = z.object({
    total_marks: z.coerce
      .number()
      .min(1, { message: "Please enter total mark" }),
    subject: z.string().min(1, { message: "Please select a subject" }),
    note: z
      .string()
      .max(100, { message: "Note Must not exceed 100 characters" })
      .optional(),
    date: z.string().min(1, { message: "Please select a date" }),
    standard: z.string().min(1, { message: "Please select a standard" }),
  });

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
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    onSubmit,
  });

  return (
    <div>
      {" "}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 space-y-4 md:space-y-0 mb-4">
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
              name="subject"
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
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col self-end">
                  <div>
                    <FormLabel>Date*</FormLabel>
                  </div>
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
                          date > new Date() || date < new Date("1900-01-01")
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
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter Note"
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
  );
};

export default ExamTemplateForm;
