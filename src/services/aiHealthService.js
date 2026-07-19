export function getClassHealth(aiInsights) {
  let score = 100;

  score -= aiInsights.critical * 15;
  score -= aiInsights.high * 8;
  score -= aiInsights.medium * 4;
  score -= aiInsights.low * 2;

  if (score < 0) score = 0;

  let level = "Excellent";
  let color = "text-green-600";

  if (score < 40) {
    level = "Critical";
    color = "text-red-600";
  } else if (score < 60) {
    level = "Poor";
    color = "text-orange-600";
  } else if (score < 80) {
    level = "Good";
    color = "text-yellow-600";
  }

  const recommendations = [];

  if (aiInsights.critical > 0)
    recommendations.push("Immediately contact parents of critical students.");

  if (aiInsights.high > 0)
    recommendations.push("Monitor high-risk students daily.");

  recommendations.push(
    `Reward ${aiInsights.bestStudent} for outstanding attendance.`
  );

  recommendations.push("Continue AI attendance monitoring.");

  return {
    score,
    level,
    color,
    recommendations,
  };
}