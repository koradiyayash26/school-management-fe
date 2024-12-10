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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <FormField
          control={form.control}
          name="account_no"
          render={({ field }) => (
            <FormItem
              className={`${
                form.formState.errors.account_no ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Account no
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.name_on_passbook
                  ? "h-[110px]"
                  : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Passbook Name
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.bank_name ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Bank Name
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.ifsc_code ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                IFSC Code
              </FormLabel>
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
            <FormItem
              className={`${
                form.formState.errors.bank_address ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Bank Address
              </FormLabel>
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
