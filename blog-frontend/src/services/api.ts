import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://blogapp-strapi.onrender.com/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface Blog {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  blogpublishedAt: string | null;
  seoDescription: string;
  con: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;

  coverImage?: Array<{
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
      thumbnail?: {
        ext: string;
        url: string;
        hash: string;
        mime: string;
        name: string;
        path: string | null;
        size: number;
        width: number;
        height: number;
        sizeInBytes: number;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;

  category?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };

  tags?: Array<{
    id: number;
    documentId: string;
    name: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }>;

  author?: {
    id: number;
    documentId: string;
    name: string;
    bio: Array<{
      type: string;
      children: Array<{
        text: string;
        type: string;
      }>;
    }>;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  comments: Comment[];
}


export interface Comment {
  id?: number,
  documentId?: string,
  userName: string,
  message: string,
  email: string,
  approved?: boolean,
  createdAt?: string,
  updatedAt?: string,
  publishedAt?: string
}

// Auth APIs
export const authApi = {
  login: (data: LoginRequest) => apiClient.post<AuthResponse>('/auth/local', data),
  register: (data: RegisterRequest) => apiClient.post<AuthResponse>('/auth/local/register', data),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Blog APIs
export const blogApi = {
  getBlogs: (params?: any) => 
    apiClient.get<{ data: Blog[] }>('/posts', {
      params: {
        populate: '*',
        ...params,
      },
    }),
  getBlogBySlug: (slug: string) =>
    apiClient.get<{ data: Blog[] }>('/posts', {
      params: {
        filters: { slug: { $eq: slug } },
        populate: '*',
      },
    }),
  getBlogById: (id: number) =>
    apiClient.get<{ data: Blog }>(`/posts/${id}`, {
      params: { populate: '*' },
    }),
};

// Comment APIs
export const commentApi = {
  createComment: (comment: Comment) => apiClient.post('/comments', { data: comment }),
  getCommentsByPost: (postId: number) =>
    apiClient.get('/comments', {
      params: {
        filters: { post: { id: { $eq: postId } } },
        populate: '*',
      },
    }),
};
