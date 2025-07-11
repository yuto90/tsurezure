import { WordPressPost, WordPressCategory, WordPressTag } from '@/types/wordpress';
import { stripHtml } from '@/lib/wordpress-api';

interface StructuredDataProps {
  type: 'WebSite' | 'BlogPosting' | 'CollectionPage';
  post?: WordPressPost;
  categories?: WordPressCategory[];
  tags?: WordPressTag[];
}

export default function StructuredData({ type, post, categories, tags }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com';
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'つれづれブログ';

  const generateWebSiteData = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: '徒然なるままに、日暮らし硯に向かひて、心に移り行くよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ。',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      url: siteUrl,
    },
  });

  const generateBlogPostingData = () => {
    if (!post) return null;

    const author = post._embedded?.['wp:author']?.[0];
    const featuredMedia = post._embedded?.['wp:featuredmedia']?.[0];
    const postCategories = (post._embedded?.['wp:term']?.[0] || []) as { name: string }[];
    const postTags = (post._embedded?.['wp:term']?.[1] || []) as { name: string }[];

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: stripHtml(post.title.rendered),
      description: stripHtml(post.excerpt.rendered),
      image: featuredMedia?.source_url ? [featuredMedia.source_url] : [],
      datePublished: post.date,
      dateModified: post.modified,
      author: {
        '@type': 'Person',
        name: author?.name || 'Unknown',
        url: author?.link,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        url: siteUrl,
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}/posts/${post.slug}`,
      },
      url: `${siteUrl}/posts/${post.slug}`,
      articleSection: postCategories.map((cat) => cat.name),
      keywords: postTags.map((tag) => tag.name).join(', '),
      wordCount: stripHtml(post.content.rendered).split(/\s+/).length,
      articleBody: stripHtml(post.content.rendered),
    };
  };

  const generateCollectionPageData = () => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${categories ? 'カテゴリ' : tags ? 'タグ' : 'ブログ記事'}一覧`,
    url: siteUrl,
    description: `${siteName}の記事一覧ページです。`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categories?.length || tags?.length || 0,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: siteName,
      url: siteUrl,
    },
  });

  let structuredData;
  switch (type) {
    case 'WebSite':
      structuredData = generateWebSiteData();
      break;
    case 'BlogPosting':
      structuredData = generateBlogPostingData();
      break;
    case 'CollectionPage':
      structuredData = generateCollectionPageData();
      break;
    default:
      return null;
  }

  if (!structuredData) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}