import axios from 'axios';

const API_KEY = '55197171-7badb4f38387852aef8c7c06b';
const axiosInstance = axios.create({
  baseURL: 'https://pixabay.com/api',
});

function getImagesByQuery(query) {
  return axiosInstance.get('/', {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true, 
    },
  }).then(response => response.data);
}

export { getImagesByQuery };