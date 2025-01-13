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
import { CalendarIcon, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import apiClient from "@/lib/api-client";

export const GrDetails = ({ academicYear, form, categories }) => {
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

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
    { _id: "9", name: "9" },
    { _id: "10", name: "10" },
    { _id: "11", name: "11" },
    { _id: "12", name: "12" },
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
    { _id: "2030", name: "2030" },
    { _id: "2029", name: "2029" },
    { _id: "2028", name: "2028" },
    { _id: "2027", name: "2027" },
    { _id: "2026", name: "2026" },
    { _id: "2025", name: "2025" },
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

  const getMediaUrl = (path) => {
    const baseURL = apiClient.defaults.baseURL.replace(/\/$/, ''); // Remove trailing slash if present
    return path?.startsWith("/media") ? `${baseURL}${path}` : path;
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <FormField
          control={form.control}
          name="grno"
          render={({ field }) => (
            <FormItem
              className={`${
                form.formState.errors.grno ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">Grno*</FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.first_name ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                First Name*
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.middle_name ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Middle Name*
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.last_name ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Last Name*
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.mother_name ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Mother Name
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.birth_place ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Birth Place
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.religion ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Religion*
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.category ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Category*
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.caste ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">Caste</FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.admission_std ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Admission Std*
              </FormLabel>
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
                      {std.name == 13 ? "Balvatika" : std.name}
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
            <FormItem
              className={`${
                form.formState.errors.standard ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Standard*
              </FormLabel>
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
                      {std.name == 13 ? "Balvatika" : std.name}
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
            <FormItem
              className={`${
                form.formState.errors.section ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Section*
              </FormLabel>
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
          name="academic_year"
          render={({ field }) => (
            <FormItem
              className={`${
                form.formState.errors.academic_year ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Academic Year*
              </FormLabel>
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
                  {academicYear.map((year) => (
                    <SelectItem key={year.id} value={year.year}>
                      {year.year}
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
            <FormItem
              className={`${
                form.formState.errors.last_school ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Last School
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.city ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">City*</FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.district ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                District*
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.address ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Address
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.mobile_no ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Mobile No
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.status ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Status*
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.gender ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Gender*
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.udise_no ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                UDISE NO
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.aadhar_no ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Aadhar No
              </FormLabel>
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
            <FormItem
              className={`flex flex-col self-end${
                form.formState.errors.birth_date ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <div>
                <FormLabel className="dark:text-white text-dark">
                  Date Of Birth*
                </FormLabel>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={
                        ("pl-3 text-left font-normal w-full",
                        !field.value && "text-muted-foreground w-full")
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
            <FormItem
              className={`${
                form.formState.errors.admission_date ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Admission Date*
              </FormLabel>
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
          control={form.control}
          name="student_img"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem className="">
              <FormLabel className="dark:text-white text-dark">
                Student Image
              </FormLabel>
              <div className="flex items-center gap-4">
                {imagePreview || value ? (
                  <div className="relative">
                    <Avatar className="sm:h-40 h-48 w-full sm:w-80 rounded-sm overflow-hidden">
                      <AvatarImage
                        src={imagePreview || getMediaUrl(value)}
                        alt="Student image"
                        className="object-contain rounded-sm h-full w-full"
                      />
                    </Avatar>
                    <div className="absolute sm:top-2 sm:right-6 right-2 top-12 flex gap-2">
                      <Button
                        type="button"
                        variant="secondary"
                        size="icon"
                        className="sm:h-8 sm:w-8 w-6 h-6 bg-black/80 hover:bg-black border"
                        onClick={() => {
                          const fileInput = document.createElement("input");
                          fileInput.type = "file";
                          fileInput.accept = "image/jpeg,image/jpg,image/png";
                          fileInput.onchange = (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Validate file type
                              const validTypes = [
                                "image/jpeg",
                                "image/png",
                                "image/jpg",
                              ];
                              if (!validTypes.includes(file.type)) {
                                setFileError(
                                  "Please select only JPG, JPEG or PNG files"
                                );
                                return;
                              }
                              // Validate file size (5MB)
                              const fiveMB = 5 * 1024 * 1024;
                              if (file.size > fiveMB) {
                                setFileError("File size must be less than 5MB");
                                return;
                              }
                              setFileError(null);
                              onChange(file);
                              setImagePreview(URL.createObjectURL(file));
                            }
                          };
                          fileInput.click();
                        }}
                      >
                        <Pencil className="h-4 w-4 text-white" />
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="sm:h-8 sm:w-8 w-6 h-6 bg-red-500 hover:bg-red-600"
                        onClick={() => {
                          onChange(null);
                          setImagePreview(null);
                          setFileError(null);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full">
                    <Input
                      type="file"
                      className=""
                      accept="image/jpeg,image/jpg,image/png"
                      disabled={loading}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Validate file type
                          const validTypes = [
                            "image/jpeg",
                            "image/png",
                            "image/jpg",
                          ];
                          if (!validTypes.includes(file.type)) {
                            setFileError(
                              "Please select only JPG, JPEG or PNG files"
                            );
                            return;
                          }
                          // Validate file size (5MB)
                          const fiveMB = 5 * 1024 * 1024;
                          if (file.size > fiveMB) {
                            setFileError("File size must be less than 5MB");
                            return;
                          }
                          setFileError(null);
                          onChange(file);
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }}
                      {...field}
                    />
                  </div>
                )}
              </div>
              <FormMessage />
              {fileError && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {fileError}
                </p>
              )}
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
