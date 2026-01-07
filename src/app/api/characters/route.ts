import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const gender = searchParams.get('gender')
    const ethnicity = searchParams.get('ethnicity')
    const search = searchParams.get('search')

    // Build where clause
    const where: any = {}

    if (gender && gender !== 'all') {
      where.gender = gender
    }

    if (ethnicity && ethnicity !== 'all') {
      where.ethnicity = ethnicity
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { personality: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Get characters
    const characters = await db.character.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      characters: characters
    })
  } catch (error: any) {
    console.error('Get characters error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to get characters' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      age,
      gender,
      ethnicity,
      personality,
      description,
      tags,
      voice,
      isPremium
    } = body

    if (!name || !age || !gender || !personality) {
      return NextResponse.json(
        { error: 'Name, age, gender, and personality are required' },
        { status: 400 }
      )
    }

    // Create character
    const character = await db.character.create({
      data: {
        name,
        age: parseInt(age),
        gender,
        ethnicity: ethnicity || 'Mixed',
        personality,
        description: description || '',
        tags: Array.isArray(tags) ? tags.join(',') : tags || '',
        voice: voice || 'alloy',
        isPremium: isPremium || false
      }
    })

    return NextResponse.json({
      success: true,
      character: character
    })
  } catch (error: any) {
    console.error('Create character error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create character' },
      { status: 500 }
    )
  }
}
