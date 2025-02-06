import React, { useState } from 'react';

// Define the type for the messages
interface Message {
  role: string;
  content: string;
}

const CohereHandle = () => {
  // State to hold the chat messages with the defined type
  const [messages, setMessages] = useState<Message[]>([]);

  // State to manage the current input from the user
  const [input, setInput] = useState<string>("");

  // State to track whether the chat box is minimized
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Function to handle sending a message
  const handleSendMessage = async () => {
    if (input.trim() === "") {
      console.error("Message cannot be empty.");
      return;
    }
  
    const userMessage: Message = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    try {
      const response = await fetch("/api/coherechat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
  
      if (!response.ok) {
        throw new Error("Error with API request");
      }
  
      const data = await response.json();
      const aiMessage: Message = { role: "ai", content: data.content };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  
    setInput("");
  };// Function to handle sending a message  

  return (
    <div className="fixed bottom-4 right-4 bg-white text-black shadow-lg rounded-lg w-64">
      {/* Header for the chat tool */}
      <div
        className="bg-blue-600 text-white px-3 py-1 rounded-t-lg cursor-pointer"
        onClick={() => setIsMinimized(!isMinimized)} // Toggle the minimized state
      >
        <h1 className="text-sm font-semibold">
          {isMinimized ? "Chat (Click to Expand)" : "Crypto Support"}
        </h1>
      </div>

      {/* Show content only if not minimized */}
      {!isMinimized && (
        <div className="flex flex-col h-72">
          {/* Container to display chat messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2 text-sm">
                <strong className="block">
                  {msg.role === "user" ? "You" : "Crypto Support"}:
                </strong>
                <span>{msg.content}</span>
              </div>
            ))}
          </div>

          {/* Input and send button container */}
          <div className="flex items-center gap-2 border-t p-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Message..."
              className="flex-1 px-3 py-1 border rounded-lg text-sm"
            />
            <button
              onClick={handleSendMessage}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CohereHandle;
