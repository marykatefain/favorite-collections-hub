
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, Users, Plus } from "lucide-react";
import RankBadge from "@/components/user/RankBadge";

interface CollectionOwner {
  id: string;
  username: string;
  avatarUrl: string;
  rank: string;
}

interface CollectionHeaderProps {
  id: string;
  title: string;
  description?: string;
  owner: CollectionOwner;
  followersCount: number;
  createdAt: string;
  onFollow: () => void;
  onShare: () => void;
  onAddItem: () => void;
}

const CollectionHeader = ({
  id,
  title,
  description,
  owner,
  followersCount,
  createdAt,
  onFollow,
  onShare,
  onAddItem,
}: CollectionHeaderProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-5">
      <div className="mb-4">
        <Button variant="ghost" size="sm" className="pl-0" asChild>
          <Link to={`/profile/${owner.id}`}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Profile
          </Link>
        </Button>
      </div>

      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
        
        <div className="flex items-center gap-2 mt-3">
          <Link to={`/profile/${owner.id}`} className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={owner.avatarUrl} alt={owner.username} />
              <AvatarFallback>{owner.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{owner.username}</span>
            <RankBadge rank={owner.rank} size="sm" />
          </Link>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1 gap-3">
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{followersCount} followers</span>
          </div>
          <span>Created {formatDate(createdAt)}</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="default" 
          className="flex-1"
          onClick={onFollow}
        >
          Follow Collection
        </Button>
        <Button variant="outline" size="icon" onClick={onShare}>
          <Share2 className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onAddItem}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default CollectionHeader;
