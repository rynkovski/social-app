"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { login } from "@/actions/post-login";
import { loginFormSchema } from "@/schemas/sign-form-schemas";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleEyeClick = () => setIsVisible(!isVisible);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "demo",
      password: "demo1234",
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    login(data)
      .then((response) => {
        setCookie("token", response.access);
        setIsLoading(false);
        router.push("/dashboard");
        toast({
          variant: "success",
          title: "Logged successfully! 🥳",
          description: `Have fun ${data.username}!`,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Sorry, something went wrong 😔",
          description: error?.response?.data.detail,
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Username or e-mail</FormLabel>
              <FormControl>
                <Input required placeholder="Username or e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative space-y-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  required
                  type={!isVisible ? "password" : "text"}
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <div
                className="absolute cursor-pointer right-2 top-8"
                onClick={handleEyeClick}
              >
                {!isVisible ? <EyeOff /> : <Eye />}
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full rounded">
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
}
