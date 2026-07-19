import { IoSend } from "react-icons/io5";

export default function ChatInput({ question, setQuestion, loading, onSend }) {
  return (
    <div className="border-t bg-white p-5">
      <div className="flex items-center gap-3 rounded-2xl border border-gray-300 px-4 py-3 shadow-sm">
        <textarea
          rows={1}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Ask anything about attendance..."
          className="flex-1 resize-none bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
        />

        <button
          disabled={loading}
          onClick={onSend}
          className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          <IoSend size={18} />
        </button>
      </div>
    </div>
  );
}
