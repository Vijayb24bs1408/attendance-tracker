export function generateClassHealth(students = [], alerts = []) {
  const totalStudents = students.length;

  if (totalStudents === 0) {
    return {
      score: 100,
      level: "Excellent",
      summary: [
        "No student data available."
      ],
      recommendation: [
        "Add students to start AI analysis."
      ]
    };
  }

  const critical = alerts.filter(a => a.riskLevel === "Critical").length;
  const high = alerts.filter(a => a.riskLevel === "High").length;
  const medium = alerts.filter(a => a.riskLevel === "Medium").length;

  let score = 100;

  score -= critical * 15;
  score -= high * 8;
  score -= medium * 4;

  if (score < 0) score = 0;

  let level = "Excellent";

  if (score < 40)
    level = "Critical";
  else if (score < 60)
    level = "Poor";
  else if (score < 80)
    level = "Good";

  const summary = [
    `${critical} students are at Critical Risk`,
    `${high} students are at High Risk`,
    `${medium} students need monitoring`,
    `${alerts.length} AI alerts generated today`
  ];

  const recommendation = [];

  if (critical > 0)
    recommendation.push("Contact parents of critical students.");

  if (high > 0)
    recommendation.push("Monitor attendance for high-risk students.");

  recommendation.push("Reward students with excellent attendance.");

  return {
    score,
    level,
    summary,
    recommendation
  };
}