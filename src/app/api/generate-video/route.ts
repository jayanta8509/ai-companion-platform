import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { prompt, image } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Create ZAI instance
    const zai = await ZAI.create()

    // Video generation parameters
    const params: any = {
      prompt: prompt,
      model: 'runway-gen3',
    }

    // Add image if provided
    if (image) {
      params.image = image
    }

    // Create video generation task
    const response = await zai.videos.generations.create(params)

    return NextResponse.json({
      success: true,
      taskId: response.id,
      status: response.status,
      message: 'Video generation task created successfully'
    })
  } catch (error: any) {
    console.error('Video generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create video generation task' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const taskId = searchParams.get('taskId')

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task ID is required' },
        { status: 400 }
      )
    }

    // Create ZAI instance
    const zai = await ZAI.create()

    // Check task status
    const response = await zai.videos.generations.retrieve(taskId)

    return NextResponse.json({
      success: true,
      taskId: response.id,
      status: response.status,
      result: response.result,
      error: response.error
    })
  } catch (error: any) {
    console.error('Video status check error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check video status' },
      { status: 500 }
    )
  }
}
