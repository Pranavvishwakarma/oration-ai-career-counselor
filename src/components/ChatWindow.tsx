'use client';

import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { trpc } from '../utils/trpc';

type Props = {
  chatId: number;
};

export default function ChatWindow({ chatId }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { data: messages, isLoading } = trpc.chat.getMessages.useQuery({ chatId });
  const addMessage = trpc.chat.addMessage.useMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    try {
      await addMessage.mutateAsync({
        chatId,
        sender: 'User',
        content,
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <ChatMessage
            key={message.id}
            sender={message.sender}
            content={message.content}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t">
        <ChatInput onSend={handleSendMessage} isLoading={addMessage.isLoading} />
      </div>
    </div>
  );
}