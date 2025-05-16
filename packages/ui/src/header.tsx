"use client"
import React, { useState, useEffect } from 'react';
import { Pencil, Menu, X } from 'lucide-react';
import Button from './button';
import Link from 'next/link';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Pencil className="h-6 w-6 text-purple-600" />
            <span className="text-xl font-bold text-gray-900">Sketch.io</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors">How it works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition-colors">Testimonials</a>

            <Link href="/signup">
              <Button variant="primary">Get Started</Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 flex flex-col space-y-4">
          <a 
            href="#features" 
            className="text-gray-700 hover:text-purple-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            className="text-gray-700 hover:text-purple-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            How it works
          </a>
          <a 
            href="#testimonials" 
            className="text-gray-700 hover:text-purple-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Testimonials
          </a>
          <Link href={"/signup"}>
            <Button variant="primary" className="w-full">Get Started</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;