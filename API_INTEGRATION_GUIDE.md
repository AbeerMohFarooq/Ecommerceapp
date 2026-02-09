# API Integration Guide

## Overview
This guide explains how to integrate your Kuwait E-commerce app with real backend APIs.

---

## Product API Integration

### Current Setup (Mock API)
The app currently uses a mock API located at `/src/app/services/productApi.ts`. This simulates network delays and provides sample product data for development and demo purposes.

### Integrating with Real REST API

#### 1. Update the API Base URL
Create an environment variable for your API endpoint:

```typescript
// .env or .env.local
VITE_API_BASE_URL=https://your-backend-api.com/api
```

#### 2. Replace Mock API with Real Implementation

```typescript
// /src/app/services/productApi.ts

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const productApi = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        headers: {
          'Content-Type': 'application/json',
          // Add authentication header if needed
          // 'Authorization': `Bearer ${getAuthToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      if (!response.ok) return null;
      return await response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  },

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error('Search failed');
      return await response.json();
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }
};
```

---

## Payment Gateway Integration (KNET)

### Using MyFatoorah (Recommended for Kuwait)

#### 1. Install MyFatoorah SDK
```bash
npm install myfatoorah-sdk
# or
yarn add myfatoorah-sdk
```

#### 2. Setup Environment Variables
```env
VITE_MYFATOORAH_API_KEY=your_api_key_here
VITE_MYFATOORAH_TEST_MODE=true
```

#### 3. Create Payment Service
```typescript
// /src/app/services/paymentService.ts

import MyFatoorahSDK from 'myfatoorah-sdk';

const myfatoorah = new MyFatoorahSDK({
  apiKey: import.meta.env.VITE_MYFATOORAH_API_KEY,
  isTest: import.meta.env.VITE_MYFATOORAH_TEST_MODE === 'true'
});

export const paymentService = {
  async initiatePayment(amount: number, customerInfo: any) {
    try {
      const paymentData = {
        CustomerName: customerInfo.name,
        CustomerEmail: customerInfo.email,
        CustomerPhone: customerInfo.phone,
        InvoiceValue: amount,
        DisplayCurrencyIso: 'KWD',
        CallBackUrl: `${window.location.origin}/payment/callback`,
        ErrorUrl: `${window.location.origin}/payment/error`,
        Language: 'en', // or 'ar' for Arabic
        CustomerReference: `ORD-${Date.now()}`,
      };

      const response = await myfatoorah.initiatePayment(paymentData);
      return response;
    } catch (error) {
      console.error('Payment initiation failed:', error);
      throw error;
    }
  },

  async executePayment(paymentMethodId: number, invoiceValue: number) {
    try {
      const response = await myfatoorah.executePayment({
        PaymentMethodId: paymentMethodId,
        InvoiceValue: invoiceValue
      });
      return response;
    } catch (error) {
      console.error('Payment execution failed:', error);
      throw error;
    }
  },

  async getPaymentStatus(paymentId: string) {
    try {
      const response = await myfatoorah.getPaymentStatus(paymentId);
      return response;
    } catch (error) {
      console.error('Failed to get payment status:', error);
      throw error;
    }
  }
};
```

#### 4. KNET Payment Flow

```typescript
// In your checkout component
const handleKNETPayment = async () => {
  try {
    setLoading(true);
    
    const customerInfo = {
      name: user.name,
      email: user.email,
      phone: user.phone
    };

    // Initiate payment
    const paymentResponse = await paymentService.initiatePayment(
      cartTotal,
      customerInfo
    );

    // Redirect to payment gateway
    window.location.href = paymentResponse.Data.PaymentURL;
    
  } catch (error) {
    console.error('Payment failed:', error);
    showErrorToast('Payment initiation failed. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

---

## Backend API Structure Recommendation

### Suggested Endpoints

```
Base URL: https://your-api.com/api/v1

Authentication:
POST   /auth/login
POST   /auth/register
POST   /auth/logout
POST   /auth/refresh

Products:
GET    /products                    # Get all products
GET    /products/:id                # Get single product
GET    /products/category/:category # Get by category
GET    /products/featured           # Get featured products
GET    /products/search?q=query     # Search products

Cart (if using backend cart):
GET    /cart                        # Get user's cart
POST   /cart/add                    # Add item to cart
PUT    /cart/update/:itemId         # Update quantity
DELETE /cart/remove/:itemId         # Remove item

Orders:
GET    /orders                      # Get user's orders
GET    /orders/:id                  # Get single order
POST   /orders                      # Create order
PUT    /orders/:id/status           # Update order status

Payments:
POST   /payments/initiate           # Initiate payment
POST   /payments/verify             # Verify payment
GET    /payments/:id/status         # Get payment status

User Profile:
GET    /user/profile                # Get profile
PUT    /user/profile                # Update profile
GET    /user/addresses              # Get saved addresses
POST   /user/addresses              # Add address
PUT    /user/addresses/:id          # Update address
DELETE /user/addresses/:id          # Delete address

Wishlist:
GET    /wishlist                    # Get wishlist
POST   /wishlist/add                # Add to wishlist
DELETE /wishlist/remove/:productId  # Remove from wishlist
```

### Sample API Response Format

```typescript
// Success Response
{
  "success": true,
  "data": {
    // Your data here
  },
  "message": "Success message"
}

// Error Response
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description"
  }
}

// Paginated Response
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalItems": 100,
      "itemsPerPage": 10
    }
  }
}
```

---

## Authentication Setup

### Using JWT Tokens

```typescript
// /src/app/services/authService.ts

export const authService = {
  async login(email: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    
    return data;
  },

  async logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    // Optionally call backend logout endpoint
  },

  getToken(): string | null {
    return localStorage.getItem('authToken');
  },

  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) throw new Error('Token refresh failed');
    
    const data = await response.json();
    localStorage.setItem('authToken', data.token);
    
    return data.token;
  }
};
```

---

## Real-time Features (Optional)

### Using WebSockets for Order Updates

```typescript
// /src/app/services/websocketService.ts

class WebSocketService {
  private ws: WebSocket | null = null;

  connect(userId: string) {
    this.ws = new WebSocket(`wss://your-api.com/ws?userId=${userId}`);
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage(data);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  handleMessage(data: any) {
    switch (data.type) {
      case 'ORDER_STATUS_UPDATE':
        // Update order status in UI
        break;
      case 'NEW_NOTIFICATION':
        // Show notification
        break;
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const wsService = new WebSocketService();
```

---

## Testing Your API Integration

### 1. Use Mock Data Initially
Keep the mock API for development and switch to real API for production.

### 2. Test with Postman
Create a Postman collection with all your API endpoints.

### 3. Handle Errors Gracefully
```typescript
try {
  const products = await productApi.getAllProducts();
  setProducts(products);
} catch (error) {
  console.error('Failed to load products:', error);
  showErrorToast('Failed to load products. Please try again.');
  // Optionally use cached data
}
```

### 4. Add Loading States
```typescript
const [loading, setLoading] = useState(false);

const loadProducts = async () => {
  setLoading(true);
  try {
    const products = await productApi.getAllProducts();
    setProducts(products);
  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
};
```

---

## Environment Variables

Create `.env` file in your project root:

```env
# API Configuration
VITE_API_BASE_URL=https://your-api.com/api/v1
VITE_APP_ENV=development

# Payment Gateway (MyFatoorah)
VITE_MYFATOORAH_API_KEY=your_key_here
VITE_MYFATOORAH_TEST_MODE=true

# Google Maps (for delivery tracking)
VITE_GOOGLE_MAPS_API_KEY=your_key_here

# Firebase (if using)
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_PROJECT_ID=your_project_id
```

---

## Security Best Practices

1. **Never expose API keys in client-side code**
2. **Use HTTPS for all API calls**
3. **Implement rate limiting**
4. **Validate all user inputs**
5. **Use authentication tokens**
6. **Sanitize data before displaying**
7. **Implement CORS properly on backend**
8. **Use environment variables for sensitive data**

---

## Next Steps

1. Set up your backend API (Laravel, Node.js, etc.)
2. Configure payment gateway account (MyFatoorah/Tap Payments)
3. Replace mock API calls with real endpoints
4. Test thoroughly with real data
5. Deploy backend and frontend
6. Monitor and optimize performance

---

## Useful Resources

- [MyFatoorah Documentation](https://myfatoorah.readme.io/)
- [Tap Payments API](https://www.tap.company/kw/en/developers)
- [REST API Best Practices](https://restfulapi.net/)
- [JWT Authentication Guide](https://jwt.io/introduction)

---

## Support

For questions or issues with API integration, check the documentation or contact your backend team.
