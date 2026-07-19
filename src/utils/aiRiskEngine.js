export function calculateRisk(attendancePercentage) {
  let riskScore = 0;
  let riskLevel = "";
  let recommendation = "";

  if (attendancePercentage >= 95) {
    riskScore = 5;
    riskLevel = "Excellent";
    recommendation = "Maintain current attendance.";
  } else if (attendancePercentage >= 85) {
    riskScore = 20;
    riskLevel = "Low";
    recommendation = "Keep regular attendance.";
  } else if (attendancePercentage >= 75) {
    riskScore = 45;
    riskLevel = "Medium";
    recommendation =
      "Monitor attendance over the next few classes.";
  } else if (attendancePercentage >= 60) {
    riskScore = 70;
    riskLevel = "High";
    recommendation =
      "Inform parents and schedule a teacher meeting.";
  } else {
    riskScore = 95;
    riskLevel = "Critical";
    recommendation =
      "Immediate parent meeting and academic intervention required.";
  }

  return {
    riskScore,
    riskLevel,
    recommendation,
  };
}