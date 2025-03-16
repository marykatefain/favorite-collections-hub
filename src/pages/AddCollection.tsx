
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Search,
  Plus,
  Save,
  MoveUp,
  MoveDown,
  X,
  GripVertical,
} from "lucide-react";
import { ItemType } from "@/components/collections/CollectionItems";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// Define schema for the form
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Collection title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Collection description must be at least 10 characters.",
  }),
  topic: z.string().min(1, {
    message: "Please select a topic.",
  }),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      creator: z.string(),
      coverUrl: z.string().optional(),
      type: z.enum(["movie", "music", "book", "tvshow", "article", "game"]),
    })
  ).min(1, {
    message: "Add at least one item to your collection.",
  }).max(10, {
    message: "Maximum 10 items allowed."
  }),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for topics (would come from API)
const topicSuggestions = [
  "Best Movies of 2023",
  "Classic Rock Albums",
  "Science Fiction Books",
  "Documentaries",
  "Indie Games",
  "Must-Read Articles",
  "TV Shows to Binge",
  "Fantasy Novels",
  "Hip Hop Classics",
  "Comedy Movies",
];

const AddCollection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  // Initialize form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      topic: "",
      items: [],
    },
  });

  const { watch, setValue, getValues } = form;
  const items = watch("items");

  // Mock search function (would connect to your API)
  const searchItems = async (term: string) => {
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Mock results based on search term
      const results = [
        {
          id: `movie-${Date.now()}-1`,
          title: `${term} - The Movie`,
          creator: "Famous Director",
          coverUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
          type: "movie" as ItemType,
        },
        {
          id: `book-${Date.now()}-2`,
          title: `The ${term} Chronicles`,
          creator: "Notable Author",
          coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
          type: "book" as ItemType,
        },
        {
          id: `music-${Date.now()}-3`,
          title: `Songs About ${term}`,
          creator: "Popular Band",
          coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
          type: "music" as ItemType,
        },
      ];
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  // Handle search input changes
  useEffect(() => {
    if (searchTerm.length >= 2) {
      const timer = setTimeout(() => {
        searchItems(searchTerm);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  // Add item from search results to collection
  const addItemToCollection = (item: any) => {
    const currentItems = getValues("items");
    
    // Check if we already have 10 items
    if (currentItems.length >= 10) {
      toast({
        title: "Collection limit reached",
        description: "You can only add up to 10 items in a collection.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if item is already in collection
    const itemExists = currentItems.some((existingItem) => existingItem.id === item.id);
    
    if (itemExists) {
      toast({
        title: "Item already added",
        description: "This item is already in your collection.",
        variant: "destructive",
      });
      return;
    }
    
    setValue("items", [...currentItems, item]);
    setSearchTerm("");
    setSearchResults([]);
  };

  // Add a new custom item
  const addNewItem = () => {
    const currentItems = getValues("items");
    
    // Check if we already have 10 items
    if (currentItems.length >= 10) {
      toast({
        title: "Collection limit reached",
        description: "You can only add up to 10 items in a collection.",
        variant: "destructive",
      });
      return;
    }
    
    const newItem = {
      id: `custom-${Date.now()}`,
      title: "New Item",
      creator: "Add creator name",
      coverUrl: "",
      type: "movie" as ItemType,
    };
    
    setValue("items", [...currentItems, newItem]);
    setSelectedItemIndex(currentItems.length);
  };

  // Remove item from collection
  const removeItem = (index: number) => {
    const currentItems = [...getValues("items")];
    currentItems.splice(index, 1);
    setValue("items", currentItems);
    
    if (selectedItemIndex === index) {
      setSelectedItemIndex(null);
    } else if (selectedItemIndex !== null && selectedItemIndex > index) {
      setSelectedItemIndex(selectedItemIndex - 1);
    }
  };

  // Move item up in the list
  const moveItemUp = (index: number) => {
    if (index === 0) return;
    
    const currentItems = [...getValues("items")];
    const item = currentItems[index];
    currentItems[index] = currentItems[index - 1];
    currentItems[index - 1] = item;
    
    setValue("items", currentItems);
    
    if (selectedItemIndex === index) {
      setSelectedItemIndex(index - 1);
    } else if (selectedItemIndex === index - 1) {
      setSelectedItemIndex(index);
    }
  };

  // Move item down in the list
  const moveItemDown = (index: number) => {
    const currentItems = [...getValues("items")];
    if (index === currentItems.length - 1) return;
    
    const item = currentItems[index];
    currentItems[index] = currentItems[index + 1];
    currentItems[index + 1] = item;
    
    setValue("items", currentItems);
    
    if (selectedItemIndex === index) {
      setSelectedItemIndex(index + 1);
    } else if (selectedItemIndex === index + 1) {
      setSelectedItemIndex(index);
    }
  };

  // Update a specific field of an item
  const updateItemField = (index: number, field: string, value: string) => {
    const currentItems = [...getValues("items")];
    currentItems[index] = {
      ...currentItems[index],
      [field]: value,
    };
    setValue("items", currentItems);
  };

  // Handle form submission
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // Here you would typically send this data to your backend
    
    toast({
      title: "Collection Created",
      description: "Your collection has been created successfully!",
    });
    
    // Navigate to the collections page or the new collection's detail page
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="py-4">
        <h1 className="text-2xl font-bold mb-4">Create New Collection</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Choose a memorable name for your collection.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {topicSuggestions.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {topic}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select a topic for your collection.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Describe your collection..." {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief description of what your collection is about.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Collection Items</CardTitle>
                <CardDescription>
                  Add up to 10 items to your collection ({items.length}/10)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search for items to add..."
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button
                    onClick={addNewItem}
                    variant="outline"
                    className="flex-shrink-0"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Item
                  </Button>
                </div>
                
                {/* Search Results */}
                {searchResults.length > 0 && (
                  <div className="border rounded-md p-2 mb-4 max-h-60 overflow-y-auto">
                    <h3 className="text-sm font-medium mb-2">Search Results</h3>
                    <div className="space-y-2">
                      {searchResults.map((item) => (
                        <div 
                          key={item.id}
                          className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                          onClick={() => addItemToCollection(item)}
                        >
                          <div className="w-10 h-10 bg-muted rounded-md overflow-hidden flex-shrink-0">
                            {item.coverUrl ? (
                              <img 
                                src={item.coverUrl} 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-sm">
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
                            <p className="text-sm text-muted-foreground truncate">{item.creator}</p>
                          </div>
                          <Plus className="h-4 w-4 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* No Results Message */}
                {searchTerm.length >= 2 && searchResults.length === 0 && !isSearching && (
                  <div className="text-center py-3 text-muted-foreground">
                    No items found. Try a different search term or add a new item.
                  </div>
                )}
                
                {/* Loading State */}
                {isSearching && (
                  <div className="text-center py-3 text-muted-foreground">
                    Searching...
                  </div>
                )}
                
                {/* Selected Items List */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Your Collection Items</h3>
                  
                  {items.length === 0 ? (
                    <div className="text-center py-6 border border-dashed rounded-md">
                      <p className="text-muted-foreground">
                        No items added yet. Search for items or add a new one.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {items.map((item, index) => (
                        <div 
                          key={item.id}
                          className={`border rounded-md p-3 ${selectedItemIndex === index ? 'ring-2 ring-primary' : ''}`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                            <span className="text-sm text-muted-foreground font-medium">#{index + 1}</span>
                            <div className="ml-auto flex items-center gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => moveItemUp(index)}
                                disabled={index === 0}
                                className="h-8 w-8 p-0"
                              >
                                <MoveUp className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => moveItemDown(index)}
                                disabled={index === items.length - 1}
                                className="h-8 w-8 p-0"
                              >
                                <MoveDown className="h-4 w-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(index)}
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive/90"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <div 
                              className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0 cursor-pointer"
                              onClick={() => setSelectedItemIndex(index === selectedItemIndex ? null : index)}
                            >
                              {item.coverUrl ? (
                                <img 
                                  src={item.coverUrl} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xl">
                                  {item.type === "movie" ? "🎥" : 
                                   item.type === "music" ? "🎵" : 
                                   item.type === "book" ? "📚" : 
                                   item.type === "tvshow" ? "📺" : 
                                   item.type === "article" ? "📄" : 
                                   item.type === "game" ? "🎮" : "🔗"}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 space-y-2">
                              <Input
                                value={item.title}
                                onChange={(e) => updateItemField(index, "title", e.target.value)}
                                placeholder="Item title"
                              />
                              <Input
                                value={item.creator}
                                onChange={(e) => updateItemField(index, "creator", e.target.value)}
                                placeholder="Creator"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="mr-2 h-4 w-4" />
                  Save Collection
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
    </MainLayout>
  );
};

export default AddCollection;
