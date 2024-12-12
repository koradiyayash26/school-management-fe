import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { postRequestPermitions } from "@/services/permission-service";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function Forbidden() {
  const navigate = useNavigate();
  const location = useLocation();

  const getRequiredPermission = (path) => {
    // Remove trailing slash and get base path
    const cleanPath = path.replace(/\/$/, "");

    // Common permission mappings based on App.jsx routes
    const permissionMap = {
      "/student": "General Register",
      "/standard": "Standard And Caste Report",
      "/caste-report": "Standard And Caste Report",
      "/certificate": "Certificate",
      "/fee-type": "Payment Fees",
      "/payment": "Payment Fees",
      "/report": "Fee Report",
      "/educational": "Student Update and History",
      "/update": "Student Update and History",
      "/setting": "Settings",
      "/exam-template": "Exam",
    };

    // Find matching permission
    const matchingPath = Object.keys(permissionMap).find((route) =>
      cleanPath.startsWith(route)
    );

    return matchingPath ? permissionMap[matchingPath] : "Unknown Permission";
  };

  const isSettingsPermission = (permission) => {
    return permission === "Settings";
  };

  const mutation = useMutation({
    mutationFn: (data) => postRequestPermitions(data),
    onSuccess: () => {
      toast.success("Permission Request Sent Successfully");
    },
    onError: (error) => {
      toast.error(`Failed To Send Request: ${error.message}`);
    },
  });

  const currentPath = location.pathname;
  const requiredPermission = getRequiredPermission(currentPath);
  const isSettings = isSettingsPermission(requiredPermission);

  return (
    <>
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
      <div className="flex justify-center items-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <LockClosedIcon className="h-16 w-16 text-primary animate-pulse" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Access Denied
            </CardTitle>
            <CardDescription className="text-center">
              {isSettings
                ? "Only administrators can access the settings page"
                : "You don't have permission to access this page"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            {!isSettings && (
              <Button
                onClick={() => {
                  mutation.mutate({
                    group_name: requiredPermission,
                    admin_ids: [],
                    reason: `I want permission for ${requiredPermission} group`,
                  });
                }}
                variant="default"
                className="w-full max-w-xs"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Requesting...
                  </>
                ) : (
                  "Request Permission"
                )}
              </Button>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              variant="link"
              className="text-sm text-muted-foreground"
              onClick={() => navigate("/")}
            >
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
