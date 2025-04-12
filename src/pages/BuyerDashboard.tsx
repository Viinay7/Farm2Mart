import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  ChevronRight, 
  Star, 
  Clock, 
  Calendar,
  Truck,
  MapPinned,
  AlertCircle,
  ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import BackButton from '@/components/BackButton';
import { formatToRupees, formatUsdToRupees } from '@/utils/currency';
import { toast } from '@/hooks/use-toast';
import MyOrders from '@/components/MyOrders';
import { addToCart as addProductToCart } from '@/utils/cartUtils';

// Get products from localStorage (added by farmers)
const getStoredProducts = () => {
  try {
    return JSON.parse(localStorage.getItem('products') || '[]');
  } catch (error) {
    console.error('Error parsing products from localStorage:', error);
    return [];
  }
};

// Mock data for demonstration
const recentOrders = [
  { id: '#ORD-8245', items: 3, date: '2025-04-08', total: 45.90, status: 'Delivered' },
  { id: '#ORD-8197', items: 2, date: '2025-04-05', total: 27.50, status: 'Processing' },
];

const featuredFarmers = [
  { id: 1, name: 'Green Valley Farms', distance: '3.2 miles', rating: 4.8, products: 24 },
  { id: 2, name: 'Sunshine Organics', distance: '5.7 miles', rating: 4.6, products: 18 },
  { id: 3, name: 'Happy Hen Farms', distance: '7.1 miles', rating: 4.9, products: 12 },
];

// Fallback recommended products if nothing in localStorage
const defaultRecommendedProducts = [
  { id: 1, name: 'Fresh Organic Strawberries', price: 4.99, unit: 'pint', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 2, name: 'Local Honey', price: 8.50, unit: 'jar', image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80&w=150&h=150' },
  { id: 3, name: 'Fresh Baked Bread', price: 5.75, unit: 'loaf', image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&q=80&w=150&h=150' },
];

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = getStoredProducts();
    setProducts(storedProducts.length > 0 ? storedProducts : defaultRecommendedProducts);
    
    // Get cart items count
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemsCount(cart.length);
  }, []);

  // Filter products by category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = searchQuery 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const addToCart = (product: any) => {
    const updatedCart = addProductToCart(product);
    setCartItemsCount(updatedCart.length);
    toast({
      description: "Item added to cart",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <BackButton />
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600">{user?.name || 'Buyer'}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search for products, farmers..." 
              className="pl-10 pr-4 py-2 w-full md:w-80 bg-white"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <Link to="/cart" className="relative">
            <Button variant="outline" className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-farm-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Browse Categories */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Browse Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div 
                  onClick={() => handleCategorySelect('fruits')}
                  className={`p-4 ${selectedCategory === 'fruits' ? 'bg-red-100' : 'bg-red-50'} rounded-lg text-center hover:bg-red-100 transition cursor-pointer`}
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200">
                    <img src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=50&h=50" 
                      alt="Fruits" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">Fruits</span>
                </div>
                
                <div 
                  onClick={() => handleCategorySelect('vegetables')}
                  className={`p-4 ${selectedCategory === 'vegetables' ? 'bg-green-100' : 'bg-green-50'} rounded-lg text-center hover:bg-green-100 transition cursor-pointer`}
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200">
                    <img src="https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&q=80&w=50&h=50" 
                      alt="Vegetables" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">Vegetables</span>
                </div>
                
                <div 
                  onClick={() => handleCategorySelect('dairy')}
                  className={`p-4 ${selectedCategory === 'dairy' ? 'bg-blue-100' : 'bg-blue-50'} rounded-lg text-center hover:bg-blue-100 transition cursor-pointer`}
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200">
                    <img src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=50&h=50" 
                      alt="Dairy" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">Dairy</span>
                </div>
                
                <div 
                  onClick={() => handleCategorySelect('crops')}
                  className={`p-4 ${selectedCategory === 'crops' ? 'bg-purple-100' : 'bg-purple-50'} rounded-lg text-center hover:bg-purple-100 transition cursor-pointer`}
                >
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200">
                    <img src="https://images.unsplash.com/photo-1616696038562-cdb7097c4fa1?auto=format&fit=crop&q=80&w=50&h=50" 
                      alt="Crops" 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">Crops</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">
                {selectedCategory 
                  ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` 
                  : 'Available Products'}
              </CardTitle>
              <Link to="/products" className="text-sm text-farm-green hover:underline flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardHeader>
            <CardContent>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-md transition">
                      <div className="h-36 overflow-hidden bg-gray-100">
                        {product.imageUrl ? (
                          <img 
                            src={product.imageUrl}
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        ) : (
                          <img 
                            src="https://images.unsplash.com/photo-1553546895-531931aa1aa8?auto=format&fit=crop&q=80&w=150&h=150"
                            alt={product.name} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
                        <p className="text-farm-green font-bold">
                          {typeof product.price === 'number' 
                            ? formatUsdToRupees(product.price) 
                            : formatToRupees(parseFloat(product.price))
                          } / {product.unit}
                        </p>
                        <div className="mt-3 flex justify-between">
                          <Button 
                            size="sm" 
                            className="bg-farm-green hover:bg-farm-green-dark text-white"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </Button>
                          <Button variant="ghost" size="sm" className="p-0 hover:bg-transparent">
                            <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No products available</h3>
                  <p className="text-gray-500">
                    {selectedCategory 
                      ? `There are currently no ${selectedCategory} available.` 
                      : "There are no products available at the moment."}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Local Farmers */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Local Farmers</CardTitle>
              <Link to="/farmers" className="text-sm text-farm-green hover:underline flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {featuredFarmers.map((farmer) => (
                  <div key={farmer.id} className="flex items-start p-4 border rounded-lg hover:bg-gray-50 transition">
                    <div className="w-10 h-10 bg-farm-green/10 rounded-full flex items-center justify-center text-farm-green mr-4 flex-shrink-0">
                      <MapPinned size={20} />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-gray-900">{farmer.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-farm-yellow fill-current mr-1" />
                          <span className="text-sm">{farmer.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{farmer.distance}</span>
                        <span className="mx-2">•</span>
                        <span>{farmer.products} products</span>
                      </div>
                      <div className="mt-2">
                        <Link to={`/farmers/${farmer.id}`}>
                          <Button variant="outline" size="sm" className="text-farm-green border-farm-green hover:bg-farm-green/5">
                            Visit Farm
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-farm-green/10 rounded-full flex items-center justify-center mb-2">
                    <ShoppingBag className="h-6 w-6 text-farm-green" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Orders</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">8</h3>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 bg-farm-yellow/10 rounded-full flex items-center justify-center mb-2">
                    <Heart className="h-6 w-6 text-farm-yellow" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">Favorites</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">12</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Orders Section */}
          <MyOrders />

          {/* Upcoming Deliveries */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Upcoming Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              {recentOrders.some(order => order.status === 'Processing') ? (
                <div className="space-y-4">
                  <div className="flex items-start p-3 border rounded-lg">
                    <Truck className="h-5 w-5 text-farm-green mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Order #ORD-8197</p>
                      <p className="text-sm text-gray-500 mt-1">Arriving April 11, 2025</p>
                      <div className="mt-2">
                        <Progress value={60} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">In transit</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>No upcoming deliveries</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Seasonal Calendar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Seasonal Produce</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg border-gray-200 h-40">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Seasonal produce calendar coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
