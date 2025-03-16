
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { ItemType } from "../items/ItemCard";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChartItemProps {
  id: string;
  rank: number;
  previousRank?: number;
  title: string;
  type: ItemType;
  imageUrl?: string;
  score: number;
  collections: number;
}

const ChartItem = ({
  id,
  rank,
  previousRank,
  title,
  type,
  imageUrl,
  score,
  collections,
}: ChartItemProps) => {
  const typeIcons: Record<ItemType, string> = {
    video: "🎬",
    movie: "🎥",
    tvshow: "📺",
    music: "🎵",
    book: "📚",
    article: "📄",
    meme: "😂",
    person: "👤",
    game: "🎮",
    other: "🔗",
  };

  // Calculate rank change
  let rankChange: number | null = null;
  let isNew = false;

  if (previousRank === undefined) {
    isNew = true;
  } else if (previousRank !== rank) {
    rankChange = previousRank - rank;
  }

  // Get rank badge
  const getRankBadge = () => {
    if (isNew) {
      return (
        <Badge variant="outline" className="bg-nostr-purple text-white">
          NEW
        </Badge>
      );
    }

    if (rankChange === null) {
      return (
        <span className="flex items-center text-muted-foreground">
          <Minus className="h-3 w-3 mr-1" />
        </span>
      );
    }

    if (rankChange > 0) {
      return (
        <span className="flex items-center text-green-500">
          <ArrowUp className="h-3 w-3 mr-1" />
          {rankChange}
        </span>
      );
    }

    return (
      <span className="flex items-center text-red-500">
        <ArrowDown className="h-3 w-3 mr-1" />
        {Math.abs(rankChange)}
      </span>
    );
  };

  return (
    <Link to={`/item/${id}`}>
      <Card className="item-card hover:bg-muted/30 animate-scale-in">
        <CardContent className="p-0">
          <div className="flex gap-3">
            <div className="w-10 h-full flex items-center justify-center border-r px-2 text-muted-foreground font-medium">
              {rank}
            </div>
            
            <div className="aspect-square w-16 h-16 rounded-md overflow-hidden bg-muted">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-2xl">
                  {typeIcons[type]}
                </div>
              )}
            </div>
            
            <div className="flex-1 py-1 pr-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium leading-tight line-clamp-2">{title}</h3>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      In {collections} collection{collections !== 1 ? 's' : ''}
                    </span>
                    <span className={cn(
                      "text-xs",
                      score > 80 ? "text-nostr-purple font-semibold" : "text-muted-foreground"
                    )}>
                      {score} pts
                    </span>
                  </div>
                </div>
                
                <div className="ml-2">
                  {getRankBadge()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ChartItem;
