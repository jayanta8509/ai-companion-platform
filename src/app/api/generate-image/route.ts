import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import crypto from 'crypto'

// Supported image sizes
const SUPPORTED_SIZES = [
  '1024x1024',
  '768x1344',
  '864x1152',
  '1344x768',
  '1152x864',
  '1440x720',
  '720x1440'
]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, size = '1024x1024' } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    if (!SUPPORTED_SIZES.includes(size)) {
      return NextResponse.json(
        { error: `Unsupported size. Use one of: ${SUPPORTED_SIZES.join(', ')}` },
        { status: 400 }
      )
    }

    // Create ZAI instance
    const zai = await ZAI.create()

    // Generate image
    const response = await zai.images.generations.create({
      prompt: prompt,
      size: size
    })

    const imageBase64 = response.data[0]?.base64

    if (!imageBase64) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      )
    }

    // Convert base64 to buffer
    const buffer = Buffer.from(imageBase64, 'base64')

    // Generate unique filename
    const filename = `img_${crypto.randomBytes(16).toString('hex')}.png`

    // Ensure public/generated directory exists
    const publicDir = join(process.cwd(), 'public', 'generated')
    const filePath = join(publicDir, filename)

    // Write file
    await writeFile(filePath, buffer)

    return NextResponse.json({
      success: true,
      imageUrl: `/generated/${filename}`,
      size: size,
      fileSize: buffer.length
    })
  } catch (error: any) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate image' },
      { status: 500 }
    )
  }
}
