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
      case 'join':
        return await handleJoinRoom(data)
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
  const roomKey = generateKey();
  const uniqueKey = generateKey();

  await prisma.roomKey.create({
    data: {
      id: roomKey,
      uniqueKey: {
        create: {
          id: uniqueKey,
          name: data.name,
          roomName: data.roomName,
        },
      },
    },
  });

  return NextResponse.json({
    roomKey,
    uniqueKey,
  });
}

async function handleEnterRoom(data: { key: string; keyType: string }) {
  if (data.keyType === 'Unique Key') {
    // Direct access for existing uniqueKey
    const uniqueKey = await prisma.uniqueKey.findUnique({
      where: { id: data.key },
      include: { roomKey: true },
    });

    if (!uniqueKey) {
      return NextResponse.json({ error: 'Invalid key' }, { status: 404 });
    }
    return NextResponse.json({
      roomKey: uniqueKey.roomKeyId,
      uniqueKey: uniqueKey.id,
    });
  } else {
    const roomExists = await prisma.roomKey.findUnique({
      where: { id: data.key },
    });
    if (!roomExists) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }
    return NextResponse.json({
      roomKey: data.key,
      needsUserInfo: true,
    });
  }
}

async function handleJoinRoom(data: { roomKey: string; roomName: string; name: string }) {
  const uniqueKey = generateKey();
  await prisma.uniqueKey.create({
    data: {
      id: uniqueKey,
      name: data.name,
      roomName: data.roomName,
      roomKeyId: data.roomKey
    },
  });
  return NextResponse.json({ roomKey: data.roomKey, uniqueKey });
}

function generateKey(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  return Array.from(randomValues)
    .map((value) => chars[value % chars.length])
    .join('');
}