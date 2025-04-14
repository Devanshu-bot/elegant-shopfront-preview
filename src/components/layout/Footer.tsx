
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand column */}
          <div className="col-span-1">
            <div className="font-bold text-2xl text-product-accent mb-4">ELEGANCE</div>
            <p className="text-gray-600 mb-4">
              Bringing style and comfort to your everyday life with quality furniture and home decor.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-product-accent">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-product-accent">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-product-accent">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links columns */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-product-accent">All Products</a></li>
              <li><a href="#" className="text-gray-600 hover:text-product-accent">New Arrivals</a></li>
              <li><a href="#" className="text-gray-600 hover:text-product-accent">Best Sellers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-product-accent">On Sale</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-product-accent">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-product-accent">Shipping & Returns</a></li>
              <li><a href="#" className="text-gray-600 hover:text-product-accent">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-product-accent">Order Tracking</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-product-accent">Our Story</a></li>
              <li><a href="#" className="text-gray-600 hover:text-product-accent">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-product-accent">Sustainability</a></li>
              <li><a href="#" className="text-gray-600 hover:text-product-accent">Careers</a></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Elegance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
