"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function Chatbox(props) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      axios.post("http://localhost:3001/api/getPosts")
        .then((response) => {
          if (Array.isArray(response.data)) {
            setMessages(response.data);
          } else {
            console.error("Unexpected data format:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        });
    }, []);

    const handleSubmit = () => {
      axios.post("http://localhost:3001/api/sendMessage", 
        { message }, 
        {
          headers: {
            Authorization: `${props.cookie}`
          }
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          setMessages(response.data)
        } 
        setMessage("")
        console.log(response)
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
    };    
    

    return (
        <>
            <div className="flex flex-col gap-4 mb-20">
                {messages.map((msg) => (
                    <div key={msg._id} className="flex items-start gap-4">
                        <div className="flex items-start gap-3">
                            <Link href="#" className="block" prefetch={false}>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src="/placeholder-user.jpg" alt={`@${msg.author}`} />
                                    <AvatarFallback>{msg.author[0]}</AvatarFallback>
                                </Avatar>
                            </Link>
                            <div className="grid gap-1">
                                <Link
                                    href="#"
                                    className="font-medium hover:underline"
                                    prefetch={false}
                                >
                                    {msg.author}
                                </Link>
                                <div className="max-w-[300px] rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
                                    {msg.message}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex flex-row items-center">
                <Textarea
                    placeholder="Type your message here."
                    className="w-[500px] mr-2"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleSubmit}>Send</Button>
            </div>
        </>
    );
}
