import React from 'react';
import Button from './button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-600 to-purple-700">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to reimagine your whiteboard experience?
          </h2>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams who have already transformed their creative process. 
            Start for free, no credit card required.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href={"/signup"}>
                <Button 
                variant="secondary" 
                size="lg" 
                className =" text-purple-700 hover:bg-gray-100"
              >
                Get Started Free
              </Button>
            </Link>
            
            <Link href={"/signup"}>
              <Button 
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-purple-500"
              >
                Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <p className="mt-6 text-sm text-purple-200">
            Free plan includes 3 boards and basic collaboration features.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;