'use client'

import React from 'react'
import { useState } from 'react'

import TextBox from '@/components/message/textbox'

export default function MessagePage() {
  const [message, setMessage] = useState('')

  const handleSend = () => {
    console.log('Sending:', message)
    setMessage('')
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4"></div>
      
      <TextBox
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onSubmit={handleSend}
      />
    </div>
  )
}