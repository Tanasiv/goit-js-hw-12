import axios from 'axios';

const API_KEY = '55197171-7badb4f38387852aef8c7c06b';
const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api',
});

async function getImagesByQuery(query, page) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 15,
  };

  const response = await axiosInstance.get('/', { params });
  return response.data;
}

export { getImagesByQuery };