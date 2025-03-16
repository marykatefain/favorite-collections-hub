
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Zap, MessageSquare } from "lucide-react";
import RankBadge from "./RankBadge";

interface ProfileHeaderProps {
  username: string;
  avatarUrl?: string;
  bio?: string;
  npub: string;
  rank: "A" | "B" | "C" | "D" | "E" | "F";
  isFollowing?: boolean;
  isOwnProfile?: boolean;
  onFollow?: () => void;
  onZap?: () => void;
  onMessage?: () => void;
}

const ProfileHeader = ({
  username,
  avatarUrl,
  bio,
  npub,
  rank,
  isFollowing = false,
  isOwnProfile = false,
  onFollow,
  onZap,
  onMessage,
}: ProfileHeaderProps) => {
  const truncatedNpub = npub.length > 12 ? `${npub.slice(0, 6)}...${npub.slice(-6)}` : npub;

  return (
    <div className="space-y-4 py-4 animate-enter">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-20 w-20 border-2 border-primary">
            <AvatarImage src={avatarUrl} alt={username} />
            <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold">{username}</h1>
              <RankBadge rank={rank} showLabel />
            </div>
            <p className="text-sm text-muted-foreground">{truncatedNpub}</p>
          </div>
        </div>
      </div>

      {bio && <p className="text-sm">{bio}</p>}

      {!isOwnProfile ? (
        <div className="flex gap-2">
          <Button 
            variant={isFollowing ? "outline" : "default"} 
            className="flex-1"
            onClick={onFollow}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
          <Button variant="outline" size="icon" onClick={onZap}>
            <Zap className="h-5 w-5 text-nostr-orange" />
          </Button>
          <Button variant="outline" size="icon" onClick={onMessage}>
            <MessageSquare className="h-5 w-5" />
          </Button>
        </div>
      ) : (
        <Button variant="outline" className="w-full">
          Edit Profile
        </Button>
      )}
    </div>
  );
};

export default ProfileHeader;
