import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmployeeForm } from "./student-form";
import { BankForm } from "./bank-form";
import { SchoolLeaveForm } from "./schoolLeave-form";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function FormCard({ defaultValues, mode, id }) {
  const formSchema = z.object({
    grno: z.coerce.number(),
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
    birth_date: z.date(),
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
    address: z.string().optional(),
    mobile_no: z.string().optional(),
    status: z.string().optional(),
    gender: z.string().optional(),
    udise_no: z.string().optional(),
    aadhar_no: z.string().optional(),
    assesment: z.coerce.number().optional(),
    progress: z.coerce.number().optional(),
    reason: z.string().optional(),
    left_school_date: z.date(),
    left_school_std: z.string().optional(),
    account_no: z.string().optional(),
    name_on_passbook: z.string().optional(),
    bank_name: z.string().optional(),
    ifsc_code: z.string().optional(),
    bank_address: z.string().optional(),
  });
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      birth_date: format(new Date(data.birth_date), "yyyy-MM-dd"),
      left_school_date: format(new Date(data.left_school_date), "yyyy-MM-dd"),
    };
    const token = localStorage.getItem("Token");
    if (mode === "edit") {
      // STudent Update Api Called Here

      axios
        .patch(`http://127.0.0.1:8000/students/${id}/edit/`, formattedData, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then(function (response) {
          console.log(response);
          navigate("/student");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // STudent add Api Called Here

      axios
        .post("http://127.0.0.1:8000/students/add/", formattedData, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then(function (response) {
          console.log(response);
          navigate("/student");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
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
                  <EmployeeForm
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
                  <BankForm form={form} />
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
                  <SchoolLeaveForm form={form} />
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

export default FormCard;
