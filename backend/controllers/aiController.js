const OpenAI = require("openai");
const { getAIContext } = require("../services/aiContextService");

console.log("Key:", process.env.OPENROUTER_API_KEY);
console.log("Length:", process.env.OPENROUTER_API_KEY?.length);

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const context = await getAIContext();

    console.log("===== AI CONTEXT =====");
    console.log(JSON.stringify(context, null, 2));

    const prompt = `
You are AI Teacher Copilot for a School Attendance Tracker.

You MUST answer ONLY using the school data provided below.

=========================
SCHOOL DATA
=========================

${JSON.stringify(context, null, 2)}

=========================
TEACHER QUESTION
=========================

${question}

=========================
RULES
=========================

1. Never make up information.
2. If the data is unavailable, clearly say:
   "The requested information is not available in the current database."

3. Use Markdown formatting.

4. Use tables whenever comparing classes or students.

5. Use bullet points for lists.

6. When the teacher asks about attendance summary include:
- Present students
- Absent students
- Attendance percentage

7. When the teacher asks about low attendance:
- List students below 75%
- Mention attendance percentage
- Give short recommendations

8. Finish every answer with:

### AI Insight
Give one useful observation based ONLY on the available data.
`;
    console.log("Sending request to OpenRouter...");

    const completion = await client.chat.completions.create({
      model: "nvidia/nemotron-3-super-120b-a12b:free",
      messages: [
        {
          role: "system",
          content: "You are an AI Teacher Copilot.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return res.json({
      success: true,
      answer: completion.choices[0].message.content,
    });

  } catch (err) {
    console.error("========== OPENROUTER ERROR ==========");
    console.dir(err, { depth: null });

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  askAI,
};