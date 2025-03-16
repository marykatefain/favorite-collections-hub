
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import RankBadge from "../user/RankBadge";
import { ItemType } from "../items/ItemCard";

interface FeedItemProps {
  id: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
    rank: "A" | "B" | "C" | "D" | "E" | "F";
  };
  timestamp: string;
  item: {
    id: string;
    title: string;
    imageUrl?: string;
    type: ItemType;
  };
  collectionName: string;
  collectionId: string;
  likes: number;
  comments: number;
  zaps: number;
  isLiked?: boolean;
  onLike?: () => void;
  onZap?: () => void;
  onComment?: () => void;
}

const FeedItem = ({
  id,
  user,
  timestamp,
  item,
  collectionName,
  collectionId,
  likes,
  comments,
  zaps,
  isLiked = false,
  onLike,
  onZap,
  onComment,
}: FeedItemProps) => {
  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString();
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
    other: "🔗",
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <Link to={`/profile/${user.id}`} className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl} alt={user.username} />
              <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <span className="font-medium">{user.username}</span>
              <RankBadge rank={user.rank} size="sm" className="ml-1" />
            </div>
          </Link>
          <span className="text-xs text-muted-foreground">{formatTimestamp(timestamp)}</span>
        </div>
        <p className="text-sm mt-2">
          Added to <Link to={`/collection/${collectionId}`} className="font-medium text-nostr-purple">{collectionName}</Link>
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <Link to={`/item/${item.id}`} className="block">
          <div className="flex gap-3 mt-2">
            <div className="aspect-square w-16 h-16 rounded-md overflow-hidden bg-muted">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted text-2xl">
                  {typeIcons[item.type]}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-medium line-clamp-2">{item.title}</h3>
              <span className="text-xs text-darker">{item.type}</span>
            </div>
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex">
          <button 
            onClick={onLike}
            className={cn(
              "flex items-center mr-4",
              isLiked && "text-nostr-purple"
            )}
          >
            <Heart className="h-4 w-4 mr-1" /> {likes}
          </button>
          <button 
            onClick={onComment}
            className="flex items-center mr-4"
          >
            <MessageSquare className="h-4 w-4 mr-1" /> {comments}
          </button>
          <button 
            onClick={onZap}
            className="flex items-center"
          >
            <Zap className="h-4 w-4 mr-1 text-nostr-orange" /> {zaps}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FeedItem;
