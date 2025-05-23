import Link from "next/link";
import sc from "../styles/components/Navbar.module.scss";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <header className={sc.header}>
      <Link href="/">New meeting</Link>
      <SignedIn>
        <div className={sc.meeting}>
          <Link href="/meeting">Meetings</Link>
          <UserButton />
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  );
}
