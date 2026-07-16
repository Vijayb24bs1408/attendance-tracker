import RegisterForm from "../components/auth/RegisterForm";
import InstitutionSelector from "../components/auth/InstitutionSelector";
import {
  FaGraduationCap,
  FaCamera,
  FaChartLine,
  FaShieldAlt,
} from "react-icons/fa";

export default function Register() {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-100 via-white to-slate-200 flex items-center justify-center p-4 overflow-hidden">

      {/* Main Card */}
      <div className="w-full max-w-[920px] h-[540px] bg-white rounded-[28px] shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* LEFT PANEL */}

        <div className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white px-8 py-6 flex flex-col overflow-hidden">

          {/* Decorations */}

          <div className="absolute -bottom-24 -left-20 w-60 h-60 rounded-full bg-blue-400/20"></div>

          <div className="absolute top-14 right-10 w-4 h-4 rounded-full bg-white/40"></div>

          <div className="absolute top-24 right-20 w-3 h-3 rounded-full bg-white/30"></div>

          <div className="absolute top-32 right-5 w-2 h-2 rounded-full bg-white/30"></div>

          {/* Branding */}

          <div className="mb-6">

            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-lg mb-4">
              <FaGraduationCap
                className="text-blue-600"
                size={22}
              />
            </div>

            <h1 className="text-[34px] font-extrabold leading-tight">
              Attendance
              <br />
              Tracker
            </h1>

            <p className="mt-3 text-blue-100 text-[15px] leading-7">
              AI Powered Smart Attendance Platform
              <br />
              for Schools & Colleges.
            </p>

          </div>

          {/* Features */}

          <div className="space-y-3 mt-auto">

            <Feature
              icon={<FaCamera />}
              title="Face Recognition"
              text="Automatic attendance"
            />

            <Feature
              icon={<FaChartLine />}
              title="AI Analytics"
              text="Attendance insights"
            />

            <Feature
              icon={<FaShieldAlt />}
              title="Secure Platform"
              text="Safe & Reliable"
            />

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="bg-white flex items-center justify-center px-8 py-6">

          <div className="w-full max-w-[390px]">

            <h2 className="text-[28px] font-bold text-slate-800">
              Create Account
            </h2>

            <p className="text-slate-500 text-sm mt-1 mb-4">
              Create your account to start managing attendance.
            </p>

            <InstitutionSelector />

            <RegisterForm />

          </div>

        </div>

      </div>

    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3">

      <div className="text-xl mt-1">
        {icon}
      </div>

      <div>

        <h3 className="font-semibold text-[16px]">
          {title}
        </h3>

        <p className="text-blue-100 text-[13px]">
          {text}
        </p>

      </div>

    </div>
  );
}