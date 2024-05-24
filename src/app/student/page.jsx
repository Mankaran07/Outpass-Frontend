"use client";
import React, { useState } from "react";
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
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const Student = () => {
  const router = useRouter();
  const { toast } = useToast();
  const register = {
    name: "",
    reg_no: "",
    room: "",
    password: "",
    mobile: "",
    block: "",
    course: "",
  };

  const login = {
    reg_no: "",
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
      const result = await axios.post(
        "http://localhost:3002/student/register",
        {
          name: registerForm.name,
          registrationNumber: registerForm.reg_no,
          roomNumber: registerForm.room,
          password: registerForm.password,
          mobileNumber: registerForm.mobile,
          course: registerForm.course,
          block: registerForm.block,
          type: "student",
        }
      );
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3002/student/login", {
        registrationNumber: loginForm.reg_no,
        password: loginForm.password,
        type: "student",
      });
      const token = result.data.token;
      localStorage.setItem("authToken", token);
      toast({
        duration: 3000,
        variant: "success",
        description: "Login Successful.",
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
                  <Label htmlFor="reg_no">Registeration Number</Label>
                  <Input
                    id="reg_no"
                    name="reg_no"
                    onChange={handleLoginChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Your Registeration Number"
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
                    placeholder="Enter Your Name"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="reg_no">Registeration Number</Label>
                  <Input
                    id="reg_no"
                    name="reg_no"
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Your Registeration Number"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="room">Room Number</Label>
                  <Input
                    id="room"
                    name="room"
                    onKeyPress={handleKeyPress}
                    placeholder="Enter Your Room Number"
                    maxLength={3}
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="mobile">Mobile No.</Label>
                  <Input
                    id="mobile"
                    onKeyPress={handleKeyPress}
                    maxLength="10"
                    placeholder="Enter Your Mobile No."
                    onChange={handleRegisterChange}
                    name="mobile"
                  />
                </div>
                <div className="grid grid-cols-2 pt-[10px]">
                  <Select
                    onValueChange={(value) =>
                      setRegisterForm((prevState) => ({
                        ...prevState,
                        block: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-[173px]">
                      <SelectValue placeholder="Block" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) =>
                      setRegisterForm((prevState) => ({
                        ...prevState,
                        course: value,
                      }))
                    }
                  >
                    <SelectTrigger className="w-[173px]">
                      <SelectValue placeholder="Course" />
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

export default Student;
