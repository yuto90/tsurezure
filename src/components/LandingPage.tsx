import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <section className="pt-20 pb-16 text-center">
        <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4">Tsurezure Blog</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">ゆるく学び、つながるブログへようこそ。</p>
        <div className="flex justify-center space-x-4">
          <Link href="/posts" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            記事一覧を見る
          </Link>
          <Link href="/about" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 transition">
            私について
          </Link>
        </div>
      </section>
      <section className="max-w-5xl mx-auto py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">多彩な記事</h3>
          <p className="text-gray-600 dark:text-gray-300">技術からライフスタイルまで幅広くカバー。</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">コミュニティ</h3>
          <p className="text-gray-600 dark:text-gray-300">コメントやSNSで気軽に交流。</p>
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-2">更新頻度</h3>
          <p className="text-gray-600 dark:text-gray-300">定期的に新しいコンテンツを投稿。</p>
        </div>
      </section>
    </div>
  );
}
