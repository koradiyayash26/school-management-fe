import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GrDetails } from "./gr-details";
import { BankDetails } from "./bank-details";
import { SchoolLeaveDetails } from "./school-leave-details";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";

const formSchema = z.object({
  student_img: z.any().optional(),
  grno: z.coerce.number().min(1, { message: "Grno is required" }),
  first_name: z
    .string()
    .max(50, { message: "First Name must not exceed 50 characters" })
    .min(3, { message: "First Name must be at least 3 characters" }),
  last_name: z
    .string()
    .max(50, { message: "Last Name must not exceed 50 characters" })
    .min(3, { message: "Last Name must be at least 3 characters" }),
  middle_name: z
    .string()
    .max(50, { message: "Middle Name must not exceed 50 characters" })
    .min(3, { message: "Middle Name must be at least 3 characters" }),
  mother_name: z
    .string()
    .max(50, { message: "Mother Name must not exceed 50 characters" })
    .optional(),
  birth_date: z.string().nonempty("Date of birth is required"),
  birth_place: z
    .string()
    .max(100, { message: "Birth Place must not exceed 100 characters" })
    .optional(),
  religion: z
    .string()
    .max(50, { message: "Religion must not exceed 50 characters" })
    .min(1, { message: "Please select a religion" }),
  category: z
    .string()
    .max(50, { message: "Category must not exceed 50 characters" })
    .min(1, { message: "Please select a category" }),
  caste: z
    .string()
    .max(50, { message: "Caste must not exceed 50 characters" })
    .optional(),
  admission_std: z
    .string()
    .max(10, { message: "Admission Standard must not exceed 10 characters" })
    .optional(),
  admission_date: z.string().min(1, { message: "Please select a category" }),
  standard: z
    .string()
    .max(10, { message: "Standard must not exceed 10 characters" })
    .optional(),
  section: z
    .string()
    .max(1, { message: "Section must not exceed 1 characters" })
    .optional(),
  academic_year: z
    .string()
    .min(1, { message: "Please select an academic year" })
    .max(100, { message: "Academic year is too long" }),
  last_school: z
    .string()
    .max(100, { message: "Last School must not exceed 100 characters" })
    .optional(),
  city: z
    .string()
    .min(3, { message: "City must be at least 2 characters" })
    .max(50, { message: "City must not exceed 50 characters" }),
  district: z
    .string()
    .min(3, { message: "District must be at least 2 characters" })
    .max(50, { message: "District must not exceed 50 characters" }),
  address: z
    .string()
    .max(100, { message: "Address must not exceed 100 characters" })
    .optional(),
  mobile_no: z
    .union([
      z.literal(""),
      z
        .string()
        .length(10, { message: "Mobile Number must be exactly 10 digits" })
        .regex(/^\d+$/, { message: "Mobile Number must contain only digits" }),
    ])
    .optional(),
  status: z
    .string()
    .max(10, { message: "Status must not exceed 10 characters" })
    .optional(),
  gender: z
    .string()
    .max(10, { message: "Gender must not exceed 10 characters" })
    .optional(),
  udise_no: z
    .string()
    .max(50, { message: "Udise Number must not exceed 50 characters" })
    .optional(),
  aadhar_no: z
    .string()
    .max(16, { message: "Aadhar Number must not exceed 16 characters" })
    .optional(),
  assesment: z.coerce
    .number()
    .max(13, { message: "Assesment Standard must 13 max" })
    .optional(),
  progress: z.coerce
    .number()
    .max(100, { message: "Progress must be 13 standard" })
    .optional(),
  reason: z
    .string()
    .max(100, { message: "Reason must not be 100 characters" })
    .optional(),
  left_school_date: z.string().optional(),
  left_school_std: z
    .union([
      z.literal(""),
      z.enum(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"], {
        message: "Left School Standard must be between 1 and 12",
      }),
    ])
    .optional(),
  account_no: z
    .string()
    .max(50, { message: "Account No Must not exceed 50 characters" })
    .optional(),
  name_on_passbook: z
    .string()
    .max(100, { message: "Name of PassBook Must not exceed 100 characters" })
    .optional(),
  bank_name: z
    .string()
    .max(100, { message: "Bank Name Must not exceed 100 characters" })
    .optional(),
  ifsc_code: z
    .string()
    .max(50, { message: "IFSC CODE Must not exceed 50 characters" })
    .optional(),
  bank_address: z
    .string()
    .max(100, { message: "Bank Address Must be 50 characters" })
    .optional(),
});

function StudentForm({ academicYear, defaultValues, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      student_img: defaultValues.student_img || null,
      grno: defaultValues.grno || 0,
      first_name: defaultValues.first_name || "",
      middle_name: defaultValues.middle_name || "",
      last_name: defaultValues.last_name || "",
      mother_name: defaultValues.mother_name || "",
      birth_date: defaultValues.birth_date || null,
      birth_place: defaultValues.birth_place || "",
      religion: defaultValues.religion || "",
      category: defaultValues.category || "",
      caste: defaultValues.caste || "",
      admission_std: defaultValues.admission_std || "",
      admission_date: defaultValues.admission_date || "",
      standard: defaultValues.standard || "",
      section: defaultValues.section || "",
      last_school: defaultValues.last_school || "",
      city: defaultValues.city || "",
      district: defaultValues.district || "",
      address: defaultValues.address || "",
      mobile_no: defaultValues.mobile_no || "",
      status: defaultValues.status || "",
      gender: defaultValues.gender || "",
      udise_no: defaultValues.udise_no || "",
      aadhar_no: defaultValues.aadhar_no || "",
      academic_year: defaultValues.academic_year || "",
      account_no: defaultValues.account_no || "",
      name_on_passbook: defaultValues.name_on_passbook || "",
      bank_name: defaultValues.bank_name || "",
      ifsc_code: defaultValues.ifsc_code || "",
      bank_address: defaultValues.bank_address || "",
    },
    onSubmit,
  });

  let { id } = useParams();

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onReset={form.reset}
          className="space-y-2 w-full"
        >
          <Tabs defaultValue="gr-details" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="gr-details" className="whitespace-pre-wrap">
                <span className="hidden sm:block">GR Details</span>
                <span className="sm:hidden">GR</span>
              </TabsTrigger>
              <TabsTrigger value="bank-details" className="whitespace-pre-wrap">
                <span className="hidden sm:block">Bank Details</span>
                <span className="sm:hidden">Bank</span>
              </TabsTrigger>
              <TabsTrigger value="slr" className="whitespace-pre-wrap">
                <span className="hidden sm:block">School Leave Reason</span>
                <span className="sm:hidden">Leave</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="gr-details">
              <Card>
                <CardHeader>
                  <CardTitle>GR Details</CardTitle>
                  <CardDescription>
                    {`${
                      id ? "Edit" : "Add"
                    } student data here. Click save when you're done.`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <GrDetails
                    academicYear={academicYear}
                    form={form}
                    categories={[
                      { _id: "જનરલ", name: "જનરલ" },
                      { _id: "ઓ.બી.સી.", name: "ઓ.બી.સી." },
                      { _id: "એસસી/એસટી", name: "એસસી/એસટી" },
                      { _id: "ઇ.ડબ્લ્યુ.એસ.", name: "ઇ.ડબ્લ્યુ.એસ." },
                    ]}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bank-details">
              <Card>
                <CardHeader>
                  <CardTitle>Bank Details</CardTitle>
                  <CardDescription>
                    Add Your Bank Details Here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <BankDetails form={form} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="slr">
              <Card>
                <CardHeader>
                  <CardTitle>School Leave Details</CardTitle>
                  <CardDescription>
                    Add your School Leave Details here. Click save when you're
                    done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <SchoolLeaveDetails form={form} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Card>
            <CardContent className="p-2 border flex gap-2">
              <Button className="w-1/2" type="submit">
                Save
              </Button>
              <Button className="w-1/2" type="reset">
                Reset
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}

export default StudentForm;
