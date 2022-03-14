import Link from "next/link";

export default function Nav() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/register">Registration</Link>
      <Link href="/login">Login</Link>
      <Link href="/speakers">Speakers</Link>
      <Link href="/schedule">Schedule</Link>
    </div>
  );
}
