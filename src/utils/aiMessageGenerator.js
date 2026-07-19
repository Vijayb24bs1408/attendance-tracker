export function generateParentAlert(
  student,
  attendanceStatus,
  attendancePercentage = 100
) {
  if (attendanceStatus === "Present") {
    return {
      priority: "Low",
      message: `Dear ${student.parentName},

We are pleased to inform you that ${student.name} attended today's classes.

Current Attendance: ${attendancePercentage}%

Thank you for your continued support.

Regards,
Attendance Tracker`,
    };
  }

  if (attendancePercentage < 75) {
    return {
      priority: "High",
      message: `Dear ${student.parentName},

${student.name} was absent today.

Current Attendance: ${attendancePercentage}%.

The attendance has fallen below the required level.

Please ensure regular attendance and contact the class teacher if required.

Regards,
Attendance Tracker`,
    };
  }

  if (attendancePercentage < 90) {
    return {
      priority: "Medium",
      message: `Dear ${student.parentName},

${student.name} was absent today.

Current Attendance: ${attendancePercentage}%.

Please encourage regular attendance.

Regards,
Attendance Tracker`,
    };
  }

  return {
    priority: "Low",
    message: `Dear ${student.parentName},

${student.name} was absent today.

Current Attendance: ${attendancePercentage}%.

Thank you.

Regards,
Attendance Tracker`,
  };
}