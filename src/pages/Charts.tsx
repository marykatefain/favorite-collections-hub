
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ChartItem from "@/components/charts/ChartItem";
import { getGlobalCharts } from "@/lib/nostr";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemType } from "@/components/items/ItemCard";

const chartCategories = [
  { id: "all", label: "All", type: null },
  { id: "movies", label: "Movies", type: "movie" as ItemType },
  { id: "music", label: "Music", type: "music" as ItemType },
  { id: "books", label: "Books", type: "book" as ItemType },
  { id: "tvshows", label: "TV Shows", type: "tvshow" as ItemType },
  { id: "articles", label: "Articles", type: "article" as ItemType },
];

const Charts = () => {
  const [chartItems, setChartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    const loadCharts = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would filter by category
        const items = await getGlobalCharts();
        setChartItems(items);
      } catch (error) {
        console.error("Failed to load charts:", error);
        toast({
          title: "Error",
          description: "Failed to load chart data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCharts();
  }, [activeCategory, toast]);

  return (
    <MainLayout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-4">Global Charts</h1>
        
        <Tabs defaultValue="all" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-3 mb-4 sm:grid-cols-6">
            {chartCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {chartCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              {isLoading ? (
                // Loading skeletons
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-20 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {chartItems.length > 0 ? (
                    chartItems
                      .filter(
                        (item) => 
                          !category.type || 
                          item.type === category.type
                      )
                      .map((item) => (
                        <ChartItem key={item.id} {...item} />
                      ))
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <p>No items in this category yet</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Charts;
