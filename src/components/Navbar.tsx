"use client";

import Link from "next/link";
import sc from "../styles/components/Navbar.module.scss";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className={sc.header}>
      <Link href="/" className={sc.logo}>
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        <span>NextJs Meet</span>
      </Link>
      <div className={sc.nav_links}>
        <Link href="/" className={pathname === "/" ? sc.activeLink : ""}>
          New meeting
        </Link>
        <SignedIn>
          <Link
            href="/meeting"
            className={pathname === "/meeting" ? sc.activeLink : ""}
          >
            Meetings
          </Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}
