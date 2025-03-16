
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type ItemType = 
  | "video" 
  | "movie" 
  | "tvshow" 
  | "music" 
  | "book" 
  | "article" 
  | "meme" 
  | "person" 
  | "game"
  | "other";

interface ItemCardProps {
  id: string;
  title: string;
  imageUrl?: string;
  type: ItemType;
  source?: string;
  likes?: number;
  comments?: number;
  zaps?: number;
  rank?: number;
  isInCollection?: boolean;
  isLiked?: boolean;
  onLike?: () => void;
  onZap?: () => void;
  onComment?: () => void;
}

const ItemCard = ({
  id,
  title,
  imageUrl,
  type,
  source,
  likes = 0,
  comments = 0,
  zaps = 0,
  rank,
  isInCollection = false,
  isLiked = false,
  onLike,
  onZap,
  onComment,
}: ItemCardProps) => {
  // Function to format source name from URL
  const formatSource = (sourceUrl?: string) => {
    if (!sourceUrl) return "";
    try {
      const url = new URL(sourceUrl);
      return url.hostname.replace("www.", "");
    } catch (e) {
      return sourceUrl;
    }
  };

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

  return (
    <Link to={`/item/${id}`}>
      <Card className="item-card hover:bg-muted/30 animate-scale-in">
        <CardContent className="p-0">
          <div className="flex gap-3">
            <div className="aspect-square w-20 h-20 rounded-md overflow-hidden bg-muted">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-3xl">
                  {typeIcons[type]}
                </div>
              )}
            </div>
            
            <div className="flex-1 py-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium leading-tight line-clamp-2">{title}</h3>
                  
                  <div className="flex items-center text-xs text-muted-foreground mt-1 gap-2">
                    {rank && <Badge variant="outline" className="text-xs">#{rank}</Badge>}
                    <span>{formatSource(source)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex mt-2 text-xs text-muted-foreground">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onLike?.();
                  }}
                  className={cn(
                    "flex items-center mr-3",
                    isLiked && "text-nostr-purple"
                  )}
                >
                  <Heart className="h-3.5 w-3.5 mr-1" /> {likes}
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onComment?.();
                  }}
                  className="flex items-center mr-3"
                >
                  <MessageSquare className="h-3.5 w-3.5 mr-1" /> {comments}
                </button>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    onZap?.();
                  }}
                  className="flex items-center"
                >
                  <Zap className="h-3.5 w-3.5 mr-1 text-nostr-orange" /> {zaps}
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItemCard;
