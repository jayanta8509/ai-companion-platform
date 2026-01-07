import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const character = await db.character.findUnique({
      where: { id: params.id }
    })

    if (!character) {
      return NextResponse.json(
        { error: 'Character not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      character: character
    })
  } catch (error: any) {
    console.error('Get character error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get character' },
      { status: 500 }
    )
  }
}
