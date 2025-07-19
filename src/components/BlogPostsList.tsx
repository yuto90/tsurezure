import { wpApi, formatDate, getExcerpt } from '@/lib/wordpress-api';
import { WordPressPost } from '@/types/wordpress';
import Link from 'next/link';
import SafeImage from '@/components/SafeImage';

interface BlogPostsListProps {
  page?: number;
  category?: number;
  tag?: number;
  search?: string;
}

export default async function BlogPostsList({
  page = 1,
  category,
  tag,
  search
}: BlogPostsListProps) {
  try {
    const posts = await wpApi.getPosts({
      page,
      per_page: 10,
      categories: category ? [category] : undefined,
      tags: tag ? [tag] : undefined,
      search,
      orderby: 'date',
      order: 'desc',
      status: 'publish',
    });

    if (!posts || posts.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">記事が見つかりませんでした。</p>
        </div>
      );
    }

    return (
      <div className="space-y-12">
        {posts.map((post: WordPressPost) => (
          <article key={post.id} className="group border-b border-gray-200 dark:border-gray-800 pb-12 last:border-b-0 last:pb-0">
            {post.featured_media && post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-6 bg-gray-100 dark:bg-gray-800">
                <SafeImage
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  fallback="/placeholder.svg"
                />
              </div>
            ) : (
              <div className="aspect-[16/9] relative overflow-hidden rounded-lg mb-6 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.date} className="font-mono">
                  {formatDate(post.date)}
                </time>

                {post._embedded?.['wp:term']?.[0] && post._embedded['wp:term'][0].length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span>•</span>
                    <div className="flex flex-wrap gap-2">
                      {post._embedded['wp:term'][0].slice(0, 3).map((category: { id: number; name: string; slug: string }) => (
                        <Link
                          key={category.id}
                          href={`/categories/${category.slug}`}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                <Link href={`/posts/${post.slug}`} className="block">
                  <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </Link>
              </h2>

              <div className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                <span dangerouslySetInnerHTML={{ __html: getExcerpt(post.excerpt.rendered, 200) }} />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href={`/posts/${post.slug}`}
                  className="inline-flex items-center text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 font-medium transition-colors group"
                >
                  続きを読む
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>

                {post._embedded?.['wp:term']?.[1] && (
                  <div className="flex flex-wrap gap-2">
                    {post._embedded['wp:term'][1].slice(0, 3).map((tag: { id: number; name: string; slug: string }) => (
                      <Link
                        key={tag.id}
                        href={`/tags/${tag.slug}`}
                        className="px-2 py-1 text-gray-500 dark:text-gray-400 rounded text-xs font-mono hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                      >
                        #{tag.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}

        <div className="flex justify-center pt-12">
          <nav className="flex items-center space-x-4">
            {page > 1 && (
              <Link
                href={`/?page=${page - 1}`}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                ← 前へ
              </Link>
            )}

            <span className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md">
              {page}
            </span>

            <Link
              href={`/?page=${page + 1}`}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              次へ →
            </Link>
          </nav>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <div className="text-center py-12">
        <p className="text-red-500 dark:text-red-400 text-lg">記事の取得に失敗しました。</p>
      </div>
    );
  }
}