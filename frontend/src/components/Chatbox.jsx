"use client"
import { useState } from "react";
import axios from "axios";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Chatbox() {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
      const response = axios.post("http://localhost:3001/api/getPosts")
      console.log(response)
    };

    return (
      <>
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex flex-row items-center">
          <Textarea
            placeholder="Type your message here."
            className="w-[500px] mr-2" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button onClick={handleSubmit}>
            Send
          </Button>
        </div>
      </>
    );
}
