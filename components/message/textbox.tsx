import React from 'react'
import Image from 'next/image'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface TextBoxProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
}

const TextBox = ({ value, onChange, onSubmit }: TextBoxProps) => {
    return (
        <form
            className="flex w-full items-center space-x-2 p-4 border-t"
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
            }}
        >
            <Input
                placeholder="Type your message..."
                value={value}
                onChange={onChange}
            />
            <Button type="submit">
                <Image
                    src="/send.svg"
                    width={24}
                    height={24}
                    alt="Send message"
                    className="hover:scale-110 transition-transform"
                />
            </Button>
        </form>
    )
}

export default TextBox