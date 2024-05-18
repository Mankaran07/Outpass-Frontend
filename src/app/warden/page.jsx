"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
const Warden = () => {
  const login = {
    warden_id: "",
    password: "",
  };
  const [loginForm, setLoginForm] = useState(login);
  const handleLoginChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleKeyPress = (e) => {
    const allowedKeys = /[0-9\b]/;
    if (!allowedKeys.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleLoginSubmit = () => {
    console.log(loginForm);
  };
  return (
    <div className="flex justify-center items-center my-[100px]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Log In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="warden_id">Warden Id</Label>
            <Input
              id="warden_id"
              name="warden_id"
              placeholder="Enter Warden Id"
              onChange={handleLoginChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              onChange={handleLoginChange}
              placeholder="Enter Your Password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="mx-auto" onClick={handleLoginSubmit}>
            Log In
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Warden;
