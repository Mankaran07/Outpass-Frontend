import React from "react";
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
const page = () => {
  return (
    <div className="flex justify-center items-center my-[100px]">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Log In</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="warden_id">Warden Id</Label>
            <Input id="warden_id" placeholder="Enter Warden Id" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="mx-auto">Log In</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
