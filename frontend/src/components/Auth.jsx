import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

export default function Auth (props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(`${props.link}`, { username, password });
        console.log(response)
        toast.success("Success", {
            description:"Account successfully created.",
            action: {
                label: "Close",
                onClick: () => console.log("Closed")
            }
        })
      } catch (error) {
        if (error.response.status === 409) {
          toast.error("Error", {
            description: "This username already exists.",
            action: {
              label: "Close",
              onClick: () => console.log("Closed"),
            },
          });
        }
        console.error('Error registering:', error);
      }
    };

    return (
      <div className="flex justify-center align-center">
        <Card className="w-[500px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">{props.text}</CardTitle>
            <CardDescription>
              Enter your username and password below
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label>Username</Label>
              <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              {props.text}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
}