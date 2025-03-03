import React, { useEffect, useState } from 'react';
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

const BlogPostList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPosts = async () => {
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
          // Using mock data if API returns empty or undefined value
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen bg-[#1E1E1E]">
        <p className="text-[#66FF66] text-xl font-mono">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen bg-[#1E1E1E]">
        <p className="text-red-500 text-xl font-mono">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#1E1E1E] text-[#FFFFFF] p-4 min-h-screen">
      <h1 className="text-4xl font-mono mb-6 text-[#66FF66]">Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.PostID}
            className="border border-gray-700 rounded p-4 hover:shadow-lg transform transition duration-300 hover:scale-105"
          >
            <Link to={`/blog/${post.PostID}`} className="block">
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
    </div>
  );
};

export default BlogPostList;