'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  ThumbsUp, 
  ThumbsUp as ThumbsUpFilled,
  MoreVertical,
  Reply,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import AddComment from './AddComment';

interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  text: string;
  likes: string;
  timestamp: string;
  isLiked: boolean;
  replies?: Comment[];
}

interface CommentsPreviewProps {
  comments: Comment[];
}

export default function CommentsPreview({ comments: initialComments }: CommentsPreviewProps) {
  const [commentList, setCommentList] = useState<Comment[]>(initialComments);
  const [showAll, setShowAll] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState<string | null>(null);

  const handleLikeComment = (commentId: string) => {
    setCommentList(prev => 
      prev.map(comment => 
        comment.id === commentId 
          ? { ...comment, isLiked: !comment.isLiked } 
          : comment
      )
    );
  };

  const handleAddComment = (commentText: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      user: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      text: commentText,
      likes: '0',
      timestamp: 'Just now',
      isLiked: false,
      replies: []
    };
    setCommentList(prev => [newComment, ...prev]);
  };

  const handleAddReply = (commentId: string, replyText: string) => {
    const newReply: Comment = {
      id: `${commentId}-${Date.now()}`,
      user: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      text: replyText,
      likes: '0',
      timestamp: 'Just now',
      isLiked: false
    };

    setCommentList(prev =>
      prev.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      })
    );
    setShowReplyInput(null);
  };

  const displayedComments = showAll ? commentList : commentList.slice(0, 3);

  const CommentItem = ({ comment, depth = 0 }: { comment: Comment; depth?: number }) => {
    const [showReplies, setShowReplies] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');

    const handleSubmitReply = (e: React.FormEvent) => {
      e.preventDefault();
      if (!replyText.trim()) return;
      handleAddReply(comment.id, replyText);
      setReplyText('');
      setIsReplying(false);
    };

    return (
      <div className={`${depth > 0 ? 'ml-12 mt-4' : ''}`}>
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img
              src={comment.user.avatar}
              alt={comment.user.name}
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {comment.user.name}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  {comment.timestamp}
                </p>
              </div>
              <button className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-800 dark:text-gray-200 mb-3">
              {comment.text}
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleLikeComment(comment.id)}
                className={`flex items-center gap-2 ${
                  comment.isLiked 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-600 dark:text-gray-400'
                } hover:text-blue-600 dark:hover:text-blue-400 transition-colors`}
              >
                {comment.isLiked ? (
                  <ThumbsUpFilled className="w-5 h-5" />
                ) : (
                  <ThumbsUp className="w-5 h-5" />
                )}
                <span>{comment.likes}</span>
              </button>
              <button 
  onClick={() => setIsReplying(!isReplying)}
  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
>
  <Reply className="w-4 h-4" />
  Reply
</button>
            </div>

            {/* Reply Input */}
            {isReplying && (
              <div className="mt-4 ml-8">
                <form onSubmit={handleSubmitReply} className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  />
                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className={`px-4 py-2 rounded-lg ${
                      !replyText.trim()
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Reply
                  </button>
                </form>
              </div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4">
                <button
                  onClick={() => setShowReplies(!showReplies)}
                  className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                >
                  {showReplies ? (
                    <>
                      <ChevronUp className="w-4 h-4" />
                      Hide {comment.replies.length} replies
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-4 h-4" />
                      View {comment.replies.length} replies
                    </>
                  )}
                </button>
                
                {showReplies && (
                  <div className="mt-2 space-y-4">
                    {comment.replies.map((reply) => (
                      <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <MessageCircle className="w-6 h-6" />
          Comments
          <span className="text-gray-600 dark:text-gray-400">
            ({commentList.length})
          </span>
        </h2>
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          {showAll ? 'Show less' : 'Show all'}
        </button>
      </div>

      {/* Add Comment Section */}
      <AddComment onAddComment={handleAddComment} />

      {/* Comments List */}
      <div className="space-y-6">
        {displayedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {!showAll && commentList.length > 3 && (
        <div className="text-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setShowAll(true)}
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Show {commentList.length - 3} more comments
          </button>
        </div>
      )}
    </div>
  );
}