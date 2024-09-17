"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useRef, useState } from "react";
import { FormControl } from "../ui/form";
import { useGetMeetingPlaces } from "@/actions/get-meeting-places";
import { Skeleton } from "../ui/skeleton";

type Place = {
  name: string;
  id: number;
  used_in_meetings: number;
};
type Props = {
  placeValue: string;
  onPlaceSelect: (value: string) => void;
};

export function SelectMeetingPlace(props: Props) {
  const { data: meetingPlaceData, isFetching } = useGetMeetingPlaces();
  const inputRef = useRef<HTMLInputElement>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [openCombobox, setOpenCombobox] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const { placeValue, onPlaceSelect } = props;

  useEffect(() => {
    if (meetingPlaceData) {
      setPlaces(meetingPlaceData);
    }
  }, [meetingPlaceData]);
  const createPlace = (name: string) => {
    const newPlace = {
      name,
      id: places.length + 1,
      used_in_meetings: 0,
    };
    setPlaces((prev) => [...prev, newPlace]);
    onPlaceSelect(newPlace.name);
  };

  const togglePlace = (place: Place) => {
    onPlaceSelect(place.name);
    inputRef?.current?.focus();
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur();
    setOpenCombobox(value);
  };

  if (isFetching)
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="w-full h-9" />
      </div>
    );

  return (
    <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className="w-full sm:w-1/2 justify-between text-foreground"
          >
            <span className="truncate">
              {!placeValue && "Select meeting place"}
              {placeValue && placeValue}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command loop>
          <CommandInput
            ref={inputRef}
            placeholder="Search place"
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandGroup className="max-h-[145px] overflow-auto">
              {places.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  No places
                </p>
              ) : (
                <>
                  {places.map((place) => {
                    const isActive = placeValue === place.name;
                    return (
                      <CommandItem
                        key={place.id}
                        value={place.name}
                        onSelect={() => togglePlace(place)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            isActive ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <div className="flex-1">{place.name}</div>
                        <div className="h-4 w-4 rounded-full">
                          {place.used_in_meetings}
                        </div>
                      </CommandItem>
                    );
                  })}
                </>
              )}

              <CommandItemCreate
                onSelect={() => createPlace(inputValue)}
                {...{ inputValue, places }}
              />
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const CommandItemCreate = ({
  inputValue,
  places,
  onSelect,
}: {
  inputValue: string;
  places: Place[];
  onSelect: () => void;
}) => {
  const hasNoPlace = !places
    .map(({ name }) => name)
    .includes(`${inputValue.toLowerCase()}`);

  const render = inputValue !== "" && hasNoPlace;

  if (!render) return null;

  // BUG: whenever a space is appended, the Create-Button will not be shown.
  return (
    <CommandItem
      key={`${inputValue}`}
      value={`${inputValue}`}
      className="text-xs text-muted-foreground"
      onSelect={onSelect}
    >
      <div className={cn("mr-2 h-4 w-4")} />
      Add new place&quot;{inputValue}&quot;
    </CommandItem>
  );
};
