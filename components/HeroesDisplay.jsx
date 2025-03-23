// app/heroes/client-component.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function ClientHeroesPage({ heroes }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter heroes based on search query
  const filteredHeroes = heroes.filter(hero => 
    hero.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-lime-600 text-3xl md:text-4xl font-extrabold text-center mb-6 text-gray-800">
        הגיבורים
      </h1>
      
      {/* Search component */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full pr-10 p-2.5 text-right"
            placeholder="חפש גיבור..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            dir="rtl"
          />
        </div>
      </div>
      
      {/* Heroes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredHeroes.map((hero) => (
          <Link
            href={`/hero/${encodeURIComponent(hero.fullName)}`}
            key={hero.id}
            className="block transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-lime-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden p-4 text-center relative">
              {/* Badge */}
              <div className="absolute top-0 right-0 bg-lime-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                לחץ לעמוד הגיבור
              </div>
              
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 mt-6">
                {hero.fullName}
              </h2>
              
              <div className="flex justify-center">
                <div className="relative">
                  <Image
                    src={`/images/heroes/${hero.fullName}/photo1.jpeg`}
                    alt={hero.fullName}
                    width={200}
                    height={200}
                    className="rounded-lg object-contain w-[200px] h-[200px] shadow-sm"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredHeroes.length === 0 && (
        <div className="text-center text-gray-600 mt-12 text-lg">
          לא נמצאו גיבורים התואמים את החיפוש
        </div>
      )}
    </div>
  );
}