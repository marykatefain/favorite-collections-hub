
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import ProfileHeader from "@/components/user/ProfileHeader";
import CollectionsList, { Collection } from "@/components/collections/CollectionsList";
import { getProfile, getCollections, getCollectionItems } from "@/lib/nostr";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<any>(null);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const { toast } = useToast();

  // For demo purposes, use a fixed pubkey if no ID is provided
  const pubkey = id || "myownpubkey";
  const isOwnProfile = !id; // If no ID is provided, it's the user's own profile

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      try {
        const profileData = await getProfile(pubkey);
        const collectionsData = await getCollections(pubkey);
        
        if (profileData) {
          setProfile(profileData);
        }
        
        // Process collections and fetch preview images and stats for each
        const enrichedCollections = await Promise.all(
          collectionsData.map(async (collection) => {
            // Only fetch items if the collection has items
            let previewImages: string[] = [];
            let likes = Math.floor(Math.random() * 100);
            let comments = Math.floor(Math.random() * 30);
            let zaps = Math.floor(Math.random() * 50);
            let shares = Math.floor(Math.random() * 20);
            
            if (collection.items.length > 0) {
              try {
                const items = await getCollectionItems(collection.id);
                // Extract images from items for previews
                previewImages = items
                  .filter(item => item.image)
                  .map(item => item.image!)
                  .slice(0, 6); // Limit to 6 images for carousel
              } catch (error) {
                console.error(`Failed to load items for collection ${collection.id}:`, error);
              }
            }
            
            return {
              id: collection.id,
              title: collection.name,
              itemCount: collection.items.length,
              itemType: collection.name.toLowerCase().includes("movie") 
                ? "movie" 
                : collection.name.toLowerCase().includes("book") 
                  ? "book" 
                  : collection.name.toLowerCase().includes("music") 
                    ? "song" 
                    : "item",
              parentId: collection.parent_id,
              previewImages,
              likes,
              comments,
              zaps,
              shares,
            };
          })
        );
        
        setCollections(enrichedCollections);
      } catch (error) {
        console.error("Failed to load profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [pubkey, toast]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing 
        ? "You've unfollowed this user" 
        : "You're now following this user",
    });
    // In a real app, we would send a Nostr event here
  };

  const handleZap = () => {
    toast({
      title: "Zap",
      description: "Lightning payment feature coming soon!",
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message",
      description: "Messaging feature coming soon!",
    });
  };

  const handleAddCollection = () => {
    toast({
      title: "New Collection",
      description: "Collection creation coming soon!",
    });
  };

  return (
    <MainLayout>
      <div className="py-4">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
              <Skeleton className="h-9 w-full" />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-32" />
              </div>
              
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </div>
        ) : profile ? (
          <>
            <ProfileHeader
              username={profile.name}
              avatarUrl={profile.picture}
              bio={profile.about}
              npub={profile.npub}
              rank={profile.rank}
              isFollowing={isFollowing}
              isOwnProfile={isOwnProfile}
              onFollow={handleFollow}
              onZap={handleZap}
              onMessage={handleMessage}
            />
            
            <CollectionsList
              collections={collections}
              isOwnProfile={isOwnProfile}
              onAddCollection={handleAddCollection}
            />
          </>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>Profile not found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Profile;
