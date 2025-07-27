import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  en: {
    // Header and Navigation
    'app.name': 'Sahaayak',
    'nav.welcome': 'Welcome back!',
    'nav.profile': 'Profile',
    'nav.recent_orders': 'Recent Orders',
    'nav.payment_info': 'Payment Info',
    'nav.offers_deals': 'Offers & Deals',
    'nav.switch_theme': 'Switch Theme',
    'nav.language': 'Language',
    'nav.logout': 'Logout',
    'nav.donate_food': 'Donate Food',
    'nav.my_donations': 'My Donations',
    
    // Main sections
    'categories.title': 'Our Categories',
    'categories.subtitle': 'Explore our wide range of products',
    'recent_orders.title': 'Recently Ordered Items',
    'budget.title': 'Budget-Friendly Items',
    'budget.potential_savings': 'Potential Savings',
    'reviews.title': 'Your Reviews of Wholesalers',
    'wholesalers.title': 'Top Rated Wholesalers',
    'voice_search.placeholder': 'Search Ingredients by Voice…',
    'voice_search.listening': 'Listening...',
    
    // Categories
    'category.fruits_vegetables': 'Fruits & Vegetables',
    'category.fish_seafood': 'Fish & Seafood',
    'category.dairy_eggs': 'Dairy & Eggs',
    'category.flours_grains': 'Flours & Grains',
    'category.meat_poultry': 'Meat & Poultry',
    'category.pulses_legumes': 'Pulses & Legumes',
    'category.beverages': 'Beverages',
    'category.snacks_sweets': 'Snacks & Sweets',
    'category.spices_seasonings': 'Spices & Seasonings',
    'category.cleaning_care': 'Cleaning & Care',
    'category.dry_fruits_nuts': 'Dry Fruits & Nuts',
    'category.edible_oils': 'Edible Oils',
    'category.frozen_instant': 'Frozen & Instant',
    'category.personal_care': 'Personal Care',
    'category.home_kitchen': 'Home & Kitchen',
    
    // Common actions
    'action.add_to_cart': 'Add to Cart',
    'action.reorder': 'Reorder',
    'action.view_products': 'View Products',
    'action.add': 'Add',
    'status.in_stock': 'In Stock',
    'status.out_of_stock': 'Out of Stock',
  },
  hi: {
    // Header and Navigation
    'app.name': 'सहायक',
    'nav.welcome': 'वापस स्वागत है!',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.recent_orders': 'हाल के ऑर्डर',
    'nav.payment_info': 'भुगतान की जानकारी',
    'nav.offers_deals': 'ऑफर और डील',
    'nav.switch_theme': 'थीम बदलें',
    'nav.language': 'भाषा',
    'nav.logout': 'लॉगआउट',
    'nav.donate_food': 'भोजन दान करें',
    'nav.my_donations': 'मेरे दान',
    
    // Main sections
    'categories.title': 'हमारी श्रेणियां',
    'categories.subtitle': 'हमारे उत्पादों की विस्तृत श्रृंखला देखें',
    'recent_orders.title': 'हाल ही में ऑर्डर की गई वस्तुएं',
    'budget.title': 'बजट-अनुकूल वस्तुएं',
    'budget.potential_savings': 'संभावित बचत',
    'reviews.title': 'थोक विक्रेताओं की आपकी समीक्षाएं',
    'wholesalers.title': 'शीर्ष रेटेड थोक विक्रेता',
    'voice_search.placeholder': 'आवाज से सामग्री खोजें…',
    'voice_search.listening': 'सुन रहा है...',
    
    // Categories
    'category.fruits_vegetables': 'फल और सब्जियां',
    'category.fish_seafood': 'मछली और समुद्री भोजन',
    'category.dairy_eggs': 'डेयरी और अंडे',
    'category.flours_grains': 'आटा और अनाज',
    'category.meat_poultry': 'मांस और मुर्गी',
    'category.pulses_legumes': 'दालें और फलियां',
    'category.beverages': 'पेय पदार्थ',
    'category.snacks_sweets': 'नाश्ता और मिठाइयां',
    'category.spices_seasonings': 'मसाले और सीज़निंग',
    'category.cleaning_care': 'सफाई और देखभाल',
    'category.dry_fruits_nuts': 'सूखे मेव�� और नट्स',
    'category.edible_oils': 'खाद्य तेल',
    'category.frozen_instant': 'जमे हुए और तत्काल',
    'category.personal_care': 'व्यक्तिगत देखभाल',
    'category.home_kitchen': 'घर और रसोई',
    
    // Common actions
    'action.add_to_cart': 'कार्ट में जोड़ें',
    'action.reorder': 'फिर से ऑर्डर करें',
    'action.view_products': 'उत्पाद देखें',
    'action.add': 'जोड़ें',
    'status.in_stock': 'स्टॉक में',
    'status.out_of_stock': 'स्टॉक खत्म',
  },
  mr: {
    // Header and Navigation
    'app.name': 'सहाय्यक',
    'nav.welcome': 'परत आपले स्वागत!',
    'nav.profile': 'प्रोफाइल',
    'nav.recent_orders': 'अलीकडील ऑर्डर',
    'nav.payment_info': 'पेमेंट माहिती',
    'nav.offers_deals': 'ऑफर आणि डील',
    'nav.switch_theme': 'थीम बदला',
    'nav.language': 'भाषा',
    'nav.logout': 'लॉगआउट',
    'nav.donate_food': 'अन्न दान करा',
    'nav.my_donations': 'माझे दान',
    
    // Main sections
    'categories.title': 'आमच्या श्रेणी',
    'categories.subtitle': 'आमच्या उत्पादनांची विस्तृत श्रेणी पहा',
    'recent_orders.title': 'अलीकडे ऑर्डर केलेले आयटम',
    'budget.title': 'बजेट-अनुकूल वस्तू',
    'budget.potential_savings': 'संभाव्य बचत',
    'reviews.title': 'घाऊक विक्रेत्यांच्या तुमच्या पुनरावलोकना',
    'wholesalers.title': 'टॉप रेटेड घाऊक विक्रेते',
    'voice_search.placeholder': 'आवाजाने साहित्य शोधा…',
    'voice_search.listening': 'ऐकत आहे...',
    
    // Categories
    'category.fruits_vegetables': 'फळे आणि भाज्या',
    'category.fish_seafood': 'मासे आणि समुद्री अन्न',
    'category.dairy_eggs': 'डेअरी आणि अंडी',
    'category.flours_grains': 'पीठ आणि धान्य',
    'category.meat_poultry': 'मांस आणि कोंबडी',
    'category.pulses_legumes': 'डाळी आणि शेंगा',
    'category.beverages': 'पेय पदार्थ',
    'category.snacks_sweets': 'स्नॅक्स आणि मिठाई',
    'category.spices_seasonings': 'मसाले आणि सीझनिंग',
    'category.cleaning_care': 'साफसफाई आणि काळजी',
    'category.dry_fruits_nuts': 'सुके मेवे आणि नट्स',
    'category.edible_oils': 'खाद्य तेले',
    'category.frozen_instant': 'गोठवलेले आणि तात्काळ',
    'category.personal_care': 'वैयक्तिक काळजी',
    'category.home_kitchen': 'घर आणि स्वयंपाकघर',
    
    // Common actions
    'action.add_to_cart': 'कार्टमध्ये जोडा',
    'action.reorder': 'पुन्हा ऑर्डर करा',
    'action.view_products': 'उत्पादने पहा',
    'action.add': 'जोडा',
    'status.in_stock': 'स्टॉकमध्ये',
    'status.out_of_stock': 'स्टॉक संपला',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
