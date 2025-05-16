import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  avatar: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  content, 
  author, 
  role, 
  avatar 
}) => {
  return (
    <div className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md relative group">
      <div className="absolute top-6 right-6 text-purple-200 group-hover:text-purple-300 transition-colors">
        <Quote className="h-6 w-6" />
      </div>
      
      <p className="text-gray-700 mb-6 relative z-10">{content}</p>
      
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full overflow-hidden mr-3 flex-shrink-0">
          <img src={avatar} alt={author} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{author}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-teal-500 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></div>
    </div>
  );
};

export default TestimonialCard;