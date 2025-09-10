'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle, FaGithub, FaUser, FaEnvelope, FaLock, FaUserPlus, FaMoon, FaSun, FaPalette } from 'react-icons/fa';
import { useTheme } from '@/components/ThemeProvider';

export default function SignIn() {
  const router = useRouter();
  const { theme, variant, toggleTheme, setVariant } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password');
    } else {
      router.push('/');
    }
    setIsLoading(false);
  };

  const handleSocialSignIn = (provider: string) => {
    setIsLoading(true);
    void signIn(provider, { callbackUrl: '/' });
  };

  const handleGuest = async () => {
    console.log('Guest button clicked');
    setIsLoading(true);
    try {
      const result = await signIn('guest', { 
        redirect: false,
        callbackUrl: '/' 
      });
      console.log('Guest sign-in result:', result);
      
      if (result?.ok) {
        router.push('/');
      } else {
        console.error('Guest sign-in failed:', result?.error);
        setError('Guest access failed. Please try again.');
      }
    } catch (error) {
      console.error('Guest sign-in error:', error);
      setError('Guest access failed. Please try again.');
    }
    setIsLoading(false);
  };

  // Theme configurations
  const themeConfig = {
    light: {
      default: {
        bg: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50',
        card: 'bg-white/80 backdrop-blur-lg border-gray-200/50',
        text: 'text-gray-900',
        subtext: 'text-gray-600',
        accent: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50',
        card: 'bg-white/80 backdrop-blur-lg border-purple-200/50',
        text: 'text-gray-900',
        subtext: 'text-gray-600',
        accent: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
      }
    },
    dark: {
      default: {
        bg: 'bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900',
        card: 'bg-gray-800/80 backdrop-blur-lg border-gray-700/50',
        text: 'text-white',
        subtext: 'text-gray-300',
        accent: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
      },
      purple: {
        bg: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
        card: 'bg-purple-800/80 backdrop-blur-lg border-purple-700/50',
        text: 'text-white',
        subtext: 'text-purple-200',
        accent: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
      }
    }
  };

  const currentTheme = themeConfig[theme][variant];

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentTheme.bg} relative overflow-hidden`}>
      {/* Theme Controls - Mobile optimized */}
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-1 sm:gap-2 z-20">
        <button
          onClick={toggleTheme}
          className={`p-2 sm:p-3 ${currentTheme.card} rounded-lg sm:rounded-xl ${currentTheme.text} hover:scale-105 transition-all duration-300 shadow-lg`}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? <FaMoon className="text-sm sm:text-lg" /> : <FaSun className="text-sm sm:text-lg" />}
        </button>
        
        <div className="relative group">
          <button
            className={`p-2 sm:p-3 ${currentTheme.card} rounded-lg sm:rounded-xl ${currentTheme.text} hover:scale-105 transition-all duration-300 shadow-lg`}
            title="Change Theme Variant"
          >
            <FaPalette className="text-sm sm:text-lg" />
          </button>
          
          <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
            <div className={`${currentTheme.card} rounded-xl p-2 shadow-xl border min-w-[100px] sm:min-w-[120px]`}>
              <button
                onClick={() => setVariant('default')}
                className={`w-full text-left px-2 sm:px-3 py-1 sm:py-2 rounded-lg ${currentTheme.text} hover:bg-blue-500/20 transition-colors text-xs sm:text-sm ${
                  variant === 'default' ? 'bg-blue-500/30' : ''
                }`}
              >
                Default
              </button>
              <button
                onClick={() => setVariant('purple')}
                className={`w-full text-left px-2 sm:px-3 py-1 sm:py-2 rounded-lg ${currentTheme.text} hover:bg-purple-500/20 transition-colors text-xs sm:text-sm ${
                  variant === 'purple' ? 'bg-purple-500/30' : ''
                }`}
              >
                Purple
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 ${variant === 'purple' ? 'bg-purple-500' : 'bg-blue-500'} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob`}></div>
        <div className={`absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 ${variant === 'purple' ? 'bg-pink-500' : 'bg-indigo-500'} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000`}></div>
        <div className={`absolute top-20 sm:top-40 left-20 sm:left-40 w-40 sm:w-80 h-40 sm:h-80 ${variant === 'purple' ? 'bg-rose-500' : 'bg-cyan-500'} rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000`}></div>
      </div>

      {/* Main Container - Mobile optimized */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-2 sm:mx-4">
        <div className={`${currentTheme.card} rounded-2xl sm:rounded-3xl shadow-2xl border p-4 sm:p-8 space-y-4 sm:space-y-6`}>
          {/* Header - Mobile optimized */}
          <div className="text-center space-y-1 sm:space-y-2">
            <div className={`mx-auto w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${currentTheme.accent} rounded-full flex items-center justify-center mb-2 sm:mb-4`}>
              <FaUser className="text-white text-lg sm:text-2xl" />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${currentTheme.text}`}>Welcome Back</h1>
            <p className={`${currentTheme.subtext} text-sm sm:text-base`}>Sign in to continue your journey</p>
          </div>

          {/* Social Login - Mobile optimized */}
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => handleSocialSignIn('google')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 ${currentTheme.card} hover:bg-opacity-80 border ${currentTheme.text} py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base`}
            >
              <FaGoogle className="text-sm sm:text-lg" />
              <span className="font-medium hidden xs:inline sm:inline">Google</span>
            </button>
            
            <button
              onClick={() => handleSocialSignIn('github')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 ${currentTheme.card} hover:bg-opacity-80 border ${currentTheme.text} py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base`}
            >
              <FaGithub className="text-sm sm:text-lg" />
              <span className="font-medium hidden xs:inline sm:inline">GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className={`px-2 sm:px-4 bg-transparent ${currentTheme.subtext}`}>or continue with email</span>
            </div>
          </div>

          {/* Email Form - Mobile optimized */}
          <form onSubmit={handleEmailSignIn} className="space-y-3 sm:space-y-4">
            <div className="relative">
              <FaEnvelope className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.subtext} text-sm`} />
              <input
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 ${currentTheme.card} border ${currentTheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 rounded-lg sm:rounded-xl text-sm sm:text-base`}
                required
              />
            </div>
            
            <div className="relative">
              <FaLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.subtext} text-sm`} />
              <input
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 ${currentTheme.card} border ${currentTheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 rounded-lg sm:rounded-xl text-sm sm:text-base`}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r ${currentTheme.accent} text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-sm sm:text-base">Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm">
                {error}
              </div>
            )}
          </form>

          {/* Guest Access */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className={`px-2 sm:px-4 bg-transparent ${currentTheme.subtext}`}>or</span>
            </div>
          </div>

          <button
            onClick={handleGuest}
            disabled={isLoading}
            className={`w-full ${currentTheme.card} hover:bg-opacity-80 border ${currentTheme.text} py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base`}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-2">
              <FaUserPlus className="text-sm sm:text-lg" />
              <span>Continue as Guest</span>
            </div>
          </button>

          {/* Register Link */}
          <div className="text-center">
            <p className={`${currentTheme.subtext} text-xs sm:text-sm`}>
              Don't have an account?{' '}
              <Link href="/auth/register" className={`${variant === 'purple' ? 'text-purple-400 hover:text-purple-300' : 'text-blue-400 hover:text-blue-300'} font-medium hover:underline transition-colors`}>
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
