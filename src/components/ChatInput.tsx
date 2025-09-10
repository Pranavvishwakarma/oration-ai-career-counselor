"use client";

import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
  isLoading?: boolean;
};

export default function ChatInput({ onSend, isLoading = false }: Props) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
      <div className="flex-1 relative">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
          className="w-full bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 resize-none min-h-[44px] max-h-32 text-sm sm:text-base disabled:opacity-50"
          placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
          style={{
            height: 'auto',
            minHeight: '44px',
            maxHeight: '128px'
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = Math.min(target.scrollHeight, 128) + 'px';
          }}
        />
      </div>
      <button
        onClick={handleSend}
        disabled={isLoading || !message.trim()}
        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed px-4 sm:px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base whitespace-nowrap min-h-[44px] flex items-center justify-center"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span className="hidden sm:inline">Sending...</span>
          </div>
        ) : (
          <>
            <span className="hidden sm:inline">Send</span>
            <span className="sm:hidden">📤</span>
          </>
        )}
      </button>
    </div>
  );
}
