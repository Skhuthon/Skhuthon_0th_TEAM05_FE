import CustomAxios from './Axios';

export const fetchRanking = async () => {
  try {
    const response = await CustomAxios.get('/ranking');
    return response.data.data; // 필요한 데이터만 반환
  } catch (error) {
    console.error('Error fetching ranking data:', error);
    throw error;
  }
};
