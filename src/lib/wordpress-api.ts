import { 
  WordPressPost, 
  WordPressCategory, 
  WordPressTag, 
  WordPressMedia, 
  WordPressAuthor 
} from '@/types/wordpress';

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'https://your-wordpress-site.com/wp-json/wp/v2';

class WordPressAPI {
  private baseUrl: string;

  constructor(baseUrl: string = WP_API_URL) {
    this.baseUrl = baseUrl;
  }

  private async fetchFromWP<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`WordPress API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getPosts(params?: {
    page?: number;
    per_page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
    orderby?: 'date' | 'id' | 'title' | 'slug' | 'modified';
    order?: 'asc' | 'desc';
    status?: 'publish' | 'future' | 'draft' | 'pending' | 'private';
    sticky?: boolean;
    author?: number;
    exclude?: number[];
    include?: number[];
    offset?: number;
    slug?: string;
    after?: string;
    before?: string;
    modified_after?: string;
    modified_before?: string;
  }): Promise<WordPressPost[]> {
    const processedParams = {
      ...params,
      _embed: true,
    };

    if (params?.categories && params.categories.length > 0) {
      processedParams.categories = params.categories.join(',');
    }

    if (params?.tags && params.tags.length > 0) {
      processedParams.tags = params.tags.join(',');
    }

    return this.fetchFromWP<WordPressPost[]>('/posts', processedParams);
  }

  async getPost(id: number): Promise<WordPressPost> {
    return this.fetchFromWP<WordPressPost>(`/posts/${id}`, { _embed: true });
  }

  async getPostBySlug(slug: string): Promise<WordPressPost> {
    const posts = await this.fetchFromWP<WordPressPost[]>('/posts', {
      slug,
      _embed: true,
    });

    if (posts.length === 0) {
      throw new Error(`Post with slug '${slug}' not found`);
    }

    return posts[0];
  }

  async getCategories(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: 'asc' | 'desc';
    orderby?: 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count';
    hide_empty?: boolean;
    parent?: number;
    post?: number;
    slug?: string;
  }): Promise<WordPressCategory[]> {
    return this.fetchFromWP<WordPressCategory[]>('/categories', params);
  }

  async getCategory(id: number): Promise<WordPressCategory> {
    return this.fetchFromWP<WordPressCategory>(`/categories/${id}`);
  }

  async getTags(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: 'asc' | 'desc';
    orderby?: 'id' | 'include' | 'name' | 'slug' | 'term_group' | 'description' | 'count';
    hide_empty?: boolean;
    post?: number;
    slug?: string;
  }): Promise<WordPressTag[]> {
    return this.fetchFromWP<WordPressTag[]>('/tags', params);
  }

  async getTag(id: number): Promise<WordPressTag> {
    return this.fetchFromWP<WordPressTag>(`/tags/${id}`);
  }

  async getMedia(id: number): Promise<WordPressMedia> {
    return this.fetchFromWP<WordPressMedia>(`/media/${id}`);
  }

  async getAuthor(id: number): Promise<WordPressAuthor> {
    return this.fetchFromWP<WordPressAuthor>(`/users/${id}`);
  }

  async getAuthors(params?: {
    page?: number;
    per_page?: number;
    search?: string;
    exclude?: number[];
    include?: number[];
    order?: 'asc' | 'desc';
    orderby?: 'id' | 'include' | 'name' | 'registered_date' | 'slug' | 'email' | 'url';
    slug?: string;
    roles?: string[];
  }): Promise<WordPressAuthor[]> {
    return this.fetchFromWP<WordPressAuthor[]>('/users', params);
  }

  async searchPosts(query: string, params?: {
    page?: number;
    per_page?: number;
    categories?: number[];
    tags?: number[];
    orderby?: 'date' | 'id' | 'title' | 'slug' | 'modified' | 'relevance';
    order?: 'asc' | 'desc';
  }): Promise<WordPressPost[]> {
    return this.getPosts({
      search: query,
      ...params,
    });
  }

  async getPostsByCategory(categoryId: number, params?: {
    page?: number;
    per_page?: number;
    orderby?: 'date' | 'id' | 'title' | 'slug' | 'modified';
    order?: 'asc' | 'desc';
  }): Promise<WordPressPost[]> {
    return this.getPosts({
      categories: [categoryId],
      ...params,
    });
  }

  async getPostsByTag(tagId: number, params?: {
    page?: number;
    per_page?: number;
    orderby?: 'date' | 'id' | 'title' | 'slug' | 'modified';
    order?: 'asc' | 'desc';
  }): Promise<WordPressPost[]> {
    return this.getPosts({
      tags: [tagId],
      ...params,
    });
  }

  async getPostsByAuthor(authorId: number, params?: {
    page?: number;
    per_page?: number;
    orderby?: 'date' | 'id' | 'title' | 'slug' | 'modified';
    order?: 'asc' | 'desc';
  }): Promise<WordPressPost[]> {
    return this.getPosts({
      author: authorId,
      ...params,
    });
  }

  async getRecentPosts(count: number = 5): Promise<WordPressPost[]> {
    return this.getPosts({
      per_page: count,
      orderby: 'date',
      order: 'desc',
      status: 'publish',
    });
  }

  async getStickyPosts(): Promise<WordPressPost[]> {
    return this.getPosts({
      sticky: true,
      status: 'publish',
    });
  }
}

export const wpApi = new WordPressAPI();
export default wpApi;

export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getExcerpt = (content: string, length: number = 160): string => {
  const stripped = stripHtml(content);
  return stripped.length > length ? stripped.substring(0, length) + '...' : stripped;
};