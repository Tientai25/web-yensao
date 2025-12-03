// API Client for Backend Integration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      headers,
      credentials: 'include', // Send cookies with request
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return apiCall(`/products/${id}`);
  },

  create: async (productData) => {
    return apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  update: async (id, productData) => {
    return apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  },

  delete: async (id) => {
    return apiCall(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersAPI = {
  create: async (orderData) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  getById: async (id) => {
    return apiCall(`/orders/${id}`);
  },

  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/orders${queryString ? `?${queryString}` : ''}`);
  },

  updateStatus: async (id, status) => {
    return apiCall(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Contact API
export const contactAPI = {
  send: async (contactData) => {
    return apiCall('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

// Coupons API
export const couponsAPI = {
  validate: async (code) => {
    return apiCall(`/coupons/${code}`);
  },

  getAll: async () => {
    return apiCall('/coupons');
  },
};

// Upload API
export const uploadAPI = {
  single: async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/upload/single`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Upload failed');
    }
    return data;
  },

  multiple: async (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    const response = await fetch(`${API_URL}/upload/multiple`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Upload failed');
    }
    return data;
  },

  delete: async (filename) => {
    return apiCall(`/upload/${filename}`, {
      method: 'DELETE',
    });
  },
};

// Auth API
export const authAPI = {
  register: async (email, password, name) => {
    return apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
  },

  login: async (email, password) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  logout: async () => {
    return apiCall('/auth/logout', {
      method: 'POST',
    });
  },

  getMe: async () => {
    return apiCall('/auth/me');
  },
};

// FAQs API
export const faqsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/faqs${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return apiCall(`/faqs/${id}`);
  },

  getCategories: async () => {
    return apiCall('/faqs/categories');
  },

  create: async (faqData) => {
    return apiCall('/faqs', {
      method: 'POST',
      body: JSON.stringify(faqData),
    });
  },

  update: async (id, faqData) => {
    return apiCall(`/faqs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(faqData),
    });
  },

  delete: async (id) => {
    return apiCall(`/faqs/${id}`, {
      method: 'DELETE',
    });
  },
};

// Health check
export const healthCheck = async () => {
  return apiCall('/health');
};

