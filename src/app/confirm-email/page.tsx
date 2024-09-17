"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinearGradient from "@/components/magicui/linear-gradient";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmEmail } from "@/actions/confirm-email";
import { useToast } from "@/components/ui/use-toast";
import Logo from "@/components/logo";

export default function Index() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const key = searchParams.get("key");

  const handleClick = async (key: string) => {
    confirmEmail(key)
      .then(() => {
        toast({
          variant: "success",
          title: "E-mail confirmed successfully! 🥳",
          description: `You can now log in!`,
        });
        router.push("/login");
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Sorry, something went wrong 😔",
          description: error?.response?.data.detail,
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      });
  };
  return (
    <div className="overflow-hidden">
      <Card className="mx-auto max-w-sm my-48 border-0 sm:border shadow-none sm:shadow-sm">
        <CardHeader className="flex flex-col items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-2xl mb-2"
          >
            <Logo />
           <span className="sr-only">SocialApp</span>
              <span className="font-extrabold">SocialApp</span>
          </Link>
          <CardTitle className="text-xl text-center">
            Confirm your e-mail address
          </CardTitle>
          <CardDescription className="text-center">
            Click button below
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center flex-col">
          <Button onClick={() => handleClick(key as string)}>
            Confirm e-mail
          </Button>
        </CardContent>
      </Card>
      <LinearGradient className="hidden sm:block" />
    </div>
  );
}
