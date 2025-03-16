
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import RankBadge from "@/components/user/RankBadge";

// Using the Rank type from RankBadge.tsx
import type { Rank } from "@/components/user/RankBadge";

export interface CommentData {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    avatarUrl?: string;
    rank?: Rank;
  };
}

interface CommentItemProps {
  comment: CommentData;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-3 py-3 animate-enter">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.user.avatarUrl} alt={comment.user.username} />
        <AvatarFallback>{comment.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{comment.user.username}</span>
          {comment.user.rank && <RankBadge rank={comment.user.rank} size="sm" />}
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-sm">{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentItem;
