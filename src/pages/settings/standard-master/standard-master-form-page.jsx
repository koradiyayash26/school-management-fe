import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.coerce.number().min(1, { message: "Enter Standard Number" }),
  is_active: z.boolean().default(true),
});

const StandardMasterForm = ({ defaultValues, onSubmit, isLoading }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
    onSubmit,
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={form.reset}
        className="space-y-2 w-full"
      >
        <CardHeader>
          <CardTitle>STANDARD MASTER FORM</CardTitle>
          <CardDescription>
            All Fields Are Required in This Form.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              className=""
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Enter Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row mt-4 md:mt-0 items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is Active</FormLabel>
                    <FormDescription>
                      Check this box if the standard is active
                    </FormDescription>
                  </div>
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
  );
};

export default StandardMasterForm;
