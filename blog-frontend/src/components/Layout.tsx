import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[color:var(--color-bg)]">
      {/* Header Navigation */}
      <header className="bg-[color:var(--color-surface)] shadow-sm border-b border-[color:var(--color-border)]">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent-cyan)] hover:opacity-80"
          >
            BlogHub
          </Link>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-[color:var(--color-text-light)]">
                  {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-[color:var(--color-accent-orange)] text-white rounded-lg font-medium hover:opacity-90 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-[color:var(--color-primary)] border border-[color:var(--color-primary)] rounded-lg font-medium hover:bg-[color:var(--color-primary)] hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-[color:var(--color-primary)] text-white rounded-lg font-medium hover:bg-[color:var(--color-primary-dark)]"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent-cyan)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BlogHub</h3>
              <p className="text-white text-opacity-80">Share your thoughts and ideas with the world.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white text-opacity-80">
                <li><a href="#" className="hover:text-white">Home</a></li>
                <li><a href="#" className="hover:text-white">Browse Blogs</a></li>
                <li><a href="#" className="hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white text-opacity-80">Twitter</a>
                <a href="#" className="hover:text-white text-opacity-80">GitHub</a>
                <a href="#" className="hover:text-white text-opacity-80">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white border-opacity-20 pt-8 text-center text-white text-opacity-80">
            <p>&copy; 2025 BlogHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
