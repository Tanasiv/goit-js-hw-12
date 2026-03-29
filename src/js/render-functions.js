import SimpleLightbox from 'simplelightbox';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

let galleryLightbox = null;

function initOrRefreshLightbox() {
  if (!galleryLightbox) {
    galleryLightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
  galleryLightbox.refresh();
}

function createGallery(images) {
  refs.gallery.innerHTML = createMarkup(images);
  initOrRefreshLightbox();
}

function createMarkup(images){
  return images.map(image => createImageMarkup(image)).join('');
}
function createImageMarkup(image){
  return `
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
  `
}

function clearGallery() {
  refs.gallery.innerHTML = '';
  if (galleryLightbox) {
    galleryLightbox.refresh();
  }
}
function showLoader(){
  refs.loader.classList.remove('hidden');
}
function hideLoader(){
  refs.loader.classList.add('hidden');
}

export {createGallery, clearGallery, showLoader, hideLoader}