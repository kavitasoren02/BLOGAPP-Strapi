import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(identifier, password);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Login failed. Please check your credentials.');
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
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent-cyan)]">
              Welcome Back
            </h2>
            <p className="text-[color:var(--color-text-light)] mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Username Input */}
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
                Email or Username
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[color:var(--color-bg)] border-2 border-[color:var(--color-border)] rounded-lg focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-opacity-10 text-[color:var(--color-text)]"
                placeholder="Enter your email or username"
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
                placeholder="Enter your password"
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
              className="w-full py-3 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent-cyan)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity cursor-pointer"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
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

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-[color:var(--color-text-light)] text-sm">
              Don't have an account?{' '}
              <Link
                to="/register"
                className="font-semibold text-[color:var(--color-primary)] hover:text-[color:var(--color-primary-light)]"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 text-center text-[color:var(--color-text-light)] text-sm">
          <p>Demo credentials: demo@example.com / password</p>
        </div>
      </div>
    </div>
  );
};
