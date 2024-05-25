"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectGroup,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Jammu and Kashmir",
  "Ladakh",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

const StudentForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [date, setDate] = useState({
    from: new Date(2024, 4, 20),
    to: addDays(new Date(2024, 4, 20), 5),
  });

  const [data, setData] = useState({
    state: "",
    zip: "",
    modeOfTransport: "",
    message: "",
    permission: false,
  });
  const handleKeyPress = (e) => {
    const allowedKeys = /[0-9\b]/;
    if (!allowedKeys.test(e.key)) {
      e.preventDefault();
    }
  };
  const handleClick = async (e) => {
    const finalData = {
      ...date,
      ...data,
    };
    e.preventDefault();
    try {
      const reg = localStorage.getItem("reg");
      const result = await axios.post("http://localhost:3002/outpass/create", {
        journey_from: finalData.from,
        journey_to: finalData.to,
        state: finalData.state,
        zip: finalData.zip,
        modeOfTransport: finalData.modeOfTransport,
        reason: finalData.message,
        student: reg,
      });
      toast({
        duration: 3000,
        variant: "success",
        description: "Outpass Created Successfully.",
      });
      setTimeout(() => {
        router.refresh();
        router.push("/");
        router.refresh();
      }, 3000);
    } catch (error) {
      console.error(error);
      toast({
        duration: 3000,
        variant: "destructive",
        description: "Please Fill Correct Information.",
      });
    }
  };

  return (
    <div className="m-[100px] flex justify-center items-center">
      <Card className="w-[30vw] flex justify-center items-center flex-col">
        <CardHeader>
          <CardTitle>Outpass</CardTitle>
          <CardDescription>Fill The Details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className={"grid gap-5"}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={1}
                />
              </PopoverContent>
            </Popover>
            <div>
              <Label htmlFor="State">State</Label>
              <Select
                value={data.state}
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, state: value }))
                }
              >
                <SelectTrigger className="w-[20vw]">
                  <SelectValue placeholder="State You Are Travelling" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {indianStates.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="Zip">Zip</Label>
              <Input
                id="zip"
                placeholder="Enter The Zip Code"
                className="w-[20vw]"
                value={data.zip}
                onKeyPress={handleKeyPress}
                maxLength={6}
                onChange={({ target: { name, value } }) =>
                  setData((prev) => ({ ...prev, zip: value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="transport">Mode Of Transport</Label>
              <Select
                value={data.modeOfTransport}
                name="modeOfTransport"
                onValueChange={(value) =>
                  setData((prev) => ({ ...prev, modeOfTransport: value }))
                }
              >
                <SelectTrigger className="w-[20vw]">
                  <SelectValue placeholder="Select Mode of Transport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Plane">Plane</SelectItem>
                    <SelectItem value="Train">Train</SelectItem>
                    <SelectItem value="Bus">Bus</SelectItem>
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="reason">Reason For Leave</Label>
              <Textarea
                placeholder="Not More than 200 words"
                id="message"
                className="w-[20vw]"
                name="message"
                value={data.message}
                onChange={({ target: { name, value } }) =>
                  setData((prev) => ({ ...prev, message: value }))
                }
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="permission"
                name="permission"
                checked={data.permission}
                onCheckedChange={(val) =>
                  setData((prev) => ({ ...prev, permission: val }))
                }
              />
              <label
                htmlFor="permission"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Have You Sought Permission From Your Guardians
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleClick}>Send Request</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentForm;
