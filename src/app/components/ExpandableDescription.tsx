'use client';

import { useState } from 'react';
import { Check, Link, FileText, Globe, Mail } from 'lucide-react';

interface ExpandableDescriptionProps {
  description: string;
  views: string;
  uploadDate: string;
}

export default function ExpandableDescription({ 
  description, 
  views, 
  uploadDate 
}: ExpandableDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="description-container">
      {/* Views and Date at TOP (YouTube style) */}
      <div className="flex items-center gap-4 p-4 border-b border-yt-border">
        <span className="font-semibold text-yt-primary">
          {views}
        </span>
        <span className="text-yt-secondary">{uploadDate}</span>
      </div>
      
      {/* Description Content */}
      <div className="p-4">
        <div className="whitespace-pre-line">
          <div className={`relative ${!isExpanded ? 'max-h-[70px] overflow-hidden' : ''}`}>
            {/* Promotional Content from Screenshot */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-yt-primary mb-2">
                🔥 Crack Your Next Java Interview
              </h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-yt-primary">
                    Get Interview-Ready in Just 7 Days
                  </span>
                </div>
                
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-yt-primary">
                    You'll Get 3 Courses in 1 Bootcamp (Book Included):
                  </span>
                </div>
              </div>
              
              {/* Course Details */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3 mb-3">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yt-primary mb-1">
                      350+ Java Interview Q&A
                    </h4>
                    <ul className="text-sm text-yt-secondary space-y-1">
                      <li>• Video Lectures + 🔒 Question List (Excel) + 📄 PDF Book for Revision</li>
                      <li>• Covers: Coding/ OOPS/ Core & Advance Java/ Java 8/ Spring Boot/ MVC/ REST Services</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yt-primary mb-1">
                      Interview Success Kit
                    </h4>
                    <ul className="text-sm text-yt-secondary space-y-1">
                      <li>• 🌐 Java Resume Template + 🏅 HR/MR Q&A + 💰 Salary Negotiation Secrets</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Promo Code */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                <p className="text-sm text-yt-primary">
                  <span className="font-semibold">Use Code:</span> NEVERGIVEUP for 75% Off (Limited Time Only)
                </p>
              </div>
              
              {/* Additional Info */}
              <div className="space-y-2 text-sm text-yt-secondary mb-4">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span>100% Risk-Free: 7-Day Money-Back Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Queries - happy@interviewhappy.com</span>
                </div>
              </div>
              
              {/* Links */}
              <div className="space-y-2 mb-4">
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-yt-blue hover:underline"
                >
                  <Link className="w-4 h-4" />
                  Join Bootcamp or Get Book → https://www.interviewhappy.com/page/j...
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-yt-blue hover:underline"
                >
                  <Link className="w-4 h-4" />
                  Outside India Users → https://www.interviewhappy.com/page/o...
                </a>
              </div>
              
              {/* Original Description */}
              <p className="mt-4 pt-4 border-t border-yt-border">
                {description}
              </p>
            </div>
            
            {/* Gradient fade effect when collapsed (YouTube style) */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-yt-white to-transparent dark:from-yt-gray-bg pointer-events-none" />
            )}
          </div>
          
          {/* Show More/Less Button - YouTube exact style */}
          <button
            onClick={toggleDescription}
            className="mt-2 text-sm font-medium text-yt-secondary hover:text-yt-primary focus:outline-none"
            aria-label={isExpanded ? "Show less" : "Show more"}
          >
            {isExpanded ? 'SHOW LESS' : 'SHOW MORE'}
          </button>
        </div>
        
        {/* Hashtags - YouTube style */}
        <div className="hashtags">
          {description.match(/#\w+/g)?.slice(0, 5).map((tag, index) => (
            <span
              key={index}
              className="hashtag"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}