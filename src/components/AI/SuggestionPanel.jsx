import { aiCategories } from "./aiQuestions";

export default function SuggestionPanel({ selectedCategory, onQuestionClick }) {
  const category = aiCategories.find((item) => item.id === selectedCategory);

  if (!category) return null;

  return (
    <div className="border-b bg-white p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {category.title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Click any question to ask AI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {category.questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="text-left rounded-xl border border-gray-200 bg-white p-4 hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <p className="font-medium text-gray-800">{question}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
