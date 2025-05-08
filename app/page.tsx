'use client'

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [enterData, setEnterData] = useState({
    key: '',
    keyType: 'Unique Key'
  });
  const [createData, setCreateData] = useState({
    name: '',
    roomName: ''
  });

  const handleEnter = async () => {
    const res = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'enter',
        key: enterData.key,
        keyType: enterData.keyType
      })
    });
    const data = await res.json();
    if (res.ok) router.push(`/chat/${data.roomKey}/${data.uniqueKey}`);
  };

  const handleCreate = async () => {
    const res = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create',
        name: createData.name,
        roomName: createData.roomName
      })
    });
    const data = await res.json();
    if (res.ok) router.push(`/chat/${data.roomKey}/${data.uniqueKey}`);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <Tabs defaultValue="enterRoom" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enterRoom">Enter Room</TabsTrigger>
          <TabsTrigger value="createRoom">Create Room</TabsTrigger>
        </TabsList>
        <TabsContent value="enterRoom">
          <Card>
            <CardHeader>
              <CardTitle>Enter Room</CardTitle>
              <CardDescription>
                Enter your <b>Unique key</b> for the room or <b>Room key</b> if first time entering the room.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="key">Key</Label>
                <Input 
                  id="key" 
                  value={enterData.key}
                  onChange={(e) => setEnterData({...enterData, key: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <Select
                  value={enterData.keyType}
                  onValueChange={(value) => setEnterData({...enterData, keyType: value})}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select key type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Unique Key">Unique Key</SelectItem>
                      <SelectItem value="Room Key">Room Key</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleEnter}>Enter</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="createRoom">
          <Card>
            <CardHeader>
              <CardTitle>Create Room</CardTitle>
              <CardDescription>
                You can <b>Create Room</b>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={createData.name}
                  onChange={(e) => setCreateData({...createData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="roomName">Room Name</Label>
                <Input 
                  id="roomName" 
                  value={createData.roomName}
                  onChange={(e) => setCreateData({...createData, roomName: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreate}>Create Room</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}