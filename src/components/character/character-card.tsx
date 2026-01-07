'use client'

import { Character } from '@/store/app-store'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MessageSquare, Crown } from 'lucide-react'
import { useAppStore } from '@/store/app-store'

interface CharacterCardProps {
  character: Character
}

export function CharacterCard({ character }: CharacterCardProps) {
  const setSelectedCharacter = useAppStore((state) => state.setSelectedCharacter)
  const setCurrentView = useAppStore((state) => state.setCurrentView)

  const tags = character.tags.split(',').filter((tag) => tag.trim())

  const handleChatClick = () => {
    setSelectedCharacter(character)
    setCurrentView('chat')
  }

  // Generate gradient based on character id
  const gradients = [
    'from-violet-500 to-fuchsia-500',
    'from-pink-500 to-rose-500',
    'from-purple-500 to-indigo-500',
    'from-fuchsia-500 to-pink-500',
    'from-violet-600 to-purple-600',
    'from-pink-600 to-rose-600'
  ]
  const gradient = gradients[character.id.length % gradients.length]

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
      {character.isPremium && (
        <div className="absolute top-3 right-3 z-10">
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
            <Crown className="h-3 w-3" />
            Premium
          </div>
        </div>
      )}

      <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-br ${gradient}`} />

      <CardContent className="relative p-6 pt-36">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-20 w-20 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-white dark:border-gray-800">
          {character.name[0]}
        </div>

        <div className="text-center space-y-2 pt-2">
          <h3 className="text-xl font-bold">{character.name}</h3>
          <p className="text-sm text-muted-foreground">
            Age {character.age} • {character.gender}
          </p>
          <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
            {character.personality}
          </p>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
            {character.description}
          </p>

          <div className="flex flex-wrap justify-center gap-1.5 pt-2">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
              >
                {tag.trim()}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        </div>

        <Button
          onClick={handleChatClick}
          className="w-full mt-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
          size="sm"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Chat Now
        </Button>
      </CardContent>
    </Card>
  )
}
