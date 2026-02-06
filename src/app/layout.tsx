'use client';

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sun, Moon } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference or stored preference
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-950`}>
        {/* Theme Toggle Button */}
        {/* <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-lg"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          )}
        </button> */}
        
        {children}
      </body>
    </html>
  );
}