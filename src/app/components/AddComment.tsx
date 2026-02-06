'use client';

import { useState } from 'react';
import { Send, Smile, AtSign } from 'lucide-react';

interface AddCommentProps {
  onAddComment: (comment: string) => void;
}

export default function AddComment({ onAddComment }: AddCommentProps) {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onAddComment(comment);
      setComment('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="mb-6">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-600 dark:text-gray-400 font-medium">Y</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="mb-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-3 bg-transparent border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Emoji"
              >
                <Smile className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                title="Mention"
              >
                <AtSign className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setComment('')}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!comment.trim() || isSubmitting}
                className={`px-4 py-2 rounded-full font-medium flex items-center gap-2 ${
                  !comment.trim() || isSubmitting
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? 'Posting...' : 'Comment'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}