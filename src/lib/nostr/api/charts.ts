
import { ItemType } from '../types';
import { 
  getMovieChartData, 
  getMusicChartData, 
  getBookChartData, 
  getTvShowChartData 
} from '../mockData/chartData';

export const getGlobalCharts = async (category?: ItemType): Promise<any[]> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get the appropriate chart data based on category
      if (category === 'movie') {
        resolve(getMovieChartData());
      } else if (category === 'music') {
        resolve(getMusicChartData());
      } else if (category === 'book') {
        resolve(getBookChartData());
      } else if (category === 'tvshow') {
        resolve(getTvShowChartData());
      } else {
        // If no category or 'all', merge all charts and take top items
        const allCharts = [
          ...getMovieChartData(),
          ...getMusicChartData(),
          ...getBookChartData(),
          ...getTvShowChartData(),
        ];
        
        // Sort by score and take top items
        const sortedCharts = allCharts
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
          
        resolve(sortedCharts);
      }
    }, 500);
  });
};
