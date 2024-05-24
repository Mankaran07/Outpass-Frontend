import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./(components)/Nav";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Outpass | Hostel Pass",
  description: "Easily create Outpass for Hostel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen max-h-screen">
          <Nav />
          <div className="flex-grow overflow-y-auto">{children}</div>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
