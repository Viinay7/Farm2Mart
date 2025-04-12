
import React from 'react';
import { Link } from 'react-router-dom';
import { Wheat, ShoppingBasket, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const featuredProducts = [
  {
    id: 1,
    name: 'Fresh Organic Tomatoes',
    price: 3.99,
    unit: 'lb',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300&h=300',
    farmer: 'Green Valley Farms'
  },
  {
    id: 2,
    name: 'Crisp Lettuce Heads',
    price: 2.49,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&q=80&w=300&h=300',
    farmer: 'Sunshine Organics'
  },
  {
    id: 3,
    name: 'Free Range Eggs',
    price: 4.99,
    unit: 'dozen',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    farmer: 'Happy Hen Farms'
  },
  {
    id: 4,
    name: 'Organic Sweet Corn',
    price: 0.99,
    unit: 'ear',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=300&h=300',
    farmer: 'Harvest Moon Farm'
  },
];

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-pattern py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Fresh From Farm to Your Table
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Connect directly with local farmers for the freshest produce at fair prices. Support sustainable agriculture and enjoy healthier food.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <Button className="w-full sm:w-auto bg-farm-green hover:bg-farm-green-dark text-white px-8 py-3 rounded-md text-lg">
                    Join Now
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="outline" className="w-full sm:w-auto border-farm-green text-farm-green hover:bg-farm-green-light/10 px-8 py-3 rounded-md text-lg">
                    Browse Products
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1511735643442-503bb3bd348a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Farmers Market" 
                className="rounded-lg shadow-xl object-cover h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to connect farmers and buyers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-farm-green-light/20 rounded-full flex items-center justify-center mb-4">
                <Wheat className="h-8 w-8 text-farm-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Farmers List Products</h3>
              <p className="text-gray-600">
                Local farmers list their fresh produce, setting their own prices and delivery options.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-farm-green-light/20 rounded-full flex items-center justify-center mb-4">
                <ShoppingBasket className="h-8 w-8 text-farm-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Buyers Shop</h3>
              <p className="text-gray-600">
                Customers browse local offerings and place orders directly from farmers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-farm-green-light/20 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-8 w-8 text-farm-green" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Everyone Benefits</h3>
              <p className="text-gray-600">
                Farmers earn more, buyers get fresher food, and communities thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-xl text-gray-600">Fresh picks from local farmers</p>
            </div>
            <Link to="/products" className="hidden md:flex items-center text-farm-green hover:text-farm-green-dark font-medium">
              View All Products <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
                <div className="h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {product.farmer}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-farm-green font-bold">
                      ${product.price.toFixed(2)} / {product.unit}
                    </span>
                    <Button size="sm" className="bg-farm-green hover:bg-farm-green-dark text-white">
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/products">
              <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green-light/10">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Farmers and Buyers" 
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Farm2Market?</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-farm-green mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Fresher Produce</h3>
                    <p className="text-gray-600">Direct from farms means produce is harvested at peak freshness.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-farm-green mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Support Local Farmers</h3>
                    <p className="text-gray-600">Your purchases directly support small-scale, local agriculture.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-farm-green mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Know Your Food</h3>
                    <p className="text-gray-600">Learn about your food's journey from seed to table.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-farm-green mr-2 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Environmental Impact</h3>
                    <p className="text-gray-600">Shorter supply chains mean reduced carbon footprint and less food waste.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline" className="border-farm-green text-farm-green hover:bg-farm-green-light/10">
                    Learn More About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-farm-green text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our growing community of farmers and food lovers today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <Button className="w-full sm:w-auto bg-white text-farm-green hover:bg-gray-100 px-8 py-3 rounded-md text-lg">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-farm-green-dark px-8 py-3 rounded-md text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
