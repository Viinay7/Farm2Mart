import React, { useState, useEffect } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  ShoppingBag, 
  Home,
  Truck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '@/components/BackButton';
import { formatToRupees } from '@/utils/currency';
import { useAuth } from '@/contexts/AuthContext';
import { 
  getCart, 
  updateCartItemQuantity, 
  removeFromCart, 
  clearCart, 
  addOrder
} from '@/utils/cartUtils';

const CartPage = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Get cart items from localStorage
    const storedCart = getCart();
    setCartItems(storedCart);
  }, []);

  const updateCartItem = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedItems = updateCartItemQuantity(id, quantity);
    setCartItems(updatedItems);
  };

  const removeItem = (id: number) => {
    const updatedItems = removeFromCart(id);
    setCartItems(updatedItems);
    toast({
      description: "Item removed from cart",
    });
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
  };

  const getDeliveryFee = () => {
    // Free delivery over ₹500
    return getSubtotal() > 500 ? 0 : 50;
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee();
  };

  const handleCheckout = () => {
    if (!address.trim()) {
      toast({
        variant: "destructive",
        description: "Please enter a delivery address",
      });
      return;
    }

    // Create order object
    const order = {
      id: `#ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: user?.name || 'Guest',
      date: new Date().toISOString().split('T')[0],
      total: getTotal(),
      status: 'Processing',
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      items: cartItems,
      address: address
    };

    // Add order to localStorage (will appear in both buyer and farmer dashboards)
    addOrder(order);
    
    // Clear cart
    clearCart();
    
    toast({
      description: "Order placed successfully!",
    });
    
    // Redirect to success page or buyer dashboard
    navigate('/buyer-dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <BackButton />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>
      
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" /> Cart Items ({cartItems.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg">
                      <div className="flex items-center mb-4 sm:mb-0">
                        <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 mr-4">
                          {item.imageUrl && (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="h-full w-full object-cover rounded"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-500">{formatToRupees(item.price)} / {item.unit}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div className="flex items-center border rounded-md mr-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateCartItem(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateCartItem(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center">
                          <span className="font-medium mr-3">
                            {formatToRupees(parseFloat(item.price) * item.quantity)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Delivery Address */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <Home className="h-5 w-5" /> Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Enter your full delivery address"
                  className="resize-none"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>
            
            {/* Payment Method */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl flex items-center gap-2">
                  <CreditCard className="h-5 w-5" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="flex flex-col space-y-3"
                >
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex-1 cursor-pointer">UPI Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2 border p-3 rounded-md">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">Credit/Debit Card</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatToRupees(getSubtotal())}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">
                      {getDeliveryFee() === 0 ? 'Free' : formatToRupees(getDeliveryFee())}
                    </span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-farm-green">{formatToRupees(getTotal())}</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center">
                    (Including all taxes)
                  </div>
                  
                  <Button 
                    className="w-full bg-farm-green hover:bg-farm-green-dark mt-4"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Place Order
                  </Button>
                  
                  <div className="flex items-center justify-center text-xs text-gray-500 mt-2">
                    <Truck className="h-3 w-3 mr-1" />
                    <span>Free delivery on orders above ₹500</span>
                  </div>
                  
                  <div className="mt-4">
                    <Link to="/buyer-dashboard">
                      <Button variant="outline" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/buyer-dashboard">
            <Button className="bg-farm-green hover:bg-farm-green-dark">
              Start Shopping
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
