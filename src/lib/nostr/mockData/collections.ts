
import { NostrCollection } from '../types';

// Mock collections data
export const getMockCollections = (pubkey: string): NostrCollection[] => [
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
];
