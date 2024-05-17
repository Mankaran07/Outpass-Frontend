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
        <Card className="w-[350px] rounded-xl">
          <CardHeader>
            <CardTitle className="text-center">Outpass Details</CardTitle>
          </CardHeader>
          <CardContent></CardContent>
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
