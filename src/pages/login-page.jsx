import { LoginForm } from "@/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import apiClient from "@/lib/api-client";

import { json, useNavigate } from "react-router-dom";

export default function LoginPage() {
  // const navigate = useNavigate();

  const loginUser = ({ email, password }, setErrors) => {
    apiClient
      .post("/api-token-auth/", {
        username: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem(
          "jwt_token",
          JSON.stringify(response.data.jwt_token)
        );
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          setErrors(error.response.data);
        }
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={loginUser} />
        </CardContent>
      </Card>
    </div>
  );
}
