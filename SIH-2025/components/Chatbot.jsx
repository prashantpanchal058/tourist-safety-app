// components/Chatbot.jsx
import React, { useState } from "react";
import { FiMessageCircle, FiSend } from "react-icons/fi";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm your travel safety assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");

  // ✅ send user message + fetch Gemini response
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user msg to chat
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    const userMessage = input;
    setInput("");

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userMessage }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from AI";

      setMessages([...newMessages, { sender: "bot", text: reply }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages([...newMessages, { sender: "bot", text: "⚠️ Error fetching response" }]);
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg"
        >
          <FiMessageCircle size={24} />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col">
          {/* Header */}
          <div className="bg-green-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <span>Travel Safety Chatbot</span>
            <button onClick={() => setOpen(false)} className="font-bold">✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-green-100 self-end ml-auto"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex items-center gap-2">
            <input
              type="text"
              className="flex-1 border rounded-md px-2 py-1 outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md"
            >
              <FiSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
