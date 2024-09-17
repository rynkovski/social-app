"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { Coins, Gem, Grid3X3, HomeIcon, LandPlot } from "lucide-react";
import { usePathname } from "next/navigation";
import Logo from "../logo";
import UserDropdown from "../user/user-dropdown";
import { useGetMeetingsNotConfirmed } from "@/actions/get-meetings-not-confirmed";
import { useGetBets } from "@/actions/get-bets";

const links = [
  {
    title: "Dashboard",
    icon: <HomeIcon className="h-5 w-5" />,
    href: "/dashboard",
  },
  {
    title: "Meetings",
    icon: <LandPlot className="h-5 w-5" />,
    href: "/meetings",
  },
  {
    title: "Bets",
    icon: <Coins className="h-5 w-5" />,
    href: "/bets",
  },
  { title: "Casino", icon: <Gem className="h-5 w-5" />, href: "/casino" },
  { title: "Bingo", icon: <Grid3X3 className="h-5 w-5" />, href: "/bingo" },
];

function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-2 px-2 sm:py-5">
        <Link
          href="/dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full mb-4 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Logo />
          <span className="sr-only">SocialApp</span>
        </Link>
        <TooltipProvider>
          {links.map((link) => {
            const isActive =
              pathname.startsWith(link.href) || pathname === link.href;
            return (
              <Tooltip key={link.title}>
                <TooltipTrigger asChild key={link.title}>
                  <Link
                    href={link.href}
                    className={`${
                      isActive && "active-icon"
                    } sidebar-icon hover:active-icon`}
                  >
                    {link.icon}
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{link.title}</TooltipContent>
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </nav>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const { data: notConfirmMeetings } = useGetMeetingsNotConfirmed();
  const { data: betsData } = useGetBets();

  const meetingsNotification = notConfirmMeetings?.filter(
    (meeting) =>
      meeting.participated === true && meeting.confirmed_by_you === false
  );

  const betsNotification = betsData?.filter((bet) => bet.can_vote === true);

  return (
    <nav className="fixed isolate w-full bottom-0 z-50 flex h-14 items-center justify-between  gap-4 border-t bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:hidden">
      {links.map((link) => {
        const isActive =
          pathname.startsWith(link.href) || pathname === link.href;
        return (
          <Link
            key={link.title}
            href={link.href}
            className={`${
              isActive && "active-mobile-icon"
            } relative mobile-icon hover:active-mobile-icon`}
          >
            {link.icon}
            {(meetingsNotification?.length as number) > 0 &&
              link.title === "Meetings" && (
                <span className="absolute top-2 right-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </span>
              )}
            {(betsNotification?.length as number) > 0 &&
              link.title === "Bets" && (
                <span className="absolute top-2 right-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </span>
              )}
            <span className="sr-only">{link.title}</span>
          </Link>
        );
      })}
      <UserDropdown />
    </nav>
  );
}

export default Sidebar;
