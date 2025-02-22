import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };
  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">username</Label>
          <Input
            id="email"
            autoCapitalize="none"
            autoComplete="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {/* <a href="#" className="ml-auto inline-block text-sm underline">
        Forgot your password?
      </a> */}
          </div>
          <Input
            id="password"
            autoComplete="current-password"
            autoCapitalize="none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
        </div>
        <Button type="submit" onClick={handleSubmit} className="w-full">
          Login
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
