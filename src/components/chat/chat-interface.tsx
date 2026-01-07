'use client'

import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Send, Mic, Image as ImageIcon, MoreVertical, Heart } from 'lucide-react'
import { useAppStore } from '@/store/app-store'
import { Message } from '@/store/app-store'

export function ChatInterface() {
  const {
    selectedCharacter,
    messages,
    isTyping,
    setCurrentView,
    addMessage,
    setTyping,
    clearMessages
  } = useAppStore()

  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = async () => {
    if (!input.trim() || !selectedCharacter) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      contentType: 'text',
      createdAt: new Date()
    }

    addMessage(userMessage)
    setInput('')

    // Show typing indicator
    setTyping(true)

    try {
      // Call chat API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          characterName: selectedCharacter.name,
          characterPersonality: selectedCharacter.personality
        })
      })

      const data = await response.json()

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: data.message,
          contentType: 'text',
          createdAt: new Date()
        }
        addMessage(aiMessage)
      } else {
        throw new Error(data.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      addMessage({
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: 'Sorry, I encountered an error. Please try again.',
        contentType: 'text',
        createdAt: new Date()
      })
    } finally {
      setTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!selectedCharacter) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No character selected</p>
      </div>
    )
  }

  const tags = selectedCharacter.tags.split(',').filter((tag) => tag.trim())
  const gradients = [
    'from-violet-500 to-fuchsia-500',
    'from-pink-500 to-rose-500',
    'from-purple-500 to-indigo-500',
    'from-fuchsia-500 to-pink-500',
    'from-violet-600 to-purple-600',
    'from-pink-600 to-rose-600'
  ]
  const gradient = gradients[selectedCharacter.id.length % gradients.length]

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Chat Header */}
      <Card className="mb-4 border-0 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentView('characters')}
              className="flex-shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {selectedCharacter.name[0]}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{selectedCharacter.name}</h2>
                {selectedCharacter.isPremium && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none text-xs">
                    Premium
                  </Badge>
                )}
                <Badge variant="outline" className="border-green-500 text-green-600 text-xs">
                  Online
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">
                {selectedCharacter.personality}
              </p>
            </div>

            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Messages */}
      <Card className="flex-1 overflow-hidden border-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur">
        <CardContent className="p-0 h-full">
          <ScrollArea className="h-full p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900 dark:to-fuchsia-900 flex items-center justify-center">
                    <Heart className="h-10 w-10 text-violet-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Start a conversation with {selectedCharacter.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Say hello and begin your journey together
                    </p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.sender === 'ai' && (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900 dark:to-fuchsia-900 flex items-center justify-center flex-shrink-0">
                      <Heart className="h-5 w-5 text-violet-500" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 rounded-tr-none'
                        : 'bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <div className="text-xs text-muted-foreground mt-2">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      You
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-900 dark:to-fuchsia-900 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-5 w-5 text-violet-500" />
                  </div>
                  <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30 rounded-2xl rounded-tl-none p-4">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="h-2 w-2 rounded-full bg-fuchsia-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="h-2 w-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Input Area */}
      <Card className="mt-4 border-0 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-950/20 dark:to-fuchsia-950/20">
        <CardContent className="p-4">
          <div className="flex items-end gap-2">
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
                title="Voice message"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
                title="Generate image"
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Message ${selectedCharacter.name}...`}
                className="min-h-[48px]"
              />
            </div>

            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 flex-shrink-0"
              size="icon"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
