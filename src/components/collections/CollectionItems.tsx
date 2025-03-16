
import React from "react";
import { ItemType as CardItemType } from "@/components/items/ItemCard";

// This is to avoid conflicts with the imported ItemType
export type ItemType = "movie" | "music" | "book" | "tvshow" | "article" | "game";

export interface CollectionItemsProps {
  isLoading?: boolean;
  items: Array<{
    id: string;
    title: string;
    creator: string;
    coverUrl: string;
    type: ItemType;
    rating?: number;
  }>;
  onAddItem?: () => void;
}

const CollectionItems: React.FC<CollectionItemsProps> = ({
  isLoading = false,
  items,
  onAddItem,
}) => {
  if (isLoading) {
    return (
      <div className="animate-pulse grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-800 rounded-lg h-60"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-card rounded-lg overflow-hidden border border-border"
        >
          <div className="relative pb-[135%]">
            <img
              src={item.coverUrl}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium truncate">{item.title}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {item.creator}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CollectionItems;
