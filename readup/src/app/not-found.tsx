import Link from "next/link";
import { Shell } from "@/components/Shell";

export default function NotFound() {
  return (
    <Shell width="max-w-md">
      <div className="card text-center">
        <h1 className="font-serif text-2xl font-bold">Page not found</h1>
        <Link href="/" className="btn-primary mt-4">Go home</Link>
      </div>
    </Shell>
  );
}
