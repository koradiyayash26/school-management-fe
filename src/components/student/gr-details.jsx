import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Trash } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";

export const GrDetails = ({ form, categories }) => {
  const [loading, setLoading] = useState(false);

  const religions = [
    { _id: "હિન્દુ", name: "હિન્દુ" },
    { _id: "જૈન", name: "જૈન" },
    { _id: "મુસ્લિમ", name: "મુસ્લિમ" },
    { _id: "શિખ", name: "શિખ" },
    { _id: "ખ્રિસ્તી", name: "ખ્રિસ્તી" },
  ];

  const standard = [
    { _id: "13", name: "Balvatika" },
    { _id: "1", name: "1" },
    { _id: "2", name: "2" },
    { _id: "3", name: "3" },
    { _id: "4", name: "4" },
    { _id: "5", name: "5" },
    { _id: "6", name: "6" },
    { _id: "7", name: "7" },
    { _id: "8", name: "8" },
  ];

  const section = [
    { _id: "A", name: "A" },
    { _id: "B", name: "B" },
    { _id: "C", name: "C" },
    { _id: "D", name: "D" },
  ];

  const status = [
    { _id: "ચાલુ", name: "ચાલુ" },
    { _id: "કમી", name: "કમી" },
  ];

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

  const gender = [
    { _id: "કુમાર", name: "કુમાર" },
    { _id: "કન્યા", name: "કન્યા" },
  ];

  return (
    <>
      <div className="flex items-center justify-between"></div>

      <div className="md:grid md:grid-cols-3 gap-8">
        <FormField
          control={form.control}
          name="grno"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grno*</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  {...field}
                  placeholder="grno"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name*</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Firstname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middle_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name*</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="MiddleName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name*</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="LastName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mother_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mother Name</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="MotherName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth_place"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birth Place</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="BirthPlace" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="religion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Religion*</FormLabel>
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
                      placeholder="Select a religion"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {religions.map((religion) => (
                    <SelectItem key={religion._id} value={religion._id}>
                      {religion.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category*</FormLabel>
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
                      placeholder="Select a category"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="caste"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Caste</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Caste" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="admission_std"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Admission Std*</FormLabel>
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
                      placeholder="Select a Admission Std"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {standard.map((std) => (
                    <SelectItem key={std._id} value={std._id}>
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
                      placeholder="Select a Standard"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {standard.map((std) => (
                    <SelectItem key={std._id} value={std._id}>
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
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section*</FormLabel>
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
                      placeholder="Select a Section"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {section.map((clas) => (
                    <SelectItem key={clas._id} value={clas._id}>
                      {clas.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_school"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last School</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Last School"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City*</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>District*</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="District" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile No</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Mobile No" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status*</FormLabel>
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
                      placeholder="Select a Status"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {status.map((stat) => (
                    <SelectItem key={stat._id} value={stat._id}>
                      {stat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender*</FormLabel>
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
                      placeholder="Select a Gender"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gender.map((ge) => (
                    <SelectItem key={ge._id} value={ge._id}>
                      {ge.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="udise_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UDISE NO</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="UDISE NO" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aadhar_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhar No</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Aadhar No" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem className="flex flex-col self-end">
              <FormLabel>Date of birth*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={
                        ("pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground")
                      }
                    >
                      {field.value ? (
                        format(field.value, "y-M-d")
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
                    selected={field.value}
                    // onSelect={field.onChange}
                    onSelect={(date) => {
                      field.onChange(format(date, "y-M-d"));
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
          control={form.control}
          name="admission_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>admission_date*</FormLabel>
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
      </div>
    </>
  );
};
