
// Types for Nostr entities and API

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
export const EVENT_KINDS = {
  PROFILE: 0,
  TEXT_NOTE: 1,
  COLLECTION: 30001, // Custom kind for collections
  COLLECTION_ITEM: 30002, // Custom kind for collection items
  REACTION: 7,
  ZAP: 9735,
};

export type ItemType = "movie" | "music" | "book" | "tvshow" | "article" | "video" | "meme" | "person" | "game" | "other";
