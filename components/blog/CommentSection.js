import React, { useState } from 'react';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newComment = {
        id: Date.now(),
        name,
        comment,
        date: new Date().toISOString(),
      };

      setComments([...comments, newComment]);
      setName('');
      setComment('');
      setSubmitting(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-10">
        <div className="mb-4">
          <label htmlFor="name" className="block text-secondary-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="comment" className="block text-secondary-700 mb-2">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows="4"
            className="w-full px-4 py-2 border border-secondary-300 rounded-md focus:ring-primary-500 focus:border-primary-500 resize-y"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center px-6 py-3 bg-secondary-700 text-white font-medium rounded-md shadow-sm hover:bg-secondary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
          >
            {submitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Posting...
              </>
            ) : (
              'Post Comment'
            )}
          </button>
        </div>
      </form>

      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg border border-secondary-200">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-3">
                  <span className="font-semibold">{comment.name.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-medium text-secondary-900">{comment.name}</h4>
                  <p className="text-sm text-secondary-500">{formatDate(comment.date)}</p>
                </div>
              </div>
              <p className="text-secondary-700 mt-2">{comment.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary-500 italic">No comments yet. Be the first to share your thoughts!</p>
      )}
    </div>
  );
};

export default CommentSection;