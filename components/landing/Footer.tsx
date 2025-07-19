import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-6 mt-12 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; 2025 EduVibe. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-sm hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
