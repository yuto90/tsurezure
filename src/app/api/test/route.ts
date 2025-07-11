import { NextResponse } from 'next/server';
import { wpApi } from '@/lib/wordpress-api';

export async function GET() {
  try {
    // WordPress APIへの接続テスト
    const posts = await wpApi.getPosts({ per_page: 1 });
    
    return NextResponse.json({
      success: true,
      message: 'WordPress API connection successful',
      postsCount: posts.length,
      samplePost: posts[0] ? {
        id: posts[0].id,
        title: posts[0].title.rendered,
        hasEmbedded: !!posts[0]._embedded,
        embeddedStructure: posts[0]._embedded ? Object.keys(posts[0]._embedded) : [],
        wpTermStructure: posts[0]._embedded?.['wp:term'] ? posts[0]._embedded['wp:term'].map((termArray: { id: number; name: string; slug: string }[], index: number) => ({
          index,
          length: termArray?.length || 0,
          sample: termArray?.[0] ? { id: termArray[0].id, name: termArray[0].name, slug: termArray[0].slug } : null
        })) : [],
        categories: posts[0]._embedded?.['wp:term']?.[0]?.length || 0,
        tags: posts[0]._embedded?.['wp:term']?.[1]?.length || 0,
      } : null,
    });
  } catch (error) {
    console.error('WordPress API Error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'WordPress API connection failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}