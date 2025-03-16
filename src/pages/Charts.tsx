
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import ChartItem from "@/components/charts/ChartItem";
import { getGlobalCharts } from "@/lib/nostr";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemType } from "@/components/items/ItemCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

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
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const loadCharts = async () => {
      setIsLoading(true);
      try {
        // In a real app, we would filter by category
        const items = await getGlobalCharts();
        setChartItems(items);
        setFilteredItems(items);
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
  }, [toast]);

  // Filter charts when category or search query changes
  useEffect(() => {
    if (chartItems.length > 0) {
      let filtered = chartItems;
      
      // Filter by category
      if (activeCategory !== 'all') {
        const categoryType = chartCategories.find(cat => cat.id === activeCategory)?.type;
        if (categoryType) {
          filtered = filtered.filter(item => item.type === categoryType);
        }
      }
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(item => 
          item.title.toLowerCase().includes(query)
        );
      }
      
      setFilteredItems(filtered);
    }
  }, [chartItems, activeCategory, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <MainLayout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-4">Global Charts</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search charts..."
            className="pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveCategory}>
          <TabsList className="mb-4 w-full flex flex-wrap justify-between">
            {chartCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex-1 min-w-fit"
              >
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
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <ChartItem key={item.id} {...item} />
                    ))
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <p>No items found. Try a different search or category.</p>
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
