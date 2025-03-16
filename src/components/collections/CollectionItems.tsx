
import React from "react";
import { Button } from "@/components/ui/button";
import ItemCard from "@/components/items/ItemCard";

export type ItemType = "movie" | "book" | "music" | "game" | "app" | "article" | "podcast" | "video" | "other";

interface CollectionItem {
  id: string;
  title: string;
  imageUrl: string;
  type: ItemType;
  source: string;
  likes: number;
  comments: number;
  zaps: number;
  rank: number;
}

interface CollectionItemsProps {
  items: CollectionItem[];
  onAddItem: () => void;
}

const CollectionItems = ({ items, onAddItem }: CollectionItemsProps) => {
  return (
    <div className="pt-2">
      <h2 className="text-lg font-semibold mb-3">Items in this Collection</h2>
      
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              title={item.title}
              imageUrl={item.imageUrl}
              type={item.type}
              source={item.source}
              likes={item.likes}
              comments={item.comments}
              zaps={item.zaps}
              rank={item.rank}
              isInCollection={true}
            />
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No items in this collection yet</p>
            <Button variant="link" onClick={onAddItem} className="mt-2">
              Add the first item
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionItems;
