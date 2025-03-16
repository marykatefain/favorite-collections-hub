
import React from "react";
import { cn } from "@/lib/utils";

type Rank = "A" | "B" | "C" | "D" | "E" | "F";

interface RankBadgeProps {
  rank: Rank;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const RankBadge = ({ rank, size = "md", showLabel = false }: RankBadgeProps) => {
  const rankColors: Record<Rank, string> = {
    A: "bg-rank-a border-rank-a",
    B: "bg-rank-b border-rank-b",
    C: "bg-rank-c border-rank-c",
    D: "bg-rank-d border-rank-d",
    E: "bg-rank-e border-rank-e",
    F: "bg-rank-f border-rank-f",
  };

  const rankLabel: Record<Rank, string> = {
    A: "Trusted",
    B: "Verified",
    C: "Active",
    D: "New",
    E: "Limited",
    F: "Unknown",
  };

  const sizeClasses = {
    sm: "w-5 h-5 text-xs",
    md: "w-7 h-7 text-sm",
    lg: "w-9 h-9 text-base",
  };

  return (
    <div className="flex items-center gap-1.5">
      <div 
        className={cn(
          "flex items-center justify-center rounded-full border-2 text-white font-bold",
          rankColors[rank],
          sizeClasses[size]
        )}
      >
        {rank}
      </div>
      {showLabel && (
        <span className="text-sm font-medium text-muted-foreground">
          {rankLabel[rank]}
        </span>
      )}
    </div>
  );
};

export default RankBadge;
