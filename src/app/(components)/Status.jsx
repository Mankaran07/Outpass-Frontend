import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Status = () => {
  return (
    <div className="mx-auto my-[100px]">
      <h1 className="text-center text-4xl font-semibold ">Request</h1>
      <div>
        <Card className="w-[350px] rounded-xl ml-20">
          <CardHeader>
            <CardTitle className="text-center">Outpass Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-5">
              <div className="flex">
                <label className="mr-5">Journey Date:</label>
                <p>16th March 2024</p>
              </div>
              <div className="flex">
                <label className="mr-5">Journey To:</label>
                <p>18th March 2024</p>
              </div>
              <div className="flex">
                <label className="mr-5">State</label> <p>Delhi</p>
              </div>
              <div className="flex">
                <label className="mr-5">Zip</label> <p>110027</p>
              </div>
              <div className="flex">
                <label className="mr-5">Mode of Transport</label> <p>Bus</p>
              </div>
              <div className="flex">
                <label className="mr-5">Reason</label>{" "}
                <p>Had to Attend a Wedding</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reject</Button>
            <Button>Accept</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Status;
