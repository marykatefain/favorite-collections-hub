
// This is a simplified Nostr service for demo purposes
// In a real application, we would use a proper Nostr client library

export interface NostrEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig: string;
}

export interface NostrProfile {
  npub: string;
  pubkey: string;
  name: string;
  picture?: string;
  about?: string;
  nip05?: string;
  rank: "A" | "B" | "C" | "D" | "E" | "F";
}

export interface NostrItem {
  id: string;
  title: string;
  type: string;
  url?: string;
  image?: string;
  description?: string;
  created_at: number;
  pubkey: string;
}

export interface NostrCollection {
  id: string;
  name: string;
  description?: string;
  created_at: number;
  pubkey: string;
  items: string[];
  parent_id?: string;
}

// Event kinds for our application
const EVENT_KINDS = {
  PROFILE: 0,
  TEXT_NOTE: 1,
  COLLECTION: 30001, // Custom kind for collections
  COLLECTION_ITEM: 30002, // Custom kind for collection items
  REACTION: 7,
  ZAP: 9735,
};

// Mock functions for demo purposes
// These would be replaced with actual Nostr API calls in a real app

export const getProfile = async (pubkey: string): Promise<NostrProfile | null> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo profile data
      resolve({
        npub: "npub1random123456789abcdef",
        pubkey,
        name: "Nostr User",
        picture: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        about: "A Nostr enthusiast sharing my favorite things",
        rank: "B",
      });
    }, 500);
  });
};

export const getCollections = async (pubkey: string): Promise<NostrCollection[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo collections data
      resolve([
        {
          id: "collection1",
          name: "Favorite Movies",
          description: "My all-time favorite movies",
          created_at: Date.now() / 1000 - 3600 * 24 * 7,
          pubkey,
          items: ["item1", "item2", "item3"],
        },
        {
          id: "collection2",
          name: "Favorite Books",
          description: "Books that changed my life",
          created_at: Date.now() / 1000 - 3600 * 24 * 14,
          pubkey,
          items: ["item4", "item5"],
        },
        {
          id: "collection3",
          name: "Favorite Music",
          description: "Songs I can't stop listening to",
          created_at: Date.now() / 1000 - 3600 * 24 * 3,
          pubkey,
          items: ["item6", "item7", "item8", "item9"],
        },
        {
          id: "collection4",
          name: "Horror Movies",
          description: "Scariest movies ever",
          created_at: Date.now() / 1000 - 3600 * 24 * 10,
          pubkey,
          items: ["item10", "item11"],
          parent_id: "collection1"
        },
      ]);
    }, 500);
  });
};

export const getCollectionItems = async (collectionId: string): Promise<NostrItem[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo items data with various image URLs
      const movieImages = [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728",
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
        "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
        "https://images.unsplash.com/photo-1440404653325-ab127d49abc1",
        "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
        "https://images.unsplash.com/photo-1542204165-65bf26472b9b"
      ];
      
      const bookImages = [
        "https://images.unsplash.com/photo-1589998059171-988d887df646",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
      ];
      
      const musicImages = [
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
      ];
      
      let imageSet = movieImages;
      if (collectionId === "collection2") {
        imageSet = bookImages;
      } else if (collectionId === "collection3") {
        imageSet = musicImages;
      }
      
      // Create between 3-6 items
      const itemCount = Math.max(3, Math.min(6, Math.floor(Math.random() * 7)));
      const items = Array.from({ length: itemCount }).map((_, i) => ({
        id: `item${collectionId}-${i+1}`,
        title: collectionId.includes("1") ? `Movie Title ${i+1}` :
               collectionId.includes("2") ? `Book Title ${i+1}` :
               collectionId.includes("3") ? `Song Title ${i+1}` : `Item ${i+1}`,
        type: collectionId.includes("1") ? "movie" :
              collectionId.includes("2") ? "book" :
              collectionId.includes("3") ? "music" : "item",
        url: `https://example.com/${collectionId}/${i+1}`,
        image: imageSet[i % imageSet.length],
        description: `Description for item ${i+1} in collection ${collectionId}`,
        created_at: Date.now() / 1000 - 3600 * 24 * (i+1),
        pubkey: "pubkey1",
      }));
      
      resolve(items);
    }, 500);
  });
};

export const getFeedItems = async (): Promise<any[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo feed data
      resolve([
        {
          id: "feed1",
          user: {
            id: "user1",
            username: "alice",
            avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            rank: "A",
          },
          timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
          item: {
            id: "item1",
            title: "The Shawshank Redemption",
            type: "movie",
            imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
          },
          collectionName: "Favorite Movies",
          collectionId: "collection1",
          likes: 24,
          comments: 5,
          zaps: 8,
        },
        {
          id: "feed2",
          user: {
            id: "user2",
            username: "bob",
            avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
            rank: "B",
          },
          timestamp: new Date(Date.now() - 7200 * 1000).toISOString(),
          item: {
            id: "item6",
            title: "Bohemian Rhapsody",
            type: "music",
            imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
          },
          collectionName: "Favorite Music",
          collectionId: "collection3",
          likes: 42,
          comments: 12,
          zaps: 15,
        },
        {
          id: "feed3",
          user: {
            id: "user3",
            username: "carol",
            avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
            rank: "C",
          },
          timestamp: new Date(Date.now() - 86400 * 1000).toISOString(),
          item: {
            id: "item4",
            title: "Sapiens: A Brief History of Humankind",
            type: "book",
            imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646",
          },
          collectionName: "Favorite Books",
          collectionId: "collection2",
          likes: 18,
          comments: 3,
          zaps: 5,
        },
      ]);
    }, 500);
  });
};

export const getGlobalCharts = async (category?: string): Promise<any[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo chart data
      resolve([
        {
          id: "item1",
          rank: 1,
          previousRank: 2,
          title: "The Shawshank Redemption",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728",
          score: 98,
          collections: 842,
        },
        {
          id: "item12",
          rank: 2,
          previousRank: 1,
          title: "Inception",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26",
          score: 95,
          collections: 756,
        },
        {
          id: "item6",
          rank: 3,
          previousRank: 5,
          title: "Bohemian Rhapsody",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
          score: 93,
          collections: 701,
        },
        {
          id: "item4",
          rank: 4,
          previousRank: 3,
          title: "Sapiens: A Brief History of Humankind",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646",
          score: 91,
          collections: 689,
        },
        {
          id: "item14",
          rank: 5,
          title: "Breaking Bad",
          type: "tvshow",
          imageUrl: "https://images.unsplash.com/photo-1613294326794-e7c71a328b0e",
          score: 89,
          collections: 654,
        },
      ]);
    }, 500);
  });
};

// More functions would be added here for a complete implementation
