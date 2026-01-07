'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Sparkles, X } from 'lucide-react'
import { useAppStore } from '@/store/app-store'

export function CharacterCreator() {
  const { setCurrentView } = useAppStore()

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    ethnicity: '',
    personality: '',
    description: '',
    tags: [] as string[],
    voice: 'alloy'
  })

  const [newTag, setNewTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      })
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.age || !formData.gender || !formData.personality) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/characters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags,
          isPremium: false
        })
      })

      const data = await response.json()

      if (data.success) {
        alert('Character created successfully!')
        setCurrentView('characters')
      } else {
        throw new Error(data.error || 'Failed to create character')
      }
    } catch (error) {
      console.error('Create character error:', error)
      alert('Failed to create character. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const personalityOptions = [
    'Adventurous & Spirited',
    'Intelligent & Thoughtful',
    'Creative & Artistic',
    'Confident & Supportive',
    'Playful & Flirty',
    'Nurturing & Caring',
    'Cheeky & Witty',
    'Mature & Sophisticated',
    'Charming & Confident',
    'Gentle & Supportive',
    'Vibrant & Energetic',
    'Mysterious & Intriguing',
    'Strong & Protective',
    'Quirky & Unique',
    'Elegant & Refined'
  ]

  const voiceOptions = [
    { value: 'alloy', label: 'Alloy - Balanced & Neutral' },
    { value: 'echo', label: 'Echo - Soft & Gentle' },
    { value: 'fable', label: 'Fable - Storyteller Style' },
    { value: 'onyx', label: 'Onyx - Deep & Confident' },
    { value: 'nova', label: 'Nova - Bright & Energetic' },
    { value: 'shimmer', label: 'Shimmer - Smooth & Calm' }
  ]

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
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
            Create Your{' '}
            <span className="bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              AI Companion
            </span>
          </h1>
          <p className="text-muted-foreground">
            Design your perfect companion from scratch
          </p>
        </div>
      </div>

      {/* Form */}
      <Card className="border-0 bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle>Character Details</CardTitle>
              <CardDescription>
                Tell us about your ideal companion
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">
                  Age <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="100"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="18-100"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData({ ...formData, gender: value })}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Non-binary">Non-binary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Select
                  value={formData.ethnicity}
                  onValueChange={(value) => setFormData({ ...formData, ethnicity: value })}
                >
                  <SelectTrigger id="ethnicity">
                    <SelectValue placeholder="Select ethnicity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Caucasian">Caucasian</SelectItem>
                    <SelectItem value="Asian">Asian</SelectItem>
                    <SelectItem value="Latina">Latina</SelectItem>
                    <SelectItem value="African">African</SelectItem>
                    <SelectItem value="Mixed">Mixed</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Personality */}
            <div className="space-y-2">
              <Label htmlFor="personality">
                Personality Type <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.personality}
                onValueChange={(value) => setFormData({ ...formData, personality: value })}
              >
                <SelectTrigger id="personality">
                  <SelectValue placeholder="Select personality" />
                </SelectTrigger>
                <SelectContent>
                  {personalityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your companion's background, interests, and what makes them special..."
                rows={4}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Traits & Tags</Label>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                  placeholder="Add a trait (e.g., romantic, funny)"
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:bg-red-500 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Voice */}
            <div className="space-y-2">
              <Label htmlFor="voice">Voice Style</Label>
              <Select
                value={formData.voice}
                onValueChange={(value) => setFormData({ ...formData, voice: value })}
              >
                <SelectTrigger id="voice">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {voiceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentView('characters')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
              >
                {isSubmitting ? 'Creating...' : 'Create Character'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
