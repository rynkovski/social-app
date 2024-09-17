"use client";

import { useGetCurrentUser } from "@/actions/get-current-user";
import { RadarChartStats } from "@/components/charts/radar-stats-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetUserById } from "@/actions/get-user";
import { useGetUsers } from "@/actions/get-users";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot, EditIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfileForm from "@/components/forms/edit-profile-form";
import { useState } from "react";

function Index({ params }: { params: { slug: string } }) {
  const { data: usersData } = useGetUsers();
  const { data: currentUserData } = useGetCurrentUser();
  const [open, setOpen] = useState(false);

  const id = usersData?.find((user) => user.username === params.slug)
    ?.id as number;

  const { data: userData, isFetching: isFetchingUserData } = useGetUserById(id);
  const userJoinedDate = userData?.date_joined?.split("T")[0] as string;

  if (isFetchingUserData)
    return (
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2">
        <Card>
          <CardContent className="flex flex-col gap-4 items-center justify-center p-6">
            <Skeleton className="w-44 h-44 rounded-full" />
            <Skeleton className="w-36 h-6" />
            <Skeleton className="w-36 h-6" />
            <Skeleton className="w-36 h-6" />
            <Skeleton className="w-36 h-6" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="w-full h-12" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="w-full h-12" />
          </CardContent>
        </Card>
      </div>
    );

  if (id === undefined && params.slug !== "bot")
    return (
      <div className="flex justify-center items-center mt-20">
        <Card className="text-center">
          <CardHeader>
            <CardTitle>404 Not Found</CardTitle>
          </CardHeader>
          <CardContent>User doesn &apos;t exist 😞</CardContent>
        </Card>
      </div>
    );

  return (
    <section className="p-2">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 ">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex flex-col justify-center items-center">
              {params.slug === "bot" ? (
                <>
                  <Bot
                    size={96}
                    className="bg-slate-500 p-2 rounded-full text-white"
                  />
                </>
              ) : (
                <div className="flex justify-center items-center bg-muted border border-muted-foreground w-44 h-44 text-5xl rounded-full shadow-lg">
                  {Array.from(params.slug)[0].toUpperCase()}
                </div>
              )}
              <div className="flex flex-col my-4 items-center justify-center">
                <CardTitle className="text-2xl">
                  {params.slug === "bot" ? "Friendly bot" : params.slug}
                </CardTitle>
                <CardDescription>
                  {params.slug === "bot" ? "Bot" : "User"}
                </CardDescription>
                {params.slug === "bot" && (
                  <div className="text-green-700 text-sm">Online</div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div>
              <span className="my-2 flex items-center justify-center gap-2  bg-fuchsia-300 dark:bg-fuchsia-800 border border-fuchsia-400 dark:border-fuchsia-700 text-fuchsia-700 dark:text-fuchsia-200 rounded-lg p-2 text-sm">
                {isFetchingUserData ? (
                  <Skeleton className="h-6 w-full" />
                ) : (
                  <>
                    {params.slug === "bot" ? (
                      <p>999999</p>
                    ) : (
                      <p>{userData?.level}</p>
                    )}
                  </>
                )}
                Level
              </span>
              <span className="flex gap-2">
                💰
                {isFetchingUserData ? (
                  <Skeleton className="h-6 w-full mb-2" />
                ) : (
                  <>
                    {params.slug === "bot" ? (
                      <p>∞</p>
                    ) : (
                      <p>{userData?.coins}</p>
                    )}
                  </>
                )}
              </span>
              <span className="flex gap-2 ">
                👑
                {isFetchingUserData ? (
                  <Skeleton className="h-6 w-full" />
                ) : (
                  <>
                    {params.slug === "bot" ? (
                      <p>∞</p>
                    ) : (
                      <p>{userData?.points}</p>
                    )}
                  </>
                )}
              </span>
            </div>
            <div className="text-sm my-4 text-center">
              <p className="font-semibold">Joined:</p>
              {params.slug === "bot" ? (
                <p className="text-muted-foreground">10 years ago</p>
              ) : (
                <div className="text-muted-foreground">
                  {" "}
                  {isFetchingUserData ? (
                    <Skeleton className="h-6 w-full" />
                  ) : (
                    <>{userJoinedDate}</>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            {params.slug === currentUserData?.username && (
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full" variant={"outline"}>
                    Edit profile <EditIcon className="ml-2" size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="top-[20%] sm:top-[50%]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>Add description</DialogDescription>
                  </DialogHeader>
                  <EditProfileForm id={currentUserData?.id} setOpen={setOpen} />
                </DialogContent>
              </Dialog>
            )}
          </CardFooter>
        </Card>
        <Card>
          <CardContent className="p-6">
            <span className="font-bold">Description: </span>
            {params.slug === "bot" ? (
              <p>Friendly bot. I am always online.</p>
            ) : (
              <>
                {userData?.description ? (
                  <p>{userData?.description}</p>
                ) : (
                  <p>No description.</p>
                )}
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <span className="font-bold">Achievements: </span>
            <div className=" my-2">
              <div className="flex gap-2 justify-start items-center sm:flex-col sm:items-start flex-wrap ">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Popover key={index}>
                    <div className="flex gap-2 items-center">
                      <PopoverTrigger>
                        <div className="text-3xl font-bold w-14 h-14 rounded-lg flex items-center justify-center bg-slate-200 dark:bg-slate-600  shadow-md text-muted-foreground">
                          ?
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        <span className="text-muted-foreground">
                          Achievement locked
                        </span>
                      </PopoverContent>

                      <div className="sm:flex flex-col hidden">
                        <span>?????</span>
                        <span className="text-xs text-muted-foreground">
                          (...)
                        </span>
                      </div>
                    </div>
                  </Popover>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <span className="font-bold">Stats: </span>
            <RadarChartStats />
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default Index;
