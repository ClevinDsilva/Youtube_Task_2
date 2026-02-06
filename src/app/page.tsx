'use client';

import { useEffect, useState } from 'react';
import VideoPlayerPlaceholder from './components/VideoPlayerPlaceholder';
import ChannelInfo from './components/ChannelInfo';
import VideoActions from './components/VideoActions';
import ExpandableDescription from './components/ExpandableDescription';
import CommentsPreview from './components/CommentsPreview';
import videoData from './data/videoData.json';

interface VideoData {
  video: {
    title: string;
    views: string;
    uploadDate: string;
    likes: string;
    dislikes: string;
    description: string;
    channel: {
      name: string;
      subscribers: string;
      avatar: string;
      isSubscribed: boolean;
    };
  };
  comments: Array<{
    id: string;
    user: {
      name: string;
      avatar: string;
    };
    text: string;
    likes: string;
    timestamp: string;
    isLiked: boolean;
  }>;
}

export default function Home() {
  const [data, setData] = useState<VideoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setData(videoData);
      setIsLoading(false);
    }, 500);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            {/* Video Player Placeholder Skeleton */}
            <div className="w-full bg-gray-300 dark:bg-gray-800 rounded-xl aspect-video mb-6"></div>
            
            {/* Title Skeleton */}
            <div className="h-8 bg-gray-300 dark:bg-gray-800 rounded mb-4 w-3/4"></div>
            
            {/* Channel Info Skeleton */}
            <div className="flex items-center justify-between py-4 border-b">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-800 rounded-full"></div>
                <div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-800 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-800 rounded w-24"></div>
                </div>
              </div>
              <div className="w-24 h-10 bg-gray-300 dark:bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            No Video Data Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please check your data source
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        {/* Video Player Placeholder */}
        <VideoPlayerPlaceholder />

        {/* Video Title - YouTube style */}
        <h1 className="video-title">
          {data.video.title}
        </h1>

        {/* Video Stats - YouTube style */}
        <div className="video-stats">
          <span className="view-count">{data.video.views} views</span>
          <span>{data.video.uploadDate}</span>
        </div>

        {/* Channel Info with Subscribe Button */}
        <ChannelInfo channel={data.video.channel} />

        {/* All Video Action Buttons */}
        <VideoActions 
          likes={data.video.likes}
          dislikes={data.video.dislikes}
          videoTitle={data.video.title}
        />

        {/* Expandable Description (YouTube style with sponsorship) */}
        <ExpandableDescription 
          description={data.video.description}
          views={data.video.views}
          uploadDate={data.video.uploadDate}
        />

        {/* Comments Section */}
        <div className="mt-8">
          <h3 className="comments-header">
            Comments
          </h3>
          <CommentsPreview comments={data.comments} />
        </div>
      </div>
    </main>
  );
}