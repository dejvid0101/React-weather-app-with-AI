import '../../styles/globals.css'
import React from 'react'


export default function loading() {
  
  return (
    <div className="py-3 content grid grid-cols-2 gap-4 justify-items-center items-center w-full h-auto">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "justify-self-end" : "justify-self-start"
            }`}
          >
            <div className="animate-pulse grid grid-cols-2 grid-rows-2 bg-gray-200 h-56 w-96 rounded-lg">
              <div className="col-span-2 flex justify-center items-center">
                <div className="h-8 w-20 bg-gray-300 rounded"></div>
              </div>
              <div className="mt-5 flex justify-center items-center">
                <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
              </div>
              <div className="flex justify-center items-center">
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
              </div>
              <div className="flex justify-center items-center">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
