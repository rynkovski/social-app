import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinearGradient from "@/components/magicui/linear-gradient";
import RegisterForm from "@/components/forms/register-form";
import Logo from "@/components/logo";

export default function Index() {
  return (
    <div className="overflow-hidden ">
      <Card className="mx-auto max-w-sm mt-12 sm:my-48 border-0 sm:border  shadow-none sm:shadow-sm">
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
            Join to our community!
          </CardTitle>
          <CardDescription className="text-center">
         You won&apos;t regret it
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
      <LinearGradient className="hidden" />
    </div>
  );
}
