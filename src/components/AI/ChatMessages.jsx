import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FaRobot, FaUser, FaCopy } from "react-icons/fa";
import AIResponseRenderer from "./AIResponseRenderer";

export default function ChatMessages({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-4">
      {/* Empty Chat */}
      {messages.length === 0 && !loading && (
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-gray-400">
            <FaRobot className="mx-auto text-4xl mb-3 text-blue-500" />

            <h2 className="text-2xl font-semibold">AI Teacher Copilot</h2>

            <p className="mt-2">
              Ask questions about attendance, reports, analytics, students or
              classroom management.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-5 max-w-6xl mx-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex gap-3 max-w-[90%] ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === "assistant" ? "bg-blue-600" : "bg-gray-800"
                }`}
              >
                {msg.role === "assistant" ? (
                  <FaRobot className="text-white" />
                ) : (
                  <FaUser className="text-white" />
                )}
              </div>

              {/* Bubble */}

              <div
                className={`rounded-2xl overflow-hidden shadow-sm ${
                  msg.role === "assistant"
                    ? "bg-white border border-gray-200"
                    : "bg-blue-600 text-white"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-2">
                    <span className="font-semibold text-sm">
                      AI Teacher Copilot
                    </span>

                    <button
                      onClick={() => copyToClipboard(msg.text)}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      <FaCopy />
                    </button>
                  </div>
                )}

                <div className="p-4">
                  {msg.role === "assistant" ? (
                    <>
                      <AIResponseRenderer message={msg.text} />

                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    </>
                  ) : (
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <FaRobot className="text-white" />
            </div>

            <div className="bg-white border rounded-2xl px-5 py-4">
              <div className="font-semibold mb-2 text-sm">
                AI Teacher Copilot
              </div>

              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-150"></span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-300"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
