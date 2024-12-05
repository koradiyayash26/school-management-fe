import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/24/solid";

export default function Forbidden() {
  const navigate = useNavigate();

  const requestPermission = () => {
    // Implement your permission request logic here
    console.log("Permission requested");
    // For now, let's navigate back to the home page
    navigate("/");
  };

  return (
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
            You don't have permission to access this page
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            onClick={requestPermission}
            variant="default"
            className="w-full max-w-xs"
          >
            Request Permission
          </Button>
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
  );
}
