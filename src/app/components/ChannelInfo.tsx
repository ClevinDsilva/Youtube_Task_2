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
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [notificationType, setNotificationType] = useState('all'); // 'all', 'personalized', 'none'

  const handleSubscribe = () => {
    if (!isSubscribed) {
      // When subscribing, show the notification dropdown
      setShowNotificationDropdown(true);
      setIsSubscribed(true);
      // Hide dropdown after 5 seconds if not interacted with
      setTimeout(() => {
        if (showNotificationDropdown) {
          setShowNotificationDropdown(false);
        }
      }, 5000);
    } else {
      // When unsubscribing, hide dropdown
      setShowNotificationDropdown(false);
      setIsSubscribed(false);
    }
  };

  const handleNotificationSelect = (type: string) => {
    setNotificationType(type);
    setShowNotificationDropdown(false);
  };

  const handleBellClick = () => {
    setShowNotificationDropdown(!showNotificationDropdown);
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
          {/* Subscribe/Unsubscribe Button */}
          <div className="relative">
            <button
              onClick={handleSubscribe}
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

            {/* Notification Dropdown (appears after subscribing) */}
            {isSubscribed && showNotificationDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-yt-white dark:bg-yt-gray-bg rounded-lg shadow-lg border border-yt-border z-50 animate-fade-in">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-yt-primary">
                      Notifications
                    </span>
                    <button
                      onClick={() => setShowNotificationDropdown(false)}
                      className="text-yt-secondary hover:text-yt-primary"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <button
                      onClick={() => handleNotificationSelect('all')}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                        notificationType === 'all' 
                          ? 'bg-yt-blue-hover text-yt-blue' 
                          : 'hover:bg-yt-hover'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5" />
                        <div>
                          <div className="font-medium">All</div>
                          <div className="text-xs text-yt-secondary">
                            Default
                          </div>
                        </div>
                      </div>
                      {notificationType === 'all' && <Check className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => handleNotificationSelect('personalized')}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
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
                          <div className="text-xs text-yt-secondary">
                            Some videos
                          </div>
                        </div>
                      </div>
                      {notificationType === 'personalized' && <Check className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => handleNotificationSelect('none')}
                      className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                        notificationType === 'none' 
                          ? 'bg-yt-blue-hover text-yt-blue' 
                          : 'hover:bg-yt-hover'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <BellOff className="w-5 h-5" />
                        <div>
                          <div className="font-medium">None</div>
                          <div className="text-xs text-yt-secondary">
                            Off
                          </div>
                        </div>
                      </div>
                      {notificationType === 'none' && <Check className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bell button (shows when subscribed) */}
          {isSubscribed && (
            <button
              onClick={handleBellClick}
              className={`
                p-2 rounded-full border transition-all h-10 w-10 flex items-center justify-center border-yt-border
                ${showNotificationDropdown
                  ? 'bg-yt-hover text-yt-primary'
                  : 'bg-white dark:bg-yt-gray-bg text-yt-secondary hover:bg-yt-hover'
                }
              `}
              title="Notification settings"
            >
              {notificationType === 'none' ? (
                <BellOff className="w-5 h-5" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}