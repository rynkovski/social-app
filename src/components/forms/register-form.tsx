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
import { registerFormSchema } from "@/schemas/sign-form-schemas";
import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { register } from "@/actions/post-register";

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleEyeClick = () => setIsVisible(!isVisible);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password1: "",
      password2: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    setIsLoading(true);
    register(data)
      .then(() => {
        setIsLoading(false);
        toast({
          variant: "default",
          title: "Confirm e-mail",
          description: `We have sent a confirmation link to your e-mail. Check your e-mail ${data.email}`,
        });
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        for (const [key, value] of Object.entries(error?.response?.data)) {
          toast({
            variant: "destructive",
            title: "Sorry, something went wrong 😔",
            description: value as string,
          });
        }
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input required placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input required placeholder="E-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password1"
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

        <FormField
          control={form.control}
          name="password2"
          render={({ field }) => (
            <FormItem className="relative space-y-2">
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  required
                  type={!isVisible ? "password" : "text"}
                  placeholder="Confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full rounded">
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Register"
          )}
        </Button>
      </form>
    </Form>
  );
}
