import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen">
      <Tabs defaultValue="login" className="w-[400px]">
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
                <Input id="key" />
              </div>
              <div className="space-y-1">
                <Select>
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
              <Button>Enter</Button>
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
                <Input id="name" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="Room Name">Room Name</Label>
                <Input id="Room Name" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Create Room</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
