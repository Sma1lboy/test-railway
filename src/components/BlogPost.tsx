import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';

interface Post {
  PostID: number;
  Title: string;
  Description: string;
  Content: string;
  Image: string;
  CreatedDate: string;
  UpdatedDate: string;
}

interface Comment {
  CommentID: number;
  PostID: number;
  UserID: number;
  Content: string;
  CreatedDate: string;
}

const BlogPost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingPost, setLoadingPost] = useState<boolean>(false);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [submittingComment, setSubmittingComment] = useState<boolean>(false);

  useEffect(() => {
    if (!postId) {
      setError('No post id provided.');
      return;
    }

    // Fetch blog post details
    const fetchPost = async () => {
      setLoadingPost(true);
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}`);
        const data = await response.json();
        if (data.success && data.success.post) {
          setPost(data.success.post);
        } else {
          setError('Failed to fetch post details.');
        }
      } catch (err) {
        setError('Error fetching post data.');
      } finally {
        setLoadingPost(false);
      }
    };

    // Fetch comments for the post
    const fetchComments = async () => {
      setLoadingComments(true);
      try {
        const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`);
        const data = await response.json();
        if (data.success && data.success.comments) {
          setComments(data.success.comments);
        } else {
          setError('Failed to fetch comments.');
        }
      } catch (err) {
        setError('Error fetching comments.');
      } finally {
        setLoadingComments(false);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingComment(true);
    try {
      // Since authentication is not implemented, using a hardcoded UserID (e.g., 1)
      const commentData = { UserID: 1, Content: newComment };
      const response = await fetch(`http://localhost:3000/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      const data = await response.json();
      if (data.success && data.success.comment) {
        setComments((prevComments) => [data.success.comment, ...prevComments]);
        setNewComment('');
      } else {
        setError('Failed to submit comment.');
      }
    } catch (err) {
      setError('Error submitting comment.');
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-[#FFFFFF] p-4">
      <div className="max-w-4xl mx-auto">
        {loadingPost ? (
          <div className="text-center py-10">Loading post...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : post ? (
          <article>
            <h1 className="text-4xl font-mono mb-4">{post.Title}</h1>
            <p className="text-lg font-sans mb-4">{post.Description}</p>
            {post.Image && (
              <img
                className="w-full mb-4 shadow-md"
                src={post.Image}
                alt={post.Title}
              />
            )}
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.Content }}
            />
            <p className="text-sm mt-4">
              Published on: {new Date(post.CreatedDate).toLocaleDateString()}
            </p>
          </article>
        ) : null}

        <section className="mt-10">
          <h2 className="text-3xl font-mono mb-4">Comments</h2>
          {loadingComments ? (
            <div>Loading comments...</div>
          ) : (
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.CommentID} className="p-4 bg-[#2E2E2E] rounded shadow">
                    <p className="text-base">{comment.Content}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(comment.CreatedDate).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}

          <form onSubmit={handleCommentSubmit} className="mt-6">
            <textarea
              className="w-full p-2 rounded border border-gray-700 bg-[#333333] text-white focus:outline-none focus:ring-2 focus:ring-[#66FF66]"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Type your comment..."
              rows={4}
              style={{ fontFamily: 'sans-serif', fontSize: '18px' }}
            />
            <button
              type="submit"
              disabled={submittingComment}
              className="mt-4 bg-[#66FF66] text-white rounded px-4 py-2 hover:bg-[#5ccd5c] transition duration-300"
            >
              {submittingComment ? 'Submitting...' : 'Submit Comment'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;