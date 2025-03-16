
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface CollectionCardProps {
  id: string;
  title: string;
  itemCount: number;
  previewImages?: string[];
  itemType: string;
}

const CollectionCard = ({
  id,
  title,
  itemCount,
  previewImages = [],
  itemType,
}: CollectionCardProps) => {
  return (
    <Link to={`/collection/${id}`}>
      <Card className="collection-card hover:bg-muted/30 animate-scale-in">
        <CardHeader className="p-0 pb-2 space-y-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-medium">{title}</CardTitle>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {itemCount} {itemType}
              {itemCount !== 1 ? "s" : ""}
            </span>
          </div>
          
          {previewImages && previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-1 mt-2">
              {previewImages.slice(0, 3).map((img, i) => (
                <div key={i} className="aspect-square rounded-md overflow-hidden bg-muted">
                  <img 
                    src={img} 
                    alt={`${title} preview`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CollectionCard;
