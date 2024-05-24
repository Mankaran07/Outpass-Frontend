"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
const axios = require("axios");
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
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

const Hod = () => {
  const router = useRouter();
  const { toast } = useToast();
  const register = {
    name: "",
    college_id: "",
    password: "",
    course: "",
  };

  const login = {
    college_id: "",
    password: "",
  };

  const [registerForm, setRegisterForm] = useState(register);
  const [loginForm, setLoginForm] = useState(login);

  const handleRegisterChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3002/hod/register", {
        name: registerForm.name,
        collegeId: registerForm.college_id,
        password: registerForm.password,
        course: registerForm.course,
        type: "hod",
      });
      const token = result.data.token;
      localStorage.setItem("authToken", token);
      toast({
        duration: 3000,
        variant: "success",
        description: "Register Successfully.",
      });
      setTimeout(() => {
        router.refresh();
        router.push("/");
      }, 3000);
    } catch (err) {
      console.error(err);
      toast({
        duration: 3000,
        variant: "destructive",
        description: "Please Try Again.",
      });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3002/hod/login", {
        collegeId: loginForm.college_id,
        password: loginForm.password,

        type: "hod",
      });
      const token = result.data.token;
      localStorage.setItem("authToken", token);
      toast({
        duration: 3000,
        variant: "success",
        description: "Login Successfully.",
      });
      setTimeout(() => {
        router.refresh();
        router.push("/");
        router.refresh();
      }, 3000);
    } catch (err) {
      console.error(err);
      toast({
        duration: 3000,
        variant: "destructive",
        description: "Please Try Again.",
      });
    }
  };
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
                  <Input
                    id="college_id"
                    name="college_id"
                    onChange={handleLoginChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter College Id"
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
          </TabsContent>
          <TabsContent value="Register">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Register</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    onChange={handleRegisterChange}
                    placeholder="Enter Your Name"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="college_id">College Id</Label>
                  <Input
                    id="college_id"
                    name="college_id"
                    onChange={handleRegisterChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Your College Id"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleRegisterChange}
                    placeholder="Enter Your Password"
                  />
                </div>
                <div className="pt-[10px]">
                  <Label htmlFor="Course">Course</Label>
                  <Select
                    onValueChange={(value) =>
                      setRegisterForm((prevState) => ({
                        ...prevState,
                        course: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-[350px]">
                      <SelectValue placeholder="Select Your Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="B.Tech">B.Tech</SelectItem>
                        <SelectItem value="M.Tech">M.Tech</SelectItem>
                        <SelectItem value="PGDM">PGDM</SelectItem>
                        <SelectItem value="MBA">MBA</SelectItem>
                        <SelectItem value="MCA">MCA</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="mx-auto" onClick={handleRegisterSubmit}>
                  Register
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Hod;
