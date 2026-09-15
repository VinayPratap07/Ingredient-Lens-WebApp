import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginUser } from "../API_Services/User_Api";

export default function LogInPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/");
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
      identifier: formData.identifier,
      password: formData.password,
    });

    console.log("Submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-[#DDE5DF] flex items-center justify-center p-4 font-sans text-[#18201C]">
      <div className="w-full max-w-md bg-[#F7F3EA] rounded-2xl shadow-sm border border-[#C8D0CA] p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-block px-2.5 py-1 mb-3 rounded-full bg-[#E6D5B5] text-[#23483A] text-xs font-semibold tracking-wide">
            Get Started
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#18201C]">
            LogIn
          </h1>
          <p className="text-xs text-[#66736B] mt-1">
            Enter your details below to enter in your workspace.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
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
            <p className="text-xs text-[#66736B] mt-1">
              Must be at least 8 characters.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-sm py-2.5 px-4 bg-[#23483A] hover:bg-[#32604D] text-[#F7F3EA] font-medium rounded-lg shadow-sm transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#23483A] cursor-pointer"
          >
            LogIn
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
