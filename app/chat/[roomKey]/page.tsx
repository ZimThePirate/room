'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function RoomJoinPage({ params }: { params: { roomKey: string } }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [roomName, setRoomName] = useState('')
  const [error, setError] = useState('')

  const handleJoin = async () => {
    if (!name.trim() || !roomName.trim()) {
      setError('Please fill all fields')
      return
    }

    try {
      const res = await fetch('/api/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'join',
          roomKey: params.roomKey,
          name: name.trim(),
          roomName: roomName.trim()
        })
      })

      const data = await res.json()
      if (res.ok) {
        router.push(`/chat/${data.roomKey}/${data.uniqueKey}`)
      } else {
        setError(data.error || 'Failed to join room')
      }
    } catch (err) {
      setError('Network error occurred')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Join Room</CardTitle>
          <CardDescription>
            Enter your details to join the room
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError('')
              }}
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomName">Room Name</Label>
            <Input
              id="roomName"
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value)
                setError('')
              }}
              placeholder="Enter room name"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleJoin}>Join Room</Button>
        </CardFooter>
      </Card>
    </div>
  )
}