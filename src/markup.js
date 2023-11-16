export const createGalleryCardsTemplate = photos => {
  return photos
    .map(photo => {
      return `
    <li class="gallery__item">
      <img src="${photo.urls.regular}" alt="${photo.alt_description}" class="gallery-img">
    </li>
    `;
    })
    .join('');
};