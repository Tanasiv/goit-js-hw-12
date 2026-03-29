import { getImagesByQuery } from './js/pixabay-api.js';
import iziToast from 'izitoast';
import {
  clearGallery,
  createGallery,
  hideLoader,
  hideLoadMoreButton,
  showLoader,
  showLoadMoreButton,
} from './js/render-functions.js';

const PER_PAGE = 15;

let currentQuery = '';
let currentPage = 1;

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
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

const endOfSearchResultsMessage = {
  message:
    "We're sorry, but you've reached the end of search results.",
  position: 'topRight',
};

refs.form.addEventListener('submit', async e => {
  e.preventDefault();

  hideLoadMoreButton();

  const formData = new FormData(refs.form);
  const query = String(formData.get('search-text') ?? '').trim();

  if (!query) {
    iziToast.warning(emptyQueryMessage);
    return;
  }

  currentQuery = query;
  currentPage = 1;

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    const hits = data.hits;

    if (hits.length === 0) {
      iziToast.error(noResultsMessage);
      return;
    }

    createGallery(hits);
    updateLoadMoreButtonVisibility(data.totalHits, { hadHits: true });
  } catch {
    iziToast.error(requestErrorMessage);
  } finally {
    hideLoader();
  }
});

refs.loadMoreBtn.addEventListener('click', async () => {
  const nextPage = currentPage + 1;

  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, nextPage);
    const hits = data.hits;

    if (hits.length === 0) {
      iziToast.info(endOfSearchResultsMessage);
      return;
    }

    currentPage = nextPage;
    createGallery(hits);
    updateLoadMoreButtonVisibility(data.totalHits, { hadHits: true });
    scrollByTwoCardHeights();
  } catch {
    iziToast.error(requestErrorMessage);
    showLoadMoreButton();
  } finally {
    hideLoader();
  }
});

function scrollByTwoCardHeights() {
  const card = refs.gallery.querySelector('.photo-link');
  if (!card) {
    return;
  }

  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({
    top: 2 * cardHeight,
    left: 0,
    behavior: 'smooth',
  });
}

function updateLoadMoreButtonVisibility(totalHits, { hadHits = false } = {}) {
  const hasMore = currentPage * PER_PAGE < totalHits;

  if (hasMore) {
    showLoadMoreButton();
  } else {
    hideLoadMoreButton();
    if (hadHits) {
      iziToast.info(endOfSearchResultsMessage);
    }
  }
}