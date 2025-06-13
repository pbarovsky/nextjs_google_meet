"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";
import Button from "./Button";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

import sc from "@styles/components/Navbar.module.scss";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className={sc.header}>
      <Link href="/" className={sc.logo}>
        <Image src="/logo.svg" alt="Logo" width={50} height={50} />
        <span>NextJs Meet</span>
      </Link>
      <div className={sc.nav_links}>
        <Link
          href="/"
          className={`${sc.navLink} ${pathname === "/" ? sc.activeLink : ""}`}
        >
          New meeting
        </Link>
        <SignedIn>
          <Link
            href="/meeting"
            className={`${sc.navLink} ${pathname === "/meeting" ? sc.activeLink : ""}`}
          >
            Meetings
          </Link>
          <Button type="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Moon /> : <Sun />}
          </Button>
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Link className={sc.navLink} href="">
              Sign in
            </Link>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}
