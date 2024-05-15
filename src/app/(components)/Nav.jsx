import Link from "next/link";
import logo from "../../assets/outpass.png";
import Image from "next/image";

const Nav = () => {
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
    </nav>
  );
};

export default Nav;
