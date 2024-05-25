"use client";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import React, { useEffect, useState } from "react";

const WardenRequest = () => {
  const [data, setData] = useState([]);
  const { toast } = useToast();
  useEffect(() => {
    const fetchOutpass = async () => {
      try {
        const res = await axios.get("http://localhost:3002/warden/request");
        setData(res.data.outpass);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOutpass();
  }, []);

  const handleAccept = async (id) => {
    try {
      const decision = "accepted";
      await axios.patch("http://localhost:3002/warden/update", {
        id: id,
        decision: decision,
      });
      toast({
        duration: 3000,
        variant: "success",
        description: "Updated Successfully.",
      });
      fetchOutpass();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const decision = "rejected";
      await axios.patch("http://localhost:3002/warden/update", {
        id: id,
        decision: decision,
      });
      toast({
        duration: 3000,
        variant: "success",
        description: "Updated Successfully.",
      });
      fetchOutpass();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchOutpass = async () => {
    try {
      const res = await axios.get("http://localhost:3002/warden/request");
      setData(res.data.outpass);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto my-[80px]">
      <h1 className="text-center text-4xl font-semibold ">Requests</h1>
      {data.length === 0 && (
        <h2 className="text-center mt-[5vw] text-red-500 text-lg">
          No Request
        </h2>
      )}
      <div className="grid grid-cols-3 mx-[100px] mt-[4vw]">
        {data.map((outpass) => (
          <Card key={outpass._id} className="w-[350px] rounded-xl ml-20">
            <CardHeader>
              <CardTitle className="text-center">Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-5">
                <div className="flex">
                  <label className="mr-5">Journey Date:</label>
                  <p>{new Date(outpass.journey_from).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">Journey To:</label>
                  <p>{new Date(outpass.journey_to).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">State</label> <p>{outpass.state}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">Zip</label> <p>{outpass.zip}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">Mode of Transport</label>{" "}
                  <p>{outpass.modeOfTransport}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">Reason</label>
                  <p>{outpass.reason}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleReject(outpass._id)}
              >
                Reject
              </Button>
              <Button onClick={() => handleAccept(outpass._id)}>Accept</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WardenRequest;
