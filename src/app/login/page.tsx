import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/forms/login-form";
import Logo from "@/components/logo";
import LinearGradient from "@/components/magicui/linear-gradient";

export default function Index() {
  return (
    <div className="overflow-hidden">
      <Card className="mx-auto max-w-sm mt-24 sm:my-48 border-0 sm:border  shadow-none sm:shadow-sm">
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
            Welcome in SocialApp!
          </CardTitle>
          <CardDescription className="text-center">
            For demo purposes use below credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <div className=" text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="hover:underline">
              Register here
            </Link>
          </div>
        </CardFooter>
      </Card>
      <LinearGradient className="hidden sm:block" />
    </div>
  );
}
