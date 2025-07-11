import { Metadata } from 'next';
import Link from 'next/link';
import BlogHeader from '@/components/BlogHeader';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'プロフィール',
  description: '20代のソフトウェアエンジニアのプロフィールページです。東京のWeb開発企業で働いています。',
  url: '/profile',
});

export default function ProfilePage() {
  const skills = [
    { category: 'Languages', items: ['TypeScript', 'Python', 'Dart', 'JavaScript', 'Go'] },
    { category: 'Frontend', items: ['Next.js', 'React', 'Vue.js', 'Flutter', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Django', 'FastAPI', 'Node.js', 'Express'] },
    { category: 'Infrastructure', items: ['AWS', 'GCP', 'Firebase', 'Docker', 'Linux'] },
    { category: 'Tools', items: ['NeoVim', 'Git', 'Figma', 'Notion'] },
  ];

  const experience = [
    {
      period: '2022年 - 現在',
      role: 'ソフトウェアエンジニア',
      company: 'Web開発企業（東京）',
      description: 'フルスタック開発、Webセキュリティ対策、脆弱性診断などを担当',
    },
    {
      period: '2020年 - 2022年',
      role: 'フロントエンドエンジニア',
      company: 'スタートアップ企業',
      description: 'React/Vue.jsを用いたWebアプリケーション開発',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <BlogHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-12">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 mb-12">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  Y
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  yuto
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  ソフトウェアエンジニア
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  東京のWeb開発企業で働く20代のソフトウェアエンジニアです。<br />
                  Webセキュリティや脆弱性に興味があり、フルスタック開発を得意としています。<br />
                  このブログでは技術的な学びや経験を徒然なるままに綴っています。
                </p>
                
                <div className="mt-6 flex space-x-4">
                  <Link
                    href="https://twitter.com/your_handle"
                    className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </Link>
                  
                  <Link
                    href="https://github.com/your_handle"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  スキル
                </h2>
                <div className="space-y-6">
                  {skills.map((skillCategory) => (
                    <div key={skillCategory.category}>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {skillCategory.category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {skillCategory.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  経歴
                </h2>
                <div className="space-y-6">
                  {experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-teal-500 pl-6">
                      <div className="text-sm text-teal-600 dark:text-teal-400 font-medium mb-1">
                        {exp.period}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {exp.role}
                      </h3>
                      <div className="text-gray-600 dark:text-gray-400 mb-2">
                        {exp.company}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    興味・関心
                  </h2>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex items-start space-x-3">
                      <span className="text-teal-500 mt-1">•</span>
                      <span>Webセキュリティと脆弱性診断</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-teal-500 mt-1">•</span>
                      <span>モダンなフロントエンド開発</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-teal-500 mt-1">•</span>
                      <span>クラウドインフラ設計</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <span className="text-teal-500 mt-1">•</span>
                      <span>開発者体験の向上</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  お気軽にご連絡ください
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  技術的な質問や共同プロジェクトのお話など、お気軽にお声がけください。
                </p>
                <Link
                  href="mailto:your-email@example.com"
                  className="inline-flex items-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z"/>
                  </svg>
                  メールを送る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}