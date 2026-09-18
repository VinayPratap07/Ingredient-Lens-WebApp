import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { isAxiosError } from "axios";
import { loginUser } from "../API_Services/User_Api";
import { useAuth } from "../Context/Auth_Context";

export default function LogInPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
      navigate("/");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      identifier: formData.identifier,
      password: formData.password,
    });
  };

  const errorMessage = mutation.error
    ? isAxiosError(mutation.error) && mutation.error.response?.data?.message
      ? mutation.error.response.data.message
      : "Invalid email or password. Please try again."
    : null;

  return (
    <div className="min-h-screen bg-[#DDE5DF] flex items-center justify-center p-4 font-sans text-[#18201C]">
      <div className="w-full max-w-md bg-[#F7F3EA] rounded-2xl shadow-sm border border-[#C8D0CA] p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-block px-2.5 py-1 mb-3 rounded-full bg-[#E6D5B5] text-[#23483A] text-xs font-semibold tracking-wide">
            Welcome Back
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#18201C]">
            Log In
          </h1>
          <p className="text-xs text-[#66736B] mt-1">
            Enter your details below to enter your workspace.
          </p>
        </div>

        {/* Server Error Message */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-lg border border-[#B96555]/30 bg-[#B96555]/10 flex items-start gap-2.5">
            <span className="text-[#B96555] font-bold text-sm shrink-0 leading-tight">
              ✕
            </span>
            <p className="text-xs font-semibold text-[#B96555] leading-normal">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Identifier / Email */}
          <div>
            <label
              htmlFor="identifier"
              className="block text-xs font-semibold uppercase tracking-wider text-[#66736B] mb-1.5"
            >
              Email Address
            </label>
            <input
              type="email"
              id="identifier"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
              className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#C8D0CA] bg-transparent text-[#18201C] placeholder-[#66736B]/60 focus:outline-none focus:ring-2 focus:ring-[#23483A] focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold uppercase tracking-wider text-[#66736B] mb-1.5"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={8}
              className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#C8D0CA] bg-transparent text-[#18201C] placeholder-[#66736B]/60 focus:outline-none focus:ring-2 focus:ring-[#23483A] focus:border-transparent transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full text-sm py-2.5 px-4 bg-[#23483A] hover:bg-[#32604D] disabled:opacity-60 disabled:cursor-not-allowed text-[#F7F3EA] font-medium rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#23483A] cursor-pointer"
          >
            {mutation.isPending ? "Signing In..." : "Log In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-[#C8D0CA] text-center">
          <p className="text-xs text-[#66736B]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-[#23483A] hover:text-[#32604D] transition"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
