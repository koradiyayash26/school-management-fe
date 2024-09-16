import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const BankDetails = ({ categories, form, defaultValues }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="md:grid md:grid-cols-3 gap-8 space-y-4">
        <FormField
          control={form.control}
          name="account_no"
          render={({ field }) => (
            <FormItem className="flex flex-col self-end">
              <FormLabel>Account no</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={loading}
                  {...field}
                  placeholder="Account No"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name_on_passbook"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passbook Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  disabled={loading}
                  placeholder="Name On Passbook"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Name</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Bank Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ifsc_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IFSC Code</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Ifsc Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bank_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Address</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Bank Address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
