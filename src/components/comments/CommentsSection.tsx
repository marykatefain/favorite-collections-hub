
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";
import CommentItem, { CommentData } from "./CommentItem";

interface CommentsSectionProps {
  collectionId: string;
  comments: CommentData[];
}

const CommentsSection = ({ collectionId, comments }: CommentsSectionProps) => {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localComments, setLocalComments] = useState<CommentData[]>(comments);
  const { toast } = useToast();

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would send this to Nostr
      // For now, we'll just add it to our local state
      
      const newComment: CommentData = {
        id: `comment-${Date.now()}`,
        text: commentText,
        createdAt: new Date().toISOString(),
        user: {
          id: "current-user",
          username: "current-user",
          avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
          rank: "B",
        },
      };
      
      setLocalComments((prev) => [newComment, ...prev]);
      setCommentText("");
      
      toast({
        title: "Success",
        description: "Comment added successfully",
      });
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        Comments ({localComments.length})
      </h2>
      
      <form onSubmit={handleSubmitComment} className="space-y-3">
        <Textarea
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={3}
          className="resize-none"
        />
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting || !commentText.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </form>
      
      <div className="space-y-1 divide-y">
        {localComments.length > 0 ? (
          localComments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="py-6 text-center text-muted-foreground">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
