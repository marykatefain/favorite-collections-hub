
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Flame, Users, BarChart4 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import RankBadge from "@/components/user/RankBadge";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { getGlobalCharts } from "@/lib/nostr";
import { Skeleton } from "@/components/ui/skeleton";

const Discover = () => {
  // Mock data for suggested users
  const suggestedUsers = [
    {
      id: "user1",
      username: "alice",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      bio: "Film critic and book lover",
      rank: "A" as const,
    },
    {
      id: "user2",
      username: "bob",
      avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      bio: "Music producer and vinyl collector",
      rank: "B" as const,
    },
    {
      id: "user3",
      username: "carol",
      avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      bio: "Sci-fi enthusiast and tech reviewer",
      rank: "C" as const,
    },
  ];

  // State for trending items
  const [trendingItems, setTrendingItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Fetch trending items
  useEffect(() => {
    const fetchTrendingItems = async () => {
      setIsLoading(true);
      try {
        // Get global charts and filter for trending items (those with significant rank changes)
        const chartItems = await getGlobalCharts();
        // Find items that are trending (rising in ranks)
        const trending = chartItems
          .filter(item => {
            // Items that have moved up in rank or are new
            return item.previousRank === undefined || (item.previousRank - item.rank) > 0;
          })
          .sort((a, b) => {
            // Sort by how much they've improved in rank
            const aImprovement = a.previousRank ? a.previousRank - a.rank : 10;
            const bImprovement = b.previousRank ? b.previousRank - b.rank : 10;
            return bImprovement - aImprovement;
          })
          .slice(0, 5); // Take the top 5 trending items
          
        setTrendingItems(trending);
      } catch (error) {
        console.error("Failed to load trending items:", error);
        toast({
          title: "Error",
          description: "Failed to load trending items",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingItems();
  }, [toast]);

  return (
    <MainLayout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-4">Discover</h1>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users, collections, items..." 
            className="pl-9"
          />
        </div>
        
        <div className="space-y-6">
          {/* Trending Items Section - Now positioned first */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Trending Items</CardTitle>
                  <CardDescription>What's rising in popularity</CardDescription>
                </div>
                <Flame className="h-5 w-5 text-nostr-orange" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {trendingItems.length > 0 ? (
                    trendingItems.map((item) => (
                      <Link 
                        key={item.id} 
                        to={`/item/${item.id}`}
                        className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md -mx-2"
                      >
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          {item.imageUrl ? (
                            <img 
                              src={item.imageUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-lg">
                              {item.type === "movie" ? "🎥" : 
                               item.type === "music" ? "🎵" : 
                               item.type === "book" ? "📚" : 
                               item.type === "tvshow" ? "📺" : 
                               item.type === "article" ? "📄" : 
                               item.type === "game" ? "🎮" : "🔗"}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{item.title}</p>
                          <div className="flex items-center text-sm">
                            <span className="text-nostr-purple">
                              {item.previousRank === undefined ? (
                                "New Entry"
                              ) : (
                                <>↑ {item.previousRank - item.rank} ranks</>
                              )}
                            </span>
                            <span className="text-muted-foreground mx-1">•</span>
                            <span className="text-muted-foreground">#{item.rank} in charts</span>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center py-2">No trending items available</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Suggested Users Section - Now positioned second */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Suggested Users</CardTitle>
                  <CardDescription>People you might want to follow</CardDescription>
                </div>
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <Link 
                    key={user.id} 
                    to={`/profile/${user.id}`}
                    className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md -mx-2"
                  >
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} alt={user.username} />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="font-medium truncate">{user.username}</p>
                        <RankBadge rank={user.rank} size="sm" />
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{user.bio}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Browse Categories Section */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Browse Categories</CardTitle>
                  <CardDescription>Explore by content type</CardDescription>
                </div>
                <BarChart4 className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {["Movies", "Books", "Music", "TV Shows", "Articles", "Memes"].map((category) => (
                  <Link 
                    key={category} 
                    to={`/category/${category.toLowerCase().replace(" ", "")}`}
                    className="p-3 bg-muted rounded-md text-center hover:bg-nostr-purple hover:text-white transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Discover;
