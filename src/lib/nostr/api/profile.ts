
import { NostrProfile } from '../types';

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
