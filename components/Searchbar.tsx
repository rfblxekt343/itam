import React, { useState, useEffect, useCallback } from 'react'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SearchResult, formatSearchResult } from '@/lib/search-utils'

// Simple client-side cache
const searchCache = new Map<string, { timestamp: number, results: SearchResult[] }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

const Searchbar = () => {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use useCallback to prevent recreating the search function on each render
  const searchHeroes = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([])
      setError(null)
      return
    }

    // Check cache first
    const cacheKey = query.toLowerCase();
    const cachedData = searchCache.get(cacheKey);
    if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_TTL) {
      setResults(cachedData.results);
      return;
    }

    setIsSearching(true)
    setError(null)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) throw new Error('Search failed')

      const data = await response.json()
      setResults(data.results)
      
      // Update cache
      searchCache.set(cacheKey, {
        timestamp: Date.now(),
        results: data.results
      });
    } catch (error) {
      console.error('Search error:', error)
      setError('חיפוש נכשל. אנא נסה שוב.')
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }, [])

  useEffect(() => {
    const debounce = setTimeout(() => searchHeroes(searchValue), 500) // Increased to 500ms
    return () => clearTimeout(debounce)
  }, [searchValue, searchHeroes])

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    setSearchValue('')
    setResults([])
    setError(null)
    setIsExpanded(false)
  }

  const handleResultClick = useCallback((result: SearchResult) => {
    router.push(`/hero/${result.slug}`)
    setSearchValue('')
    setResults([])
    setIsExpanded(false)
  }, [router])
  
  return (
    <div className="flex justify-center items-center p-4">
      <div className="relative">
        <div className={`relative flex items-center ${isExpanded ? 'w-72' : 'w-12'} h-12 transition-all duration-300`}>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="חפש גיבור..."
            className={`
              w-full h-full
              pl-12 pr-10 py-2
              bg-white dark:bg-gray-800
              border border-gray-300 dark:border-gray-700
              rounded-full outline-none
              text-gray-700 dark:text-gray-200
              placeholder-gray-500 dark:placeholder-gray-400
              transition-all duration-300 ease-in-out
              focus:border-lime-500 dark:focus:border-lime-400
              focus:ring-2 focus:ring-lime-200 dark:focus:ring-lime-800
              ${isExpanded ? 'opacity-100' : 'opacity-0'}
              text-right
              dir="rtl"
            `}
          />
          <button onClick={() => !isExpanded && setIsExpanded(true)} className="absolute right-0 p-3 text-gray-600 dark:text-gray-400 hover:text-lime-500 dark:hover:text-lime-400 transition-colors duration-300">
            <Search size={20} />
          </button>
  
          {searchValue && isExpanded && (
            <button onClick={handleClear} className="absolute left-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors duration-300">
              <X size={18} />
            </button>
          )}
        </div>
  
        {/* Search Results Dropdown */}
        {isExpanded && (results.length > 0 || error || isSearching) && (
          <div className="absolute top-14 right-0 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            {isSearching && (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400 text-right">
                מחפש...
              </div>
            )}
            {error && (
              <div className="px-4 py-2 text-red-500 text-right">
                {error}
              </div>
            )}
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => handleResultClick(result)}
                className="w-full text-right px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="font-medium">{result.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatSearchResult(result)}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Searchbar