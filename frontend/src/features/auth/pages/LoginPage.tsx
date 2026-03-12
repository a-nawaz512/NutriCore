// src/pages/auth/LoginPage.tsx
import type { FC } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import LoginImg from "../../../assets/Login/Login.jpg";
import { useLogin } from "../hooks/useLogin";
import { useAuthStore } from "../../../app/store/auth.store";
import toast from "react-hot-toast";

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setAuth);

  // React Query mutation
  const loginMutation = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate(form, {
      onSuccess: (data) => {

        console.log("data",data);
        

        setUser(data.user, data.accessToken); // save user in Zustand
        toast.success("Logged in successfully!");
        navigate("/"); // redirect after login
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Login failed");
      },
    });
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT FORM SECTION */}
      <div className="flex flex-1 justify-center items-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-8">
            Login to continue your wellness journey
          </p>

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
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>

            {loginMutation.isError && (
              <p className="text-red-500 text-sm mt-2">
                {(loginMutation.error as any)?.response?.data?.message || "Login failed"}
              </p>
            )}
          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/signup">
              <span className="text-[#25492D] font-semibold cursor-pointer hover:underline">
                Create Account
              </span>
            </Link>
          </p>
        </div>
      </div>

      {/* RIGHT BRAND SECTION */}
      <div className="hidden lg:flex w-[55%] relative text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${LoginImg})` }}
        />
        <div className="absolute inset-0 bg-[#25492D]/20" />
        <div className="relative z-10 max-w-md px-16 py-20 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-6 leading-tight">
            Welcome Back to NutriCore
          </h1>
          <p className="text-green-100 text-lg leading-relaxed">
            Continue your journey toward better health with premium supplements
            and personalized wellness solutions.
          </p>
          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur">✔</div>
              <span className="text-white/90">Trusted by Thousands</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur">✔</div>
              <span className="text-white/90">Secure & Fast Checkout</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur">✔</div>
              <span className="text-white/90">24/7 Health Support</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LoginPage;