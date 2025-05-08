import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  const { action, ...data } = await request.json()

  try {
    switch (action) {
      case 'create':
        return await handleCreateRoom(data)
      case 'enter':
        return await handleEnterRoom(data)
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Prisma error:', error)
    return NextResponse.json(
      { error: 'Operation failed', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}

async function handleCreateRoom(data: { name: string; roomName: string }) {
  const roomKey = generateKey()
  const uniqueKey = generateKey()

  const room = await prisma.roomKey.create({
    data: {
      id: roomKey,
      uniqueKey: {
        create: {
          id: uniqueKey,
          name: data.name,
          roomName: data.roomName
        }
      }
    },
    include: {
      uniqueKey: true
    }
  })

  return NextResponse.json({
    roomKey: room.id,
    uniqueKey: room.uniqueKey[0].id
  })
}

async function handleEnterRoom(data: { key: string; keyType: string }) {
  if (data.keyType === 'Unique Key') {
    const uniqueKey = await prisma.uniqueKey.findUnique({
      where: { id: data.key },
      include: { roomKey: true }
    })

    if (!uniqueKey) {
      return NextResponse.json(
        { error: 'Invalid unique key' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      roomKey: uniqueKey.roomKeyId,
      uniqueKey: uniqueKey.id
    })
  } else {
    const room = await prisma.roomKey.findUnique({
      where: { id: data.key },
      include: { uniqueKey: true }
    })

    if (!room) {
      return NextResponse.json(
        { error: 'Invalid room key' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      roomKey: room.id,
      uniqueKey: room.uniqueKey[0]?.id
    })
  }
}

function generateKey(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  
  return result;
}