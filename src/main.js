import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import { clearGallery, createGallery, hideLoader, showLoader } from './js/render-functions.js';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

const noResultsMessage = {
  message:
    'Sorry, there are no images matching your search query. Please try again!',
  position: 'topRight',
};

const emptyQueryMessage = {
  message: 'Please enter a search query.',
  position: 'topRight',
};

const requestErrorMessage = {
  message: 'Sorry, something went wrong. Please try again later.',
  position: 'topRight',
};

refs.form.addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(refs.form);
  const query = String(formData.get('search-text') ?? '').trim();

  if (!query) {
    iziToast.warning(emptyQueryMessage);
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => handleThen(data))
    .catch(() => {
      iziToast.error(requestErrorMessage);
    })
    .finally(() => hideLoader());
});

function handleThen(data) {
  const hits = data.hits;

  if (hits.length === 0) {
    iziToast.error(noResultsMessage);
    return;
  }

  createGallery(hits);
}