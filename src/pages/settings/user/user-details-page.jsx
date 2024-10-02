import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, User, Shield, Clock } from "lucide-react";
import {
  userDelete,
  changePasswordOfUser,
  patchUserPermittionGroupData,
} from "@/services/settings-service";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import Spinner from "@/components/spinner/spinner";
import { useDataUser, useUserPermittionGroupData } from "@/hooks/use-settings";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const PermissionsCheckboxes = ({ userPermitions, onSubmit, disabled }) => {
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  useEffect(() => {
    const initialSelected = userPermitions
      .filter((perm) => perm.assigned)
      .map((perm) => perm.id);
    setSelectedPermissions(initialSelected);
  }, [userPermitions]);

  const handleCheckboxChange = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedPermissions);
  };

  return (
    <>
      <div className="space-y-6">
        {userPermitions.map((permission) => (
          <div key={permission.id}>
            <div className="hover:underline flex items-center space-x-2">
              <Checkbox
                id={`permission-${permission.id}`}
                checked={selectedPermissions.includes(permission.id)}
                onCheckedChange={() => handleCheckboxChange(permission.id)}
                disabled={disabled}
              />
              <label
                htmlFor={`permission-${permission.id}`}
                className="uppercase text-sm font-medium cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-white"
              >
                {permission.name}
              </label>
            </div>
          </div>
        ))}
        <Button
          className="mt-6 w-full sm:w-auto"
          onClick={handleSubmit}
          disabled={disabled}
        >
          Update Permissions
        </Button>
      </div>
    </>
  );
};

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isPassLoading, setIsPassLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);

  const { data, isLoading, error, refetch } = useDataUser(id);
  const [passwordError, setPasswordError] = useState("");

  let user = data || [];

  const {
    data: perData,
    isLoading: perIsLoading,
    error: perErorr,
    refetch: perRefetch,
  } = useUserPermittionGroupData(id);
  let userPermitions = perData || [];

  const mutation = useMutation({
    mutationFn: (userId) => userDelete(userId),
    onSuccess: () => {
      setTimeout(() => {
        setIsOpenDeleteDialog(false);
      }, 1000);
      toast.success("User Delete Successfully");
      setTimeout(() => {
        navigate("/setting");
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDeleteUser = async () => {
    setIsDeleting(true);
    try {
      mutation.mutate(user.id);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setIsDeleting(true);
    }
  };

  const handleUpdatePermissions = async (selectedPermissions) => {
    const toastId = toast.loading("Updating permissions...");
    try {
      const response = await patchUserPermittionGroupData(user.id, {
        group_ids: selectedPermissions,
      });
      if (response.status === 200) {
        toast.success("Permissions updated successfully", { id: toastId });
        perRefetch();
        refetch();
      } else {
        throw new Error("Failed to update permissions");
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
      toast.error("Failed to update permissions. Please try again.", {
        id: toastId,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPassLoading(true);
    try {
      await changePasswordOfUser(
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
        id
      );
      toast.success("Password changed successfully.");
      setIsOpen(false);
    } catch (error) {
      console.error("Error changing password:", error);
      setPasswordError(error.response.data.error);
    } finally {
      setIsPassLoading(false);
    }
  };
  if (isLoading || perIsLoading) return <Spinner />;
  if (error) {
    return <>{error.message}</>;
  } else if (perErorr) {
    return <>{perErorr.message}</>;
  }
  if (!user) return <div className="text-red-400">Error: User not found</div>;

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      <div className="container  mx-auto px-4 py-6 sm:py-8 text-white min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Manage User - {user.username}
          </h1>
          <Link to="/setting">
            <Button>
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back to Settings
            </Button>
          </Link>
        </div>
        <Card className="mb-6 sm:mb-8 ">
          <CardHeader className="bg-[#27272a66] rounded-t-lg border-b flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
              User Details
            </CardTitle>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <div className="block md:flex gap-4">
                <DialogTrigger asChild>
                  <div className="block md:flex justify-between w-full gap-6">
                    <Button>Change Password</Button>
                  </div>
                </DialogTrigger>
              </div>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-left">
                    Change Password
                  </DialogTitle>
                  <DialogDescription className="text-left">
                    Make changes to your password here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                  <div>
                    <Label htmlFor="current_password" className="text-right">
                      Current Password
                    </Label>
                    <Input
                      id="current_password"
                      type="password"
                      autoComplete="current_password"
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="col-span-3 mt-2"
                      required
                    />
                    {passwordError && (
                      <p className="text-red-500 text-sm">{passwordError}</p>
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
                      autoComplete="new_passworsd"
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="col-span-3 mt-2"
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isPassLoading}
                    >
                      {isPassLoading ? "Saving..." : "Save changes"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <InfoItem
                icon={<User className="w-5 h-5 sm:w-6 sm:h-6" />}
                label="Username"
                value={user.username}
              />
              <InfoItem
                icon={<Mail className="w-5 h-5 sm:w-6 sm:h-6" />}
                label="Email"
                value={user.email || "None"}
              />
              <InfoItem
                icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6" />}
                label="Role"
                value={
                  <Badge
                    variant={user.is_superuser ? "destructive" : "secondary"}
                    className="bg-gray-800 text-white"
                  >
                    {user.is_superuser ? "Admin" : "Staff"}
                  </Badge>
                }
              />
              <InfoItem
                icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6" />}
                label="Last Login"
                value={
                  user.last_login
                    ? new Date(user.last_login).toLocaleString()
                    : "Never"
                }
              />
            </div>
          </CardContent>
        </Card>
        {/* group permissions */}
        <Card className="">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-semibold">
              User Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col md:flex-row md:justify-between w-full space-y-4">
              <PermissionsCheckboxes
                userPermitions={userPermitions}
                id={id}
                disabled={user.is_superuser}
                onSubmit={handleUpdatePermissions}
              />
              <div className="mt-6 flex md:self-end">
                <Dialog
                  open={isOpenDeleteDialog}
                  onOpenChange={setIsOpenDeleteDialog}
                >
                  <div className="block md:flex gap-4">
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        disabled={user.is_superuser}
                        className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
                      >
                        Delete User
                      </Button>
                    </DialogTrigger>
                  </div>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-left">
                        Delete User
                      </DialogTitle>
                      <DialogDescription className="text-left">
                        Click delete to delete user.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button
                          variant="destructive"
                          className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
                          onClick={handleDeleteUser}
                          disabled={isDeleting}
                        >
                          {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center dark:bg-[#3f3f46] dark:border-none border-black border p-3 sm:p-4 rounded-lg">
    <div className="flex-shrink-0">{icon}</div>
    <div className="ml-3 sm:ml-4 flex flex-col">
      <span className="text-xs sm:text-sm font-medium text-gray-400">
        {label}
      </span>
      {typeof value === "string" ? (
        <span className="text-sm sm:text-lg font-semibold ">{value}</span>
      ) : (
        value
      )}
    </div>
  </div>
);

export default UserDetailsPage;
