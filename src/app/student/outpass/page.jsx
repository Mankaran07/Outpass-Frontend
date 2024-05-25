"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";

const StatusPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchOutpass = async () => {
      try {
        const id = localStorage.getItem("reg");

        const response = await axios.get(
          "http://localhost:3002/student/status",
          {
            headers: {
              id: id,
            },
          }
        );

        const fetchedData = response.data.outpass;
        console.log("Fetched Data:", fetchedData);

        const updatedData = fetchedData.map((item) => {
          const status = updateMessage(item);
          return { ...item, status };
        });

        setData(updatedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOutpass();
  }, []);

  const updateMessage = (item) => {
    const { statusByWarden, statusByHod } = item;

    if (statusByHod === "pending" && statusByWarden === "pending") {
      return "🟡 In Progress";
    } else if (statusByHod === "rejected" || statusByWarden === "rejected") {
      return "❌ Rejected";
    } else if (statusByHod === "accepted" && statusByWarden === "accepted") {
      return "✅ Accepted";
    }
    return "🟡 In Progress";
  };
  return (
    <div className="mx-auto my-[80px]">
      <h1 className="text-center text-4xl font-semibold ">Requests</h1>
      <div className="grid grid-cols-3 mx-[100px] mt-[4vw]">
        {data.map((outpass) => (
          <Card key={outpass._id} className="w-[350px] rounded-xl">
            <CardHeader>
              <CardTitle className="text-center">Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 justify-center">
                <div className="flex">
                  <label className="mr-5">Journey From:</label>
                  <p>{new Date(outpass.journey_from).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">Journey To:</label>
                  <p>{new Date(outpass.journey_to).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">State:</label>
                  <p>{outpass.state}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">Zip:</label>
                  <p>{outpass.zip}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">Mode of Transport:</label>
                  <p>{outpass.modeOfTransport}</p>
                </div>
                <div className="flex">
                  <label className="mr-5">Reason:</label>
                  <p>{outpass.reason}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <h2 className="text-center text-xl font-semibold">
                {outpass.status}
              </h2>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatusPage;
