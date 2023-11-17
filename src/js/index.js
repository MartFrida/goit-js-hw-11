import Notiflix from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { formEl, searchQueryEl, searchBtn, galleryListEl, loadMoreBtn, simpleLiteBox } from './refs';
import { createGalleryCardsTemplate } from './markup';
import { PixabayAPI } from './pixabay-api';

const pixabayAPI = new PixabayAPI();

// Фун-ція для пошуку з інпуту
const onSearchFormElSubmit = async event => {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();
  pixabayAPI.query = searchQuery;
  pixabayAPI.page = 1;

  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();
    if (data.total === 0) {
      galleryListEl.innerHTML = '';
      //   // loadMoreBtn.classList.add('is-hidden');
      // searchQueryEl.reset();
      Report.failure('Oops! data.total === 0',
        'Something went wrong!', 'Try reloading the page!');
      return;
    }

    // if (data.total_pages === 1) {
    //   galleryListEl.innerHTML = createGalleryCardsTemplate(data.results);
    //   // loadMoreBtnEl.classList.add('is-hidden');

    //   return;
    // }
    galleryListEl.innerHTML = createGalleryCardsTemplate(data.hits);
    simpleLiteBox.refresh();
    // loadMoreBtnEl.classList.remove('is-hidden');
  } catch (err) {
    Report.failure('Oops! Something went wrong! Try reloading the page!');
  }
};

// const onLoadMoreBtnElClick = async event => {
//   pixabayAPI.page += 1;

//   try {
//     const { data } = await pixabayAPI.fetchPhotosByQuery();

//     galleryListEl.insertAdjacentHTML('beforeend', createGalleryCardsTemplate(data.results));

//     if (data.total_pages === pixabayAPI.page) {
//       // loadMoreBtnEl.classList.add('is-hidden');
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };




// Додаємо слухача на форму, наш інпут!
formEl.addEventListener('submit', onSearchFormElSubmit);