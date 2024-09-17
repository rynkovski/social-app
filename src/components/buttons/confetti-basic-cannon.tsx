"use client";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/magicui/confetti";
import Link from "next/link";

export function ConfettiBasicCannon() {
  const handleClick = () => {
    Confetti({}); // Use default settings for basic confetti
  };

  return (
    <div className="relative justify-center">
      <Link href={"/login"}>
        <Button onClick={handleClick}>Get started!</Button>
      </Link>
    </div>
  );
}
