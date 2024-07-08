import { LoginForm } from "@/components/login-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const loginUser = ({ email, password }) => {
    axios
      .post("http://localhost:8000/api-token-auth/", {
        username: email,
        password: password,
      })
      .then(function (response) {
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("jwt_token", JSON.stringify(response.data.jwt_token));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm onSubmit={loginUser} />
        </CardContent>
      </Card>
    </div>
  );
}
