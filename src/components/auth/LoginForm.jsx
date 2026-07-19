import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { googleLogin } from "../../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();

  const handleDemo = () => {
    localStorage.setItem("demoMode", "true");
    navigate("/dashboard", { replace: true });
  };

  const handleGoogleLogin = async () => {
    try {
      localStorage.removeItem("demoMode");

      await googleLogin();

      navigate("/dashboard", { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="mt-6">
      {/* Demo Button */}
      <button
        type="button"
        onClick={handleDemo}
        className="w-full h-14 rounded-xl bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition shadow-lg"
      >
        Enter Demo Dashboard
      </button>

      <p className="text-center text-sm text-slate-500 mt-2">
        Explore the complete Attendance Tracker without signing in.
      </p>

      {/* Divider */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-slate-300"></div>
        <span className="px-3 text-xs text-slate-400">OR</span>
        <div className="flex-1 border-t border-slate-300"></div>
      </div>

      {/* Google Login */}
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full h-11 rounded-xl border border-slate-300 flex items-center justify-center gap-3 text-sm hover:bg-slate-50 transition"
      >
        <FaGoogle className="text-red-500" />
        Continue with Google
      </button>

      {/* Register */}
      <p className="text-center text-sm text-slate-500 mt-5">
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
