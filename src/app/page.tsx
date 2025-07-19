import { Suspense } from 'react';
import BlogPostsList from '@/components/BlogPostsList';
import BlogHeader from '@/components/BlogHeader';
import BlogSidebar from '@/components/BlogSidebar';
import { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <BlogHeader />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <main className="lg:col-span-3">
            <ErrorBoundary>
              <Suspense fallback={
                <div className="space-y-12">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg h-48 w-full mb-6"></div>
                      <div className="space-y-3">
                        <div className="bg-gray-200 dark:bg-gray-800 rounded h-6 w-3/4"></div>
                        <div className="bg-gray-200 dark:bg-gray-800 rounded h-4 w-full"></div>
                        <div className="bg-gray-200 dark:bg-gray-800 rounded h-4 w-2/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              }>
                <BlogPostsList />
              </Suspense>
            </ErrorBoundary>
          </main>

          <aside className="lg:col-span-1">
            <Suspense fallback={
              <div className="space-y-8">
                <div className="animate-pulse border border-gray-200 dark:border-gray-800 p-6">
                  <div className="bg-gray-200 dark:bg-gray-800 rounded h-6 w-24 mb-4"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="bg-gray-200 dark:bg-gray-800 rounded h-4 w-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            }>
              <BlogSidebar />
            </Suspense>
          </aside>
        </div>
      </div>
    </div>
  );
}
