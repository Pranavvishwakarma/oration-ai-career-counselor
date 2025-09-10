type Props = {
  sender: string;
  content: string;
};

export default function ChatMessage({ sender, content }: Props) {
  const isAI = sender === "AI";

  return (
    <div className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-[85%] sm:max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 break-words ${
        isAI 
          ? "bg-white/10 text-white border border-white/20" 
          : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
            isAI 
              ? "bg-gradient-to-r from-green-400 to-blue-500 text-white" 
              : "bg-white/20 text-white"
          }`}>
            {isAI ? "🤖" : "👤"}
          </div>
          <strong className="text-xs sm:text-sm font-semibold opacity-90">{sender}</strong>
        </div>
        <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  );
}
