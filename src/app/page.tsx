"use client";
import { useGetPatchNotes } from "@/actions/get-patch-notes";
import { ConfettiBasicCannon } from "@/components/buttons/confetti-basic-cannon";
import Logo from "@/components/logo";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import LinearGradient from "@/components/magicui/linear-gradient";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";


export default function Home() {
  const { data: patchNotes, isFetching } = useGetPatchNotes();

  return (
    <>
      <div className="flex min-h-dvh flex-col  ">
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
            id="hero"
            className="my-36 flex h-full flex-col items-center text-center justify-center gap-4 px-3"
          >
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <Link
                href={`/patch-notes/${patchNotes && patchNotes[0]?.version}`}
              >
                <AnimatedGradientText className="mb-4">
                  🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />
                  <span
                    className={cn(
                      `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
                    )}
                  >
                    {patchNotes === undefined ? (
                      "Wrong data"
                    ) : (
                      <>
                        {isFetching ? (
                          "Loading..."
                        ) : (
                          <>
                            [{patchNotes[0]?.version}] {patchNotes[0]?.title}
                          </>
                        )}
                      </>
                    )}
                  </span>
                  <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedGradientText>
              </Link>
              <span className="text-md font-bold sm:text-lg md:text-2xl lg:text-4xl tracking-tight  flex flex-row items-center gap-1 sm:gap-2">
               Social App
              </span>
              <div className="text-gray-600 dark:text-gray-300 text-sm sm:text-md md:text-lg">
                bottom text 
              </div>
            </div>
            <div className="my-4 flex items-center space-x-4">
              <ConfettiBasicCannon />
            </div>
          </section>
        </main>
      </div>
      <LinearGradient />
    </>
  );
}
