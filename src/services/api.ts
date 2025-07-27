const API_BASE_URL = '/api';

// Mock data for development
const mockData = {
  vendors: [
    {
      id: "1", name: "Fresh Valley Wholesalers", rating: 4.8, reviewCount: 156,
      location: "Pune, Maharashtra", phone: "+91 9876543210",
      specialties: ["Vegetables", "Fruits", "Dairy"], priceRange: "Budget",
      deliveryTime: "2-4 hours", trustScore: 95
    },
    {
      id: "2", name: "Spice Garden Suppliers", rating: 4.6, reviewCount: 89,
      location: "Mumbai, Maharashtra", phone: "+91 9765432109",
      specialties: ["Spices", "Grains", "Pulses"], priceRange: "Mid-Range",
      deliveryTime: "4-6 hours", trustScore: 92
    }
  ],
  budgetItems: [
    {
      id: "1", name: "Fresh Tomatoes", wholesaler: "Fresh Valley Wholesalers",
      price: 25, originalPrice: 35, unit: "per kg", category: "Vegetables",
      rating: 4.8, discount: 29, inStock: true, estimatedSavings: 100
    },
    {
      id: "2", name: "Basmati Rice", wholesaler: "Spice Garden Suppliers",
      price: 120, originalPrice: 150, unit: "per 5kg", category: "Grains",
      rating: 4.6, discount: 20, inStock: true, estimatedSavings: 150
    }
  ],
  recentOrders: [
    { id: "1", itemName: "Organic Tomatoes (5kg)", orderCount: 12 },
    { id: "2", itemName: "Fresh Onions (10kg)", orderCount: 8 },
    { id: "3", itemName: "Basmati Rice (25kg)", orderCount: 15 },
    { id: "4", itemName: "Chicken Breast (3kg)", orderCount: 6 }
  ],
  reviews: [
    {
      id: "1", vendorName: "Rajesh Sharma", wholesalerName: "Fresh Valley Wholesalers",
      rating: 5, comment: "Excellent quality vegetables and timely delivery.", 
      date: "2 days ago", orderValue: 2500
    },
    {
      id: "2", vendorName: "Priya Patel", wholesalerName: "Spice Garden Suppliers",
      rating: 4, comment: "Good variety of spices. Overall satisfied.",
      date: "1 week ago", orderValue: 1800
    }
  ]
};

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      // Fallback to mock data for development
      console.log(`API call failed for ${endpoint}, using mock data`);
      return this.getMockData(endpoint) as T;
    }
  }

  private getMockData(endpoint: string): any {
    // Simple endpoint mapping to mock data
    if (endpoint.includes('/vendors')) return { vendors: mockData.vendors };
    if (endpoint.includes('/budget-items')) return { items: mockData.budgetItems };
    if (endpoint.includes('/recent-orders')) return { orders: mockData.recentOrders };
    if (endpoint.includes('/reviews')) return { reviews: mockData.reviews };
    if (endpoint.includes('/categories')) return { categories: [
      { id: "fruits-vegetables", title: "Fruits & Vegetables" },
      { id: "fish-seafood", title: "Fish & Seafood" }
    ]};
    if (endpoint.includes('/inventory')) return { inventory: [
      { id: "1", name: "Fresh Fruits", category: "Produce" },
      { id: "2", name: "Grains & Cereals", category: "Pantry" }
    ]};
    if (endpoint.includes('/pay-later')) return {
      vendorId: "vendor123", totalCreditLimit: 3000, usedCredit: 1200,
      isEnrolled: true, isBlocked: false
    };
    if (endpoint.includes('/health')) return { status: "healthy", timestamp: new Date().toISOString() };
    
    return { success: true, message: "Mock data response" };
  }

  // Vendors
  async getVendors() {
    return this.request('/vendors');
  }

  // Budget Items
  async getBudgetItems(params?: {
    maxBudget?: number;
    category?: string;
    sortBy?: string;
  }) {
    const searchParams = new URLSearchParams();
    if (params?.maxBudget) searchParams.append('maxBudget', params.maxBudget.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
    
    const query = searchParams.toString();
    return this.request(`/budget-items${query ? `?${query}` : ''}`);
  }

  // Recent Orders
  async getRecentOrders() {
    return this.request('/recent-orders');
  }

  // Reviews
  async getReviews() {
    return this.request('/reviews');
  }

  // Categories
  async getCategories() {
    return this.request('/categories');
  }

  // Inventory
  async getInventory() {
    return this.request('/inventory');
  }

  // Pay Later
  async getPayLaterData() {
    return this.request('/pay-later');
  }

  async enrollPayLater(bankDetails: any) {
    return this.request('/pay-later/enroll', {
      method: 'POST',
      body: JSON.stringify({ bankDetails }),
    });
  }

  async repayPayLater(amount: number) {
    return this.request('/pay-later/repay', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    });
  }

  // Food Donations
  async getFoodDonations() {
    return this.request('/food-donations');
  }

  async createFoodDonation(donationData: any) {
    return this.request('/food-donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  // Health Check
  async healthCheck() {
    return this.request('/health');
  }

  // Authentication
  async login(phone: string, password: string, userType: 'vendor' | 'wholesaler') {
    // Mock vendor credentials from database
    const mockVendors = [
      { id: 1, name: 'Raj Patel', phone: '9876543210', password: 'vendor123', location: 'Ghatkopar' },
      { id: 2, name: 'Priya Shah', phone: '9876543211', password: 'vendor123', location: 'Ghatkopar' },
      { id: 3, name: 'Amit Kumar', phone: '9876543212', password: 'vendor123', location: 'Andheri' },
      { id: 4, name: 'Sunita Devi', phone: '9876543213', password: 'vendor123', location: 'Andheri' },
      { id: 5, name: 'Ravi Singh', phone: '9876543214', password: 'vendor123', location: 'Bandra' },
    ];

    // Mock wholesaler credentials from database
    const mockWholesalers = [
      { id: 1, name: 'Mumbai Fresh Mart', phone: '9999999999', password: 'password123', shop_name: 'Fresh Mart Wholesale' },
      { id: 2, name: 'Gupta Fresh Veggies', phone: '9000000001', password: 'gupta123', shop_name: 'Gupta Fresh Vegetable Market' },
      { id: 3, name: 'Sharma Masala Bhandar', phone: '9000000002', password: 'sharma123', shop_name: 'Sharma Spice Wholesale' },
    ];

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone,
          password,
          user_type: userType,
        }),
      });

      if (response.ok) {
        const text = await response.text();
        if (text) {
          try {
            const data = JSON.parse(text);
            if (data.success) {
              console.log('Backend login successful');
              return data;
            }
          } catch (parseError) {
            console.log('Failed to parse backend response, falling back to mock');
          }
        }
      } else {
        console.log(`Backend responded with ${response.status}, falling back to mock authentication`);
      }

      // If backend fails or returns error, fall through to mock authentication
    } catch (error) {
      // Backend unavailable, use mock authentication
      console.log('Backend unavailable, using mock authentication:', error);
    }

    // Mock authentication (always runs when backend is unavailable)
    console.log('Using mock authentication for:', userType, phone);
    console.log('Available mock vendors:', mockVendors.map(v => ({ phone: v.phone, name: v.name })));

    if (userType === 'vendor') {
      console.log('Looking for vendor with phone:', phone, 'password:', password);
      const vendor = mockVendors.find(v => v.phone === phone && v.password === password);
      console.log('Found vendor:', vendor);
      if (vendor) {
        console.log('Mock vendor login successful for:', vendor.name);
        return {
          success: true,
          user: {
            id: vendor.id,
            name: vendor.name,
            type: 'vendor',
            phone: vendor.phone,
            location: vendor.location
          }
        };
      } else {
        console.log('Vendor not found in mock data');
      }
    }

    if (userType === 'wholesaler') {
      const wholesaler = mockWholesalers.find(w => w.phone === phone && w.password === password);
      if (wholesaler) {
        return {
          success: true,
          user: {
            id: wholesaler.id,
            name: wholesaler.name,
            type: 'wholesaler',
            phone: wholesaler.phone,
            shop_name: wholesaler.shop_name
          }
        };
      }
    }

    return {
      success: false,
      message: 'Invalid credentials'
    };
  }

  async getCurrentUser() {
    try {
      const response = await fetch('/api/user');

      // Check if the response is ok and has content
      if (!response.ok) {
        return { success: false, user: null };
      }

      const text = await response.text();
      if (!text) {
        return { success: false, user: null };
      }

      return JSON.parse(text);
    } catch (error) {
      // No user logged in or backend not available
      console.log('Auth check failed, using mock mode');
      return { success: false, user: null };
    }
  }

  async logout() {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        return { success: true };
      }

      const text = await response.text();
      if (!text) {
        return { success: true };
      }

      return JSON.parse(text);
    } catch (error) {
      return { success: true };
    }
  }
}

export const apiService = new ApiService();
export default apiService;
