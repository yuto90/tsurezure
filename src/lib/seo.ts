import { Metadata } from 'next';
import { WordPressPost } from '@/types/wordpress';
import { stripHtml } from './wordpress-api';

interface SEOConfig {
  siteName: string;
  siteUrl: string;
  siteDescription: string;
  defaultImage: string;
  twitterHandle?: string;
}

const defaultConfig: SEOConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'つれづれブログ',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.com',
  siteDescription: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'WordPressをヘッドレスCMSとして使用したNext.jsブログ',
  defaultImage: '/og-image.jpg',
  twitterHandle: '@your_handle',
};

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  config = defaultConfig,
}: {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  config?: Partial<SEOConfig>;
}): Metadata {
  const siteConfig = { ...defaultConfig, ...config };
  const fullTitle = title.includes(siteConfig.siteName) ? title : `${title} | ${siteConfig.siteName}`;
  const fullDescription = description || siteConfig.siteDescription;
  const fullUrl = url ? `${siteConfig.siteUrl}${url}` : siteConfig.siteUrl;
  const fullImage = image ? (image.startsWith('http') ? image : `${siteConfig.siteUrl}${image}`) : `${siteConfig.siteUrl}${siteConfig.defaultImage}`;

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: tags?.join(', '),
    authors: authors?.map(name => ({ name })),
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: siteConfig.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'ja_JP',
      type: type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };

  if (type === 'article' && publishedTime) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors,
      tags,
    };
  }

  return metadata;
}

export function generatePostMetadata(post: WordPressPost): Metadata {
  const title = stripHtml(post.title.rendered);
  const description = stripHtml(post.excerpt.rendered).substring(0, 160);
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const author = post._embedded?.['wp:author']?.[0];
  const tags = (post._embedded?.['wp:term']?.[1] || []) as { name: string }[];

  return generateMetadata({
    title,
    description,
    image: featuredImage,
    url: `/posts/${post.slug}`,
    type: 'article',
    publishedTime: post.date,
    modifiedTime: post.modified,
    authors: author ? [author.name] : undefined,
    tags: tags.map((tag) => tag.name),
  });
}

export function generateCategoryMetadata(categoryName: string, categoryDescription?: string, categorySlug?: string): Metadata {
  return generateMetadata({
    title: categoryName,
    description: categoryDescription || `${categoryName}に関する記事一覧`,
    url: categorySlug ? `/categories/${categorySlug}` : undefined,
  });
}

export function generateTagMetadata(tagName: string, tagDescription?: string, tagSlug?: string): Metadata {
  return generateMetadata({
    title: `#${tagName}`,
    description: tagDescription || `${tagName}に関する記事一覧`,
    url: tagSlug ? `/tags/${tagSlug}` : undefined,
  });
}

export function generateArchiveMetadata(year: string, month?: string): Metadata {
  const title = month ? `${year}年${month}月の記事` : `${year}年の記事`;
  const description = `${title}の一覧です。`;
  
  return generateMetadata({
    title,
    description,
    url: month ? `/archive/${year}/${month}` : `/archive/${year}`,
  });
}