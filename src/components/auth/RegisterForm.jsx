import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, googleLogin } from "../../services/authService";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(email, password);

      alert("Account created successfully.");

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await googleLogin();

      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="mt-3">

      <form onSubmit={handleRegister} className="space-y-3">

        {/* Full Name */}

        <div>

          <label className="block text-[13px] font-semibold text-slate-700 mb-1">
            Full Name
          </label>

          <div className="relative">

            <FaUser
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full h-11 rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="block text-[13px] font-semibold text-slate-700 mb-1">
            Email Address
          </label>

          <div className="relative">

            <FaEnvelope
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full h-11 rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
            />

          </div>

        </div>

        {/* Password */}

        <div>

          <label className="block text-[13px] font-semibold text-slate-700 mb-1">
            Password
          </label>

          <div className="relative">

            <FaLock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full h-11 rounded-xl border border-slate-300 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? (
                <FaEyeSlash size={15} />
              ) : (
                <FaEye size={15} />
              )}
            </button>

          </div>

        </div>

        {/* Confirm Password */}

        <div>

          <label className="block text-[13px] font-semibold text-slate-700 mb-1">
            Confirm Password
          </label>

          <div className="relative">

            <FaLock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={14}
            />

            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full h-11 rounded-xl border border-slate-300 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={15} />
              ) : (
                <FaEye size={15} />
              )}
            </button>

          </div>

        </div>

        {/* Register Button */}

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

      </form>

      {/* Divider */}

      <div className="flex items-center my-4">

        <div className="flex-1 border-t border-slate-300"></div>

        <span className="px-3 text-xs text-slate-400">
          OR
        </span>

        <div className="flex-1 border-t border-slate-300"></div>

      </div>

      {/* Google Register */}

      <button
        onClick={handleGoogleRegister}
        className="w-full h-11 rounded-xl border border-slate-300 flex items-center justify-center gap-3 text-sm hover:bg-slate-50 transition"
      >
        <FaGoogle className="text-red-500" />

        Continue with Google

      </button>

      {/* Login Link */}

      <p className="text-center text-xs text-slate-500 mt-4">

        Already have an account?

        <Link
          to="/"
          className="ml-2 text-blue-600 font-semibold hover:underline"
        >
          Login
        </Link>

      </p>

    </div>
  );
}