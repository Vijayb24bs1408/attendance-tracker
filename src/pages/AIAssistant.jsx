import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { askAI } from "../services/aiService";

import CopilotHeader from "../components/AI/CopilotHeader";
import CopilotSidebar from "../components/AI/CopilotSidebar";
import ChatArea from "../components/AI/ChatArea";
import ChatInput from "../components/AI/ChatInput";

export default function AIAssistant() {
  const [selectedCategory, setSelectedCategory] = useState("attendance");

  const [messages, setMessages] = useState([]);

  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);

  async function sendMessage(customQuestion = null) {
    const finalQuestion = customQuestion || question;

    if (!finalQuestion.trim()) return;

    const userMessage = {
      role: "user",
      text: finalQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);

    setQuestion("");

    setLoading(true);

    try {
      const answer = await askAI(finalQuestion);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Something went wrong.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-90px)] bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
        {/* Header */}

        <CopilotHeader />

        {/* Body */}

        <div className="flex flex-1 min-h-0">
          {/* Left */}

          <CopilotSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* Right */}

          <div className="flex-1 flex flex-col min-h-0">
            <ChatArea
              messages={messages}
              loading={loading}
              selectedCategory={selectedCategory}
              onSuggestionClick={(q) => {
                sendMessage(q);
              }}
            />

            <ChatInput
              question={question}
              setQuestion={setQuestion}
              loading={loading}
              onSend={() => sendMessage()}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
