"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
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
axios.defaults.withCredentials = true;


export default function Auth () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const response = await axios.post("http://localhost:3001/auth/login", { username, password });
        console.log(response)
        toast.success("Success", {
            description:"Successfully logged in.",
            action: {
                label: "Close",
                onClick: () => console.log("Closed")
            }
        })
        delay(5000)
        router.push("/maxwalks")
      } catch (error) {
        if (error.response.status === 409) {
          toast.error("Error", {
            description: "This username already exists.",
            action: {
              label: "Close",
              onClick: () => console.log("Closed"),
            },
          });
        } else if (error.response.status === 403) {
            toast.error("Error", {
                description: "Incorrect username or password.",
                action: {
                  label: "Close",
                  onClick: () => console.log("Closed"),
                },
            });
        } else if (error.response.status === 404) {
            toast.error("Error", {
                description: "User not found.",
                action: {
                  label: "Close",
                  onClick: () => console.log("Closed"),
                },
            });
        } else {
            toast.error("Uh oh! Something went wrong.", {
                description: 'There was a problem with your request.',
                action: {
                    label: "Try again",
                    onClick: () => console.log("closed")
                }
            });
            console.error('Error registering:', error);
        }
      }
    };

    return (
      <div className="flex justify-center align-center">
        <Card className="w-[500px]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Login</CardTitle>
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
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
}