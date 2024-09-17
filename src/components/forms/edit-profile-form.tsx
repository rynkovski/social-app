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
import { useState } from "react";
import { Loader } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { editProfileSchema } from "@/schemas/user-schema";
import { patchUserById } from "@/actions/patch-user";
import { useQueryClient } from "@tanstack/react-query";
import { Textarea } from "../ui/textarea";
import { useGetCurrentUser } from "@/actions/get-current-user";
type Props = {
  id: number;
  setOpen: (open: boolean) => void;
};

export default function EditProfileForm({ id, setOpen }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: currentUserData } = useGetCurrentUser();

  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      description: currentUserData?.description || "",
    },
  });

  async function onSubmit(data: z.infer<typeof editProfileSchema>) {
    setIsLoading(true);
    patchUserById({ data, id })
      .then((response) => {
        setIsLoading(false);
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
        queryClient.invalidateQueries({ queryKey: ["user", id] });
        toast({
          variant: "success",
          title: "Profile updated successfully! 🥳",
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
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write something about yourself..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isLoading}
          variant={"outline"}
          className="w-full"
        >
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
}
