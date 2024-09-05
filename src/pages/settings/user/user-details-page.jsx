import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, User, Shield, Clock } from "lucide-react";
import {
  getDataUser,
  userDelete,
  changePasswordOfUser,
} from "@/services/settings-service";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

const UserDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getDataUser(id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const mutation = useMutation({
    mutationFn: (userId) => userDelete(userId),
    onSuccess: () => {
      navigate("/setting");
      toast.success("Exam Delete Successfully");
    },
  });

  const handleDeleteUser = async () => {
    try {
      mutation.mutate(user.id);
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (!user) return <div className="text-red-400">Error: User not found</div>;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 bg-[#27272a] text-white min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Manage User - {user.username}
        </h1>
        <Link
          to="/setting"
          className="bg-gray-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-gray-600 transition duration-300 flex items-center text-sm sm:text-base"
        >
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
        </Link>
      </div>
      {/* user details */}
      <Card className="mb-6 sm:mb-8 bg-[#323234] border-gray-700">
        <CardHeader className="bg-[#3f3f46] border-b border-gray-600 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
            User Details
          </CardTitle>
          <Button
            onClick={() => setShowPasswordModal(true)}
            variant="outline"
            className="bg-gray-700 text-white hover:bg-gray-600 text-sm sm:text-base"
          >
            Change Password
          </Button>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <InfoItem
              icon={<User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />}
              label="Username"
              value={user.username}
            />
            <InfoItem
              icon={<Mail className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />}
              label="Email"
              value={user.email || "None"}
            />
            <InfoItem
              icon={<Shield className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />}
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
              icon={<Clock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />}
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
      <Card className="bg-[#323234] border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl font-semibold text-white">
            Group Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <Button
            variant="destructive"
            onClick={() => setShowDeleteModal(true)}
            disabled={user.is_superuser}
            className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
          >
            Delete User
          </Button>
        </CardContent>
      </Card>

      {showPasswordModal && (
        <ChangePasswordModal
          userId={user.id}
          onClose={() => setShowPasswordModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteUserModal
          onDelete={handleDeleteUser}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center bg-[#3f3f46] p-3 sm:p-4 rounded-lg">
    <div className="flex-shrink-0">{icon}</div>
    <div className="ml-3 sm:ml-4 flex flex-col">
      <span className="text-xs sm:text-sm font-medium text-gray-400">
        {label}
      </span>
      {typeof value === "string" ? (
        <span className="text-sm sm:text-lg font-semibold text-white">
          {value}
        </span>
      ) : (
        value
      )}
    </div>
  </div>
);

const ChangePasswordModal = ({ userId, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [samePassError, setSamePassError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      console.log("New passwords do not match.");
      setSamePassError("New passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      // Assuming there's an API endpoint to change password
      await changePasswordOfUser({
        old_password: currentPassword,
        new_password: newPassword,
      });
      toast({
        title: "Success",
        description: "Password changed successfully.",
      });
      onClose();
    } catch (error) {
      console.error("Error changing password:", error);
      console.log(error.response.data.error);
      setPasswordError(error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-md p-6 border shadow-xl rounded-lg bg-[#323234] border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            autoComplete="current-password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            autoComplete="new-password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            autoComplete="current-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {samePassError && (
            <p className="text-red-500 text-sm">{samePassError}</p>
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Changing..." : "Change Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteUserModal = ({ onDelete, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete();
    setIsDeleting(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center p-4">
      <div className="relative w-full max-w-md p-6 border shadow-xl rounded-lg bg-[#323234] border-gray-700">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">
          Delete User
        </h2>
        <p className="text-gray-300 mb-4 text-sm sm:text-base">
          Are you sure you want to delete this user? This action cannot be
          undone.
        </p>
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            onClick={onClose}
            className="bg-gray-700 text-white hover:bg-gray-600 w-full sm:w-auto"
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="bg-red-600 text-white hover:bg-red-700 w-full sm:w-auto"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
