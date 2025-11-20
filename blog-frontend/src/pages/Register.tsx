import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(username, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-[color:var(--color-bg)] via-[color:var(--color-bg-secondary)] to-[color:var(--color-bg)]">
      <div className="max-w-md w-full">
        {/* Form Card */}
        <div className="bg-[color:var(--color-surface)] rounded-2xl shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--color-accent-orange)] to-[color:var(--color-accent-pink)]">
              Join BlogHub
            </h2>
            <p className="text-[color:var(--color-text-light)] mt-2">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[color:var(--color-bg)] border-2 border-[color:var(--color-border)] rounded-lg focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-opacity-10 text-[color:var(--color-text)]"
                placeholder="Choose a username"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[color:var(--color-bg)] border-2 border-[color:var(--color-border)] rounded-lg focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-opacity-10 text-[color:var(--color-text)]"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[color:var(--color-bg)] border-2 border-[color:var(--color-border)] rounded-lg focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-opacity-10 text-[color:var(--color-text)]"
                placeholder="Create a password"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[color:var(--color-bg)] border-2 border-[color:var(--color-border)] rounded-lg focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-opacity-10 text-[color:var(--color-text)]"
                placeholder="Confirm your password"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-[color:var(--color-error)] bg-opacity-10 border border-[color:var(--color-error)] rounded-lg text-white text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-[color:var(--color-accent-orange)] to-[color:var(--color-accent-pink)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[color:var(--color-border)]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[color:var(--color-surface)] text-[color:var(--color-text-light)]">Or</span>
            </div>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-[color:var(--color-text-light)] text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-light)]"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
