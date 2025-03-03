import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  PostID: number;
  Title: string;
  Description: string;
  Content: string;
  Image: string;
  CreatedDate: string;
  UpdatedDate: string;
}

const Blog: FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Predefined filter options.
  const filterOptions: string[] = ['All', 'Cybersecurity', 'General'];

  // A simple helper to assign a category to a post.
  // For demonstration purposes, posts with "cybersecurity" in their title
  // are categorized as "Cybersecurity"; all others as "General".
  const getCategory = (post: BlogPost): string => {
    return post.Title.toLowerCase().includes('cybersecurity')
      ? 'Cybersecurity'
      : 'General';
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('http://localhost:3000/api/posts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        if (data && data.success && Array.isArray(data.success.posts)) {
          setPosts(data.success.posts);
        } else {
          // If API returns empty or undefined value, use an empty list.
          setPosts([]);
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter the posts by the selected category.
  const filteredPosts = posts.filter((post) => {
    if (selectedFilter === 'All') return true;
    return getCategory(post) === selectedFilter;
  });

  // Handler when a filter option is clicked.
  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1E1E1E]">
        <p className="text-[#66FF66] text-xl font-mono">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#1E1E1E]">
        <p className="text-red-500 text-xl font-mono">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#FFFFFF] p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-mono text-[#66FF66] mb-6">Blog Posts</h1>
        {/* Categorized Filters */}
        <div className="mb-6">
          <p className="mb-2 font-mono text-lg">Filter by Category:</p>
          <div className="flex gap-4">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 rounded transition duration-300 focus:outline-none ${
                  selectedFilter === filter
                    ? 'bg-[#5ccd5c] text-white'
                    : 'bg-[#66FF66] text-white hover:bg-[#5ccd5c]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <p className="text-center text-xl font-mono">
            No posts available for category "{selectedFilter}".
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.PostID}
                className="border border-gray-700 rounded p-4 hover:shadow-lg transform transition duration-300 hover:scale-105"
              >
                <Link to={`/blog/${post.PostID}`}>
                  <img
                    src={post.Image || 'https://picsum.photos/500/300'}
                    alt={post.Title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h2 className="text-2xl font-mono mb-2 text-[#66FF66] hover:text-[#FFFFFF] transition-colors">
                    {post.Title}
                  </h2>
                  <p className="text-base font-sans">{post.Description}</p>
                  <p className="text-sm font-mono mt-2 opacity-75">
                    Published: {new Date(post.CreatedDate).toLocaleDateString()}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;