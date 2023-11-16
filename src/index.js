// import Notiflix from 'notiflix';
import { searchBtn, galleryListEl, formEl } from './refs';
import { createGalleryCardsTemplate } from './markup';
import { PixabayAPI } from './pixabay-api';


// loadMoreBtnEl.addEventListener('click', onLoadMoreBtnElClick);
const pixabayAPI = new PixabayAPI();

const onSearchFormElSubmit = async event => {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  pixabayAPI.query = searchQuery;
  pixabayAPI.page = 1;

  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();
    console.log(data)
    // if (data.total === 0) {
    //   galleryListEl.innerHTML = '';

    //   // loadMoreBtnEl.classList.add('is-hidden');

    //   searchFormEl.reset();

    //   return;
    // }

    // if (data.total_pages === 1) {
    //   galleryListEl.innerHTML = createGalleryCardsTemplate(data.results);
    //   // loadMoreBtnEl.classList.add('is-hidden');

    //   return;
    // }

    // galleryListEl.innerHTML = createGalleryCardsTemplate(data.results);
    // loadMoreBtnEl.classList.remove('is-hidden');
  } catch (err) {
    console.log(err);
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


formEl.addEventListener('submit', onSearchFormElSubmit);