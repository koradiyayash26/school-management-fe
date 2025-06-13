import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("7410");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password }, setErrors);
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">

          {/* <Label htmlFor="email">username</Label>

          <Input
            id="email"
            autoCapitalize="none"
            autoComplete="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            required
            className={errors.username ? "border-red-500" : ""}
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username}</p>
          )}
          {errors.error && (
            <p className="text-sm text-red-500">Username Required</p>

          )} */}

        </div>
        <div className="grid gap-2">
          {/* <div className="flex items-center"> */}
          {/* <Label htmlFor="password">Password</Label> */}
          {/* <a href="#" className="ml-auto inline-block text-sm underline">
        Forgot your password?
      </a> */}
          {/* </div> */}
          {/* <Input
            id="password"
            autoComplete="current-password"
            autoCapitalize="none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className={errors.password ? "border-red-500" : ""}

          {/* {errors.password && (

            <p className="text-sm text-red-500">{errors.password}</p>
          )}
          {errors.error && (
            <p className="text-sm text-red-500">Password Required</p>

          )} */}

        </div>
        <Button type="submit" onClick={handleSubmit} className="w-full">
          Go Home Page
        </Button>
        {/* <Button variant="outline" className="w-full">
    Login with Google
  </Button> */}
      </div>
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
