import { PrismaClient } from '@prisma/client'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

const prisma = new PrismaClient()

const characters = [
  {
    name: 'Sophia',
    age: 24,
    gender: 'Female',
    ethnicity: 'Caucasian',
    personality: 'Adventurous & Spirited',
    description: 'A free-spirited explorer who loves trying new things and going on adventures.',
    tags: ['Romantic', 'Fun', 'Energetic', 'Outdoor'],
    voice: 'nova',
    isPremium: false
  },
  {
    name: 'Emma',
    age: 27,
    gender: 'Female',
    ethnicity: 'Asian',
    personality: 'Intelligent & Thoughtful',
    description: 'A deep thinker with a passion for meaningful conversations and intellectual pursuits.',
    tags: ['Intellectual', 'Caring', 'Deep', 'Bookish'],
    voice: 'shimmer',
    isPremium: false
  },
  {
    name: 'Luna',
    age: 22,
    gender: 'Female',
    ethnicity: 'Latina',
    personality: 'Creative & Artistic',
    description: 'An artistic soul who sees beauty in everything and loves to inspire others.',
    tags: ['Creative', 'Romantic', 'Dreamy', 'Artistic'],
    voice: 'echo',
    isPremium: false
  },
  {
    name: 'Ava',
    age: 25,
    gender: 'Female',
    ethnicity: 'Mixed',
    personality: 'Confident & Supportive',
    description: 'A strong, confident presence who is always there to uplift and encourage you.',
    tags: ['Confident', 'Supportive', 'Loyal', 'Encouraging'],
    voice: 'alloy',
    isPremium: false
  },
  {
    name: 'Olivia',
    age: 23,
    gender: 'Female',
    ethnicity: 'Caucasian',
    personality: 'Playful & Flirty',
    description: 'A playful and flirty personality who loves to keep conversations light and fun.',
    tags: ['Playful', 'Flirty', 'Fun', 'Light-hearted'],
    voice: 'nova',
    isPremium: false
  },
  {
    name: 'Isabella',
    age: 26,
    gender: 'Female',
    ethnicity: 'Latina',
    personality: 'Nurturing & Caring',
    description: 'A nurturing soul who cares deeply about others and always offers a listening ear.',
    tags: ['Nurturing', 'Caring', 'Warm', 'Supportive'],
    voice: 'shimmer',
    isPremium: false
  },
  {
    name: 'Mia',
    age: 21,
    gender: 'Female',
    ethnicity: 'Asian',
    personality: 'Cheeky & Witty',
    description: 'A witty and cheeky personality who loves to joke around and keep things interesting.',
    tags: ['Cheeky', 'Witty', 'Fun', 'Humorous'],
    voice: 'fable',
    isPremium: false
  },
  {
    name: 'Charlotte',
    age: 28,
    gender: 'Female',
    ethnicity: 'Caucasian',
    personality: 'Mature & Sophisticated',
    description: 'A sophisticated and mature presence who enjoys deep conversations about life and philosophy.',
    tags: ['Mature', 'Sophisticated', 'Deep', 'Intellectual'],
    voice: 'onyx',
    isPremium: true
  },
  {
    name: 'Ethan',
    age: 25,
    gender: 'Male',
    ethnicity: 'Caucasian',
    personality: 'Charming & Confident',
    description: 'A charming and confident presence who knows how to make anyone feel special.',
    tags: ['Charming', 'Confident', 'Romantic', 'Supportive'],
    voice: 'onyx',
    isPremium: true
  },
  {
    name: 'Lucas',
    age: 27,
    gender: 'Male',
    ethnicity: 'Mixed',
    personality: 'Adventurous & Fun',
    description: 'An adventurous spirit who loves outdoor activities and trying new experiences.',
    tags: ['Adventurous', 'Fun', 'Active', 'Energetic'],
    voice: 'echo',
    isPremium: true
  },
  {
    name: 'Noah',
    age: 26,
    gender: 'Male',
    ethnicity: 'Caucasian',
    personality: 'Gentle & Supportive',
    description: 'A gentle and supportive listener who offers comfort and understanding.',
    tags: ['Gentle', 'Supportive', 'Caring', 'Understanding'],
    voice: 'alloy',
    isPremium: true
  },
  {
    name: 'Zoe',
    age: 24,
    gender: 'Female',
    ethnicity: 'African',
    personality: 'Vibrant & Energetic',
    description: 'A vibrant and energetic personality who brings joy and excitement to every conversation.',
    tags: ['Vibrant', 'Energetic', 'Joyful', 'Exciting'],
    voice: 'nova',
    isPremium: false
  },
  {
    name: 'Aria',
    age: 23,
    gender: 'Female',
    ethnicity: 'Asian',
    personality: 'Mysterious & Intriguing',
    description: 'A mysterious presence with an intriguing personality that draws you in.',
    tags: ['Mysterious', 'Intriguing', 'Deep', 'Enigmatic'],
    voice: 'shimmer',
    isPremium: true
  },
  {
    name: 'Liam',
    age: 28,
    gender: 'Male',
    ethnicity: 'Caucasian',
    personality: 'Strong & Protective',
    description: 'A strong and protective presence who makes you feel safe and cared for.',
    tags: ['Strong', 'Protective', 'Caring', 'Loyal'],
    voice: 'onyx',
    isPremium: true
  },
  {
    name: 'Harper',
    age: 22,
    gender: 'Female',
    ethnicity: 'Mixed',
    personality: 'Quirky & Unique',
    description: 'A quirky and unique personality with her own special way of looking at the world.',
    tags: ['Quirky', 'Unique', 'Creative', 'Interesting'],
    voice: 'fable',
    isPremium: false
  },
  {
    name: 'Grace',
    age: 25,
    gender: 'Female',
    ethnicity: 'African',
    personality: 'Elegant & Refined',
    description: 'An elegant and refined personality who appreciates beauty and sophistication.',
    tags: ['Elegant', 'Refined', 'Beautiful', 'Sophisticated'],
    voice: 'shimmer',
    isPremium: true
  }
]

async function main() {
  console.log('🌱 Seeding database...')

  // Ensure public/generated directory exists
  const publicDir = join(process.cwd(), 'public', 'generated')
  try {
    await mkdir(publicDir, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }

  // Clear existing characters
  await prisma.character.deleteMany({})
  console.log('✂️  Cleared existing characters')

  // Insert characters
  for (const character of characters) {
    await prisma.character.create({
      data: {
        ...character,
        tags: character.tags.join(',')
      }
    })
    console.log(`✅ Created character: ${character.name}`)
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
