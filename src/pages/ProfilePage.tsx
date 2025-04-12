
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BackButton from '@/components/BackButton';
import { User, Mail, UserCheck, MapPin, Calendar } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">You need to be logged in to view this page</h1>
        <Link to="/signin">
          <Button>Sign In</Button>
        </Link>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <BackButton />
      </div>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="bg-farm-green text-white text-xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.role === 'farmer' ? 'Farmer' : 'Buyer'}</p>
                
                <div className="mt-4 w-full">
                  <Link to={user.role === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'}>
                    <Button variant="outline" className="w-full">
                      Go to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:w-2/3">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center p-3 border rounded-lg">
                  <User className="h-5 w-5 text-farm-green mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg">
                  <Mail className="h-5 w-5 text-farm-green mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg">
                  <UserCheck className="h-5 w-5 text-farm-green mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="font-medium capitalize">{user.role}</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg">
                  <MapPin className="h-5 w-5 text-farm-green mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium text-gray-400">Not specified</p>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-lg">
                  <Calendar className="h-5 w-5 text-farm-green mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium">April 2025</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-end">
              <Button variant="outline" className="text-farm-green border-farm-green hover:bg-farm-green-light/10">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
