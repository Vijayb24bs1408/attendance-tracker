const API_URL = `${import.meta.env.VITE_API_URL}/api/send-email`;
export async function sendParentEmail(alert) {
  console.log("========== ALERT ==========");
console.log(JSON.stringify(alert, null, 2));
console.log("===========================");

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parentEmail: alert.parentEmail,
      parentName: alert.parentName,
      studentName: alert.studentName,
      attendancePercentage: alert.attendancePercentage,
      riskLevel: alert.riskLevel,
      message: alert.message,
    }),
  });

  const data = await response.json();

  console.log("Server Response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Email sending failed");
  }

  return data;
}