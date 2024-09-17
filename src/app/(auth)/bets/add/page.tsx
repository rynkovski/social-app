import BetsForm from "@/components/forms/bets-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function Index() {
  return (
    <main className="grid flex-1 items-start gap-2 p-4 pt-2 sm:px-6 sm:py-0 md:gap-8">
      <Link href="/bets/" className="w-fit">
        <Button variant="link" className="p-0">
          <ChevronLeft size={16} />
          Return
        </Button>
      </Link>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 grid-cols-1">
          <h1 className="text-3xl font-semibold">Add bet</h1>
          <BetsForm />
        </div>
      </div>
    </main>
  );
}

export default Index;
