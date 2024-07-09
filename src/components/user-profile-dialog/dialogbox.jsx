import React, { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import {
  updatePassword,
  updateUsername,
} from "@/services/user-profile-service";

const passwordSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});

const usernameSchema = z.object({
  new_username: z
    .string()
    .min(3, "Username must be at least 3 characters long"),
});

const UserProfileDialogbox = () => {
  const [mode, setMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorPass, setErrorPass] = useState("");

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_username: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: null,
    }));
    setErrorPass("");
  };

  const mutation = useMutation({
    mutationFn: (formData) => updatePassword(formData),
    onSuccess: (res) => {
      setIsOpen(false);
      toast.success(res.data.detail);
    },
    onError: (error) => {
      toast.error(`Failed To Change Password: ${error.message}`);
      setErrorPass(error?.response?.data?.current_password);
    },
  });

  const Usermutation = useMutation({
    mutationFn: (formData) => updateUsername(formData),
    onSuccess: (res) => {
      setIsOpen(false);
      localStorage.setItem("user", formData.new_username);
      toast.success(res.data.detail);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      toast.error(`Failed To Change Username: ${error.message}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationSchema = mode ? usernameSchema : passwordSchema;
    const validation = validationSchema.safeParse(formData);

    if (validation.success) {
      if (mode) {
        delete formData.current_password;
        delete formData.new_password;
        Usermutation.mutate(formData);
      } else {
        delete formData.new_username;
        mutation.mutate(formData);
      }
      setErrors({});
    } else {
      const formattedErrors = validation.error.format();
      setErrors(formattedErrors);
    }
  };

  return (
    <div>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="block md:flex gap-4">
          <DialogTrigger asChild>
            <div className="block md:flex justify-between w-full gap-6">
              <Button
                variant="outline"
                onClick={() => setMode(false)}
                className="w-full"
              >
                Change Password
              </Button>
              <Button
                onClick={() => setMode(true)}
                className="w-full mt-4 md:mt-0"
              >
                Change Username
              </Button>
            </div>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {mode ? "Change Username" : "Change Password"}
            </DialogTitle>
            <DialogDescription>
              {`Make changes to your ${
                mode ? "username" : "password"
              } here. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            {mode ? (
              <div>
                <Label htmlFor="new_username" className="text-right">
                  New Username
                </Label>
                <Input
                  id="new_username"
                  type="text"
                  placeholder="New Username"
                  value={formData.new_username}
                  onChange={handleChange}
                  className="col-span-3 mt-2"
                />
                {errors.new_username && (
                  <p className="text-red-600 mt-2 text-sm">
                    {errors.new_username._errors.join(", ")}
                  </p>
                )}
              </div>
            ) : (
              <>
                <div>
                  <Label htmlFor="current_password" className="text-right">
                    Current Password
                  </Label>
                  <Input
                    id="current_password"
                    type="password"
                    placeholder="Current password"
                    value={formData.current_password}
                    onChange={handleChange}
                    className="col-span-3 mt-2"
                  />
                  {errors.current_password && (
                    <p className="text-red-600 mt-2 text-sm">
                      {errors.current_password._errors.join(", ")}
                    </p>
                  )}
                  {errorPass && (
                    <p className="text-red-600 mt-2 text-sm">
                      {errorPass} Please enter currect password
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="new_password" className="text-right">
                    New Password
                  </Label>
                  <Input
                    id="new_password"
                    type="password"
                    placeholder="New password"
                    value={formData.new_password}
                    onChange={handleChange}
                    className="col-span-3 mt-2"
                  />
                  {errors.new_password && (
                    <p className="text-red-600 mt-2 text-sm">
                      {errors.new_password._errors.join(", ")}
                    </p>
                  )}
                </div>
              </>
            )}
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfileDialogbox;
