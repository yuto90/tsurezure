import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';
import { wpApi, formatDate, stripHtml } from '@/lib/wordpress-api';
import { WordPressPost } from '@/types/wordpress';
import BlogHeader from '@/components/BlogHeader';
import BlogSidebar from '@/components/BlogSidebar';
import { Suspense } from 'react';

interface PostPageProps {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<WordPressPost | null> {
  try {
    const post = await wpApi.getPostBySlug(slug);
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug);
  
  if (!post) {
    return {
      title: '記事が見つかりません',
      description: '指定された記事は存在しません。',
    };
  }

  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).substring(0, 160);
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return {
    title: `${title} | つれづれブログ`,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.modified,
      authors: [post._embedded?.['wp:author']?.[0]?.name || 'Unknown'],
      images: featuredImage ? [{ url: featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const categories = post._embedded?.['wp:term']?.[0] || [];
  const tags = post._embedded?.['wp:term']?.[1] || [];
  const author = post._embedded?.['wp:author']?.[0];
  const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <BlogHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
{featuredMedia && (
                <div className="aspect-video relative overflow-hidden">
                  <SafeImage
                    src={featuredMedia.source_url}
                    alt={stripHtml(post.title.rendered)}
                    fill
                    className="object-cover"
                    priority
                    fallback="/placeholder.svg"
                  />
                </div>
              )}
              
              <div className="p-8">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <time dateTime={post.date} className="font-medium">
                    {formatDate(post.date)}
                  </time>
                  
                  {author && (
                    <>
                      <span>•</span>
                      <div className="flex items-center space-x-2">
                        <SafeImage
                          src={author.avatar_urls?.['48'] || '/default-avatar.svg'}
                          alt={author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                          fallback="/default-avatar.svg"
                        />
                        <span>{author.name}</span>
                      </div>
                    </>
                  )}
                  
                  {categories.length > 0 && (
                    <>
                      <span>•</span>
                      <div className="flex flex-wrap gap-1">
                        {categories.slice(0, 3).map((category: { id: number; name: string; slug: string }) => (
                          <Link
                            key={category.id}
                            href={`/categories/${category.slug}`}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </h1>

                <div 
                  className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-white prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-blockquote:border-blue-500 prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300"
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />

                {tags.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">タグ</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag: { id: number; name: string; slug: string }) => (
                        <Link
                          key={tag.id}
                          href={`/tags/${tag.slug}`}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        >
                          #{tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      投稿日: {formatDate(post.date)}
                      {post.modified !== post.date && (
                        <span className="ml-4">
                          最終更新: {formatDate(post.modified)}
                        </span>
                      )}
                    </p>
                    
                    <div className="flex space-x-4">
                      <button className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <nav className="mt-8 flex justify-between">
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="mr-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                記事一覧に戻る
              </Link>
            </nav>
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