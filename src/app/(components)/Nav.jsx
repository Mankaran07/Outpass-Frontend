"use client";
import Link from "next/link";
import logo from "../../assets/outpass.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

const Nav = () => {
  const [user, setUser] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setUser("None");
          router.refresh();
          return;
        }
        const data = await axios.post("http://localhost:3002/auth/me", {
          token: token,
        });
        setUser(data.data.data.type);
        if (data.data.data.type == "student") {
          localStorage.setItem("reg", data.data.data.registrationNumber);
        }
        router.refresh();
        return;
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [pathname, refresh]);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("reg");
    router.push("/");
    setRefresh((prev) => !prev);
  };
  return (
    <nav className="flex justify-between items-center border-b-2 border-grey-300  h-[5vw] px-[100px]">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="rounded-full"
          />
        </Link>
      </div>
      {user === "student" && (
        <div>
          <Link
            href="/student/outpass"
            className="font-semibold hover:text-gray-600 hover:border-b-2 border-gray-600 mr-10"
          >
            STATUS
          </Link>
          <Link
            href="/outpass"
            className="font-semibold hover:text-gray-600 hover:border-b-2 border-gray-600 mr-10"
          >
            OUTPASS
          </Link>
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      )}
      {user === "warden" && (
        <div>
          <Link
            href="/warden/request"
            className="font-semibold hover:text-gray-600 hover:border-b-2 border-gray-600 mr-10"
          >
            REQUEST
          </Link>
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      )}
      {user === "hod" && (
        <div>
          <Link
            href="/hod/request"
            className="font-semibold hover:text-gray-600 hover:border-b-2 border-gray-600 mr-10"
          >
            REQUEST
          </Link>
          <Button onClick={handleLogout}>Log Out</Button>
        </div>
      )}
      {user === "None" && (
        <>
          <ul className="flex gap-10 mt-4">
            <li>
              <Link
                href="/"
                className="font-semibold hover:text-gray-600 hover:border-b-2 border-gray-600"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/student"
                className="font-semibold hover:text-gray-600 hover:border-b-2 border-gray-600"
              >
                STUDENT
              </Link>
            </li>
            <li>
              <Link
                href="/hod"
                className=" font-semibold hover:text-gray-600 hover:border-b-2 border-gray-600"
              >
                HOD
              </Link>
            </li>
            <li>
              <Link
                href="/warden"
                className="font-semibold hover:text-gray-600 hover:border-b-2 border-gray-600"
              >
                WARDEN
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Nav;
