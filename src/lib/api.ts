// API Client for Anvi Mercantile B2B Agro-Export Marketplace

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  variety?: string;
  grade?: string;
  description: string;
  originState?: string;
  originCountry: string;
  harvestMonths: string[];
  shelfLifeDays?: number;
  packaging?: string;
  mtPerContainer?: number;
  minOrderMt: number;
  maxAvailableMt?: number;
  pricePerMtUsd: number;
  incoterms: string[];
  portOfLoading?: string;
  leadTimeDays?: number;
  certifications: string[];
  status: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  exporterCompany?: {
    id: string;
    legalName: string;
    tradeName?: string;
    country: string;
    state?: string;
    verificationStatus: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
    logoUrl?: string;
  };
  images?: Array<{ fileKey: string; sortOrder: number }>;
}

export interface CatalogResponse {
  data: CatalogProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  // Attach stored access token if present
  const token = localStorage.getItem('access_token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const errorMsg = body?.error?.message || `API request failed with status ${res.status}`;
    throw new Error(errorMsg);
  }

  return body as T;
}

export const api = {
  // Catalog
  async getCatalog(params: Record<string, any> = {}): Promise<CatalogResponse> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        searchParams.append(k, String(v));
      }
    });
    return apiRequest<CatalogResponse>(`/catalog?${searchParams.toString()}`);
  },

  async getProductBySlug(slug: string): Promise<{ data: CatalogProduct }> {
    return apiRequest<{ data: CatalogProduct }>(`/catalog/products/${slug}`);
  },

  async getCategories(): Promise<{ data: any[] }> {
    return apiRequest<{ data: any[] }>('/catalog/categories');
  },

  async getExporters(): Promise<{ data: any[] }> {
    return apiRequest<{ data: any[] }>('/catalog/exporters');
  },

  async compareProducts(ids: string[]): Promise<{ data: CatalogProduct[] }> {
    return apiRequest<{ data: CatalogProduct[] }>(`/catalog/compare?ids=${ids.join(',')}`);
  },

  // Auth
  async login(credentials: { email: string; password: string }) {
    const res = await apiRequest<{ data: { accessToken: string; user: any; company: any } }>(
      '/auth/login',
      {
        method: 'POST',
        body: JSON.stringify(credentials),
      }
    );
    if (res.data.accessToken) {
      localStorage.setItem('access_token', res.data.accessToken);
    }
    return res.data;
  },

  async register(data: any) {
    const res = await apiRequest<{ data: { accessToken: string; user: any; company: any } }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    if (res.data.accessToken) {
      localStorage.setItem('access_token', res.data.accessToken);
    }
    return res.data;
  },

  async logout() {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('access_token');
    }
  },

  async getMe() {
    return apiRequest<{ data: any }>('/auth/me');
  },
};
