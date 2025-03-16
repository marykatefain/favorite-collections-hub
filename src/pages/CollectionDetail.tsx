
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Share2, Users, Plus } from "lucide-react";
import ItemCard from "@/components/items/ItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { getCollectionItems } from "@/lib/nostr";
import RankBadge from "@/components/user/RankBadge";

const CollectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
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
  
  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <MainLayout>
      <div className="py-4">
        <div className="mb-4">
          <Button variant="ghost" size="sm" className="pl-0" asChild>
            <Link to={`/profile/${collection?.owner?.id || ""}`}>
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Profile
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            
            <div className="flex items-center gap-2 mt-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
            
            <div className="space-y-3 mt-6">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        ) : collection ? (
          <div className="space-y-5 animate-enter">
            <div>
              <h1 className="text-2xl font-bold">{collection.title}</h1>
              {collection.description && (
                <p className="text-sm text-muted-foreground mt-1">{collection.description}</p>
              )}
              
              <div className="flex items-center gap-2 mt-3">
                <Link to={`/profile/${collection.owner.id}`} className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={collection.owner.avatarUrl} alt={collection.owner.username} />
                    <AvatarFallback>{collection.owner.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{collection.owner.username}</span>
                  <RankBadge rank={collection.owner.rank} size="sm" />
                </Link>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground mt-1 gap-3">
                <div className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  <span>{collection.followersCount} followers</span>
                </div>
                <span>Created {formatDate(collection.createdAt)}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="default" 
                className="flex-1"
                onClick={handleFollow}
              >
                Follow Collection
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleAddItem}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
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
                    <Button variant="link" onClick={handleAddItem} className="mt-2">
                      Add the first item
                    </Button>
                  </div>
                )}
              </div>
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
