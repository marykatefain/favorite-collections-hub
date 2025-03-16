
import { NostrItem } from '../types';
import { movieImages, bookImages, musicImages, horrorMovieImages } from './images';

// Helper to generate collection items
export const generateCollectionItems = (collectionId: string): NostrItem[] => {
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
  return Array.from({ length: 10 }).map((_, i) => ({
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
};
