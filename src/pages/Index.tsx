
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import FeedItem from "@/components/feed/FeedItem";
import { getFeedItems } from "@/lib/nostr";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Feed = () => {
  const [feedItems, setFeedItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const items = await getFeedItems();
        setFeedItems(items);
      } catch (error) {
        console.error("Failed to load feed:", error);
        toast({
          title: "Error",
          description: "Failed to load feed. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadFeed();
  }, [toast]);

  const handleLike = (id: string) => {
    // Toggle like in state for immediate feedback
    setFeedItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              likes: item.isLiked ? item.likes - 1 : item.likes + 1,
              isLiked: !item.isLiked,
            }
          : item
      )
    );

    // In a real app, we would send a Nostr event here
    console.log(`Liked item ${id}`);
  };

  const handleZap = (id: string) => {
    toast({
      title: "Zap",
      description: "Lightning payment feature coming soon!",
    });
    console.log(`Zapped item ${id}`);
  };

  const handleComment = (id: string) => {
    // In a real app, we would navigate to the item page or open a comment modal
    console.log(`Commenting on item ${id}`);
  };

  return (
    <MainLayout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-4">Your Feed</h1>

        {isLoading ? (
          // Loading skeletons
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3 border rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-4 w-48" />
                <div className="flex gap-3 mt-2">
                  <Skeleton className="h-16 w-16 rounded-md" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
                <div className="flex gap-4 pt-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {feedItems.length > 0 ? (
              feedItems.map((item) => (
                <FeedItem
                  key={item.id}
                  {...item}
                  onLike={() => handleLike(item.id)}
                  onZap={() => handleZap(item.id)}
                  onComment={() => handleComment(item.id)}
                />
              ))
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p className="text-lg">Your feed is empty</p>
                <p className="text-sm mt-2">
                  Follow some users to see their collections and activity
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Feed;
