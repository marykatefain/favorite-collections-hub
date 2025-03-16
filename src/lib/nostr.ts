// This is a simplified Nostr service for demo purposes
// In a real application, we would use a proper Nostr client library
import { Rank } from "@/components/user/RankBadge";
import { CommentData } from "@/components/comments/CommentItem";
import { ItemType } from "@/components/collections/CollectionItems";

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
          items: ["item1", "item2", "item3", "item4", "item5", "item6", "item7", "item8", "item9", "item10"],
        },
        {
          id: "collection2",
          name: "Favorite Books",
          description: "Books that changed my life",
          created_at: Date.now() / 1000 - 3600 * 24 * 14,
          pubkey,
          items: ["item11", "item12", "item13", "item14", "item15", "item16", "item17", "item18", "item19", "item20"],
        },
        {
          id: "collection3",
          name: "Favorite Music",
          description: "Songs I can't stop listening to",
          created_at: Date.now() / 1000 - 3600 * 24 * 3,
          pubkey,
          items: ["item21", "item22", "item23", "item24", "item25", "item26", "item27", "item28", "item29", "item30"],
        },
        {
          id: "collection4",
          name: "Horror Movies",
          description: "Scariest movies ever",
          created_at: Date.now() / 1000 - 3600 * 24 * 10,
          pubkey,
          items: ["item31", "item32", "item33", "item34", "item35", "item36", "item37", "item38", "item39", "item40"],
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
        "https://images.unsplash.com/photo-1542204165-65bf26472b9b",
        "https://images.unsplash.com/photo-1594909122845-11baa439b7bf",
        "https://images.unsplash.com/photo-1517604934242-7e0c8ed2963c",
        "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"
      ];
      
      const bookImages = [
        "https://images.unsplash.com/photo-1589998059171-988d887df646",
        "https://images.unsplash.com/photo-1512820790803-83ca734da794",
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
        "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76"
      ];
      
      const musicImages = [
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159",
        "https://images.unsplash.com/photo-1463735142149-8636bafb53f1",
        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa",
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
        "https://images.unsplash.com/photo-1462965326201-d02e4f455804"
      ];
      
      const horrorMovieImages = [
        "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
        "https://images.unsplash.com/photo-1602600214998-fda77a54a38f",
        "https://images.unsplash.com/photo-1509281373149-e957c6296406",
        "https://images.unsplash.com/photo-1518513333736-7b019c5facd5",
        "https://images.unsplash.com/photo-1598641795816-a84ac9eac40c",
        "https://images.unsplash.com/photo-1635805737707-575885ab0820",
        "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436",
        "https://images.unsplash.com/photo-1578632292335-df3abbb0d586",
        "https://images.unsplash.com/photo-1542253417-3437e0c73146",
        "https://images.unsplash.com/photo-1611348586840-ea9872d33411"
      ];
      
      let imageSet = movieImages;
      let titlePrefix = "Movie";
      let itemType = "movie";
      
      if (collectionId === "collection2") {
        imageSet = bookImages;
        titlePrefix = "Book";
        itemType = "book";
      } else if (collectionId === "collection3") {
        imageSet = musicImages;
        titlePrefix = "Song";
        itemType = "music";
      } else if (collectionId === "collection4") {
        imageSet = horrorMovieImages;
        titlePrefix = "Horror Movie";
        itemType = "movie";
      }
      
      // Create 10 items per collection
      const items = Array.from({ length: 10 }).map((_, i) => ({
        id: `item${collectionId === "collection1" ? i+1 : 
             collectionId === "collection2" ? i+11 : 
             collectionId === "collection3" ? i+21 : i+31}`,
        title: `${titlePrefix} Title ${i+1}`,
        type: itemType,
        url: `https://example.com/${collectionId}/${i+1}`,
        image: imageSet[i % imageSet.length],
        description: `Description for ${titlePrefix.toLowerCase()} ${i+1} in collection ${collectionId}`,
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
      // Demo feed data with images
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
            id: "item21",
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
            avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            rank: "C",
          },
          timestamp: new Date(Date.now() - 86400 * 1000).toISOString(),
          item: {
            id: "item11",
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
        {
          id: "feed4",
          user: {
            id: "user4",
            username: "dave",
            avatarUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
            rank: "B",
          },
          timestamp: new Date(Date.now() - 172800 * 1000).toISOString(),
          item: {
            id: "item31",
            title: "The Shining",
            type: "movie",
            imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
          },
          collectionName: "Horror Movies",
          collectionId: "collection4",
          likes: 31,
          comments: 7,
          zaps: 12,
        },
        {
          id: "feed5",
          user: {
            id: "user5",
            username: "eve",
            avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            rank: "A",
          },
          timestamp: new Date(Date.now() - 259200 * 1000).toISOString(),
          item: {
            id: "item22",
            title: "Stairway to Heaven",
            type: "music",
            imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
          },
          collectionName: "Favorite Music",
          collectionId: "collection3",
          likes: 57,
          comments: 15,
          zaps: 23,
        },
      ]);
    }, 500);
  });
};

export const getGlobalCharts = async (category?: string): Promise<any[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo chart data with images
      const movies = [
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
          id: "item2",
          rank: 3,
          previousRank: 9,
          title: "The Godfather",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
          score: 93,
          collections: 715,
        },
        {
          id: "item31",
          rank: 4,
          previousRank: 7,
          title: "The Shining",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c",
          score: 91,
          collections: 687,
        },
        {
          id: "item32",
          rank: 5,
          previousRank: 3,
          title: "Pulp Fiction",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
          score: 90,
          collections: 650,
        },
        {
          id: "item33",
          rank: 6,
          previousRank: 8,
          title: "The Dark Knight",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406",
          score: 89,
          collections: 635,
        },
        {
          id: "item34",
          rank: 7,
          previousRank: 6,
          title: "Interstellar",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b",
          score: 87,
          collections: 610,
        },
        {
          id: "item35",
          rank: 8,
          previousRank: 11,
          title: "The Matrix",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1",
          score: 86,
          collections: 590,
        },
        {
          id: "item36",
          rank: 9,
          previousRank: 10,
          title: "Parasite",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1517604934242-7e0c8ed2963c",
          score: 85,
          collections: 575,
        },
        {
          id: "item37",
          rank: 10,
          previousRank: 13,
          title: "Fight Club",
          type: "movie",
          imageUrl: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb",
          score: 84,
          collections: 552,
        },
      ];
      
      const music = [
        {
          id: "item21",
          rank: 1,
          previousRank: 3,
          title: "Bohemian Rhapsody",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745",
          score: 97,
          collections: 801,
        },
        {
          id: "item23",
          rank: 2,
          previousRank: 1,
          title: "Hotel California",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
          score: 94,
          collections: 754,
        },
        {
          id: "item22",
          rank: 3,
          previousRank: 2,
          title: "Stairway to Heaven",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
          score: 92,
          collections: 721,
        },
        {
          id: "item24",
          rank: 4,
          previousRank: 5,
          title: "Imagine",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae",
          score: 90,
          collections: 680,
        },
        {
          id: "item25",
          rank: 5,
          previousRank: 4,
          title: "Billie Jean",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
          score: 89,
          collections: 645,
        },
        {
          id: "item26",
          rank: 6,
          previousRank: 8,
          title: "Hey Jude",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1477233534935-f5e6fe7c1159",
          score: 88,
          collections: 632,
        },
        {
          id: "item27",
          rank: 7,
          previousRank: 6,
          title: "Like a Rolling Stone",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1463735142149-8636bafb53f1",
          score: 86,
          collections: 590,
        },
        {
          id: "item28",
          rank: 8,
          previousRank: 9,
          title: "Purple Haze",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa",
          score: 84,
          collections: 570,
        },
        {
          id: "item29",
          rank: 9,
          previousRank: 12,
          title: "Smells Like Teen Spirit",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
          score: 83,
          collections: 550,
        },
        {
          id: "item30",
          rank: 10,
          previousRank: 7,
          title: "Superstition",
          type: "music",
          imageUrl: "https://images.unsplash.com/photo-1462965326201-d02e4f455804",
          score: 82,
          collections: 530,
        },
      ];
      
      const books = [
        {
          id: "item11",
          rank: 1,
          previousRank: 2,
          title: "Sapiens: A Brief History of Humankind",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646",
          score: 96,
          collections: 789,
        },
        {
          id: "item13",
          rank: 2,
          previousRank: 1,
          title: "To Kill a Mockingbird",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
          score: 93,
          collections: 743,
        },
        {
          id: "item14",
          rank: 3,
          previousRank: 5,
          title: "1984",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f",
          score: 92,
          collections: 712,
        },
        {
          id: "item15",
          rank: 4,
          previousRank: 3,
          title: "Harry Potter and the Sorcerer's Stone",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1519682337058-a94d519337bc",
          score: 90,
          collections: 675,
        },
        {
          id: "item16",
          rank: 5,
          previousRank: 4,
          title: "The Lord of the Rings",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
          score: 89,
          collections: 642,
        },
        {
          id: "item17",
          rank: 6,
          previousRank: 8,
          title: "The Great Gatsby",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19",
          score: 88,
          collections: 621,
        },
        {
          id: "item18",
          rank: 7,
          previousRank: 9,
          title: "Pride and Prejudice",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
          score: 86,
          collections: 595,
        },
        {
          id: "item19",
          rank: 8,
          previousRank: 6,
          title: "The Alchemist",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
          score: 84,
          collections: 570,
        },
        {
          id: "item20",
          rank: 9,
          previousRank: 7,
          title: "The Catcher in the Rye",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e",
          score: 83,
          collections: 540,
        },
        {
          id: "item41",
          rank: 10,
          previousRank: 11,
          title: "Brave New World",
          type: "book",
          imageUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76",
          score: 82,
          collections: 525,
        },
      ];
      
      const tvshows = [
        {
          id: "item51",
          rank: 1,
          previousRank: 3,
          title: "Breaking Bad",
          type: "tvshow",
          imageUrl: "https://images.unsplash.com/photo-1504465039710-0f49c0a47eb7",
          score: 97,
          collections: 820,
        },
        {
          id: "item52",
          rank: 2,
          previousRank: 1,
          title: "Game of Thrones",
          type: "tvshow",
          imageUrl: "https://images.unsplash.com/photo-1562462863-42d40916e6c7",
          score: 94,
          collections: 760,
        },
        {
          id: "item53",
          rank: 3,
          previousRank: 2,
          title: "The Wire",
          type: "tvshow",
          imageUrl: "https://images.unsplash.com/photo-1577731930879-4f8bba0c9d9b",
          score: 93,
          collections: 730,
        },
        {
          id: "item54",
          rank: 4,
          previousRank: 5,
          title: "The Sopranos",
          type: "tvshow",
          imageUrl: "https://images.unsplash.com/photo-1572188863110-46d457c9234d",
          score: 91,
          collections: 695,
        },
        {
          id: "item55",
          rank: 5,
          previousRank: 4,
          title: "Stranger Things",
          type: "tvshow",
          imageUrl: "https://images.unsplash.com/photo-1534337621606-e3df5ee0e97f",
          score: 89,
          collections: 650,
        },
        {
          id: "item56",
          rank: 6,
          previousRank: 8,
          title: "The Office",
          type: "tvshow
