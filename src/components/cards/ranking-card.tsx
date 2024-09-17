import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RankingTable from "../tables/ranking-table";

function RankingCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users ranking</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-80 overflow-auto">
        <RankingTable />
      </CardContent>
    </Card>
  );
}

export default RankingCard;
