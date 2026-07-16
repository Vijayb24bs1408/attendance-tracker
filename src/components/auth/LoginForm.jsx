import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  loginUser,
  googleLogin,
  resetPassword,
} from "../../services/authService";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await loginUser(email.trim(), password);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      navigate("/dashboard", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Enter your email first.");
      return;
    }

    try {
      await resetPassword(email);
      alert("Password reset email sent.");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="mt-3">
      <form onSubmit={handleLogin} className="space-y-3">
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
  required
  autoComplete="email"
  placeholder="Enter your email"
  className="w-full h-11 rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
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
              required
  autoComplete="current-password"
              placeholder="Enter your password"
              className="w-full h-11 rounded-xl border border-slate-300 pl-10 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-600 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            >
              {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
            </button>
          </div>
        </div>

        {/* Remember */}
        <div className="flex items-center justify-between text-[13px]">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember Me
          </label>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full h-11 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-60"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-slate-300"></div>
        <span className="px-3 text-xs text-slate-400">OR</span>
        <div className="flex-1 border-t border-slate-300"></div>
      </div>

      {/* Google */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full h-11 rounded-xl border border-slate-300 flex items-center justify-center gap-3 text-sm hover:bg-slate-50 transition"
      >
        <FaGoogle className="text-red-500" />
        Continue with Google
      </button>

      {/* Register */}
      <p className="text-center text-xs text-slate-500 mt-4">
        Don't have an account?
        <Link
          to="/register"
          className="ml-2 text-blue-600 font-semibold hover:underline"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
}