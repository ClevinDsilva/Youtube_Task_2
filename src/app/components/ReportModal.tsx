'use client';

import { useState } from 'react';
import { X, AlertTriangle, Shield, HelpCircle } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoTitle: string;
}

export default function ReportModal({ isOpen, onClose, videoTitle }: ReportModalProps) {
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [step, setStep] = useState<'type' | 'details' | 'confirmation'>('type');
  const [additionalDetails, setAdditionalDetails] = useState('');

  if (!isOpen) return null;

  const reportOptions = [
    {
      id: 'sexual',
      label: 'Sexual content',
      description: 'Nudity, pornography, or sexual content involving minors'
    },
    {
      id: 'violent',
      label: 'Violent or repulsive content',
      description: 'Graphic violence, gore, or shocking content'
    },
    {
      id: 'hateful',
      label: 'Hateful or abusive content',
      description: 'Promotes hatred, violence, or discrimination'
    },
    {
      id: 'harassment',
      label: 'Harassment or bullying',
      description: 'Targeted harassment, threats, or cyberbullying'
    },
    {
      id: 'harmful',
      label: 'Harmful or dangerous acts',
      description: 'Dangerous challenges, self-harm, or illegal activities'
    },
    {
      id: 'copyright',
      label: 'Copyright infringement',
      description: 'Unauthorized use of copyrighted material'
    },
    {
      id: 'spam',
      label: 'Spam or misleading',
      description: 'Misleading metadata, scams, or repetitive content'
    },
    {
      id: 'privacy',
      label: 'Privacy violation',
      description: 'Personal information or privacy invasion'
    }
  ];

  const handleCheckboxChange = (issueId: string) => {
    setSelectedIssues(prev =>
      prev.includes(issueId)
        ? prev.filter(id => id !== issueId)
        : [...prev, issueId]
    );
  };

  const handleSubmit = () => {
    console.log('Report submitted:', { selectedIssues, additionalDetails });
    setStep('confirmation');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Report</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Step 1: Type Selection */}
        {step === 'type' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                What's going on?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                We'll check for all Community Guidelines, so don't worry about making the perfect choice.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                      Your report is anonymous. If someone is in immediate danger, call local emergency services.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Options Grid */}
            <div className="space-y-3 mb-8">
              {reportOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-start p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedIssues.includes(option.id)
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => handleCheckboxChange(option.id)}
                >
                  <input
                    type="checkbox"
                    id={option.id}
                    checked={selectedIssues.includes(option.id)}
                    onChange={() => handleCheckboxChange(option.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <label htmlFor={option.id} className="ml-3 flex-1 cursor-pointer">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {option.description}
                    </div>
                  </label>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('details')}
                disabled={selectedIssues.length === 0}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedIssues.length === 0
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Additional Details */}
        {step === 'details' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Additional details
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Please provide any additional information that might help us understand the issue.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tell us more (optional)
              </label>
              <textarea
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Include timestamps, specific concerns, or any other relevant information..."
              />
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {additionalDetails.length}/1000 characters
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    We review content based on our Community Guidelines. Your report will be processed within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-between gap-3">
              <button
                onClick={() => setStep('type')}
                className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              >
                Back
              </button>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 'confirmation' && (
          <div className="p-6 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Report Submitted
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Thank you for helping us keep YouTube safe. We've received your report and will review it soon.
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 rounded-lg font-medium transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}