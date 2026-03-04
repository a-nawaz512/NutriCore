// src/components/auth/LoginForm.tsx
import { useState, type FC } from "react";
import { Mail, Lock } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import { useLogin } from "../../api/auth/auth.hooks";

const LoginForm: FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const loginMutation = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      email: form.email,
      password: form.password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="pl-10"
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="pl-10"
          required
        />
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            className="accent-[#25492D] w-4 h-4"
          />
          Remember me
        </label>

        <span className="text-[#25492D] font-medium cursor-pointer hover:underline">
          Forgot Password?
        </span>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full bg-[#25492D] hover:bg-[#1b3421] transition-colors"
        disabled={loginMutation.isLoading}
      >
        {loginMutation.isLoading ? "Logging in..." : "Login"}
      </Button>

      {loginMutation.isError && (
        <p className="text-red-500 text-sm mt-2">
          {(loginMutation.error as any)?.response?.data?.message || "Login failed"}
        </p>
      )}
    </form>
  );
};

export default LoginForm;