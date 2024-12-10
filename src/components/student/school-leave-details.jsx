import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Trash } from "lucide-react";
import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const SchoolLeaveDetails = ({ form }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <FormField
          control={form.control}
          name="left_school_std"
          render={({ field }) => (
            <FormItem
              className={`${
                form.formState.errors.left_school_std ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                School Leave Standard
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  disabled={loading}
                  {...field}
                  placeholder="Left School Standard"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem
              className={`${
                form.formState.errors.reason ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                School Leave Reason
              </FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="School Leave Reason"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assesment"
          render={({ field }) => (
            <FormItem
              className={`${
                form.formState.errors.assesment ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Assesment Standard
              </FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Assesment Standard"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="progress"
          render={({ field }) => (
            <FormItem
              className={`${
                form.formState.errors.progress ? "h-[110px]" : "h-[90px]"
              }`}
            >
              <FormLabel className="dark:text-white text-dark">
                Progress Standard
              </FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Progress Standard"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="left_school_date"
          render={({ field }) => (
            <FormItem
              className={`${
                form.formState.errors.left_school_date
                  ? "h-[110px]"
                  : "h-[90px]"
              }`}
            >
              <div>
                <FormLabel className="dark:text-white text-dark">
                  Left School Date
                </FormLabel>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal w-full",
                        !field.value && "text-muted-foreground w-full"
                      )}
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
                    selected={field.value ? new Date(field.value) : null}
                    onSelect={(date) => {
                      if (date) {
                        field.onChange(format(date, "yyyy-MM-dd"));
                      } else {
                        field.onChange("");
                      }
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
