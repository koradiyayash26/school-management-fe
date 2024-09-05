import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postUser } from "@/services/settings-service";
const formSchema = z.object({
  username: z.string().min(1, { message: "Enter username" }),
  email: z.string().email({ message: "Enter valid email" }).optional(),
  password: z.string().min(1, { message: "Enter password" }),
});

const UserAddPage = () => {
  const defaultValues = {
    username: "",
    password: "",
  };

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data) => postUser(data),
    onSuccess: () => {
      navigate("/setting");
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
      <div className="flex gap-2 md:m-0 mt-4">
        <Link to="/setting">
          <Button>Back Settings</Button>
        </Link>
      </div>
      <Card className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onReset={form.reset}
            className="space-y-2 w-full"
          >
            <CardHeader>
              <CardTitle>NEW USER ADD FORM</CardTitle>
              <CardDescription>
                All Fields Are Required in This Form.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="md:grid md:grid-cols-2 gap-8">
                <FormField
                  className=""
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UserName*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className=""
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className=""
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="mt-4">
              <Button type="submit">Save</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default UserAddPage;
