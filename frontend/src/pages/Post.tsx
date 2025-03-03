import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

interface Post {
  PostID: number;
  Title: string;
  Description: string;
  Content: string;
  Image: string;
  CreatedDate: string;
  UpdatedDate: string;
}

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only proceed if postId is present
    if (!postId) {
      setError('Invalid post ID.');
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch the post.');
        }
        const data = await response.json();
        // Use the fetched post if available; otherwise, throw an error.
        const fetchedPost: Post = data?.success?.post;
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          throw new Error('Post not found.');
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (!postId) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-[#FFFFFF] flex items-center justify-center">
        <p>Invalid post ID.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#FFFFFF] p-6">
      {loading ? (
        <p className="text-center text-lg animate-pulse">Loading post...</p>
      ) : error ? (
        <p className="text-center text-red-500 text-lg">{error}</p>
      ) : post ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="font-mono text-4xl mb-2">{post.Title}</h1>
          <p className="text-gray-400 text-sm mb-4">
            Published on {new Date(post.CreatedDate).toLocaleDateString()}
          </p>
          {post.Description && (
            <p className="italic mb-4">{post.Description}</p>
          )}
          {post.Image && (
            <img
              src={post.Image}
              alt={post.Title}
              className="w-full h-auto rounded mb-6 shadow-md"
            />
          )}
          <div className="prose prose-invert max-w-none mb-8 whitespace-pre-line">
            {post.Content}
          </div>
          <CommentSection postId={post.PostID} />
        </div>
      ) : (
        <p className="text-center text-lg">No post found.</p>
      )}
    </div>
  );
};

export default PostPage;