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
  updateUsernameEmail,
} from "@/services/user-profile-service";

const passwordSchema = z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: z
    .string()
    .min(3, "New password must be at least 3 characters long"),
});

const profileSchema = z.object({
  new_username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .optional(),
  new_email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required")
    .optional(),
});

const UserProfileDialogbox = ({ refetch, userDetail }) => {
  const [mode, setMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorPass, setErrorPass] = useState("");

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_username: userDetail?.username || "",
    new_email: userDetail?.email || "",
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
      refetch();
      setIsOpen(false);
      toast.success(res.data.detail);
    },
    onError: (error) => {
      console.log(error.message);
      setErrorPass(error?.response?.data?.current_password);
    },
  });

  const profileMutation = useMutation({
    mutationFn: (formData) => updateUsernameEmail(formData),
    onSuccess: (res) => {
      refetch();
      setIsOpen(false);
      toast.success(res.data.detail);
    },
    onError: (error) => {
      if (error?.response?.data?.error) {
        toast.error(error?.response?.data?.error);
      } else {
        toast.error(`Failed to update profile: ${error.message}`);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationSchema = mode ? profileSchema : passwordSchema;
    const validation = validationSchema.safeParse(formData);

    if (validation.success) {
      if (mode) {
        const profileData = {
          new_username: formData.new_username,
          new_email: formData.new_email,
        };
        profileMutation.mutate(profileData);
      } else {
        const passwordData = {
          current_password: formData.current_password,
          new_password: formData.new_password,
        };
        mutation.mutate(passwordData);
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
                Username / Email
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
                <div className="mb-4">
                  <Label htmlFor="new_username" className="text-right">
                    New Username
                  </Label>
                  <Input
                    id="new_username"
                    type="text"
                    placeholder="New Username"
                    defaultValue={userDetail?.username}
                    onChange={handleChange}
                    className="col-span-3 mt-2"
                  />
                  {errors.new_username && (
                    <p className="text-red-600 mt-2 text-sm">
                      {errors.new_username._errors.join(", ")}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="new_email" className="text-right">
                    New Email
                  </Label>
                  <Input
                    id="new_email"
                    type="email"
                    placeholder="New Email"
                    defaultValue={userDetail?.email}
                    onChange={handleChange}
                    className="col-span-3 mt-2"
                  />
                  {errors.new_email && (
                    <p className="text-red-600 mt-2 text-sm">
                      {errors.new_email._errors.join(", ")}
                    </p>
                  )}
                </div>
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
