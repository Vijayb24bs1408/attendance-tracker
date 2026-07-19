import { useEffect, useRef } from "react";
import { aiCategories } from "./aiQuestions";

export default function ChatArea({
  messages,
  loading,
  selectedCategory,
  onSuggestionClick,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const category = aiCategories.find((item) => item.id === selectedCategory);

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      {/* No Messages Yet */}

      {messages.length === 0 ? (
        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-2">AI Teacher Copilot</h1>

          <p className="text-gray-500 mb-8">
            Select a suggested question or type your own.
          </p>

          <h2 className="text-lg font-semibold mb-4">
            {category?.title} Questions
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {category?.questions.map((question, index) => (
              <button
                key={index}
                onClick={() => onSuggestionClick(question)}
                className="rounded-xl border bg-white p-5 text-left hover:border-blue-500 hover:bg-blue-50 transition"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto p-8 space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3xl rounded-2xl px-5 py-4 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border"
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
              </div>
            </div>
          ))}

          {loading && <div className="text-gray-500">AI is thinking...</div>}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}
