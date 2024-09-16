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

const formSchema = z.object({
  grno: z.coerce.number().min(1, { message: "Grno is required" }),
  first_name: z
    .string()
    .min(3, { message: "First Name must be at least 3 characters" }),
  last_name: z
    .string()
    .min(3, { message: "Last Name must be at least 3 characters" }),
  middle_name: z
    .string()
    .min(3, { message: "Middle Name must be at least 3 characters" }),
  mother_name: z.string(),
  birth_date: z.string().nonempty("Date of birth is required"),
  birth_place: z.string().optional(),
  religion: z.string().min(1, { message: "Please select a religion" }),
  category: z.string().min(1, { message: "Please select a category" }),
  caste: z.string().optional(),
  admission_std: z.string().optional(),
  admission_date: z.string().min(1, { message: "Please select a category" }),
  standard: z.string().optional(),
  section: z.string().optional(),
  last_school: z.string().optional(),
  city: z.string().min(3, { message: "City must be at least 2 characters" }),
  district: z
    .string()
    .min(3, { message: "District must be at least 2 characters" }),
  address: z.string().optional().max(100, { message: "Address must be at most 100 characters" }),
  mobile_no: z.string().optional(),
  status: z.string().optional(),
  gender: z.string().optional(),
  udise_no: z.string().optional(),
  aadhar_no: z.string().optional(),
  assesment: z.coerce.number().optional(),
  progress: z.coerce.number().optional(),
  reason: z.string().optional(),
  left_school_date: z.string().optional(),
  left_school_std: z.string().optional(),
  account_no: z.string().optional(),
  name_on_passbook: z.string().optional(),
  bank_name: z.string().optional(),
  ifsc_code: z.string().optional(),
  bank_address: z.string().optional(),
});

function StudentForm({ defaultValues, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    onSubmit,
  });

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
              <TabsTrigger value="gr-details" className="whitespace-pre-wrap ">
                GR Details
              </TabsTrigger>
              <TabsTrigger value="bank-details" className="whitespace-pre-wrap">
                Bank Details
              </TabsTrigger>
              <TabsTrigger value="slr" className="whitespace-pre-wrap">
                School Leave Reason
              </TabsTrigger>
            </TabsList>
            <TabsContent value="gr-details">
              <Card>
                <CardHeader>
                  <CardTitle>GR Details</CardTitle>
                  <CardDescription>
                    Add student data here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <GrDetails
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
