# OrationGuide AI Chat

A modern AI-powered career counseling chat application built with Next.js, tRPC, and OpenAI integration. This application provides personalized career guidance through an intelligent chatbot interface with user authentication and session management.

Demo / Screenshots
<img width="1918" height="867" alt="image" src="https://github.com/user-attachments/assets/3baa3d4a-1ea3-4d70-852a-a8c7c7dcbac8" />
<img width="1918" height="860" alt="image" src="https://github.com/user-attachments/assets/6390e8d0-f907-47b1-915d-539cd5c3ae34" />
Register
<img width="1918" height="862" alt="image" src="https://github.com/user-attachments/assets/8481a4b7-0171-44f6-b03e-6cdc46bae638" />
Login and Chat Interface
<img width="1677" height="866" alt="image" src="https://github.com/user-attachments/assets/a3c7792b-54ae-47c8-a84f-bd42b0240988" />

## 🎥 Demo Video

Watch the OrationGuide AI Chat in action:

[![Watch the video](https://img.youtube.com/vi/l5d11rsa0k0/0.jpg)](https://youtu.be/l5d11rsa0k0)
## Features

- 🤖 **AI-Powered Career Counseling**: Integrated with OpenAI GPT for intelligent career advice
- 🔐 **Authentication**: Support for Google OAuth, GitHub OAuth, and guest access
- 💬 **Real-time Chat**: Interactive chat interface with message history
- 🎨 **Theme System**: Light/Dark mode with purple accent variants
- 📱 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🗄️ **Database Integration**: PostgreSQL with Prisma ORM
- ⚡ **Type-Safe API**: tRPC for end-to-end type safety
- 🔄 **State Management**: TanStack Query for efficient data fetching
- 📊 **Session Management**: Persistent chat history and user sessions

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, React Icons
- **Backend**: tRPC, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v5
- **AI Integration**: OpenAI GPT API
- **State Management**: TanStack Query
- **Deployment**: Vercel

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- PostgreSQL database running
- OpenAI API key
- Google OAuth credentials (optional)
- GitHub OAuth credentials (optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd oration-ai-chat
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# App Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXT_PUBLIC_URL=http://localhost:3000

# OpenAI Configuration
OPENAI_API_KEY=your-openai-api-key-here

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/oration_chat

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (Optional)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### 4. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🎨 Features Overview

### Authentication System
- **Google OAuth**: Sign in with Google account
- **GitHub OAuth**: Sign in with GitHub account
- **Guest Access**: Use the app without registration
- **Session Management**: Persistent user sessions

### Chat Interface
- **AI Responses**: Powered by OpenAI GPT for career counseling
- **Message History**: All conversations are saved
- **Real-time Updates**: Instant message delivery
- **Responsive Design**: Works on all device sizes

### Theme System
- **Light/Dark Mode**: Toggle between themes
- **Purple Variants**: Additional color schemes
- **Persistent Preferences**: Theme choice is remembered

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Application URL | ✅ |
| `NEXTAUTH_SECRET` | NextAuth secret key | ✅ |
| `NEXT_PUBLIC_URL` | Public application URL | ✅ |
| `OPENAI_API_KEY` | OpenAI API key | ✅ |
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | ❌ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | ❌ |
| `GITHUB_ID` | GitHub OAuth client ID | ❌ |
| `GITHUB_SECRET` | GitHub OAuth client secret | ❌ |

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
npx vercel
```

### Database Setup for Production

1. Set up a PostgreSQL database (recommended: Supabase, Neon, or Railway)
2. Update `DATABASE_URL` in your environment variables
3. Run migrations: `npx prisma db push`

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run type checking
npx tsc --noEmit

# Run linting
npm run lint
```


## 📝 API Documentation

### tRPC Endpoints

- `chat.getChats` - Fetch all chat sessions
- `chat.addSession` - Create new chat session
- `chat.addMessage` - Add message to chat
- `chat.getMessages` - Get messages for a chat
- `chat.createUser` - Create new user

## 🐛 Troubleshooting

### Common Issues

1. **TRPC Connection Error**
   - Ensure your development server is running
   - Check environment variables are set correctly
   - Verify database connection

2. **Authentication Issues**
   - Verify OAuth credentials
   - Check `NEXTAUTH_SECRET` is set
   - Ensure callback URLs are configured

3. **Database Connection**
   - Verify PostgreSQL is running
   - Check `DATABASE_URL` format
   - Run `npx prisma db push`

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [tRPC](https://trpc.io/) for type-safe APIs
- [Prisma](https://prisma.io/) for database management
- [OpenAI](https://openai.com/) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for styling

**Thank You**
