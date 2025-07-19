'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';

export default function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: 'ホーム', href: '/' },
    { name: 'プログラミング', href: '/categories/programming' },
    { name: 'インフラ', href: '/categories/infrastructure' },
    { name: '役立ち情報', href: '/categories/useful-info' },
    { name: 'プロフィール', href: '/profile' },
  ];

  return (
    <>
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link 
                href="/" 
                className="text-xl font-semibold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200 tracking-tight"
              >
                徒然なるままに技術
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 bottom-0 h-px bg-gray-900 dark:bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="検索"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="テーマ切り替え"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="メニュー"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="h-5 w-5" />
                ) : (
                  <Bars3Icon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {isSearchOpen && (
            <div className="py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="relative">
                <input
                  type="text"
                  placeholder="記事を検索..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent outline-none transition-all duration-200"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          )}

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}