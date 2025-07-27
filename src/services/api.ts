const API_BASE_URL = '/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
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
}

export const apiService = new ApiService();
export default apiService;
