'use client';

import { useState } from 'react';
import { Bell, BellOff, Check, ChevronDown } from 'lucide-react';

interface ChannelInfoProps {
  channel: {
    name: string;
    subscribers: string;
    avatar: string;
    isSubscribed: boolean;
  };
}

export default function ChannelInfo({ channel }: ChannelInfoProps) {
  const [isSubscribed, setIsSubscribed] = useState(channel.isSubscribed);
  const [showSubscribeDropdown, setShowSubscribeDropdown] = useState(false);
  const [notificationType, setNotificationType] = useState('all'); // 'all', 'personalized', 'none'

  const handleSubscribeClick = () => {
    if (!isSubscribed) {
      // First click: Subscribe and show "Subscribed" button
      setIsSubscribed(true);
    } else {
      // If already subscribed, clicking the main button opens the dropdown
      setShowSubscribeDropdown(!showSubscribeDropdown);
    }
  };

  const handleNotificationSelect = (type: string) => {
    setNotificationType(type);
    setShowSubscribeDropdown(false);
  };

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
    setShowSubscribeDropdown(false);
  };

  return (
    <div className="py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={channel.avatar} 
              alt={channel.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-yt-primary text-lg">
              {channel.name}
            </h3>
            <p className="text-sm text-yt-secondary">
              {channel.subscribers}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Subscribe/Unsubscribe Button with Dropdown */}
          <div className="relative">
            <button
              onClick={handleSubscribeClick}
              className={`
                px-4 py-2 rounded-full font-medium transition-all 
                flex items-center gap-2 h-10 border border-yt-border
                ${isSubscribed 
                  ? 'bg-yt-red hover:bg-[#c00] text-white' 
                  : 'bg-white dark:bg-yt-gray-bg text-black hover:bg-[#f9f9f9]'
                }
              `}
            >
              {isSubscribed ? (
                <>
                  <Check className="w-5 h-5" />
                  Subscribed
                </>
              ) : (
                'Subscribe'
              )}
              
              {/* Chevron down for subscribed state */}
              {isSubscribed && (
                <ChevronDown className="w-4 h-4 ml-1 text-white/80" />
              )}
            </button>

            {/* Subscribe Dropdown (shows Notification options + Unsubscribe) */}
            {isSubscribed && showSubscribeDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-[#282828] rounded-lg shadow-lg border border-yt-border z-50 animate-fade-in">
                <div className="p-2">
                  {/* Notification Options */}
                  <div className="space-y-1">
                    <button
                      onClick={() => handleNotificationSelect('all')}
                      className={`w-full text-left px-3 py-2.5 rounded-md flex items-center justify-between ${
                        notificationType === 'all' 
                          ? 'bg-yt-blue-hover text-yt-blue' 
                          : 'hover:bg-yt-hover'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5" />
                        <div>
                          <div className="font-medium">All</div>
                        </div>
                      </div>
                      {notificationType === 'all' && <Check className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => handleNotificationSelect('personalized')}
                      className={`w-full text-left px-3 py-2.5 rounded-md flex items-center justify-between ${
                        notificationType === 'personalized' 
                          ? 'bg-yt-blue-hover text-yt-blue' 
                          : 'hover:bg-yt-hover'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Bell className="w-5 h-5" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yt-blue rounded-full"></div>
                        </div>
                        <div>
                          <div className="font-medium">Personalized</div>
                        </div>
                      </div>
                      {notificationType === 'personalized' && <Check className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => handleNotificationSelect('none')}
                      className={`w-full text-left px-3 py-2.5 rounded-md flex items-center justify-between ${
                        notificationType === 'none' 
                          ? 'bg-yt-blue-hover text-yt-blue' 
                          : 'hover:bg-yt-hover'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <BellOff className="w-5 h-5" />
                        <div>
                          <div className="font-medium">None</div>
                        </div>
                      </div>
                      {notificationType === 'none' && <Check className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Separator */}
                  <div className="border-t border-yt-border my-2"></div>

                  {/* Unsubscribe Button */}
                  <button
                    onClick={handleUnsubscribe}
                    className="w-full text-left px-3 py-2.5 rounded-md hover:bg-[#f2f2f2] dark:hover:bg-[#3f3f3f] text-red-600 dark:text-red-400 font-medium"
                  >
                    Unsubscribe
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bell button - Just shows current notification status, doesn't open dropdown */}
          {isSubscribed && (
            <button
              className={`
                p-2 rounded-full border transition-all h-10 w-10 flex items-center justify-center 
                border-yt-border bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700
              `}
              title={`Notification setting: ${notificationType}`}
            >
              {notificationType === 'none' ? (
                <BellOff className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              ) : (
                <Bell className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
