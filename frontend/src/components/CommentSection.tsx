import React, { useEffect, useState, FormEvent } from 'react';

interface Comment {
  CommentID: number;
  PostID: number;
  UserID: number;
  Content: string;
  CreatedDate: string;
}

interface CommentSectionProps {
  postId: number | string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const API_BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments.');
        }
        const data = await response.json();
        // Use fetched comments if available; otherwise, use empty list (mock data)
        const fetchedComments: Comment[] = data?.success?.comments || [];
        setComments(fetchedComments);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching comments.');
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSubmitting(true);
    setError(null);

    // Using a static UserID of 1 as a placeholder.
    const commentPayload = {
      UserID: 1,
      Content: newComment.trim(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentPayload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment.');
      }

      const data = await response.json();
      const postedComment: Comment = data?.success?.comment;
      if (postedComment) {
        setComments(prevComments => [...prevComments, postedComment]);
        setNewComment('');
      } else {
        throw new Error('Unexpected response from server.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting your comment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1E1E1E] text-[#FFFFFF] p-4 rounded shadow-md mt-6">
      <h2 className="font-mono text-2xl mb-4">Comments</h2>
      {loading ? (
        <p className="animate-pulse">Loading comments...</p>
      ) : (
        <>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li key={comment.CommentID} className="border-b border-gray-600 py-2">
                  <p className="text-sm">{comment.Content}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.CreatedDate).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Enter your comment..."
          className="w-full p-3 mt-2 rounded border border-gray-600 bg-[#1E1E1E] text-white focus:bg-white focus:text-black focus:outline-none transition-colors duration-300"
          rows={3}
        />
        <button
          type="submit"
          disabled={submitting || !newComment.trim()}
          className="mt-2 bg-[#66FF66] text-white py-2 px-4 rounded hover:bg-green-500 transition-colors duration-300 disabled:bg-green-300"
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;