
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Users, BarChart4 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import RankBadge from "@/components/user/RankBadge";

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

  // Mock data for trending tags
  const trendingTags = [
    "SummerReads", "ClassicFilms", "IndieMusic", "TechBooks", 
    "SciFiMovies", "90sNostalgia", "TravelDocs", "CultClassics"
  ];

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
          {/* Suggested Users Section */}
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
          
          {/* Trending Tags Section */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Trending Tags</CardTitle>
                  <CardDescription>Popular topics right now</CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <Link 
                    key={tag} 
                    to={`/tags/${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-muted rounded-full text-sm hover:bg-nostr-purple hover:text-white transition-colors"
                  >
                    #{tag}
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
