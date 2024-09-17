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
import { Calendar } from "../ui/calendar";
import { toast } from "../ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { betsSchema } from "@/schemas/bets-schema";
import { postBet } from "@/actions/post-bet";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";

function BetsForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string>("22:00");
  const today = new Date();

  const form = useForm<z.infer<typeof betsSchema>>({
    resolver: zodResolver(betsSchema),
    defaultValues: {
      text: "",
      label_1: "",
      label_2: "",
      ratio_1: 2,
      ratio_2: 2,
    },
  });

  async function onSubmit(data: z.infer<typeof betsSchema>) {
    setIsLoading(true);
    postBet(data)
      .then(() => {
        setIsLoading(false);
        queryClient.invalidateQueries({ queryKey: ["bets"] });
        router.push("/bets");
        toast({
          variant: "success",
          title: "Success! 🎉",
          description: "New bet added successfully!",
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
          name="text"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Bet title<span className="text-red-500">*</span>
              </FormLabel>
              <Input
                type="text"
                placeholder="ex. Will the AI take over humanity?"
                className="w-full sm:w-1/2 space-y-0"
                {...field}
                required
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label_1"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Label 1:</FormLabel>
              <Input
                type="text"
                placeholder="ex. Yes"
                className="w-full sm:w-1/2 space-y-0"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label_2"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Label 2:</FormLabel>
              <Input
                type="text"
                placeholder="ex. No"
                className="w-full sm:w-1/2 space-y-0"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ratio_1"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ratio for label 1:</FormLabel>
              <Input
                type="number"
                inputMode="numeric"
                min={1.05}
                step={0.01}
                placeholder={"Ratio for label 1"}
                className="w-full sm:w-1/2 space-y-0"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ratio_2"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ratio for label 2:</FormLabel>
              <Input
                type="number"
                inputMode="numeric"
                step={0.01}
                max={3}
                placeholder="Ratio for label 2"
                className="w-full sm:w-1/2 space-y-0"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full sm:w-1/2">
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full">
                <FormLabel>
                  Deadline<span className="text-red-500">*</span>
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          `${format(field.value, "PPP")}, ${time}`
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
                      selected={date || field.value}
                      onSelect={(selectedDate) => {
                        const [hours, minutes] = time?.split(":")!;
                        selectedDate?.setHours(
                          parseInt(hours),
                          parseInt(minutes)
                        );
                        setDate(selectedDate!);
                        field.onChange(selectedDate);
                      }}
                      onDayClick={() => setIsOpen(false)}
                      fromYear={2000}
                      toYear={new Date().getFullYear()}
                      disabled={(date) =>
                        Number(date) < Date.now() - 1000 * 60 * 60 * 24
                      }
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>
                  Time<span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={time!}
                    onValueChange={(e) => {
                      setTime(e);
                      if (date) {
                        const [hours, minutes] = e.split(":");
                        const newDate = new Date(date.getTime());
                        newDate.setHours(parseInt(hours), parseInt(minutes));
                        setDate(newDate);
                        field.onChange(newDate);
                      }
                    }}
                  >
                    <SelectTrigger className="font-normal focus:ring-0 w-full mt-4 mr-2">
                      <SelectValue />
                    </SelectTrigger>
                    <div>
                      <SelectContent className="border-none shadow-none mt-2">
                        <ScrollArea className="h-[15rem]">
                          {Array.from({ length: 24 }).map((_, i) => {
                            const hour = i.toString().padStart(2, "0");
                            return (
                              <SelectItem
                                key={i}
                                value={`${hour}:00`}
                                disabled={
                                  today.getDay() === date?.getDay() &&
                                  i <= today.getHours()
                                }
                              >
                                {hour}:00
                              </SelectItem>
                            );
                          })}
                        </ScrollArea>
                      </SelectContent>
                    </div>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-1/2 rounded"
        >
          {isLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "ADD BET"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default BetsForm;
