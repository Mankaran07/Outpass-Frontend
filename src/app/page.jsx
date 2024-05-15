import { Button } from "@/components/ui/button";
import Image from "next/image";
import hostel from "../assets/hostel.png";
import FAQ from "./(components)/FAQ";

export default function Home() {
  return (
    <main className="mx-[100px] bg-zinc-50">
      <div className="flex mt-[100px]">
        <div className="w-1/2">
          <h1 className="text-4xl font-extrabold text-center">
            Welcome to E-Outpass
          </h1>
          <h4 className="text-xl font-bold text-center mt-[5px]">
            Streamlined Permissions for Leaving the College Hostel
          </h4>
          <p className="text-base font-medium text-center mt-[30px] text-gray-600">
            With E-Outpass, effortlessly navigate the process of obtaining
            permissions from HODs and wardens, ensuring a smooth experience for
            your hostel departures.
          </p>
        </div>
        <div className="w-1/2 flex justify-center">
          <Image
            src={hostel}
            alt="hostel"
            width={500}
            height={500}
            className="rounded-2xl"
          />
        </div>
      </div>

      <FAQ />
    </main>
  );
}
