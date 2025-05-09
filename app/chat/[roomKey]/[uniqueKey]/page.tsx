'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'

import TextBox from '@/components/message/textbox'
import { TopBar } from '@/components/message/top-bar'
import MessageWindow from '@/components/message/message-window'

export default function MessagePage() {
  const [message, setMessage] = useState('')
  const params = useParams()

  const uniqueKeyId = params?.uniqueKey?.toString() || ''

  const handleSend = () => {
    console.log('Sending:', message)
    setMessage('')
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar uniqueKeyId={uniqueKeyId} />

      <MessageWindow />

      <TextBox
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSubmit={handleSend}
      />
    </div>
  )
}