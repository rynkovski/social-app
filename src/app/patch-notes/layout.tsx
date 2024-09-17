import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 ">
          <nav className="flex gap-6 text-lg font-medium  flex-row items-center md:gap-5 md:text-sm lg:gap-6 justify-between w-full max-w-7xl mx-auto ">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Logo />
             <span className="sr-only">SocialApp</span>
              <span className="font-extrabold">SocialApp</span>
            </Link>
            <div className="flex items-center justify-center gap-4">
              <ModeToggle />

              <Button asChild>
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </nav>
        </header>
        <main className="w-full max-w-7xl mx-auto">
          <section
            id="patch-notes"
            className="py-2 flex h-full flex-col justify-center gap-4 "
          >
            {children}
          </section>
        </main>
      </div>
    </>
  );
}

export default Layout;
