'use client';

import { useState } from 'react';
import { 
  X, 
  Copy, 
  Facebook, 
  Twitter, 
  Linkedin, 
  MessageCircle, 
  Mail, 
  Link2,
  Check,
  Share2,
  MessageSquare,
  Link,
  Smartphone
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  videoTitle: string;
}

export default function ShareModal({ isOpen, onClose, videoUrl, videoTitle }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'embed'>('share');
  const [startTime, setStartTime] = useState('0:00');
  
  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(videoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOptions = [
    {
      id: 'embed',
      label: 'Embed',
      icon: Link2,
      color: 'text-blue-600',
      onClick: () => setActiveTab('embed'),
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      icon: MessageCircle,
      color: 'text-green-600',
      onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(`${videoTitle} ${videoUrl}`)}`, '_blank'),
    },
    {
      id: 'facebook',
      label: 'Facebook',
      icon: Facebook,
      color: 'text-blue-600',
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(videoUrl)}`, '_blank'),
    },
    {
      id: 'twitter',
      label: 'X',
      icon: Twitter,
      color: 'text-black dark:text-white',
      onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(videoUrl)}&text=${encodeURIComponent(videoTitle)}`, '_blank'),
    },
    {
      id: 'email',
      label: 'Email',
      icon: Mail,
      color: 'text-gray-600',
      onClick: () => window.open(`mailto:?subject=${encodeURIComponent(videoTitle)}&body=${encodeURIComponent(`Check out this video: ${videoUrl}`)}`),
    },
    {
      id: 'copy',
      label: 'Copy link',
      icon: copied ? Check : Copy,
      color: copied ? 'text-green-600' : 'text-gray-600',
      onClick: handleCopyLink,
    },
  ];

  const timeOptions = ['0:00', '1:30', '3:45', '5:20', '10:15', '15:30'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Share</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('share')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'share'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            Share
          </button>
          <button
            onClick={() => setActiveTab('embed')}
            className={`flex-1 py-3 text-center font-medium ${
              activeTab === 'embed'
                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
            }`}
          >
            Embed
          </button>
        </div>

        {/* Share Tab Content */}
        {activeTab === 'share' && (
          <div className="p-4">
            {/* Share Options Grid */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {shareOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={option.onClick}
                  className="flex flex-col items-center justify-center p-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <div className={`p-3 rounded-full mb-2 ${option.color}`}>
                    <option.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {option.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Link Section */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Link className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <h3 className="font-medium text-gray-900 dark:text-white">Link</h3>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={videoUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 text-sm"
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    copied
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Create Post Button (from screenshot) */}
            <button className="w-full py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg flex items-center justify-center gap-2 text-gray-800 dark:text-gray-200 font-medium mb-4">
              <MessageSquare className="w-5 h-5" />
              Share in a post
            </button>
          </div>
        )}

        {/* Embed Tab Content */}
        {activeTab === 'embed' && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Smartphone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-medium text-gray-900 dark:text-white">Embed Video</h3>
            </div>

            {/* Start Time Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start at
              </label>
              <div className="flex flex-wrap gap-2">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    onClick={() => setStartTime(time)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      startTime === time
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Embed Code */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Embed code
              </label>
              <div className="relative">
                <textarea
                  value={`<iframe width="560" height="315" src="${videoUrl}?t=${startTime.replace(':', 'm')}s" frameborder="0" allowfullscreen></iframe>`}
                  readOnly
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 font-mono text-sm resize-none"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`<iframe width="560" height="315" src="${videoUrl}?t=${startTime.replace(':', 'm')}s" frameborder="0" allowfullscreen></iframe>`);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="absolute bottom-2 right-2 px-3 py-1 bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 dark:hover:bg-gray-700 text-white dark:text-gray-200 rounded text-sm font-medium transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p>No subscribers will be shown with the embedded player.</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            By sharing this video, you agree to YouTube's Terms of Service
          </p>
        </div>
      </div>
    </div>
  );
}