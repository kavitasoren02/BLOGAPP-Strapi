import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { blogApi, commentApi, type Blog } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState({ userName: '', email: '', message: '' });
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  // const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setIsLoading(true);
        if (!slug) {
          setError('Blog not found');
          return;
        }
        const response = await blogApi.getBlogBySlug(slug);
        if (response.data.data.length === 0) {
          setError('Blog not found');
          return;
        }
        setBlog(response.data.data[0]);
      } catch (err) {
        setError('Failed to load blog');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    if (blog) {
      // Load comments from blog data if available
      if (blog.comments.length > 0) {
        setComments(blog.comments);
      }
    }
  }, [blog]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blog || !newComment.userName || !newComment.email || !newComment.message) {
      return;
    }

    try {
      setIsSubmittingComment(true);
      await commentApi.createComment({
        ...newComment,
        id: blog.id,
      });

      // Add comment to local state
      setComments([
        ...comments,
        {
          id: Date.now(),
          attributes: {
            ...newComment,
            createdAt: new Date().toISOString(),
          },
        },
      ]);

      setNewComment({ userName: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to submit comment:', err);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="animate-pulse space-y-6">
          <div className="h-96 bg-[color:var(--color-bg-secondary)] rounded-xl" />
          <div className="h-8 bg-[color:var(--color-bg-secondary)] rounded w-2/3" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-[color:var(--color-bg-secondary)] rounded w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="text-5xl font-bold text-[color:var(--color-error)] mb-4">404</div>
          <p className="text-[color:var(--color-text-light)] mb-6">{error || 'Blog not found'}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-[color:var(--color-primary)] text-white rounded-lg font-medium hover:bg-[color:var(--color-primary-dark)]"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const coverImage = blog.coverImage?.[0].url;
  const imageUrl = coverImage ? `https://blogapp-strapi.onrender.com${coverImage}` : '/blog-cover.png';

  return (
    <div className="bg-[color:var(--color-bg)] py-12">
      <article className="max-w-4xl mx-auto px-4">
        {/* Hero Image */}
        <div className="mb-8 rounded-xl overflow-hidden shadow-lg h-96">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header */}
        <div className="mb-8">
          {blog.category?.name && (
            <span className="inline-block mb-4 px-4 py-2 bg-gradient-to-r from-[color:var(--color-accent-cyan)] to-[color:var(--color-accent-green)] text-white text-sm font-semibold rounded-full">
              {blog.category.name}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[color:var(--color-text)]">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-[color:var(--color-text-light)]">
            {blog.author?.name && (
              <span>By <strong>{blog.author.name}</strong></span>
            )}
            <span>•</span>
            <span>{new Date(blog.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        {/* Content */}
        <div className="mb-12 bg-[color:var(--color-surface)] p-8 rounded-xl shadow-sm prose prose-invert max-w-none text-[color:var(--color-text)]">
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[color:var(--color-border)] via-[color:var(--color-primary)] to-[color:var(--color-border)] my-12" />

        {/* Comments Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8 text-[color:var(--color-text)]">Comments</h2>

          {/* Add Comment Form */}
          <div className="mb-8 bg-[color:var(--color-surface)] p-8 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-6 text-[color:var(--color-text)]">Leave a Comment</h3>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={newComment.userName}
                  onChange={(e) => setNewComment({ ...newComment, userName: e.target.value })}
                  required
                  className="px-4 py-3 bg-[color:var(--color-bg)] border border-[color:var(--color-border)] rounded-lg focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-opacity-10"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={newComment.email}
                  onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
                  required
                  className="px-4 py-3 bg-[color:var(--color-bg)] border border-[color:var(--color-border)] rounded-lg focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-opacity-10"
                />
              </div>
              <textarea
                placeholder="Share your thoughts..."
                value={newComment.message}
                onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-[color:var(--color-bg)] border border-[color:var(--color-border)] rounded-lg focus:outline-none focus:border-[color:var(--color-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] focus:ring-opacity-10 resize-none"
              />
              <button
                type="submit"
                disabled={isSubmittingComment}
                className="px-6 py-3 bg-gradient-to-r from-[color:var(--color-primary)] to-[color:var(--color-accent-cyan)] text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {isSubmittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-[color:var(--color-surface)] p-6 rounded-lg border border-[color:var(--color-border)] hover:border-[color:var(--color-primary)] transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-[color:var(--color-text)]">
                        {comment.userName}
                      </h4>
                      <span className="text-xs text-[color:var(--color-text-light)]">
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="px-3 py-1 bg-[color:var(--color-accent-orange)] bg-opacity-10 rounded text-xs font-medium text-white">
                      Comment
                    </div>
                  </div>
                  <p className="text-[color:var(--color-text-light)]">{comment.message}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-[color:var(--color-text-light)]">No comments yet. Be the first to comment!</p>
              </div>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};
