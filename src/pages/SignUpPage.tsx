
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Loader2, Wheat, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

type UserRole = 'farmer' | 'buyer' | null;

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const { toast } = useToast();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!name || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    if (!selectedRole) {
      setError('Please select a role (Farmer or Buyer)');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(name, email, password, selectedRole);
      toast({
        title: "Account created!",
        description: `Welcome to Farm2Market. You're now registered as a ${selectedRole}.`,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const goBack = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
              <p className="text-gray-600">Join Farm2Market today</p>
            </div>
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            {step === 1 ? (
              <div className="space-y-6">
                <h2 className="text-xl font-medium text-center">I am a...</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    onClick={() => handleRoleSelect('farmer')}
                    variant="outline"
                    className={`h-auto p-6 border-2 flex flex-col items-center space-y-3 ${
                      selectedRole === 'farmer' 
                        ? 'border-farm-green bg-farm-green/5 text-farm-green' 
                        : 'border-gray-200 hover:border-farm-green hover:text-farm-green'
                    }`}
                  >
                    <Wheat className="h-10 w-10" />
                    <span className="text-lg font-medium">Farmer</span>
                    <p className="text-sm font-normal text-gray-500">I want to sell my produce</p>
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={() => handleRoleSelect('buyer')}
                    variant="outline"
                    className={`h-auto p-6 border-2 flex flex-col items-center space-y-3 ${
                      selectedRole === 'buyer' 
                        ? 'border-farm-green bg-farm-green/5 text-farm-green' 
                        : 'border-gray-200 hover:border-farm-green hover:text-farm-green'
                    }`}
                  >
                    <ShoppingBasket className="h-10 w-10" />
                    <span className="text-lg font-medium">Buyer</span>
                    <p className="text-sm font-normal text-gray-500">I want to buy fresh produce</p>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      type="text"
                      placeholder=""
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      type="email"
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input 
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                  
                  <div className="flex justify-between space-x-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={goBack}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="flex-1 bg-farm-green hover:bg-farm-green-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            )}
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/signin" className="text-farm-green hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
