
import React from "react";
import CollectionCard from "./CollectionCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Collection {
  id: string;
  title: string;
  itemCount: number;
  previewImages?: string[];
  itemType: string;
  parentId?: string;
  likes?: number;
  comments?: number;
  zaps?: number;
  shares?: number;
}

interface CollectionsListProps {
  collections: Collection[];
  isOwnProfile?: boolean;
  onAddCollection?: () => void;
}

const CollectionsList = ({
  collections,
  isOwnProfile = false,
  onAddCollection,
}: CollectionsListProps) => {
  // Group collections by parent ID
  const parentCollections = collections.filter(c => !c.parentId);
  const childCollections = collections.filter(c => c.parentId);
  
  // Group child collections by parent ID
  const childCollectionsByParent: Record<string, Collection[]> = {};
  childCollections.forEach(collection => {
    if (collection.parentId) {
      if (!childCollectionsByParent[collection.parentId]) {
        childCollectionsByParent[collection.parentId] = [];
      }
      childCollectionsByParent[collection.parentId].push(collection);
    }
  });

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Collections</h2>
        {isOwnProfile && (
          <Button size="sm" onClick={onAddCollection}>
            <Plus className="h-4 w-4 mr-1" />
            New Collection
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {parentCollections.map((collection) => (
          <React.Fragment key={collection.id}>
            <CollectionCard 
              {...collection} 
            />
            
            {/* Render child collections if any */}
            {childCollectionsByParent[collection.id] && 
              childCollectionsByParent[collection.id].map(childCollection => (
                <CollectionCard 
                  key={childCollection.id} 
                  {...childCollection} 
                />
              ))
            }
          </React.Fragment>
        ))}

        {parentCollections.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No collections yet</p>
            {isOwnProfile && (
              <Button variant="link" onClick={onAddCollection} className="mt-2">
                Create your first collection
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionsList;
