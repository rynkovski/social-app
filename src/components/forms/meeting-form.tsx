"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { meetingSchema } from "@/schemas/meeting-schema";
import { Calendar } from "../ui/calendar";
import { toast } from "../ui/use-toast";
import { SelectMeetingPlace } from "../meetings/select-meeting-place";
import { SelectParticipants } from "../meetings/select-participants";
import { postMeeting } from "@/actions/post-meeting";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";

function MeetingForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();

  const today = new Date();
  const form = useForm<z.infer<typeof meetingSchema>>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      participants: [],
      date: today,
    },
  });

  async function onSubmit(data: z.infer<typeof meetingSchema>) {
    console.log(data);
    postMeeting({ ...data, date: format(data.date, "yyyy-MM-dd") })
      .then(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["meeting-places"] });
        queryClient.invalidateQueries({ queryKey: ["meetings"] });
        router.push("/meetings");
        toast({
          variant: "success",
          title: "Meeting added successfully! 🎉",
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
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Meeting date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full sm:w-1/2 pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Select date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Participants</FormLabel>
              <SelectParticipants onParticipantsSelect={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="place_name"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Place</FormLabel>
              <SelectMeetingPlace
                placeValue={field.value}
                onPlaceSelect={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add meeting description..."
                  className="resize-none w-full sm:w-1/2"
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
          className="w-full sm:w-1/2 rounded"
        >
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "ADD MEETING"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default MeetingForm;
