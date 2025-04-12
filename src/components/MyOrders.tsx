
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ChevronDown, ChevronRight, Truck, Package, MapPin, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { getMyOrders } from '@/utils/cartUtils';
import { formatToRupees } from '@/utils/currency';
import { Progress } from '@/components/ui/progress';

const MyOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const [trackView, setTrackView] = useState<string | null>(null);

  useEffect(() => {
    if (user?.name) {
      const myOrders = getMyOrders(user.name);
      setOrders(myOrders);
    }
  }, [user]);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
    
    // Close tracking view if we're collapsing the order
    if (expandedOrders[orderId]) {
      setTrackView(null);
    }
  };

  const toggleTrackView = (orderId: string) => {
    setTrackView(trackView === orderId ? null : orderId);
  };

  const getTrackingStatus = (status: string) => {
    switch(status) {
      case 'Processing':
        return { progress: 25, message: 'Order is being processed' };
      case 'Shipped':
        return { progress: 50, message: 'Order has been shipped' };
      case 'Out for Delivery':
        return { progress: 75, message: 'Out for delivery' };
      case 'Delivered':
        return { progress: 100, message: 'Order delivered' };
      default:
        return { progress: 0, message: 'Order placed' };
    }
  };

  const renderTrackingSteps = (order: any) => {
    const steps = [
      { label: 'Order Placed', icon: Package, completed: true, date: order.date },
      { label: 'Processing', icon: Package, completed: order.status !== 'Placed', date: order.status !== 'Placed' ? getRandomFutureDate(1) : '' },
      { label: 'Shipped', icon: Truck, completed: ['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status), date: ['Shipped', 'Out for Delivery', 'Delivered'].includes(order.status) ? getRandomFutureDate(3) : '' },
      { label: 'Out for Delivery', icon: Truck, completed: ['Out for Delivery', 'Delivered'].includes(order.status), date: ['Out for Delivery', 'Delivered'].includes(order.status) ? getRandomFutureDate(4) : '' },
      { label: 'Delivered', icon: MapPin, completed: order.status === 'Delivered', date: order.status === 'Delivered' ? getRandomFutureDate(5) : '' }
    ];

    return (
      <div className="mt-3 space-y-5">
        <div className="relative">
          <Progress value={getTrackingStatus(order.status).progress} className="h-2" />
          <div className="flex justify-between mt-1">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col items-center ${step.completed ? 'text-farm-green' : 'text-gray-400'}`} style={{ width: '20%' }}>
                <div className={`rounded-full p-1 ${step.completed ? 'bg-farm-green text-white' : 'bg-gray-200'}`}>
                  {step.completed ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </div>
                <span className="text-xs mt-1 text-center">{step.label}</span>
                {step.date && <span className="text-xs text-gray-500">{step.date}</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded border text-sm">
          <p className="font-medium">Current Status:</p>
          <p className="text-farm-green">{getTrackingStatus(order.status).message}</p>
          <p className="text-gray-500 mt-2">Estimated delivery: {getEstimatedDelivery(order)}</p>
        </div>
      </div>
    );
  };

  // Helper functions for demo purposes
  const getRandomFutureDate = (daysAhead: number) => {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getEstimatedDelivery = (order: any) => {
    if (order.status === 'Delivered') {
      return 'Delivered';
    }
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">My Orders</CardTitle>
        <Link to="/orders" className="text-sm text-farm-green hover:underline flex items-center">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div 
                  className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                        : order.status === 'Processing' 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                    }>
                      {order.status}
                    </Badge>
                    {expandedOrders[order.id] ? (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {expandedOrders[order.id] && (
                  <div className="bg-gray-50 p-4 border-t">
                    {trackView === order.id ? (
                      <div>
                        <div className="flex justify-between mb-3">
                          <h3 className="font-medium">Track Order</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleTrackView(order.id);
                            }}
                          >
                            View Items
                          </Button>
                        </div>
                        {renderTrackingSteps(order)}
                      </div>
                    ) : (
                      <>
                        <p className="font-medium mb-2">Order Items:</p>
                        <div className="space-y-2">
                          {order.items.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-2 border rounded bg-white">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">
                                  {formatToRupees(item.price)} x {item.quantity}
                                </p>
                              </div>
                              <p className="font-medium">{formatToRupees(parseFloat(item.price) * item.quantity)}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-500">Total:</p>
                            <p className="font-bold text-farm-green">{formatToRupees(order.total)}</p>
                          </div>
                          <Badge className={
                            order.paymentStatus === 'Paid' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }>
                            {order.paymentStatus}
                          </Badge>
                        </div>
                        
                        <div className="mt-3 text-sm">
                          <p className="font-medium">Shipping Address:</p>
                          <p className="text-gray-500">{order.address}</p>
                        </div>

                        {order.status !== 'Delivered' && (
                          <div className="mt-4">
                            <Button
                              variant="outline"
                              className="w-full border-farm-green text-farm-green hover:bg-farm-green/5 flex gap-2 items-center justify-center"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleTrackView(order.id);
                              }}
                            >
                              <Truck className="h-4 w-4" />
                              Track Order
                            </Button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ShoppingBag className="h-10 w-10 text-gray-400 mx-auto mb-2" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
            <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
            <Link to="/buyer-dashboard">
              <Button className="bg-farm-green hover:bg-farm-green-dark">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MyOrders;
