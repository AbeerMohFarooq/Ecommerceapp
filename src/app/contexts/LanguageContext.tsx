import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.orders': 'Orders',
    'nav.cart': 'Cart',
    'nav.profile': 'Profile',
    'nav.wishlist': 'Wishlist',
    
    // Header
    'header.freeShipping': '🎉 Free Shipping on Orders Over KD 10',
    'header.tagline': 'Premium Shopping Experience',
    'header.hello': 'Hello',
    
    // Home Page
    'home.title': 'Kuwait Store',
    'home.search': 'Search products...',
    'home.specialOffer': 'Special Offer',
    'home.upTo': 'Up to 25% OFF',
    'home.selectedItems': 'On selected items this week',
    'home.shopCategory': 'Shop by Category',
    'home.featured': 'Featured Products',
    'home.seeAll': 'See All',
    'home.addToCart': 'Add to Cart',
    'home.freeDelivery': 'Free Delivery',
    'home.ordersOver': 'Orders over KD 10',
    'home.knetPayment': 'KNET Payment',
    'home.secureCheckout': 'Secure checkout',
    'home.easyReturns': 'Easy Returns',
    'home.returnPolicy': '14-day return policy',
    'home.topQuality': 'Top Quality',
    'home.verifiedProducts': 'Verified products',
    
    // Categories
    'category.fashion': 'Fashion',
    'category.beauty': 'Beauty',
    'category.electronics': 'Electronics',
    'category.jewelry': 'Jewelry',
    'category.perfumes': 'Perfumes',
    'category.food': 'Food',
    'categories.title': 'Categories',
    'categories.noProducts': 'No products in this category',
    'categories.comingSoon': 'New products coming soon!',
    
    // Product Details
    'product.back': 'Back',
    'product.inStock': 'In Stock',
    'product.outOfStock': 'Out of Stock',
    'product.description': 'Description',
    'product.addToCart': 'Add to Cart',
    'product.reviews': 'Customer Reviews',
    'product.freeDelivery': 'Free Delivery',
    'product.returns': '14-Day Returns',
    'product.easyReturn': 'Easy return policy',
    'product.securePayment': 'Secure Payment',
    'product.knetAccepted': 'KNET & card accepted',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.emptyDesc': 'Add some products to get started!',
    'cart.continueShopping': 'Continue Shopping',
    'cart.orderSummary': 'Order Summary',
    'cart.promoCode': 'Promo code',
    'cart.apply': 'Apply',
    'cart.subtotal': 'Subtotal',
    'cart.delivery': 'Delivery Fee',
    'cart.free': 'FREE',
    'cart.qualified': "You've qualified for free delivery!",
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.items': 'Items',
    
    // Checkout
    'checkout.title': 'Checkout',
    'checkout.address': 'Address',
    'checkout.payment': 'Payment',
    'checkout.confirm': 'Confirm',
    'checkout.deliveryAddress': 'Delivery Address',
    'checkout.change': 'Change',
    'checkout.addAddress': '+ Add New Address',
    'checkout.paymentMethod': 'Payment Method',
    'checkout.knet': 'KNET',
    'checkout.knetDesc': 'Pay securely with your KNET card',
    'checkout.card': 'Credit/Debit Card',
    'checkout.cardDesc': 'Visa, Mastercard accepted',
    'checkout.cash': 'Cash on Delivery',
    'checkout.cashDesc': 'Pay when you receive your order',
    'checkout.secure': 'Your payment information is encrypted and secure',
    'checkout.continuePayment': 'Continue to Payment',
    'checkout.continueConfirm': 'Continue to Confirm',
    'checkout.orderItems': 'Order Items',
    'checkout.placeOrder': 'Place Order',
    'checkout.estimatedDelivery': 'Estimated Delivery',
    
    // Orders
    'orders.title': 'My Orders',
    'orders.all': 'All',
    'orders.processing': 'Processing',
    'orders.shipping': 'Shipping',
    'orders.delivered': 'Delivered',
    'orders.cancelled': 'Cancelled',
    'orders.noOrders': 'No orders yet',
    'orders.noOrdersDesc': 'Start shopping to see your orders here!',
    'orders.startShopping': 'Start Shopping',
    'orders.viewDetails': 'View Details',
    'orders.orderAgain': 'Order Again',
    'orders.trackOrder': 'Track Order',
    'orders.expected': 'Expected',
    'orders.orderProgress': 'Order Progress',
    'orders.needHelp': 'Need Help?',
    'orders.contactSupport': 'Contact Support',
    'orders.supportDesc': "We're here to help",
    'orders.faqs': 'FAQs',
    'orders.faqsDesc': 'Common questions',
    
    // Profile
    'profile.title': 'Profile',
    'profile.orders': 'Orders',
    'profile.points': 'Points',
    'profile.wishlist': 'Wishlist',
    'profile.personalInfo': 'Personal Information',
    'profile.updateDetails': 'Update your details',
    'profile.savedAddresses': 'Saved Addresses',
    'profile.addressCount': 'addresses saved',
    'profile.paymentMethods': 'Payment Methods',
    'profile.manageCards': 'Manage your cards',
    'profile.notifications': 'Notifications',
    'profile.orderUpdates': 'Order updates & offers',
    'profile.language': 'Language',
    'profile.helpSupport': 'Help & Support',
    'profile.helpDesc': 'FAQs and contact',
    'profile.premium': 'Premium Membership',
    'profile.premiumDesc': 'Get exclusive benefits',
    'profile.freeDeliveryAll': 'Free delivery on all orders',
    'profile.earlyAccess': 'Early access to sales',
    'profile.exclusiveDiscount': 'Exclusive discounts up to 30%',
    'profile.upgrade': 'Upgrade to Premium',
    'profile.terms': 'Terms of Service',
    'profile.privacy': 'Privacy Policy',
    'profile.about': 'About Us',
    'profile.rate': 'Rate App',
    'profile.logout': 'Logout',
    'profile.version': 'Version',
    
    // Wishlist
    'wishlist.title': 'Wishlist',
    'wishlist.empty': 'Your wishlist is empty',
    'wishlist.emptyDesc': 'Save your favorite items here!',
    'wishlist.addToCart': 'Add to Cart',
    'wishlist.remove': 'Remove',
    
    // Chat
    'chat.title': 'Live Chat',
    'chat.online': 'Online',
    'chat.typingIndicator': 'Agent is typing...',
    'chat.placeholder': 'Type your message...',
    'chat.greeting': 'Hello! How can I help you today?',
    'chat.minimize': 'Minimize',
    'chat.close': 'Close',
    
    // Common
    'common.home': 'Home',
    'common.default': 'Default',
    'common.office': 'Office',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.kd': 'KD',
    'common.qty': 'Qty',
    
    // Auth
    'auth.welcomeBack': 'Welcome back!',
    'auth.createAccount': 'Create your account',
    'auth.fullName': 'Full Name',
    'auth.enterName': 'Enter your full name',
    'auth.email': 'Email',
    'auth.enterEmail': 'Enter your email',
    'auth.phone': 'Phone Number',
    'auth.password': 'Password',
    'auth.enterPassword': 'Enter your password',
    'auth.rememberMe': 'Remember me',
    'auth.forgotPassword': 'Forgot password?',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.orContinueWith': 'Or continue with',
    'auth.alreadyHaveAccount': 'Already have an account?',
    'auth.dontHaveAccount': "Don't have an account?",
    'auth.continueAsGuest': 'Continue as Guest',
    'auth.bySigningUp': 'By signing up, you agree to our',
    'auth.and': 'and',
    
    // Onboarding
    'onboarding.skip': 'Skip',
    'onboarding.back': 'Back',
    'onboarding.next': 'Next',
    'onboarding.getStarted': 'Get Started',
    'onboarding.slide1Title': 'Shop Premium Products',
    'onboarding.slide1Desc': 'Discover thousands of quality products from trusted brands at great prices.',
    'onboarding.slide2Title': 'Secure Payment',
    'onboarding.slide2Desc': 'Pay safely with KNET, credit card, or cash on delivery.',
    'onboarding.slide3Title': 'Fast Delivery',
    'onboarding.slide3Desc': 'Get your orders delivered quickly to your doorstep.',
    
    // Search
    'search.filters': 'Filters',
    'search.priceRange': 'Price Range',
    'search.sortBy': 'Sort By',
    'search.popular': 'Most Popular',
    'search.priceLowHigh': 'Price: Low to High',
    'search.priceHighLow': 'Price: High to Low',
    'search.topRated': 'Top Rated',
    'search.reset': 'Reset',
    'search.apply': 'Apply',
    'search.results': 'results',
    'search.noResults': 'No results found',
    'search.tryDifferent': 'Try different keywords or filters',
    
    // Order Detail
    'orderDetail.title': 'Order Details',
    'orderDetail.outForDelivery': 'Out for Delivery',
    'orderDetail.expectedToday': 'Expected delivery today',
    'orderDetail.tracking': 'Order Tracking',
    'orderDetail.paidOn': 'Paid on',
    'orderDetail.contactSupport': 'Contact Support',
    'orderDetail.needHelp': 'Need help with your order?',
    'orderDetail.contactUs': 'Contact us',
    
    // Tracking
    'tracking.placed': 'Order Placed',
    'tracking.confirmed': 'Order Confirmed',
    'tracking.packed': 'Packed',
    'tracking.shipped': 'Shipped',
    'tracking.delivering': 'Out for Delivery',
    'tracking.delivered': 'Delivered',
    'tracking.expected': 'Expected soon',
    
    // Notifications
    'notifications.unread': 'unread',
    'notifications.markAllRead': 'Mark all as read',
    'notifications.empty': 'No notifications',
    'notifications.emptyDesc': 'You\'re all caught up!',
    'notifications.settings': 'Notification Settings',
    'notifications.orderUpdates': 'Order Updates',
    'notifications.orderUpdatesDesc': 'Status changes and delivery info',
    'notifications.promotions': 'Promotions & Offers',
    'notifications.promotionsDesc': 'Special deals and discounts',
    'notifications.newArrivals': 'New Arrivals',
    'notifications.newArrivalsDesc': 'New products in stock',
    'notifications.orderDelivered': 'Order Delivered',
    'notifications.orderDeliveredMsg': 'Your order #ORD-001 has been delivered successfully.',
    'notifications.specialOffer': 'Special Offer!',
    'notifications.specialOfferMsg': 'Get 25% off on all electronics today only!',
    'notifications.rateProduct': 'Rate Your Purchase',
    'notifications.rateProductMsg': 'How was your recent order? Share your experience.',
    'notifications.orderShipped': 'Order Shipped',
    'notifications.orderShippedMsg': 'Your order is on the way!',
    'notifications.flashSale': 'Flash Sale Alert!',
    'notifications.flashSaleMsg': 'Limited time offer on fashion items.',
    
    // Settings
    'settings.title': 'Settings',
    'settings.general': 'General',
    'settings.darkMode': 'Dark Mode',
    'settings.darkModeDesc': 'Toggle dark theme',
    'settings.pushNotifications': 'Push Notifications',
    'settings.pushNotificationsDesc': 'Receive push notifications',
    'settings.emailNotifications': 'Email Notifications',
    'settings.emailNotificationsDesc': 'Receive email updates',
    'settings.smsNotifications': 'SMS Notifications',
    'settings.smsNotificationsDesc': 'Receive text messages',
    'settings.security': 'Security & Privacy',
    'settings.changePassword': 'Change Password',
    'settings.changePasswordDesc': 'Update your password',
    'settings.twoFactor': 'Two-Factor Authentication',
    'settings.twoFactorDesc': 'Extra security layer',
    'settings.faq': 'Frequently Asked Questions',
    'settings.contactSupport': 'Contact Support',
    'settings.deleteAccount': 'Delete Account',
    
    // Success
    'success.orderPlaced': 'Order Placed Successfully!',
    'success.thankYou': 'Thank you for your order',
    'success.orderNumber': 'Order Number',
    'success.whatNext': "What's Next?",
    'success.step1': 'Order Confirmation',
    'success.step1Desc': 'We\'ll send you a confirmation email shortly',
    'success.step2': 'Order Processing',
    'success.step2Desc': 'Your order will be packed within 24 hours',
    'success.step3': 'Delivery',
    'success.step3Desc': 'Track your order in real-time',
    'success.emailSent': 'Confirmation email sent to your inbox',
    'success.trackOrder': 'Track My Order',
    'success.continueShopping': 'Continue Shopping',
    'success.needHelp': 'Need help?',
    'success.contactSupport': 'Contact Support',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.orders': 'الطلبات',
    'nav.cart': 'السلة',
    'nav.profile': 'الملف الشخصي',
    'nav.wishlist': 'المفضلة',
    
    // Header
    'header.freeShipping': '🎉 توصيل مجاني للطلبات فوق 10 د.ك',
    'header.tagline': 'تجربة تسوق فاخرة',
    'header.hello': 'مرحباً',
    
    // Home Page
    'home.title': 'متجر الكويت',
    'home.search': 'البحث عن المنتجات...',
    'home.specialOffer': 'عرض خاص',
    'home.upTo': 'خصم يصل إلى 25٪',
    'home.selectedItems': 'على منتجات مختارة هذا الأسبوع',
    'home.shopCategory': 'تسوق حسب الفئة',
    'home.featured': 'المنتجات المميزة',
    'home.seeAll': 'عرض الكل',
    'home.addToCart': 'إضافة إلى السلة',
    'home.freeDelivery': 'توصيل مجاني',
    'home.ordersOver': 'للطلبات فوق 10 د.ك',
    'home.knetPayment': 'الدفع بالكي نت',
    'home.secureCheckout': 'دفع آمن',
    'home.easyReturns': 'سهولة الإرجاع',
    'home.returnPolicy': 'سياسة إرجاع 14 يوم',
    'home.topQuality': 'جودة عالية',
    'home.verifiedProducts': 'منتجات موثقة',
    
    // Categories
    'category.fashion': 'أزياء',
    'category.beauty': 'تجميل',
    'category.electronics': 'إلكترونيات',
    'category.jewelry': 'مجوهرات',
    'category.perfumes': 'عطور',
    'category.food': 'مأكولات',
    'categories.title': 'الفئات',
    'categories.noProducts': 'لا توجد منتجات في هذه الفئة',
    'categories.comingSoon': 'منتجات جديدة قادمة قريبًا!',
    
    // Product Details
    'product.back': 'رجوع',
    'product.inStock': 'متوفر',
    'product.outOfStock': 'غير متوفر',
    'product.description': 'الوصف',
    'product.addToCart': 'إضافة إلى السلة',
    'product.reviews': 'تقييمات العملاء',
    'product.freeDelivery': 'توصيل مجاني',
    'product.returns': 'إرجاع خلال 14 يوم',
    'product.easyReturn': 'سياسة إرجاع سهلة',
    'product.securePayment': 'دفع آمن',
    'product.knetAccepted': 'كي نت والبطاقات مقبولة',
    
    // Cart
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلتك فارغة',
    'cart.emptyDesc': 'أضف بعض المنتجات للبدء!',
    'cart.continueShopping': 'متابعة التسوق',
    'cart.orderSummary': 'ملخص الطلب',
    'cart.promoCode': 'رمز الخصم',
    'cart.apply': 'تطبيق',
    'cart.subtotal': 'المجموع الفرعي',
    'cart.delivery': 'رسوم التوصيل',
    'cart.free': 'مجاني',
    'cart.qualified': 'لقد حصلت على التوصيل المجاني!',
    'cart.total': 'المجموع',
    'cart.checkout': 'إتمام الطلب',
    'cart.items': 'العناصر',
    
    // Checkout
    'checkout.title': 'إتمام الطلب',
    'checkout.address': 'العنوان',
    'checkout.payment': 'الدفع',
    'checkout.confirm': 'تأكيد',
    'checkout.deliveryAddress': 'عنوان التوصيل',
    'checkout.change': 'تغيير',
    'checkout.addAddress': '+ إضافة عنوان جديد',
    'checkout.paymentMethod': 'طريقة الدفع',
    'checkout.knet': 'كي نت',
    'checkout.knetDesc': 'ادفع بأمان ببطاقة كي نت',
    'checkout.card': 'بطاقة ائتمان/خصم',
    'checkout.cardDesc': 'فيزا وماستركارد مقبولة',
    'checkout.cash': 'الدفع عند الاستلام',
    'checkout.cashDesc': 'ادفع عند استلام طلبك',
    'checkout.secure': 'معلومات الدفع الخاصة بك مشفرة وآمنة',
    'checkout.continuePayment': 'متابعة إلى الدفع',
    'checkout.continueConfirm': 'متابعة إلى التأكيد',
    'checkout.orderItems': 'عناصر الطلب',
    'checkout.placeOrder': 'تأكيد الطلب',
    'checkout.estimatedDelivery': 'التسليم المتوقع',
    
    // Orders
    'orders.title': 'طلباتي',
    'orders.all': 'الكل',
    'orders.processing': 'قيد المعالجة',
    'orders.shipping': 'قيد التوصيل',
    'orders.delivered': 'تم التوصيل',
    'orders.cancelled': 'ملغي',
    'orders.noOrders': 'لا توجد طلبات بعد',
    'orders.noOrdersDesc': 'ابدأ التسوق لرؤية طلباتك هنا!',
    'orders.startShopping': 'ابدأ التسوق',
    'orders.viewDetails': 'عرض التفاصيل',
    'orders.orderAgain': 'اطلب مرة أخرى',
    'orders.trackOrder': 'تتبع الطلب',
    'orders.expected': 'متوقع',
    'orders.orderProgress': 'تقدم الطلب',
    'orders.needHelp': 'تحتاج مساعدة؟',
    'orders.contactSupport': 'اتصل بالدعم',
    'orders.supportDesc': 'نحن هنا للمساعدة',
    'orders.faqs': 'الأسئلة الشائعة',
    'orders.faqsDesc': 'أسئلة شائعة',
    
    // Profile
    'profile.title': 'الملف الشخصي',
    'profile.orders': 'الطلبات',
    'profile.points': 'النقاط',
    'profile.wishlist': 'المفضلة',
    'profile.personalInfo': 'المعلومات الشخصية',
    'profile.updateDetails': 'تحديث بياناتك',
    'profile.savedAddresses': 'العناوين المحفوظة',
    'profile.addressCount': 'عنوان محفوظ',
    'profile.paymentMethods': 'طرق الدفع',
    'profile.manageCards': 'إدارة بطاقاتك',
    'profile.notifications': 'الإشعارات',
    'profile.orderUpdates': 'تحديثات الطلب والعروض',
    'profile.language': 'اللغة',
    'profile.helpSupport': 'المساعدة والدعم',
    'profile.helpDesc': 'الأسئلة الشائعة والتواصل',
    'profile.premium': 'العضوية المميزة',
    'profile.premiumDesc': 'احصل على مزايا حصرية',
    'profile.freeDeliveryAll': 'توصيل مجاني لجميع الطلبات',
    'profile.earlyAccess': 'وصول مبكر للتخفيضات',
    'profile.exclusiveDiscount': 'خصومات حصرية تصل إلى 30٪',
    'profile.upgrade': 'الترقية إلى المميز',
    'profile.terms': 'شروط الخدمة',
    'profile.privacy': 'سياسة الخصوصية',
    'profile.about': 'من نحن',
    'profile.rate': 'تقييم التطبيق',
    'profile.logout': 'تسجيل الخروج',
    'profile.version': 'الإصدار',
    
    // Wishlist
    'wishlist.title': 'المفضلة',
    'wishlist.empty': 'قائمة المفضلة فارغة',
    'wishlist.emptyDesc': 'احفظ العناصر المفضلة لديك هنا!',
    'wishlist.addToCart': 'إضافة إلى السلة',
    'wishlist.remove': 'إزالة',
    
    // Chat
    'chat.title': 'الدردشة المباشرة',
    'chat.online': 'متصل',
    'chat.typingIndicator': 'الموظف يكتب...',
    'chat.placeholder': 'اكتب رسالتك...',
    'chat.greeting': 'مرحباً! كيف يمكنني مساعدتك اليوم؟',
    'chat.minimize': 'تصغير',
    'chat.close': 'إغلاق',
    
    // Common
    'common.home': 'المنزل',
    'common.default': 'افتراضي',
    'common.office': 'المكتب',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.delete': 'حذف',
    'common.edit': 'تعديل',
    'common.kd': 'د.ك',
    'common.qty': 'الكمية',
    
    // Auth
    'auth.welcomeBack': 'مرحباً بعودتك!',
    'auth.createAccount': 'إنشاء حساب جديد',
    'auth.fullName': 'الاسم الكامل',
    'auth.enterName': 'أدخل اسمك الكامل',
    'auth.email': 'البريد الإلكتروني',
    'auth.enterEmail': 'أدخل بريدك الإلكتروني',
    'auth.phone': 'رقم الهاتف',
    'auth.password': 'كلمة المرور',
    'auth.enterPassword': 'أدخل كلمة المرور',
    'auth.rememberMe': 'تذكرني',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.signIn': 'تسجيل الدخول',
    'auth.signUp': 'إنشاء حساب',
    'auth.orContinueWith': 'أو تابع باستخدام',
    'auth.alreadyHaveAccount': 'لديك حساب بالفعل؟',
    'auth.dontHaveAccount': 'ليس لديك حساب؟',
    'auth.continueAsGuest': 'المتابعة كزائر',
    'auth.bySigningUp': 'بالتسجيل، أنت توافق على',
    'auth.and': 'و',
    
    // Onboarding
    'onboarding.skip': 'تخطي',
    'onboarding.back': 'رجوع',
    'onboarding.next': 'التالي',
    'onboarding.getStarted': 'ابدأ الآن',
    'onboarding.slide1Title': 'تسوق المنتجات المميزة',
    'onboarding.slide1Desc': 'اكتشف آلاف المنتجات عالية الجودة من علامات تجارية موثوقة بأسعار رائعة.',
    'onboarding.slide2Title': 'دفع آمن',
    'onboarding.slide2Desc': 'ادفع بأمان باستخدام كي نت أو البطاقة الائتمانية أو الدفع عند الاستلام.',
    'onboarding.slide3Title': 'توصيل سريع',
    'onboarding.slide3Desc': 'احصل على طلباتك بسرعة إلى باب منزلك.',
    
    // Search
    'search.filters': 'الفلاتر',
    'search.priceRange': 'نطاق السعر',
    'search.sortBy': 'ترتيب حسب',
    'search.popular': 'الأكثر شعبية',
    'search.priceLowHigh': 'السعر: من الأقل للأعلى',
    'search.priceHighLow': 'السعر: من الأعلى للأقل',
    'search.topRated': 'الأعلى تقييماً',
    'search.reset': 'إعادة تعيين',
    'search.apply': 'تطبيق',
    'search.results': 'نتيجة',
    'search.noResults': 'لا توجد نتائج',
    'search.tryDifferent': 'جرب كلمات أو فلاتر مختلفة',
    
    // Order Detail
    'orderDetail.title': 'تفاصيل الطلب',
    'orderDetail.outForDelivery': 'قيد التوصيل',
    'orderDetail.expectedToday': 'التسليم المتوقع اليوم',
    'orderDetail.tracking': 'تتبع الطلب',
    'orderDetail.paidOn': 'تم الدفع في',
    'orderDetail.contactSupport': 'الاتصال بالدعم',
    'orderDetail.needHelp': 'تحتاج مساعدة بطلبك؟',
    'orderDetail.contactUs': 'اتصل بنا',
    
    // Tracking
    'tracking.placed': 'تم الطلب',
    'tracking.confirmed': 'تم التأكيد',
    'tracking.packed': 'تم التعبئة',
    'tracking.shipped': 'تم الشحن',
    'tracking.delivering': 'قيد التوصيل',
    'tracking.delivered': 'تم التوصيل',
    'tracking.expected': 'متوقع قريباً',
    
    // Notifications
    'notifications.unread': 'غير مقروءة',
    'notifications.markAllRead': 'تحديد الكل كمقروء',
    'notifications.empty': 'لا توجد إشعارات',
    'notifications.emptyDesc': 'أنت مواكب لكل شيء!',
    'notifications.settings': 'إعدادات الإشعارات',
    'notifications.orderUpdates': 'تحديثات الطلبات',
    'notifications.orderUpdatesDesc': 'تغييرات الحالة ومعلومات التوصيل',
    'notifications.promotions': 'العروض الترويجية',
    'notifications.promotionsDesc': 'صفقات وخصومات خاصة',
    'notifications.newArrivals': 'الوافدون الجدد',
    'notifications.newArrivalsDesc': 'منتجات جديدة في المخزون',
    'notifications.orderDelivered': 'تم توصيل الطلب',
    'notifications.orderDeliveredMsg': 'تم توصيل طلبك #ORD-001 بنجاح.',
    'notifications.specialOffer': 'عرض خاص!',
    'notifications.specialOfferMsg': 'احصل على خصم 25٪ على جميع الإلكترونيات اليوم فقط!',
    'notifications.rateProduct': 'قيّم مشترياتك',
    'notifications.rateProductMsg': 'كيف كان طلبك الأخير؟ شارك تجربتك.',
    'notifications.orderShipped': 'تم شحن الطلب',
    'notifications.orderShippedMsg': 'طلبك في الطريق!',
    'notifications.flashSale': 'تنبيه تخفيضات سريعة!',
    'notifications.flashSaleMsg': 'عرض لفترة محدودة على عناصر الأزياء.',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.general': 'عام',
    'settings.darkMode': 'الوضع الداكن',
    'settings.darkModeDesc': 'تبديل المظهر الداكن',
    'settings.pushNotifications': 'إشعارات الدفع',
    'settings.pushNotificationsDesc': 'تلقي إشعارات الدفع',
    'settings.emailNotifications': 'إشعارات البريد الإلكتروني',
    'settings.emailNotificationsDesc': 'تلقي تحديثات البريد الإلكتروني',
    'settings.smsNotifications': 'إشعارات الرسائل النصية',
    'settings.smsNotificationsDesc': 'تلقي الرسائل النصية',
    'settings.security': 'الأمان والخصوصية',
    'settings.changePassword': 'تغيير كلمة المرور',
    'settings.changePasswordDesc': 'تحديث كلمة المرور',
    'settings.twoFactor': 'المصادقة الثنائية',
    'settings.twoFactorDesc': 'طبقة أمان إضافية',
    'settings.faq': 'الأسئلة الشائعة',
    'settings.contactSupport': 'الاتصال بالدعم',
    'settings.deleteAccount': 'حذف الحساب',
    
    // Success
    'success.orderPlaced': 'تم تقديم الطلب بنجاح!',
    'success.thankYou': 'شكراً لطلبك',
    'success.orderNumber': 'رقم الطلب',
    'success.whatNext': 'ما التالي؟',
    'success.step1': 'تأكيد الطلب',
    'success.step1Desc': 'سنرسل لك بريد تأكيد قريباً',
    'success.step2': 'معالجة الطلب',
    'success.step2Desc': 'سيتم تعبئة طلبك خلال 24 ساعة',
    'success.step3': 'التوصيل',
    'success.step3Desc': 'تتبع طلبك في الوقت الفعلي',
    'success.emailSent': 'تم إرسال بريد التأكيد إلى بريدك الوارد',
    'success.trackOrder': 'تتبع طلبي',
    'success.continueShopping': 'متابعة التسوق',
    'success.needHelp': 'تحتاج مساعدة؟',
    'success.contactSupport': 'الاتصال بالدعم',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Apply RTL/LTR to document
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}