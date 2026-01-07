'use client'

import { useEffect, useState } from 'react'
import { CharacterCard } from '@/components/character/character-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/store/app-store'
import { Search, ArrowLeft, SlidersHorizontal, Grid3X3 } from 'lucide-react'

export function CharacterGallery() {
  const {
    characters,
    filters,
    setFilters,
    setCurrentView,
    setCharacters
  } = useAppStore()

  const [showFilters, setShowFilters] = useState(false)
  const [filteredCharacters, setFilteredCharacters] = useState(characters)

  useEffect(() => {
    fetchCharacters()
  }, [])

  useEffect(() => {
    let filtered = characters

    // Filter by gender
    if (filters.gender !== 'all') {
      filtered = filtered.filter(c => c.gender === filters.gender)
    }

    // Filter by ethnicity
    if (filters.ethnicity !== 'all') {
      filtered = filtered.filter(c => c.ethnicity === filters.ethnicity)
    }

    // Filter by search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(c =>
        c.name.toLowerCase().includes(searchLower) ||
        c.personality.toLowerCase().includes(searchLower) ||
        c.description.toLowerCase().includes(searchLower) ||
        c.tags.toLowerCase().includes(searchLower)
      )
    }

    setFilteredCharacters(filtered)
  }, [characters, filters])

  const fetchCharacters = async () => {
    try {
      const response = await fetch('/api/characters')
      const data = await response.json()
      if (data.success) {
        setCharacters(data.characters)
      }
    } catch (error) {
      console.error('Failed to fetch characters:', error)
    }
  }

  const genderOptions = ['all', 'Female', 'Male']
  const ethnicityOptions = ['all', 'Caucasian', 'Asian', 'Latina', 'African', 'Mixed']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentView('landing')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Meet Your{' '}
              <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                AI Companions
              </span>
            </h1>
            <p className="text-muted-foreground">
              {filteredCharacters.length} character{filteredCharacters.length !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          placeholder="Search by name, personality, or traits..."
          className="pl-10"
        />
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20 rounded-xl p-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Gender</h3>
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((option) => (
                <Badge
                  key={option}
                  variant={filters.gender === option ? 'default' : 'outline'}
                  className={`cursor-pointer capitalize ${
                    filters.gender === option
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-none'
                      : 'hover:border-violet-300'
                  }`}
                  onClick={() => setFilters({ gender: option })}
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Ethnicity</h3>
            <div className="flex flex-wrap gap-2">
              {ethnicityOptions.map((option) => (
                <Badge
                  key={option}
                  variant={filters.ethnicity === option ? 'default' : 'outline'}
                  className={`cursor-pointer capitalize ${
                    filters.ethnicity === option
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white border-none'
                      : 'hover:border-violet-300'
                  }`}
                  onClick={() => setFilters({ ethnicity: option })}
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>

          {(filters.gender !== 'all' || filters.ethnicity !== 'all' || filters.search) && (
            <Button
              variant="ghost"
              onClick={() => setFilters({ gender: 'all', ethnicity: 'all', search: '' })}
              className="text-violet-600 hover:text-violet-700"
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}

      {/* Characters Grid */}
      {filteredCharacters.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900 dark:to-fuchsia-900 flex items-center justify-center mx-auto">
            <Grid3X3 className="h-10 w-10 text-violet-500" />
          </div>
          <div>
            <p className="text-lg font-semibold">No characters found</p>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
          {(filters.gender !== 'all' || filters.ethnicity !== 'all' || filters.search) && (
            <Button
              variant="outline"
              onClick={() => setFilters({ gender: 'all', ethnicity: 'all', search: '' })}
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
