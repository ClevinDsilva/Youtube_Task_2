
'use client';

import { useState } from 'react';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  Flag,
  Scissors,
  Bookmark,
  X
} from 'lucide-react';
import ReportModal from './ReportModal';

interface VideoActionsProps {
  likes: string;
  dislikes: string;
  videoTitle: string;
}

export default function VideoActions({ likes, dislikes, videoTitle }: VideoActionsProps) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [clipped, setClipped] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonType: string, action: () => void) => {
    // Set clicked button for animation
    setClickedButton(buttonType);
    
    // Execute the action
    action();
    
    // Remove animation class after animation completes
    setTimeout(() => {
      setClickedButton(null);
    }, 300);
  };

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: videoTitle,
        text: 'Check out this video!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    alert('Download started!!');
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleClip = () => {
    setClipped(!clipped);
  };

  const handleRemoveAds = () => {
    alert('Remove ads feature would be implemented here');
  };

  const openReportModal = () => {
    setShowReportModal(true);
  };

  const closeReportModal = () => {
    setShowReportModal(false);
  };

  return (
    <>
      <div className="video-actions">
        {/* Like Button */}
        <button
          onClick={() => handleButtonClick('like', handleLike)}
          className={`video-action-btn like-btn ${liked ? 'active' : ''} ${clickedButton === 'like' ? 'clicked' : ''}`}
          aria-label={liked ? 'Unlike' : 'Like'}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>{likes}</span>
        </button>
        
        {/* Dislike Button */}
        <button
          onClick={() => handleButtonClick('dislike', handleDislike)}
          className={`video-action-btn dislike-btn ${disliked ? 'active' : ''} ${clickedButton === 'dislike' ? 'clicked' : ''}`}
          aria-label={disliked ? 'Remove dislike' : 'Dislike'}
        >
          <ThumbsDown className="w-5 h-5" />
          <span>{dislikes}</span>
        </button>
        
        {/* Share Button */}
        <button
          onClick={() => handleButtonClick('share', handleShare)}
          className={`video-action-btn ${clickedButton === 'share' ? 'clicked' : ''}`}
          aria-label="Share"
        >
          <Share2 className="w-5 h-5" />
          <span>Share</span>
        </button>
        
        {/* Save Button */}
        <button
          onClick={() => handleButtonClick('save', handleSave)}
          className={`video-action-btn ${saved ? 'active' : ''} ${clickedButton === 'save' ? 'clicked' : ''}`}
          aria-label={saved ? 'Remove from Save' : 'Save'}
        >
          <Bookmark className="w-5 h-5" />
          <span>Save</span>
        </button>
        
        {/* Download Button */}
        <button
          onClick={() => handleButtonClick('download', handleDownload)}
          className={`video-action-btn ${clickedButton === 'download' ? 'clicked' : ''}`}
          aria-label="Download"
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
        
        {/* Clip Button */}
        <button
          onClick={() => handleButtonClick('clip', handleClip)}
          className={`video-action-btn clip-btn ${clipped ? 'active' : ''} ${clickedButton === 'clip' ? 'clicked' : ''}`}
          aria-label={clipped ? 'Remove clip' : 'Create clip'}
        >
          <Scissors className="w-5 h-5" />
          <span>Clip</span>
        </button>
        
        {/* Report Button - Flag icon */}
        <button
          onClick={() => handleButtonClick('report', openReportModal)}
          className={`video-action-btn report-btn ${clickedButton === 'report' ? 'clicked' : ''}`}
          aria-label="Report"
          title="Report"
        >
          <Flag className="w-5 h-5" />
          <span>Report</span>
        </button>
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={closeReportModal}
        videoTitle={videoTitle}
      />
    </>
  );
}
