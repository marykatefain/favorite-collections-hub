
import { NostrCollection, NostrItem } from '../types';
import { getMockCollections } from '../mockData/collections';
import { generateCollectionItems } from '../mockData/collectionItems';
import { CommentData } from '@/components/comments/CommentItem';

export const getCollections = async (pubkey: string): Promise<NostrCollection[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo collections data
      resolve(getMockCollections(pubkey));
    }, 500);
  });
};

export const getCollectionItems = async (collectionId: string): Promise<NostrItem[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate items for the collection
      const items = generateCollectionItems(collectionId);
      resolve(items);
    }, 500);
  });
};

export const getCollectionComments = async (collectionId: string): Promise<CommentData[]> => {
  // Simulate API request with mock data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo comment data
      resolve([
        {
          id: "comment1",
          text: "This is an amazing collection!",
          createdAt: new Date(Date.now() - 3600 * 1000).toISOString(),
          user: {
            id: "user2",
            username: "bob",
            avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
            rank: "B",
          },
          likes: 5,
        },
        {
          id: "comment2",
          text: "Great picks, especially number 3!",
          createdAt: new Date(Date.now() - 3600 * 24 * 2 * 1000).toISOString(),
          user: {
            id: "user3",
            username: "carol",
            avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
            rank: "C",
          },
          likes: 3,
        },
        {
          id: "comment3",
          text: "Would love to see more like this.",
          createdAt: new Date(Date.now() - 3600 * 24 * 5 * 1000).toISOString(),
          user: {
            id: "user4",
            username: "dave",
            avatarUrl: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126",
            rank: "A",
          },
          likes: 7,
        },
      ]);
    }, 500);
  });
};
