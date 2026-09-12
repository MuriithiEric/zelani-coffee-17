const isLocalhost =
  typeof window === 'undefined' ||
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.endsWith('.localhost');

const API_BASE_URL = isLocalhost
  ? (import.meta.env.VITE_API_URL || 'http://localhost:8000/api')
  : (import.meta.env.VITE_API_URL && !import.meta.env.VITE_API_URL.includes('localhost')
      ? import.meta.env.VITE_API_URL
      : 'https://api.zelanicoffee.com/api');

class ApiClient {
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    const token = localStorage.getItem('zelani_access_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
      ...this.getHeaders(),
      ...options.headers,
    };

    // If uploading files, we let the browser set the boundary headers automatically
    if (options.body instanceof FormData) {
      delete (headers as any)['Content-Type'];
    }

    let response: Response;
    try {
      response = await fetch(url, {
        ...options,
        headers,
      });
    } catch (networkError: any) {
      throw new Error('Connection refused or network error. Please ensure the Django backend is running.');
    }

    let data: any;
    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      try {
        data = await response.json();
      } catch (parseError) {
        data = null;
      }
    } else {
      // Non-JSON response (e.g. HTML error page from server)
      const text = await response.text().catch(() => '');
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}: ${text.slice(0, 100) || 'Internal Server Error'}`);
      }
      data = text;
    }

    if (!response.ok) {
      let errorMessage = 'API request failed';
      if (data && typeof data === 'object') {
        if (data.detail) {
          errorMessage = data.detail;
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.non_field_errors) {
          errorMessage = Array.isArray(data.non_field_errors) ? data.non_field_errors.join(', ') : data.non_field_errors;
        } else {
          // Gather field-specific validation errors from Django serializer errors
          const errors: string[] = [];
          for (const key of Object.keys(data)) {
            const val = data[key];
            if (Array.isArray(val)) {
              errors.push(`${key}: ${val.join(', ')}`);
            } else if (typeof val === 'string') {
              errors.push(`${key}: ${val}`);
            }
          }
          if (errors.length > 0) {
            errorMessage = errors.join(' | ');
          }
        }
      }
      throw new Error(errorMessage);
    }

    return data as T;
  }

  public auth = {
    register: async (email: string, passwordHash: string, name?: string) => {
      let firstName = '';
      let lastName = '';
      if (name) {
        const parts = name.trim().split(/\s+/);
        firstName = parts[0] || '';
        lastName = parts.slice(1).join(' ') || '';
      }

      const result = await this.request<any>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, passwordHash, firstName, lastName }),
      });
      this.saveSession(result);
      return result;
    },

    login: async (email: string, passwordHash: string) => {
      const result = await this.request<any>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, passwordHash }),
      });
      this.saveSession(result);
      return result;
    },

    logout: () => {
      localStorage.removeItem('zelani_access_token');
      localStorage.removeItem('zelani_refresh_token');
      localStorage.removeItem('zelani_user');
      window.dispatchEvent(new Event('zelani-auth-change'));
    },

    me: async () => {
      try {
        const user = await this.request<any>('/users/me');
        localStorage.setItem('zelani_user', JSON.stringify(user));
        return user;
      } catch (error) {
        this.auth.logout();
        throw error;
      }
    },
  };

  public users = {
    getAll: async () => {
      return this.request<any[]>('/users');
    },
    updateRole: async (id: string, role: string) => {
      return this.request<any>(`/users/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ role }),
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/users/${id}`, {
        method: 'DELETE',
      });
    },
  };

  public orders = {
    create: async (orderData: any) => {
      return this.request<any>('/orders', {
        method: 'POST',
        body: JSON.stringify(orderData),
      });
    },

    getByReference: async (ref: string) => {
      const data = await this.request<any>(`/orders/reference/${ref}`);
      return this.mapOrder(data);
    },

    getMyOrders: async () => {
      const list = await this.request<any[]>('/orders/my-orders');
      return list.map(o => this.mapOrder(o));
    },

    getAll: async () => {
      const list = await this.request<any[]>('/orders');
      return list.map(o => this.mapOrder(o));
    },

    updateStatus: async (id: string, paymentStatus: string) => {
      return this.request<any>(`/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ payment_status: paymentStatus }),
      });
    },
  };

  private mapOrder(o: any) {
    if (!o) return o;
    return {
      id: o.id,
      order_reference: o.orderReference,
      total_amount: Number(o.totalAmount),
      currency: o.currency,
      payment_status: o.paymentStatus,
      intasend_tracking_id: o.intasendTrackingId,
      customer_email: o.customerEmail,
      customer_phone: o.customerPhone,
      created_at: o.createdAt,
      updated_at: o.updatedAt,
      order_items: (o.orderItems || []).map((item: any) => ({
        id: item.id,
        order_id: item.orderId,
        product_id: item.productId,
        product_name: item.productName,
        quantity: item.quantity,
        unit_price: Number(item.unitPrice),
        grind: item.grind,
        size: item.size,
        created_at: item.createdAt,
      })),
    };
  }

  public products = {
    getAll: async () => {
      return this.request<any[]>('/products');
    },
    create: async (data: any) => {
      return this.request<any>('/products', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    update: async (id: string, data: any) => {
      return this.request<any>(`/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },
    delete: async (id: string) => {
      return this.request<any>(`/products/${id}`, {
        method: 'DELETE',
      });
    },
  };

  public payments = {
    getAll: async () => {
      const list = await this.request<any[]>('/payments');
      return list.map(p => ({
        id: p.id,
        order_id: p.orderId,
        payment_method: p.paymentMethod,
        amount: Number(p.amount),
        currency: p.currency,
        status: p.status,
        transaction_id: p.transactionId,
        created_at: p.createdAt,
        updated_at: p.updatedAt,
        order: this.mapOrder(p.order),
      }));
    },
    create: async (data: any) => {
      return this.request<any>('/payments', {
        method: 'POST',
        body: JSON.stringify({
          orderId: data.order_id,
          paymentMethod: data.payment_method,
          amount: data.amount,
          currency: data.currency,
          status: data.status,
          transactionId: data.transaction_id,
        }),
      });
    },
    initiate: async (data: { orderId: string; paymentMethod: string; amount: number; currency: string; phoneNumber?: string }) => {
      return this.request<any>('/payments/initiate', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
  };

  public cart = {
    get: async () => {
      return this.request<any[]>('/cart');
    },
    addOrUpdate: async (productId: string, quantity: number, grind?: string | null, size?: string | null) => {
      return this.request<any>('/cart', {
        method: 'POST',
        body: JSON.stringify({ productId, quantity, grind, size }),
      });
    },
    removeItem: async (productId: string, grind?: string | null, size?: string | null) => {
      let query = `productId=${productId}`;
      if (grind) query += `&grind=${grind}`;
      if (size) query += `&size=${size}`;
      return this.request<any>(`/cart/item?${query}`, {
        method: 'DELETE',
      });
    },
    clear: async () => {
      return this.request<any>('/cart', {
        method: 'DELETE',
      });
    },
  };

  public shipping = {
    track: async (trackingNumber: string) => {
      return this.request<any>('/shipping/track', {
        method: 'POST',
        body: JSON.stringify({ trackingNumber }),
      });
    },
  };

  public files = {
    upload: async (file: File, category = 'general', isPublic = false) => {
      const formData = new FormData();
      formData.append('file', file);
      return this.request<any>(`/files/upload?category=${category}&isPublic=${isPublic}`, {
        method: 'POST',
        body: formData,
      });
    },

    delete: async (id: string) => {
      return this.request<any>(`/files/${id}`, {
        method: 'DELETE',
      });
    },

    getPublicUrl: (id: string) => {
      return `${API_BASE_URL}/files/public/${id}`;
    },

    getPrivateUrl: (id: string) => {
      return `${API_BASE_URL}/files/${id}`;
    },
  };

  private saveSession(result: any) {
    if (result.accessToken) {
      localStorage.setItem('zelani_access_token', result.accessToken);
    }
    if (result.refreshToken) {
      localStorage.setItem('zelani_refresh_token', result.refreshToken);
    }
    if (result.user) {
      localStorage.setItem('zelani_user', JSON.stringify(result.user));
    }
    window.dispatchEvent(new Event('zelani-auth-change'));
  }

  public getSessionUser() {
    const userStr = localStorage.getItem('zelani_user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('zelani_access_token');
  }
}

export const api = new ApiClient();
