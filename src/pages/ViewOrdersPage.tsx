
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, ShoppingCart, ChevronRight, ChevronDown } from 'lucide-react';
import BackButton from '@/components/BackButton';
import { formatToRupees } from '@/utils/currency';

const ViewOrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Get orders from localStorage
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <BackButton />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-6">All Orders</h1>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Customer Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <React.Fragment key={order.id}>
                      <TableRow className="cursor-pointer" onClick={() => toggleOrderDetails(order.id)}>
                        <TableCell className="w-4">
                          {expandedOrders[order.id] ? (
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-500" />
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{formatToRupees(order.total)}</TableCell>
                        <TableCell>
                          <Badge className={
                            order.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                              : order.status === 'Processing' 
                                ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                          }>
                            {order.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                      
                      {expandedOrders[order.id] && (
                        <TableRow className="bg-gray-50">
                          <TableCell colSpan={6} className="p-4">
                            <div className="border-t border-gray-200 pt-3">
                              <h4 className="font-medium mb-2">Order Items</h4>
                              <div className="space-y-2">
                                {order.items?.map((item: any, index: number) => (
                                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                                    <div className="flex items-center">
                                      <div className="ml-2">
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">
                                          {formatToRupees(item.price)} x {item.quantity}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="font-medium">
                                      {formatToRupees(item.price * item.quantity)}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                                <div>
                                  <p className="font-medium">Shipping Address</p>
                                  <p className="text-sm text-gray-500">{order.address || 'Not provided'}</p>
                                </div>
                                <div>
                                  <Badge className={
                                    order.paymentStatus === 'Paid' 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }>
                                    {order.paymentStatus || 'Payment pending'}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No orders yet</h3>
              <p className="text-gray-500">You haven't received any orders yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewOrdersPage;
