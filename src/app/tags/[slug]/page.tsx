import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { wpApi } from '@/lib/wordpress-api';
import { WordPressTag } from '@/types/wordpress';
import BlogHeader from '@/components/BlogHeader';
import BlogSidebar from '@/components/BlogSidebar';
import BlogPostsList from '@/components/BlogPostsList';

interface TagPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

async function getTag(slug: string): Promise<WordPressTag | null> {
  try {
    const tags = await wpApi.getTags({ slug });
    return tags.length > 0 ? tags[0] : null;
  } catch (error) {
    console.error('Error fetching tag:', error);
    return null;
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = await getTag(params.slug);
  
  if (!tag) {
    return {
      title: 'タグが見つかりません',
      description: '指定されたタグは存在しません。',
    };
  }

  return {
    title: `#${tag.name} | つれづれブログ`,
    description: tag.description || `${tag.name}に関する記事一覧`,
    openGraph: {
      title: `#${tag.name} | つれづれブログ`,
      description: tag.description || `${tag.name}に関する記事一覧`,
      type: 'website',
    },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const tag = await getTag(params.slug);
  const currentPage = parseInt(searchParams.page || '1');

  if (!tag) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <BlogHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-gray-500 dark:text-gray-400 text-2xl">#</span>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {tag.name}
            </h1>
          </div>
          {tag.description && (
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {tag.description}
            </p>
          )}
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{tag.count}件の記事</span>
            <span>•</span>
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2">
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
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <span className="text-gray-900 dark:text-white">#{tag.name}</span>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3">
            <Suspense fallback={
              <div className="space-y-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 w-full"></div>
                    <div className="mt-4 space-y-2">
                      <div className="bg-gray-200 dark:bg-gray-700 rounded h-6 w-3/4"></div>
                      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-full"></div>
                      <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            }>
              <BlogPostsList tag={tag.id} page={currentPage} />
            </Suspense>
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