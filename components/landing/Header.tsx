import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";

export function Header() {
  return (
    <header className="px-4 sm:min-w-7xl lg:px-6 h-25 flex items-center self-center bg-background/80 backdrop-blur-sm rounded-b-2xl shadow-sm top-0">
      {/* Left section - Logo */}
      <div className="flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <div className="w-8 h-8 bg-primary rounded-lg mr-2"></div>
          <span className="text-xl font-bold">EduVibe</span>
        </Link>
      </div>

      {/* Center section - Navigation */}
      <nav className="flex-1 flex items-center justify-center gap-4 sm:gap-8">
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
      </nav>

      {/* Right section - Theme toggle and Get Started button */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Link href="/sign-in">
          <Button>Get Started</Button>
        </Link>
      </div>
    </header>
  );
}