import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogApi, type Blog } from '../services/api';

export const Home: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await blogApi.getBlogs({
          pagination: { limit: 12 },
          sort: 'publishedAt:desc',
        });
        setBlogs(response.data.data);
      } catch (err) {
        setError('Failed to load blogs');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log({
    blogs
  })

  const getColorClass = (index: number): string => {
    const colors = [
      'from-[color:var(--color-primary)] to-[color:var(--color-accent-cyan)]',
      'from-[color:var(--color-accent-orange)] to-[color:var(--color-accent-pink)]',
      'from-[color:var(--color-accent-green)] to-[color:var(--color-accent-cyan)]',
      'from-[color:var(--color-primary-light)] to-[color:var(--color-accent-pink)]',
    ];
    return colors[index % colors.length];
  };

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="text-5xl font-bold text-[color:var(--color-error)] mb-4">Error</div>
          <p className="text-[color:var(--color-text-light)]">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--color-primary)] via-[color:var(--color-accent-cyan)] to-[color:var(--color-accent-orange)]">
          Welcome to BlogHub
        </h1>
        <p className="text-lg text-[color:var(--color-text-light)] max-w-2xl mx-auto">
          Discover amazing stories, insights, and ideas from writers around the world.
        </p>
      </section>

      {/* Blogs Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-[color:var(--color-text)]">Latest Articles</h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-96 bg-[color:var(--color-bg-secondary)] rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => {
              const coverImage = blog?.coverImage?.[0].url;
              const imageUrl = coverImage ? `https://blogapp-strapi.onrender.com${coverImage}` : '/blog-cover.png';

              return (
                <Link
                  to={`/blog/${blog.slug}`}
                  key={blog.id}
                  // onClick={() => navigate(`/blog/${blog.slug}`)}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-[color:var(--color-surface)] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${getColorClass(index)} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Category Badge */}
                    {blog.category?.name && (
                      <span className="inline-block mb-2 px-3 py-1 text-xs font-semibold rounded-full bg-[color:var(--color-accent-cyan)] bg-opacity-10 text-white">
                        {blog.category.name}
                      </span>
                    )}

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-2 text-[color:var(--color-text)] group-hover:text-[color:var(--color-primary)] transition-colors">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-[color:var(--color-text-light)] text-sm mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-[color:var(--color-border)]">
                      <span className="text-xs text-[color:var(--color-text-light)]">
                        {blog.author?.name && (
                          <span>By {blog.author.name}</span>
                        )}
                      </span>
                      <span className="text-xs text-[color:var(--color-text-light)]">
                        {new Date(blog.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[color:var(--color-text-light)]">No blogs found. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
};
