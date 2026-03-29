import SimpleLightbox from 'simplelightbox';

const refs = {
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const galleryLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createMarkup(images) {
  return images.map(image => createImageMarkup(image)).join('');
}

function createImageMarkup(image) {
  return `
    <li class="gallery__item">
    <a href="${image.largeImageURL}" class="photo-link">
      <div class="photo-card">
        <img
          class="photo-card__image"
          src="${image.webformatURL}"
          alt="${image.tags}"
        />

        <ul class="photo-card__stats">
          <li class="photo-card__item">
            <span class="photo-card__label">Likes</span>
            <span class="photo-card__value">${image.likes}</span>
          </li>
          <li class="photo-card__item">
            <span class="photo-card__label">Views</span>
            <span class="photo-card__value">${image.views}</span>
          </li>
          <li class="photo-card__item">
            <span class="photo-card__label">Comments</span>
            <span class="photo-card__value">${image.comments}</span>
          </li>
          <li class="photo-card__item">
            <span class="photo-card__label">Downloads</span>
            <span class="photo-card__value">${image.downloads}</span>
          </li>
        </ul>
      </div>
    </a>
    </li>
  `;
}

function createGallery(images) {
  const markup = createMarkup(images);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  galleryLightbox.refresh();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
  galleryLightbox.refresh();
}

function showLoader() {
  refs.loader.classList.remove('hidden');
}

function hideLoader() {
  refs.loader.classList.add('hidden');
}

function showLoadMoreButton() {
  refs.loadMoreBtn.classList.remove('hidden');
}

function hideLoadMoreButton() {
  refs.loadMoreBtn.classList.add('hidden');
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};