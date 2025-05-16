import React from 'react';
import { Users, MessageSquare, Clock } from 'lucide-react';

const Collaboration = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="relative">
              <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 max-w-md mx-auto">
                <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                  {/* Collaborative canvas illustration */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e0e0e0_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* User cursors */}
                  <div className="absolute top-1/4 left-1/4 flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <div className="ml-2 text-xs font-medium bg-purple-500 text-white px-2 py-1 rounded">Alex</div>
                  </div>
                  
                  <div className="absolute top-2/3 right-1/3 flex items-center">
                    <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    <div className="ml-2 text-xs font-medium bg-teal-500 text-white px-2 py-1 rounded">Morgan</div>
                  </div>
                  
                  {/* Drawing elements */}
                  <div className="absolute top-1/3 left-1/3 w-24 h-16 border-2 border-purple-500 rounded-md bg-purple-50 opacity-80 flex items-center justify-center">
                    <span className="text-xs text-purple-700">Feature Ideas</span>
                  </div>
                  
                  <div className="absolute bottom-1/4 right-1/4 w-20 h-20 border-2 border-teal-500 rounded-full bg-teal-50 opacity-80 flex items-center justify-center">
                    <span className="text-xs text-teal-700">Roadmap</span>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-32 h-px border-t-2 border-dashed border-gray-400"></div>
                </div>
                
                {/* Collaboration UI */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: ['#8B5CF6', '#14B8A6', '#F97316'][i] }}
                      >
                        <span className="text-xs font-medium text-white">{String.fromCharCode(65 + i)}</span>
                      </div>
                    ))}
                  </div>
                  <button className="text-sm text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1 rounded-md transition-colors">
                    Invite +
                  </button>
                </div>
                
                {/* Chat section */}
                <div className="border rounded-lg p-3 bg-gray-50">
                  <div className="flex items-start space-x-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-white">A</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700">Alex</p>
                      <p className="text-sm text-gray-600 bg-white p-2 rounded-md shadow-sm inline-block">I think we should connect these two sections</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-medium text-white">M</span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-700">Morgan</p>
                      <p className="text-sm text-gray-600 bg-white p-2 rounded-md shadow-sm inline-block">Good idea, I'll add an arrow</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply blur-xl opacity-70"></div>
              <div className="absolute -z-10 -top-6 -left-6 w-24 h-24 bg-teal-200 rounded-full mix-blend-multiply blur-xl opacity-70"></div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:pl-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Collaborate with your team in real-time</h2>
            <p className="text-lg text-gray-600 mb-8">
              Work together seamlessly, just like you would in the same room. See changes as they happen and communicate directly on the canvas.
            </p>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple editors</h3>
                  <p className="text-gray-600">
                    Invite unlimited team members to collaborate on your designs simultaneously.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrated commenting</h3>
                  <p className="text-gray-600">
                    Discuss ideas directly within the canvas without switching to another tool.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Version history</h3>
                  <p className="text-gray-600">
                    Track changes over time and revert to previous versions whenever needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collaboration;