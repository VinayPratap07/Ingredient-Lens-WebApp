import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { isAxiosError } from "axios";
import { registerUser } from "../API_Services/User_Api";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        password: "",
        agree: false,
      });
      navigate("/login");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate({
      fullName: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  // Safely extract backend error message
  const errorMessage = mutation.error
    ? isAxiosError(mutation.error) && mutation.error.response?.data?.message
      ? mutation.error.response.data.message
      : "An unexpected error occurred. Please try again."
    : null;

  return (
    <div className="min-h-screen bg-[#DDE5DF] flex items-center justify-center p-4 font-sans text-[#18201C]">
      <div className="w-full max-w-md bg-[#F7F3EA] rounded-2xl shadow-sm border border-[#C8D0CA] p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-block px-2.5 py-1 mb-3 rounded-full bg-[#E6D5B5] text-[#23483A] text-xs font-semibold tracking-wide">
            Get Started
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#18201C]">
            Create an account
          </h1>
          <p className="text-xs text-[#66736B] mt-1">
            Enter your details below to set up your workspace.
          </p>
        </div>

        {/* Server Validation Error Display */}
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
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wider text-[#66736B] mb-1.5"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              required
              className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-[#C8D0CA] bg-transparent text-[#18201C] placeholder-[#66736B]/60 focus:outline-none focus:ring-2 focus:ring-[#23483A] focus:border-transparent transition"
            />
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-[#66736B] mb-1.5"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
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
            <p className="text-xs text-[#66736B] mt-1">
              Must be at least 8 characters, include upper and lower case, and a
              number.
            </p>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="agree"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              required
              className="mt-1 h-4 w-4 rounded border-[#C8D0CA] accent-[#23483A] cursor-pointer"
            />
            <label
              htmlFor="agree"
              className="text-xs text-[#66736B] leading-relaxed"
            >
              I agree to the{" "}
              <a
                href="#"
                className="text-[#23483A] font-medium underline hover:text-[#32604D]"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#23483A] font-medium underline hover:text-[#32604D]"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={mutation.isPending}
            className="w-full text-sm py-2.5 px-4 bg-[#23483A] hover:bg-[#32604D] disabled:opacity-60 disabled:cursor-not-allowed text-[#F7F3EA] font-medium rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#23483A] cursor-pointer"
          >
            {mutation.isPending ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 pt-6 border-t border-[#C8D0CA] text-center">
          <p className="text-xs text-[#66736B]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#23483A] hover:text-[#32604D] transition"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
