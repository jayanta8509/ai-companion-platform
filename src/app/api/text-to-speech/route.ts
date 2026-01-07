import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { text, voice = 'alloy' } = body

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Available voices
    const voices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']

    if (!voices.includes(voice)) {
      return NextResponse.json(
        { error: `Unsupported voice. Use one of: ${voices.join(', ')}` },
        { status: 400 }
      )
    }

    // Create ZAI instance
    const zai = await ZAI.create()

    // Generate speech
    const response = await zai.audio.speech.create({
      model: 'tts-1',
      voice: voice,
      input: text
    })

    // Get buffer
    const buffer = Buffer.from(await response.arrayBuffer())

    // Generate unique filename
    const filename = `audio_${crypto.randomBytes(16).toString('hex')}.mp3`

    // Ensure public/generated directory exists
    const publicDir = join(process.cwd(), 'public', 'generated')
    const filePath = join(publicDir, filename)

    // Write file
    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      audioUrl: `/generated/${filename}`,
      voice: voice,
      fileSize: buffer.length
    })
  } catch (error: any) {
    console.error('Text-to-speech error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate speech' },
      { status: 500 }
    )
  }
}
