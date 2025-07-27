export interface Product {
  id: string;
  name: string;
  nameHindi: string;
  price: number;
  originalPrice?: number;
  unit: string;
  category: string;
  wholesaler: string;
  image?: string;
  inStock: boolean;
  discount?: number;
  rating: number;
  description: string;
}

export const mockProducts: Product[] = [
  // Vegetables
  {
    id: "1",
    name: "Fresh Tomatoes",
    nameHindi: "टमाटर",
    price: 25,
    originalPrice: 35,
    unit: "per kg",
    category: "Vegetables",
    wholesaler: "Fresh Valley Wholesalers",
    inStock: true,
    discount: 29,
    rating: 4.8,
    description: "Fresh, ripe tomatoes perfect for cooking and salads"
  },
  {
    id: "2",
    name: "Red Onions",
    nameHindi: "प्याज",
    price: 30,
    originalPrice: 40,
    unit: "per kg",
    category: "Vegetables",
    wholesaler: "Gupta Fresh Veggies",
    inStock: true,
    discount: 25,
    rating: 4.6,
    description: "Premium quality red onions, freshly harvested"
  },
  {
    id: "3",
    name: "Fresh Spinach",
    nameHindi: "पालक",
    price: 20,
    unit: "per bunch",
    category: "Vegetables",
    wholesaler: "Fresh Valley Wholesalers",
    inStock: true,
    rating: 4.7,
    description: "Fresh green spinach leaves, rich in iron"
  },
  {
    id: "4",
    name: "Potatoes",
    nameHindi: "आलू",
    price: 18,
    originalPrice: 25,
    unit: "per kg",
    category: "Vegetables",
    wholesaler: "Gupta Fresh Veggies",
    inStock: true,
    discount: 28,
    rating: 4.5,
    description: "High quality potatoes, perfect for all cooking needs"
  },
  {
    id: "5",
    name: "Green Chilies",
    nameHindi: "हरी मिर्च",
    price: 120,
    unit: "per kg",
    category: "Vegetables",
    wholesaler: "Spice Garden Suppliers",
    inStock: true,
    rating: 4.8,
    description: "Fresh green chilies with perfect heat level"
  },

  // Fruits
  {
    id: "6",
    name: "Fresh Bananas",
    nameHindi: "केला",
    price: 40,
    originalPrice: 50,
    unit: "per dozen",
    category: "Fruits",
    wholesaler: "Fresh Valley Wholesalers",
    inStock: true,
    discount: 20,
    rating: 4.6,
    description: "Sweet, ripe bananas perfect for snacking"
  },
  {
    id: "7",
    name: "Red Apples",
    nameHindi: "सेब",
    price: 150,
    originalPrice: 180,
    unit: "per kg",
    category: "Fruits",
    wholesaler: "Premium Fruit Mart",
    inStock: true,
    discount: 17,
    rating: 4.9,
    description: "Crisp, sweet red apples from Kashmir"
  },
  {
    id: "8",
    name: "Sweet Oranges",
    nameHindi: "संतरा",
    price: 80,
    unit: "per kg",
    category: "Fruits",
    wholesaler: "Citrus Fresh Co.",
    inStock: true,
    rating: 4.7,
    description: "Juicy, sweet oranges packed with vitamin C"
  },

  // Grains & Cereals
  {
    id: "9",
    name: "Basmati Rice",
    nameHindi: "बासमती चावल",
    price: 120,
    originalPrice: 150,
    unit: "per 5kg",
    category: "Grains & Cereals",
    wholesaler: "Spice Garden Suppliers",
    inStock: true,
    discount: 20,
    rating: 4.8,
    description: "Premium quality Basmati rice, long grain"
  },
  {
    id: "10",
    name: "Wheat Flour",
    nameHindi: "गेहूं का आटा",
    price: 65,
    unit: "per 5kg",
    category: "Grains & Cereals",
    wholesaler: "Grain Master Ltd",
    inStock: true,
    rating: 4.6,
    description: "Fresh ground wheat flour, perfect for chapatis"
  },

  // Dairy Products
  {
    id: "11",
    name: "Fresh Milk",
    nameHindi: "दूध",
    price: 55,
    unit: "per liter",
    category: "Dairy Products",
    wholesaler: "Dairy Fresh Co.",
    inStock: true,
    rating: 4.8,
    description: "Pure, fresh cow milk delivered daily"
  },
  {
    id: "12",
    name: "Paneer",
    nameHindi: "पनीर",
    price: 320,
    originalPrice: 380,
    unit: "per kg",
    category: "Dairy Products",
    wholesaler: "Dairy Fresh Co.",
    inStock: true,
    discount: 16,
    rating: 4.7,
    description: "Fresh homemade paneer, soft and delicious"
  },

  // Spices & Condiments
  {
    id: "13",
    name: "Turmeric Powder",
    nameHindi: "हल्दी पाउडर",
    price: 180,
    unit: "per kg",
    category: "Spices & Condiments",
    wholesaler: "Spice Garden Suppliers",
    inStock: true,
    rating: 4.9,
    description: "Pure turmeric powder, freshly ground"
  },
  {
    id: "14",
    name: "Red Chili Powder",
    nameHindi: "लाल मिर्च पाउडर",
    price: 200,
    originalPrice: 250,
    unit: "per kg",
    category: "Spices & Condiments",
    wholesaler: "Spice Master Inc",
    inStock: true,
    discount: 20,
    rating: 4.8,
    description: "Premium red chili powder with perfect heat"
  },

  // Fish & Seafood
  {
    id: "15",
    name: "Fresh Pomfret",
    nameHindi: "पापलेट मछली",
    price: 450,
    originalPrice: 500,
    unit: "per kg",
    category: "Fish & Seafood",
    wholesaler: "Ocean Fresh Mart",
    inStock: true,
    discount: 10,
    rating: 4.6,
    description: "Fresh pomfret fish, caught daily"
  },
  {
    id: "16",
    name: "Tiger Prawns",
    nameHindi: "झींगा",
    price: 680,
    unit: "per kg",
    category: "Fish & Seafood",
    wholesaler: "Ocean Fresh Mart",
    inStock: true,
    rating: 4.8,
    description: "Large, fresh tiger prawns perfect for curry"
  }
];

export const categories = [
  { id: "vegetables", name: "Vegetables", nameHindi: "सब्जियां", icon: "🥬" },
  { id: "fruits", name: "Fruits", nameHindi: "फल", icon: "🍎" },
  { id: "grains-cereals", name: "Grains & Cereals", nameHindi: "अनाज", icon: "🌾" },
  { id: "dairy", name: "Dairy Products", nameHindi: "डेयरी ���त्पाद", icon: "🥛" },
  { id: "spices", name: "Spices & Condiments", nameHindi: "मसाले", icon: "🌶️" },
  { id: "fish-seafood", name: "Fish & Seafood", nameHindi: "मछली", icon: "🐟" }
];

export const getProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => 
    product.category.toLowerCase().includes(category.toLowerCase()) ||
    category.toLowerCase().includes(product.category.toLowerCase())
  );
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.nameHindi.includes(query) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery)
  );
};

// Hindi to English mapping for voice search
export const hindiToEnglishMap: Record<string, string> = {
  "टमाटर": "tomato",
  "tamatar": "tomato",
  "प्याज": "onion",
  "pyaj": "onion",
  "पालक": "spinach",
  "palak": "spinach",
  "आलू": "potato",
  "aloo": "potato",
  "हरी मिर्च": "green chili",
  "hari mirch": "green chili",
  "केला": "banana",
  "kela": "banana",
  "सेब": "apple",
  "seb": "apple",
  "संतरा": "orange",
  "santra": "orange",
  "दूध": "milk",
  "doodh": "milk",
  "पनीर": "paneer",
  "हल्दी": "turmeric",
  "haldi": "turmeric",
  "लाल मिर्च": "red chili",
  "lal mirch": "red chili"
};
