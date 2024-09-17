"use client";
import { useGetCurrentUser } from "@/actions/get-current-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChartCard } from "../charts/pie-chart";
import { ChartConfig } from "../ui/chart";

function CasinoStatsCard() {
  const { data: userData } = useGetCurrentUser();

  const chartDataGames = [
    { outcome: "won", value: userData?.casino_wins, fill: "var(--color-won)" },
    {
      outcome: "lost",
      value: userData?.casino_loses,
      fill: "var(--color-lost)",
    },
  ];
  const chartConfigGames = {
    won: {
      label: "Won",
      color: "hsl(var(--chart-2))",
    },
    lost: {
      label: "Lost",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  const chartDataCoins = [
    {
      outcome: "won",
      value: userData?.coins_won_in_casino,
      fill: "var(--color-won)",
    },
    {
      outcome: "lost",
      value: userData?.coins_lost_in_casino,
      fill: "var(--color-lost)",
    },
  ];
  const chartConfigCoins = {
    won: {
      label: "Won",
      color: "hsl(var(--chart-2))",
    },
    lost: {
      label: "Lost",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Casino stats</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Tabs defaultValue="games">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="games">
              Games
            </TabsTrigger>
            <TabsTrigger className="w-full" value="coins">
              Coins
            </TabsTrigger>
          </TabsList>
          <TabsContent value="games">
            <PieChartCard
              chartData={chartDataGames}
              chartConfig={chartConfigGames}
              dataKey={"value"}
              nameKey={"outcome"}
            />
          </TabsContent>
          <TabsContent value="coins">
            <PieChartCard
              chartData={chartDataCoins}
              chartConfig={chartConfigCoins}
              dataKey={"value"}
              nameKey={"outcome"}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default CasinoStatsCard;
