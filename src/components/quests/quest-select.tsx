"use client";
import { useGetQuests } from "@/actions/get-quests";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "../ui/skeleton";
import { useGetCurrentUser } from "@/actions/get-current-user";
import { Quest } from "@/types/quests.types";
import { useGetQuestStatus } from "@/actions/get-quest-status";

type Props = {
  questStart: boolean;
  setQuest: (value: number) => void;
};
function QuestSelect({ setQuest, questStart }: Props) {
  const { data: questsChoices, isFetching: isFetchingQuests } = useGetQuests();
  const { data: userData } = useGetCurrentUser();
  const { data: questData } = useGetQuestStatus();

  const handleChange = (value: string) => {
    setQuest(Number(value));
  };

  if (isFetchingQuests) return <Skeleton className="w-full h-10" />;

  return (
    <Select
      onValueChange={handleChange}
      disabled={questData !== undefined || questStart}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Choose quest" />
      </SelectTrigger>
      <SelectContent
        className="z-[100]"
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchend = (e) => e.preventDefault();
        }}
      >
        {questsChoices?.map((quest: Quest) => (
          <SelectItem
            key={quest.id}
            value={quest.id}
            className="w-full h-10 z-50"
            disabled={userData?.level < quest.level_required}
          >
            <div className="flex items-center w-full gap-2">
              <p className="flex-1">{quest.title}</p>
              {userData?.level < quest.level_required ? (
                <div className="flex gap-1 text-muted-foreground">
                  (<p>{quest.level_required}</p>
                  lvl required )
                </div>
              ) : (
                <div className="flex gap-1 text-muted-foreground">
                  ({quest.duration})
                </div>
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default QuestSelect;
