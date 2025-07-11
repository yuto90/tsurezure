import { wpApi } from '@/lib/wordpress-api';
import { WordPressCategory, WordPressTag, WordPressPost } from '@/types/wordpress';
import Link from 'next/link';

export default async function BlogSidebar() {
  try {
    const [categories, tags, recentPosts] = await Promise.all([
      wpApi.getCategories({ per_page: 20, orderby: 'count', order: 'desc' }),
      wpApi.getTags({ per_page: 20, orderby: 'count', order: 'desc' }),
      wpApi.getRecentPosts(5),
    ]);

    return (
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">最新記事</h3>
          <div className="space-y-3">
            {recentPosts.map((post: WordPressPost) => (
              <div key={post.id} className="group">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 line-clamp-2"
                >
                  {post.title.rendered}
                </Link>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(post.date).toLocaleDateString('ja-JP', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">カテゴリー</h3>
          <div className="space-y-2">
            {categories.map((category: WordPressCategory) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <span>{category.name}</span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">タグ</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag: WordPressTag) => (
              <Link
                key={tag.id}
                href={`/tags/${tag.slug}`}
                className="inline-flex items-center px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                #{tag.name}
                <span className="ml-1 text-xs">({tag.count})</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">アーカイブ</h3>
          <div className="space-y-2">
            {Array.from({ length: 12 }, (_, i) => {
              const date = new Date();
              date.setMonth(date.getMonth() - i);
              return (
                <Link
                  key={i}
                  href={`/archive/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`}
                  className="block text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  {date.toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading sidebar:', error);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <p className="text-red-500 dark:text-red-400 text-sm">サイドバーの読み込みに失敗しました。</p>
      </div>
    );
  }
}