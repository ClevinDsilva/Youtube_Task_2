'use client';

import { Play, Volume2, Settings, Maximize } from 'lucide-react';

export default function VideoPlayerPlaceholder() {
  return (
    <div className="w-full bg-black rounded-xl overflow-hidden mb-6 relative aspect-video">
      {/* Video Thumbnail */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-700 transition-colors">
            <Play className="w-10 h-10 text-white ml-1" />
          </div>
        </div>
      </div>
      
      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Play className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-white" />
              <div className="w-24 h-1.5 bg-gray-600 rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-white"></div>
              </div>
            </div>
            <div className="text-white text-sm">
              1:28:45 / 1:28:45
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-white hover:text-gray-300 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-gray-300 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-2 w-full h-1.5 bg-gray-600 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-red-600"></div>
        </div>
      </div>
      
      {/* Video Info Overlay */}
      <div className="absolute top-4 left-4 bg-black/70 text-white text-sm px-3 py-1 rounded">
        1:28:45
      </div>
      <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-3 py-1 rounded">
        HD
      </div>
    </div>
  );
}