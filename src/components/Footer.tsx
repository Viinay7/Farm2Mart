
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Wheat } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center mb-4">
              <Wheat className="h-6 w-6 text-farm-green" />
              <span className="ml-2 text-xl font-bold text-farm-green">Farm2Market</span>
            </div>
            <p className="text-gray-600 mb-4">
              Connecting farmers and buyers directly for fresher produce and fairer prices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-farm-green">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-farm-green">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-farm-green">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-farm-green">Home</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-farm-green">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-farm-green">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-farm-green">Contact</Link>
              </li>
            </ul>
          </div>

          {/* For Farmers & Buyers */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">For Users</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-farm-green">Register as Farmer</Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-600 hover:text-farm-green">Register as Buyer</Link>
              </li>
              <li>
                <Link to="/signin" className="text-gray-600 hover:text-farm-green">Sign In</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-farm-green">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-farm-green mt-1 flex-shrink-0" />
                <span className="text-gray-600">123 Farm Lane, Cropsville, AG 56789</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-farm-green flex-shrink-0" />
                <span className="text-gray-600">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-farm-green flex-shrink-0" />
                <span className="text-gray-600">info@farm2market.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-10 pt-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Farm2Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
