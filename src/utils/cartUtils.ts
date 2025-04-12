
export interface CartItem {
  id: number;
  name: string;
  price: string | number;
  unit: string;
  quantity: number;
  imageUrl?: string;
  category?: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: string;
  paymentStatus: string;
  items: CartItem[];
  address: string;
}

export const getCart = (): CartItem[] => {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (error) {
    console.error('Error parsing cart from localStorage:', error);
    return [];
  }
};

export const addToCart = (product: any): CartItem[] => {
  const existingCart = getCart();
  
  const existingItem = existingCart.find(item => item.id === product.id);
  
  let updatedCart;
  if (existingItem) {
    updatedCart = existingCart.map(item => 
      item.id === product.id 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
  } else {
    updatedCart = [...existingCart, { ...product, quantity: 1 }];
  }
  
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const updateCartItemQuantity = (id: number, quantity: number): CartItem[] => {
  const existingCart = getCart();
  
  if (quantity <= 0) {
    return removeFromCart(id);
  }
  
  const updatedCart = existingCart.map(item => 
    item.id === id ? { ...item, quantity } : item
  );
  
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const removeFromCart = (id: number): CartItem[] => {
  const existingCart = getCart();
  const updatedCart = existingCart.filter(item => item.id !== id);
  
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  return updatedCart;
};

export const clearCart = (): void => {
  localStorage.setItem('cart', JSON.stringify([]));
};

export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => {
    const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
    return total + (itemPrice * item.quantity);
  }, 0);
};

// Functions for orders
export const getOrders = (): Order[] => {
  try {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  } catch (error) {
    console.error('Error parsing orders from localStorage:', error);
    return [];
  }
};

export const addOrder = (order: Order): Order[] => {
  const existingOrders = getOrders();
  const updatedOrders = [...existingOrders, order];
  
  localStorage.setItem('orders', JSON.stringify(updatedOrders));
  return updatedOrders;
};

export const getMyOrders = (customerName: string): Order[] => {
  const allOrders = getOrders();
  return allOrders.filter(order => order.customerName === customerName);
};

export const getFarmerOrders = (): Order[] => {
  // For now, we'll just return all orders since we don't have a way to
  // filter by farmer in this simple implementation
  return getOrders();
};
