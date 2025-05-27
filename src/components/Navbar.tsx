import Link from "next/link";
import sc from "../styles/components/Navbar.module.scss";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className={sc.header}>
      <div className={sc.logo}>LOGO</div>
      <div className={sc.nav_links}>
        <Link href="/">New meeting</Link>
        <SignedIn>
          <Link href="/meeting">Meetings</Link>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}
