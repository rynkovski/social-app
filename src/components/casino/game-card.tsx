import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquareArrowOutUpRight } from "lucide-react";

function GameCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Card className={href === "#" ? "bg-muted text-muted-foreground" : ""}>
      <CardHeader className="relative">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <SquareArrowOutUpRight className="absolute right-4 top-6" />
      </CardHeader>
    </Card>
  );
}

export default GameCard;
