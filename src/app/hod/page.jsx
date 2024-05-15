import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  return (
    <div className="mx-[100px]">
      <div className="flex justify-center items-center my-[100px]">
        <Tabs defaultValue="Register" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="Login">Log In</TabsTrigger>
            <TabsTrigger value="Register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="Login">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Log In</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="college_id">College Id</Label>
                  <Input id="college_id" placeholder="Enter College Id" />
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
          </TabsContent>
          <TabsContent value="Register">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Register</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter Your Name" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="college_id">College Id</Label>
                  <Input id="college_id" placeholder="Enter Your College Id" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="reg_no"
                    type="password"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="pt-[10px]">
                  <Label htmlFor="Course">Course</Label>
                  <Select>
                    <SelectTrigger className="w-[350px]">
                      <SelectValue placeholder="Select Your Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="BTech">B.Tech</SelectItem>
                        <SelectItem value="MTech">M.Tech</SelectItem>
                        <SelectItem value="PGDM">PGDM</SelectItem>
                        <SelectItem value="MBA">MBA</SelectItem>
                        <SelectItem value="MCA">MCA</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="mx-auto">Register</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
