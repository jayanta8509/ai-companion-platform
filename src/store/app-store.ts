import { create } from 'zustand'

export type View = 'landing' | 'characters' | 'chat' | 'create-character' | 'pricing'

export interface Message {
  id: string
  sender: 'user' | 'ai'
  content: string
  contentType?: 'text' | 'image' | 'voice' | 'video'
  imageUrl?: string
  audioUrl?: string
  videoUrl?: string
  createdAt: Date
}

export interface Character {
  id: string
  name: string
  age: number
  gender: string
  ethnicity: string
  personality: string
  description: string
  avatar?: string
  tags: string
  voice?: string
  isPremium: boolean
  createdAt: Date
}

interface AppState {
  // Current view
  currentView: View

  // Character data
  characters: Character[]
  selectedCharacter: Character | null
  filters: {
    gender: string
    ethnicity: string
    search: string
  }

  // Chat data
  messages: Message[]
  isTyping: boolean

  // Actions
  setCurrentView: (view: View) => void
  setCharacters: (characters: Character[]) => void
  setSelectedCharacter: (character: Character | null) => void
  setFilters: (filters: Partial<AppState['filters']>) => void
  addMessage: (message: Message) => void
  clearMessages: () => void
  setTyping: (isTyping: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  currentView: 'landing',
  characters: [],
  selectedCharacter: null,
  filters: {
    gender: 'all',
    ethnicity: 'all',
    search: ''
  },
  messages: [],
  isTyping: false,

  // Actions
  setCurrentView: (view) => set({ currentView: view }),
  setCharacters: (characters) => set({ characters }),
  setSelectedCharacter: (character) => set({ selectedCharacter: character }),
  setFilters: (filters) => set((state) => ({
    filters: { ...state.filters, ...filters }
  })),
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  clearMessages: () => set({ messages: [] }),
  setTyping: (isTyping) => set({ isTyping })
}))
