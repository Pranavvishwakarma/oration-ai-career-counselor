"use client";

import { useState, useEffect, useRef } from "react";
import { trpc } from "../utils/trpc";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import { useDarkMode } from "../components/DarkModeProvider";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
// Remove duplicate declaration since it's already declared below
  
  // Move all useState hooks to the top level, before any conditional returns
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [currentSessionId, setCurrentSessionId] = useState<number | null>(null);
  const [newTopic, setNewTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: sessions, refetch } = trpc.chat.getChats.useQuery();

  const addSession = trpc.chat.addSession.useMutation({
    onSuccess: () => refetch(),
  });

  const addMessage = trpc.chat.addMessage.useMutation({
    onSuccess: () => refetch(),
  });

  const currentSession = sessions?.find((s: { id: number }) => s.id === currentSessionId) || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentSession?.messages]);

  // Redirect to sign-in if not authenticated (but wait for loading to complete)
  useEffect(() => {
    if (status === 'loading') return; // Still loading
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);
  
  // Show loading state while session is being established
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  const handleNewSession = async () => {
    if (!newTopic.trim()) return;
    const res = await addSession.mutateAsync({ topic: newTopic });
    setCurrentSessionId(res.id);
    setNewTopic("");
  };

  const handleSend = async (message: string) => {
    if (!currentSessionId) return;
    setLoading(true);

    await addMessage.mutateAsync({ chatId: currentSessionId, sender: "User", content: message });

    setLoading(false);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/signin' });
  };

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  // Remove the useState declarations that were here
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                <span className="hidden sm:inline">🤖 AI Career Counselor</span>
                <span className="sm:hidden">🤖 AI</span>
              </h1>
            </div>
            
            {/* Desktop User Info & Controls */}
            <div className="hidden md:flex items-center gap-4">
              {/* User Info */}
              <div className="flex items-center gap-3 bg-white/10 rounded-full px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                  {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium truncate max-w-32">
                  {session.user?.name || session.user?.email || 'User'}
                  {session.user?.isGuest && ' (Guest)'}
                </span>
              </div>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200"
                suppressHydrationWarning
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              
              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zM12 13a1 1 0 110-2 1 1 0 010 2zM12 20a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="space-y-4">
                {/* Mobile User Info */}
                <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-sm font-bold">
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {session.user?.name || session.user?.email || 'User'}
                    </div>
                    {session.user?.isGuest && (
                      <div className="text-xs text-white/60">Guest User</div>
                    )}
                  </div>
                </div>
                
                {/* Mobile Controls */}
                <div className="flex gap-2">
                  <button
                    onClick={toggleDarkMode}
                    className="flex-1 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 text-sm font-medium"
                    suppressHydrationWarning
                  >
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex-1 p-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* New Session Section - Mobile Optimized */}
        <div className="mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              ✨ Start New Conversation
            </h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="What would you like to discuss?"
                className="flex-1 bg-white/10 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                onKeyPress={(e) => e.key === 'Enter' && handleNewSession()}
              />
              <button
                onClick={handleNewSession}
                disabled={!newTopic.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base whitespace-nowrap"
              >
                <span className="hidden sm:inline">Start Chat </span>
                <span className="sm:hidden">Start 🚀</span>
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Layout */}
        <div className="relative">
          {/* Mobile Sidebar Overlay */}
          {isSidebarOpen && (
            <div 
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Sessions Grid - Responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Past Sessions Sidebar */}
            <div className={`lg:col-span-1 ${
              isSidebarOpen 
                ? 'fixed top-0 left-0 h-full w-80 bg-[#2e026d] z-50 p-4 overflow-y-auto lg:relative lg:w-auto lg:h-auto lg:bg-transparent lg:p-0 lg:z-auto'
                : 'hidden lg:block'
            }`}>
              {/* Mobile Sidebar Header */}
              <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b border-white/20">
                <h2 className="text-lg font-semibold">📚 Past Sessions</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 lg:sticky lg:top-6">
                <h2 className="hidden lg:flex text-lg font-semibold mb-4 items-center gap-2">
                Past Sessions
                </h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {sessions?.length === 0 ? (
                    <p className="text-white/60 text-sm italic text-center py-4">
                      No conversations yet.
                      Start your first chat! 💬
                    </p>
                  ) : (
                    sessions?.map((session: { id: number; topic: string; createdAt: string }) => (
                      <button
                        key={session.id}
                        onClick={() => {
                          setCurrentSessionId(session.id);
                          setIsSidebarOpen(false); // Close mobile sidebar
                        }}
                        className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                          currentSessionId === session.id
                            ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 shadow-lg"
                            : "bg-white/5 hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        <div className="font-medium text-sm truncate">{session.topic}</div>
                        <div className="text-xs text-white/60 mt-1">
                          {new Date(session.createdAt).toLocaleDateString()}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2">
              {currentSession ? (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex flex-col h-[60vh] sm:h-[70vh]">
                  {/* Chat Header */}
                  <div className="p-4 border-b border-white/20">
                    <h3 className="font-semibold text-base sm:text-lg truncate">{currentSession.topic}</h3>
                    <p className="text-sm text-white/60">
                      {currentSession.messages?.length || 0} messages
                    </p>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {currentSession.messages?.length === 0 ? (
                      <div className="text-center text-white/60 py-8">
                        <div className="text-4xl mb-2">💭</div>
                        <p>Start the conversation!</p>
                      </div>
                    ) : (
                      currentSession.messages?.map((msg: { id: number; sender: string; content: string }) => (
                        <ChatMessage key={msg.id} sender={msg.sender} content={msg.content} />
                      ))
                    )}
                    <div ref={messagesEndRef} />
                    {loading && (
                      <div className="flex items-center gap-2 text-white/60 italic">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white/60"></div>
                        AI is thinking...
                      </div>
                    )}
                  </div>
                  
                  {/* Chat Input */}
                  <div className="p-4 border-t border-white/20">
                    <ChatInput onSend={handleSend} />
                  </div>
                </div>
              ) : (
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex flex-col items-center justify-center h-[60vh] sm:h-[70vh] text-center p-6">
                  <div className="text-4xl sm:text-6xl mb-4">🤖</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">Welcome to AI Career Counselor!</h3>
                  <p className="text-white/60 mb-6 max-w-md text-sm sm:text-base">
                    Select a past conversation or start a new one to get personalized career guidance.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <span>💼</span> Career Planning & Advice
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📝</span> Resume & Interview Tips
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🎯</span> Skill Development Guidance
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🚀</span> Industry Insights
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
