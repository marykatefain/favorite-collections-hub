
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, MessageSquare, Zap, Share2, ChevronRight } from "lucide-react";
import CollectionCarousel from "./CollectionCarousel";

interface CollectionCardProps {
  id: string;
  title: string;
  itemCount: number;
  previewImages?: string[];
  itemType: string;
  likes?: number;
  comments?: number;
  zaps?: number;
  shares?: number;
}

const CollectionCard = ({
  id,
  title,
  itemCount,
  previewImages = [],
  itemType,
  likes = 0,
  comments = 0,
  zaps = 0,
  shares = 0,
}: CollectionCardProps) => {
  return (
    <Link to={`/collection/${id}`} className="block mb-4">
      <Card className="collection-card hover:bg-muted/30 animate-scale-in">
        <CardHeader className="p-0 pb-2 space-y-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <span className="text-sm text-darker">
              {itemCount} {itemType}
              {itemCount !== 1 ? "s" : ""}
            </span>
          </div>
          
          {previewImages && previewImages.length > 0 && (
            <div className="mt-2">
              <CollectionCarousel images={previewImages} collectionId={id} />
            </div>
          )}
          
          {/* Collection stats */}
          <div className="flex items-center justify-between mt-3 text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Heart className="h-3.5 w-3.5" />
                <span className="text-xs">{likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="text-xs">{comments}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="h-3.5 w-3.5 text-nostr-orange" />
                <span className="text-xs">{zaps}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Share2 className="h-3.5 w-3.5" />
                <span className="text-xs">{shares}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CollectionCard;
