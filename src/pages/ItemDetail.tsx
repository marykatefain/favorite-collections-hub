
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Share2, Zap, ArrowLeft, Globe, Plus, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ItemType } from "@/components/items/ItemCard";

const ItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadItem = async () => {
      setIsLoading(true);
      // In a real app, we would fetch the item data from Nostr
      setTimeout(() => {
        // Mock item data
        setItem({
          id,
          title: "The Shawshank Redemption",
          type: "movie" as ItemType,
          description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
          url: "https://www.imdb.com/title/tt0111161/",
          user: {
            id: "user1",
            username: "alice",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          },
          rank: 1,
          collections: 842,
          score: 98,
          likes: 542,
          comments: 128,
          zaps: 75,
          addedAt: new Date(Date.now() - 3600 * 24 * 7 * 1000).toISOString(),
          commentsList: [
            {
              id: "comment1",
              user: {
                id: "user2",
                username: "bob",
                avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
                rank: "B",
              },
              content: "One of the greatest films ever made. The performances are incredible.",
              timestamp: new Date(Date.now() - 3600 * 24 * 3 * 1000).toISOString(),
              likes: 24,
            },
            {
              id: "comment2",
              user: {
                id: "user3",
                username: "carol",
                avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
                rank: "C",
              },
              content: "I watch this every year, and it never gets old. The story of hope and redemption is timeless.",
              timestamp: new Date(Date.now() - 3600 * 24 * 5 * 1000).toISOString(),
              likes: 18,
            },
          ],
        });
        setIsLoading(false);
      }, 1000);
    };

    if (id) {
      loadItem();
    }
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setItem((prev: any) => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
    // In a real app, we would send a Nostr event here
  };

  const handleZap = () => {
    toast({
      title: "Zap",
      description: "Lightning payment feature coming soon!",
    });
  };

  const handleShare = () => {
    // In a real app, we would implement sharing functionality
    toast({
      title: "Share",
      description: "Sharing feature coming soon!",
    });
  };

  const handleAddToCollection = () => {
    toast({
      title: "Add to Collection",
      description: "Collection feature coming soon!",
    });
  };

  const handleCommentLike = (commentId: string) => {
    // In a real app, we would send a Nostr event and update the state
    setItem((prev: any) => ({
      ...prev,
      comments: prev.comments.map((comment: any) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      ),
    }));
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Comment",
      description: "Comment feature coming soon!",
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

  const typeIcons: Record<ItemType, string> = {
    video: "🎬",
    movie: "🎥",
    tvshow: "📺",
    music: "🎵",
    book: "📚",
    article: "📄",
    meme: "😂",
    person: "👤",
    game: "🎮",
    other: "🔗",
  };

  return (
    <MainLayout>
      <div className="py-4">
        <div className="mb-4">
          <Button variant="ghost" size="sm" className="pl-0" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-40 w-full rounded-lg" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2 mt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-10" />
              <Skeleton className="h-10 w-10" />
            </div>
            <Skeleton className="h-32 w-full mt-4" />
            <div className="space-y-4 mt-6">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : item ? (
          <div className="space-y-6 animate-enter">
            <div>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted mb-4">
                {item.imageUrl ? (
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-7xl">
                    {typeIcons[item.type]}
                  </div>
                )}
              </div>
              
              <h1 className="text-2xl font-bold mb-1">{item.title}</h1>
              
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-2">
                <Badge variant="outline" className="font-normal">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </Badge>
                {item.rank && (
                  <div className="flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5" />
                    <span>#{item.rank} on Global Charts</span>
                  </div>
                )}
                <span>Added {formatDate(item.addedAt)}</span>
              </div>
              
              <p className="text-sm">{item.description}</p>
              
              {item.url && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3"
                  onClick={() => window.open(item.url, '_blank')}
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
                  Visit Source
                </Button>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant={isLiked ? "default" : "outline"} 
                className={cn(
                  "flex-1",
                  isLiked && "bg-nostr-purple"
                )}
                onClick={handleLike}
              >
                <Heart className="h-4 w-4 mr-2" />
                {isLiked ? "Liked" : "Like"} ({item.likes})
              </Button>
              <Button variant="outline" size="icon" onClick={handleZap}>
                <Zap className="h-4 w-4 text-nostr-orange" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleAddToCollection}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-lg font-semibold">Comments ({item.commentsList.length})</h2>
              </CardHeader>
              <CardContent className="space-y-4">
                {item.commentsList.map((comment: any) => (
                  <div key={comment.id} className="space-y-2">
                    <div className="flex gap-3">
                      <Link to={`/profile/${comment.user.id}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatarUrl} alt={comment.user.username} />
                          <AvatarFallback>{comment.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Link to={`/profile/${comment.user.id}`} className="font-medium text-sm">
                            {comment.user.username}
                          </Link>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{comment.content}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 px-2 mt-1"
                          onClick={() => handleCommentLike(comment.id)}
                        >
                          <Heart className="h-3 w-3 mr-1" /> {comment.likes}
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
                
                <form onSubmit={handleSubmitComment} className="pt-2">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" alt="You" />
                      <AvatarFallback>YO</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <textarea 
                        className="w-full border rounded-md p-2 text-sm" 
                        placeholder="Add a comment..."
                        rows={2}
                      />
                      <Button size="sm" className="mt-2">
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            <p>Item not found</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ItemDetail;
