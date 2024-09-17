"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormControl } from "../ui/form";
import { useGetUsers } from "@/actions/get-users";
import { Skeleton } from "../ui/skeleton";

type Participant = {
  username: string;
  id: number;
};

type Props = {
  onParticipantsSelect: any;
};

export function SelectParticipants(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Participant[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { data: usersData, isFetching } = useGetUsers();

  const { onParticipantsSelect } = props;

  useEffect(() => {
    onParticipantsSelect(selected.map((s) => s.id));
  }, [selected, onParticipantsSelect]);

  const handleUnselect = useCallback((participant: Participant) => {
    setSelected((prev) => prev.filter((s) => s.id !== participant.id));
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelected((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = usersData?.filter(
    (participant) => !selected.includes(participant)
  ) as Participant[];

  if (isFetching)
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-9" />
      </div>
    );

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible sm:w-1/2">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((participant) => {
            return (
              <Badge key={participant.id} variant="secondary">
                {participant.username}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(participant);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(participant)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          {selectables.length !== 0 && (
            <FormControl>
              <CommandPrimitive.Input
                ref={inputRef}
                value={inputValue}
                onValueChange={setInputValue}
                onBlur={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                placeholder="Select participants..."
                className="w-full bg-transparent"
              />
            </FormControl>
          )}
        </div>
      </div>
      <div className="relative ">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables?.map((participant) => {
                  return (
                    <CommandItem
                      key={participant.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelected((prev) => [...prev, participant]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {participant.username}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
