// lib/search-utils.ts

export interface SearchResult {
    id: string
    name: string
    unit: string
    rank: string
    city?: string
    placeOfFalling?: string
    specialTraining?: string[]
    operations?: string[]
    slug?: string
  }
  
  export function createSlug(name: string): string {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-\u0590-\u05FF]+/g, '')
  }
  
  export function highlightMatch(text: string, query: string): string {
    if (!query) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
  }
  
  export function formatSearchResult(result: SearchResult): string {
    const parts = [result.rank, result.unit].filter(Boolean)
    return parts.join(' | ')
  }