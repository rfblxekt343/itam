'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';

export default function ClientHeroesPage({ heroes }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHeroes = heroes.filter(hero =>
    hero.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-center text-emerald-700 mb-8">
        הגיבורים
      </h1>

      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative shadow-sm">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="חפש גיבור..."
            dir="rtl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 p-2.5 text-right text-slate-800 placeholder-slate-400 border border-emerald-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 bg-white shadow transition duration-200"
          />
        </div>
      </div>

      {/* Heroes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHeroes.map((hero) => (
          <Link
            key={hero.id}
            href={`/hero/${encodeURIComponent(hero.fullName)}`}
            className="block group transition-transform duration-300 hover:scale-105"
          >
            <div className="relative bg-gradient-to-br from-emerald-50 to-indigo-50 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              {/* Top Badge */}
              <div className="absolute top-0 right-0 bg-emerald-600 text-white px-3 py-1 text-xs font-medium rounded-bl-xl shadow">
                לחץ לעמוד הגיבור
              </div>

              <h2 className="text-xl font-semibold text-slate-800 mb-4 mt-6 group-hover:text-emerald-700 transition-colors">
                {hero.fullName}
              </h2>

              {/* Hero Image */}
              <div className="flex justify-center">
                <div className="relative w-[200px] h-[200px]">
                  <Image
                    src={`/images/heroes/${hero.fullName}/photo1.jpeg`}
                    alt={hero.fullName}
                    width={200}
                    height={200}
                    className="rounded-xl object-cover w-full h-full shadow-sm border border-emerald-100"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Message */}
      {filteredHeroes.length === 0 && (
        <div className="text-center text-slate-600 mt-12 text-lg">
          לא נמצאו גיבורים התואמים את החיפוש
        </div>
      )}
    </div>
  );
}
