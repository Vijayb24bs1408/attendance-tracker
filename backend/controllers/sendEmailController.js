const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (req, res) => {
  try {
    const {
      parentEmail,
      parentName,
      studentName,
      attendancePercentage,
      riskLevel,
      message,
    } = req.body;

   console.log({
  parentEmail,
  parentName,
  studentName,
  attendancePercentage,
  riskLevel,
  message,
});

if (
  !parentEmail ||
  !parentName ||
  !studentName ||
  attendancePercentage === undefined ||
  !riskLevel ||
  !message
) {
  return res.status(400).json({
    success: false,
    message: "Missing required fields",
  });
}
    const response = await resend.emails.send({
      from: "Attendance Tracker <onboarding@resend.dev>",
      to: parentEmail,
      subject: `Attendance Alert for ${studentName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;">
          <h2 style="color:#2563eb;">Attendance Alert</h2>

          <p>Dear <strong>${parentName}</strong>,</p>

          <p>This is an automated attendance notification regarding your child.</p>

          <table style="border-collapse:collapse;width:100%;">
            <tr>
              <td><strong>Student</strong></td>
              <td>${studentName}</td>
            </tr>
            <tr>
              <td><strong>Attendance</strong></td>
              <td>${attendancePercentage}%</td>
            </tr>
            <tr>
              <td><strong>Risk Level</strong></td>
              <td>${riskLevel}</td>
            </tr>
          </table>

          <p style="margin-top:20px;">
            ${message}
          </p>

          <hr>

          <small>
            AI Attendance Tracker<br>
            This email was generated automatically.
          </small>
        </div>
      `,
    });

    if (response.error) {
      return res.status(400).json({
        success: false,
        message: response.error.message,
        error: response.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
      emailId: response.data?.id,
    });
  } catch (error) {
    console.error("Email Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendEmail,
};