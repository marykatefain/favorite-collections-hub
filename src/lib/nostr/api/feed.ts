
import { getFeedMockData } from '../mockData/feedData';

export const getFeedItems = async (): Promise<any[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo feed data with images
      resolve(getFeedMockData());
    }, 500);
  });
};
