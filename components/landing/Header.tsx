import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link
        href="#"
        className="flex items-center justify-center"
        prefetch={false}
      >
        <div className="w-8 h-8 bg-primary rounded-lg mr-2"></div>
        <span className="text-xl font-bold">EduVibe</span>
      </Link>
      <nav className="ml-auto flex items-center gap-4 sm:gap-8">
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Home
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          Sessions
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4"
          prefetch={false}
        >
          About
        </Link>
        <ModeToggle />
        <Link href="/sign-in">
          <Button>Get Started</Button>
        </Link>
      </nav>
    </header>
  );
}
