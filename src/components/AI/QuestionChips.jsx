import { aiCategories } from "./aiQuestions";

export default function QuestionChips({ selectedCategory, onQuestionClick }) {
  const category = aiCategories.find((item) => item.id === selectedCategory);

  if (!category) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-700">
          Suggested Questions
        </h2>

        <span className="text-xs text-gray-400">
          {category.questions.length} prompts
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
