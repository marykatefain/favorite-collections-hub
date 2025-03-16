
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { getCollectionItems, getCollectionComments } from "@/lib/nostr";
import CollectionHeader from "@/components/collections/CollectionHeader";
import CollectionItems from "@/components/collections/CollectionItems";
import CollectionLoading from "@/components/collections/CollectionLoading";
import CommentsSection from "@/components/comments/CommentsSection";
import { CommentData } from "@/components/comments/CommentItem";

const CollectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [comments, setComments] = useState<CommentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadCollection = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would fetch the collection and its items from Nostr
        // For now, we'll use mock data
        
        // Mock collection data
        setCollection({
          id,
          title: "Favorite Movies",
          description: "My all-time favorite movies that I rewatch regularly",
          owner: {
            id: "user1",
            username: "alice",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            rank: "A",
          },
          itemCount: 3,
          followersCount: 42,
          createdAt: new Date(Date.now() - 3600 * 24 * 30 * 1000).toISOString(),
        });
        
        if (id) {
          // Fetch items
          const collectionItems = await getCollectionItems(id);
          
          // Transform items to match our component props
          const formattedItems = collectionItems.map((item, index) => ({
            id: item.id,
            title: item.title,
            type: item.type,
            imageUrl: item.image,
            source: item.url,
            likes: Math.floor(Math.random() * 100),
            comments: Math.floor(Math.random() * 50),
            zaps: Math.floor(Math.random() * 20),
            rank: index + 1,
          }));
          
          setItems(formattedItems);
          
          // Fetch comments
          const collectionComments = await getCollectionComments(id);
          setComments(collectionComments);
        }
      } catch (error) {
        console.error("Failed to load collection:", error);
        toast({
          title: "Error",
          description: "Failed to load collection data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCollection();
  }, [id, toast]);

  const handleAddItem = () => {
    toast({
      title: "Add Item",
      description: "Item addition feature coming soon!",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share",
      description: "Sharing feature coming soon!",
    });
  };

  const handleFollow = () => {
    toast({
      title: "Follow",
      description: "Collection following feature coming soon!",
    });
  };

  return (
    <MainLayout>
      <div className="py-4">
        {isLoading ? (
          <CollectionLoading />
        ) : collection ? (
          <div className="space-y-5 animate-enter">
            <CollectionHeader
              id={collection.id}
              title={collection.title}
              description={collection.description}
              owner={collection.owner}
              followersCount={collection.followersCount}
              createdAt={collection.createdAt}
              onFollow={handleFollow}
              onShare={handleShare}
              onAddItem={handleAddItem}
            />
            
            <CollectionItems 
              items={items} 
              onAddItem={handleAddItem} 
            />
            
            <div className="pt-4 border-t">
              <CommentsSection collectionId={id || ""} comments={comments} />
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>Collection not found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CollectionDetail;
