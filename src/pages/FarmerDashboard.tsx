import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Plus, 
  Calendar, 
  ShoppingCart,
  ChevronRight,
  Clock,
  Star,
  Eye
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import BackButton from '@/components/BackButton';
import { formatToRupees, formatUsdToRupees } from '@/utils/currency';

// Mock data for demonstration
const recentOrders = [
  { id: '#ORD-5321', buyer: 'Sarah Johnson', date: '2025-04-09', total: 125.40, status: 'Processing' },
  { id: '#ORD-5285', buyer: 'Michael Chen', date: '2025-04-08', total: 67.90, status: 'Delivered' },
  { id: '#ORD-5264', buyer: 'Emma Garcia', date: '2025-04-07', total: 89.25, status: 'Delivered' },
];

const products = [
  { id: 1, name: 'Organic Tomatoes', stock: 85, price: 3.99, sales: 32 },
  { id: 2, name: 'Fresh Carrots (Bundle)', stock: 120, price: 2.49, sales: 47 },
  { id: 3, name: 'Green Kale (Bunch)', stock: 54, price: 4.99, sales: 18 },
  { id: 4, name: 'Free Range Eggs', stock: 96, price: 5.99, sales: 26 },
];

const FarmerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <BackButton />
      </div>
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name || 'Farmer'}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to="/add-product">
            <Button className="bg-farm-green hover:bg-farm-green-dark text-white">
              <Plus className="mr-2 h-4 w-4" /> Add New Product
            </Button>
          </Link>
          <Link to="/view-orders">
            <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green-light/10">
              View All Orders
            </Button>
          </Link>
          <Link to="/farmer-products">
            <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green-light/10">
              <Eye className="mr-2 h-4 w-4" /> All Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{formatUsdToRupees(1458.75)}</h3>
              </div>
              <div className="h-12 w-12 bg-farm-green/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-farm-green" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">12% </span>
              <span className="text-gray-500 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Products</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">24</h3>
              </div>
              <div className="h-12 w-12 bg-farm-yellow/10 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-farm-yellow" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-gray-500">8 low in stock</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Orders</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">18</h3>
              </div>
              <div className="h-12 w-12 bg-farm-brown/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-farm-brown" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <span className="text-amber-500 font-medium">3 </span>
              <span className="text-gray-500 ml-1">need attention</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Customers</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">42</h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="flex items-center mt-4 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500 font-medium">24% </span>
              <span className="text-gray-500 ml-1">new this month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Recent Orders</CardTitle>
              <Link to="/view-orders" className="text-sm text-farm-green hover:underline flex items-center">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-4 py-3">Order ID</th>
                      <th className="px-4 py-3">Buyer</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 whitespace-nowrap font-medium">{order.id}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{order.buyer}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-gray-500">{order.date}</td>
                        <td className="px-4 py-3 whitespace-nowrap font-medium">{formatUsdToRupees(order.total)}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span 
                            className={`px-2 py-1 text-xs rounded-full ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {recentOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ShoppingCart className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p>No orders yet</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Product Inventory */}
          <Card className="mt-8">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xl">Product Inventory</CardTitle>
              <Link to="/products" className="text-sm text-farm-green hover:underline flex items-center">
                Manage <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                    <div className="mb-2 sm:mb-0">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <span className="mr-4">{formatUsdToRupees(product.price)}</span>
                        <span>{product.sales} sold</span>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-500">Stock</span>
                        <span className="text-sm font-medium">{product.stock} units</span>
                      </div>
                      <Progress value={Math.min(product.stock, 100)} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Calendar */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-4 border-2 border-dashed rounded-lg border-gray-200 h-40">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">Calendar view coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deliveries */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Upcoming Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start p-3 border rounded-lg">
                  <Clock className="h-5 w-5 text-farm-green mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Order #ORD-5321</p>
                    <p className="text-sm text-gray-500 mt-1">Scheduled for April 12, 2025</p>
                  </div>
                </div>
                <div className="flex items-start p-3 border rounded-lg">
                  <Clock className="h-5 w-5 text-farm-green mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Order #ORD-5337</p>
                    <p className="text-sm text-gray-500 mt-1">Scheduled for April 15, 2025</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Reviews */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Organic Tomatoes</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-farm-yellow fill-current" />
                      <Star className="h-4 w-4 text-farm-yellow fill-current" />
                      <Star className="h-4 w-4 text-farm-yellow fill-current" />
                      <Star className="h-4 w-4 text-farm-yellow fill-current" />
                      <Star className="h-4 w-4 text-gray-300" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "These tomatoes were incredibly fresh and flavorful. Will definitely buy again!"
                  </p>
                  <p className="text-xs text-gray-500 mt-2">- Sarah J. (3 days ago)</p>
                </div>
                
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Free Range Eggs</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-farm-yellow fill-current" />
                      <Star className="h-4 w-4 text-farm-yellow fill-current" />
                      <Star className="h-4 w-4 text-farm-yellow fill-current" />
                      <Star className="h-4 w-4 text-farm-yellow fill-current" />
                      <Star className="h-4 w-4 text-farm-yellow fill-current" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    "Best eggs I've ever had! You can really taste the difference."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">- Michael C. (1 week ago)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
