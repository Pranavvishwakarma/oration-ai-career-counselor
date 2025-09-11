import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Message = {
  role: string;
  content: string;
};

export const getCareerAdvice = async (prompt: string, chatHistory: Message[] = []) => {
  // Map 'AI' role to 'assistant' for OpenAI API
  const mappedHistory = chatHistory.map(msg => ({
    role: msg.role.toLowerCase() === 'ai' ? 'assistant' : msg.role.toLowerCase(),
    content: msg.content
  }));

  const messages = [
    {
      role: "system",
      content: "You are a knowledgeable career counselor. Provide helpful, practical career advice based on the user's questions and situation. Be supportive and informative while maintaining professionalism.",
    },
    ...mappedHistory,
    { role: "user", content: prompt }
  ];

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // Updated to available model
    messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
    temperature: 0.7,
    max_tokens: 500,
  });
  
  return response.choices[0].message?.content || "Sorry, I couldn't generate advice.";
};
