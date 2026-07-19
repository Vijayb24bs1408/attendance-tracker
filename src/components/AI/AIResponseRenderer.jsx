import AttendanceSummaryCard from "./AttendanceSummaryCard";
import StudentRiskCard from "./StudentRiskCard";

export default function AIResponseRenderer({ message }) {
  if (!message) return null;

  const text = message.toLowerCase();

  if (
    text.includes("risk") ||
    text.includes("below 75") ||
    text.includes("low attendance")
  ) {
    return <StudentRiskCard />;
  }

  if (text.includes("attendance")) {
    return <AttendanceSummaryCard present={58} absent={4} percentage={93} />;
  }

  return null;
}
