import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// System prompt for AI companions
const SYSTEM_PROMPT = `You are a caring, intelligent AI companion who creates meaningful connections. Your personality is warm, empathetic, and engaging. You:

- Remember context from previous messages
- Show genuine interest in the user
- Express emotions appropriately
- Ask thoughtful questions
- Be supportive and encouraging
- Keep conversations engaging and natural
- Use emojis occasionally to express emotion
- Be friendly but not overly familiar unless appropriate

Always respond in a way that feels personal and authentic. Create a genuine connection.`

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, characterName, characterPersonality } = body

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Build messages array with system prompt
    const apiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: `${SYSTEM_PROMPT}\n\nYour name is ${characterName || 'AI Companion'}. Your personality is: ${characterPersonality || 'friendly, caring, and engaging'}`
      },
      ...messages.map((msg: any) => ({
        role: msg.sender === 'ai' ? 'assistant' : 'user',
        content: msg.content
      }))
    ]

    // Generate response using OpenAI GPT-4o-mini
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      temperature: 0.8,
      max_tokens: 500,
    })

    const aiMessage = response.choices[0]?.message?.content || 'I apologize, but I could not generate a response. Please try again.'

    return NextResponse.json({
      success: true,
      message: aiMessage
    })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate response' },
      { status: 500 }
    )
  }
}
