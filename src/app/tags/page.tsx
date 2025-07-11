import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { wpApi } from '@/lib/wordpress-api';
import { WordPressTag } from '@/types/wordpress';
import BlogHeader from '@/components/BlogHeader';
import BlogSidebar from '@/components/BlogSidebar';

export const metadata: Metadata = {
  title: 'タグ一覧 | つれづれブログ',
  description: 'すべてのタグを表示します。',
};

async function getTags(): Promise<WordPressTag[]> {
  try {
    return await wpApi.getTags({
      per_page: 100,
      orderby: 'count',
      order: 'desc',
      hide_empty: true,
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <BlogHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            タグ一覧
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            記事をタグ別に閲覧できます。
          </p>
          <div className="mt-4">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <li>
                  <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <span className="text-gray-900 dark:text-white">タグ</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3">
            {tags.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex flex-wrap gap-3">
                  {tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`/tags/${tag.slug}`}
                      className="group inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-300 rounded-full transition-colors duration-200"
                    >
                      <span className="text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                        #
                      </span>
                      <span className="font-medium">{tag.name}</span>
                      <span className="bg-gray-200 dark:bg-gray-600 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 px-2 py-1 rounded-full text-xs font-medium">
                        {tag.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto max-w-md">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    タグが見つかりません
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    タグが作成されていないか、記事が投稿されていません。
                  </p>
                </div>
              </div>
            )}
          </main>
          
          <aside className="lg:col-span-1">
            <Suspense fallback={
              <div className="space-y-6">
                <div className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded h-6 w-24 mb-4"></div>
                  <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-full"></div>
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