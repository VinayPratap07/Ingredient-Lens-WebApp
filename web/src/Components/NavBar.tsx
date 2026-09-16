import React, { useState } from "react";
import {
  IoMenu,
  IoClose,
  IoSearchOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../Context/Auth_Context";
import { ImInfo } from "react-icons/im";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-900/10 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          className="shrink-0 text-2xl font-black tracking-tight text-[#23483A] transition-opacity hover:opacity-90 sm:text-3xl"
        >
          Ingredient<span className="text-[#315C4A]">Lens</span>
        </Link>

        {/* Desktop Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden max-w-xs flex-1 md:flex lg:max-w-sm"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ingredients (e.g., Niacinamide)..."
              className="w-full rounded-full border border-emerald-900/20 bg-[#E6D5B5]/20 py-2 pl-10 pr-4 text-xs text-[#18201C] placeholder-[#18201C]/50 transition-all focus:border-[#23483A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#23483A]"
            />
            <IoSearchOutline className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#23483A]/70" />
          </div>
        </form>

        {/* Desktop Auth State / Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/about"
                aria-label="View Saved Items"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-900/10 bg-[#DDE5DF]/60 text-[#23483A] transition-all hover:bg-[#DDE5DF] hover:shadow-xs"
              >
                <ImInfo className="h-5 w-5" />
              </NavLink>

              <NavLink
                to="/profile"
                aria-label="User Profile"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#23483A] text-[#F7F3EA] transition-all hover:bg-[#315C4A] hover:shadow-sm"
              >
                <IoPersonOutline className="h-5 w-5" />
              </NavLink>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold text-[#23483A] hover:text-[#315C4A] transition-colors"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-[#23483A] px-4 py-2 text-xs font-semibold text-[#F7F3EA] shadow-xs transition-colors hover:bg-[#315C4A]"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {isLoggedIn ? (
            <>
              <NavLink
                to="/about"
                aria-label="View Saved Items"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-900/10 bg-[#DDE5DF]/60 text-[#23483A]"
              >
                <ImInfo className="h-4 w-4" />
              </NavLink>
              <NavLink
                to="/profile"
                aria-label="User Profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#23483A] text-white"
              >
                <IoPersonOutline className="h-4 w-4" />
              </NavLink>
            </>
          ) : (
            <Link
              to="/signup"
              className="rounded-lg bg-[#23483A] px-3 py-1.5 text-xs font-semibold text-[#F7F3EA]"
            >
              Sign Up
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
            className="rounded-lg p-2 text-[#23483A] transition-colors hover:bg-emerald-50 focus:outline-none"
          >
            {isOpen ? (
              <IoClose className="h-6 w-6" />
            ) : (
              <IoMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="border-t border-emerald-900/10 bg-white px-6 py-4 shadow-lg md:hidden">
          {/* Mobile Search Input */}
          <form onSubmit={handleSearchSubmit} className="mb-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients..."
                className="w-full rounded-full border border-emerald-900/20 bg-[#E6D5B5]/20 py-2.5 pl-10 pr-4 text-sm text-[#18201C] placeholder-[#18201C]/50 focus:border-[#23483A] focus:bg-white focus:outline-none"
              />
              <IoSearchOutline className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#23483A]/70" />
            </div>
          </form>

          {/* Mobile Nav Links */}
          <nav className="flex flex-col space-y-1">
            {!isLoggedIn && (
              <div className="pt-2 border-t border-emerald-900/10 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-[#23483A] hover:bg-emerald-50"
                >
                  Log In
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
