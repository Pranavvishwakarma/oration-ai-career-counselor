'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaGoogle, FaGithub, FaUser, FaEnvelope, FaLock, FaUserPlus, FaMoon, FaSun, FaPalette } from 'react-icons/fa';
import { useTheme } from '@/components/ThemeProvider';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { theme, variant, toggleTheme, setVariant, mounted } = useTheme();

  if (!mounted) {
    return null;
  }

  const currentTheme = {
    bg: theme === 'light' 
      ? 'bg-gradient-to-br from-blue-50 to-purple-50' 
      : 'bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900',
    card: theme === 'light' 
      ? 'bg-white/80 backdrop-blur-lg border border-white/20' 
      : 'bg-gray-800/80 backdrop-blur-lg border border-gray-700/50',
    text: theme === 'light' ? 'text-gray-800' : 'text-white',
    subtext: theme === 'light' ? 'text-gray-600' : 'text-gray-300',
    accent: variant === 'purple' 
      ? 'from-purple-500 to-pink-500' 
      : 'from-blue-500 to-purple-600'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      if (response.ok) {
        router.push('/auth/signin?message=Registration successful');
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    setIsLoading(true);
    try {
      await signIn(provider, { callbackUrl: '/' });
    } catch (error) {
      setError('Social sign-in failed');
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${currentTheme.bg} relative overflow-hidden px-2 sm:px-4 lg:px-8`}>
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

      {/* Background Elements - Mobile optimized */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-20 sm:-top-40 -right-20 sm:-right-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-r ${currentTheme.accent} rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob`}></div>
        <div className={`absolute -bottom-20 sm:-bottom-40 -left-20 sm:-left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000`}></div>
        <div className={`absolute top-20 sm:top-40 left-20 sm:left-40 w-40 sm:w-80 h-40 sm:h-80 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000`}></div>
      </div>

      {/* Register Form - Mobile optimized */}
      <div className={`relative z-10 w-full max-w-sm sm:max-w-md ${currentTheme.card} rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8`}>
        <div className="space-y-4 sm:space-y-6">
          {/* Header - Mobile optimized */}
          <div className="text-center">
            <div className={`mx-auto w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r ${currentTheme.accent} rounded-full flex items-center justify-center mb-2 sm:mb-4`}>
              <FaUserPlus className="text-white text-lg sm:text-2xl" />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-bold ${currentTheme.text}`}>Create Account</h1>
            <p className={`${currentTheme.subtext} text-sm sm:text-base`}>Join us to start your journey</p>
          </div>

          {/* Social Login - Mobile optimized */}
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={() => handleSocialSignIn('google')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 ${currentTheme.card} hover:bg-opacity-80 border ${currentTheme.text} py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base`}
            >
              <FaGoogle className="text-sm sm:text-lg" />
              <span className="hidden xs:inline sm:inline">Google</span>
            </button>
            
            <button
              onClick={() => handleSocialSignIn('github')}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 ${currentTheme.card} hover:bg-opacity-80 border ${currentTheme.text} py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-sm sm:text-base`}
            >
              <FaGithub className="text-sm sm:text-lg" />
              <span className="hidden xs:inline sm:inline">GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className={`w-full border-t ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className={`px-2 sm:px-4 bg-transparent ${currentTheme.subtext}`}>or register with email</span>
            </div>
          </div>

          {/* Registration Form - Mobile optimized */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="relative">
              <FaUser className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.subtext} text-sm`} />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 ${currentTheme.card} border border-white/20 rounded-lg sm:rounded-xl ${currentTheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base`}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="relative">
              <FaEnvelope className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.subtext} text-sm`} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 ${currentTheme.card} border border-white/20 rounded-lg sm:rounded-xl ${currentTheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base`}
                placeholder="Email Address"
                required
              />
            </div>

            <div className="relative">
              <FaLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.subtext} text-sm`} />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 ${currentTheme.card} border border-white/20 rounded-lg sm:rounded-xl ${currentTheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base`}
                placeholder="Password"
                required
              />
            </div>

            <div className="relative">
              <FaLock className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${currentTheme.subtext} text-sm`} />
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 ${currentTheme.card} border border-white/20 rounded-lg sm:rounded-xl ${currentTheme.text} placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 text-sm sm:text-base`}
                placeholder="Confirm Password"
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
                  <span className="text-sm sm:text-base">Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm">
                {error}
              </div>
            )}
          </form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className={`${currentTheme.subtext} text-xs sm:text-sm`}>
              Already have an account?{' '}
              <Link href="/auth/signin" className={`${variant === 'purple' ? 'text-purple-400 hover:text-purple-300' : 'text-blue-400 hover:text-blue-300'} font-medium hover:underline transition-colors`}>
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}