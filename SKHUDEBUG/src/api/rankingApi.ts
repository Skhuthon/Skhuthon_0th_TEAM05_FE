import CustomAxios from './Axios';

export const fetchRanking = async () => {
  try {
    const response = await CustomAxios.get('/rank');
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching ranking data:', error);
    throw error;
  }
};
