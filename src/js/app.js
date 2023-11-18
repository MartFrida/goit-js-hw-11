import { Notify, Report } from 'notiflix/build/notiflix-notify-aio';
import { formEl, searchQueryEl, searchBtn, galleryListEl, loadMoreBtn, simpleLiteBox, infiniteScroll } from './refs';
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
      // loadMoreBtn.classList.add('is-hidden');
      searchQueryEl.reset();
      infiniteScrollObserver.observe(infiniteScroll)
      Notify.info('Sorry, there are no images matching your search query. Please try again.');
      return;
    }

    if (data.total === 1) {
      galleryListEl.innerHTML = createGalleryCardsTemplate(data.hits);
      // loadMoreBtn.classList.add('is-hidden');
      return;
    }
    galleryListEl.innerHTML = createGalleryCardsTemplate(data.hits);
    simpleLiteBox.refresh();
    // loadMoreBtn.classList.remove('is-hidden');
  } catch (err) {
    Report.failure('Oops! Something went wrong! Try reloading the page!');
  }
};

// callback for load more pictures
// const onLoadMoreBtnClick = async event => {
//   pixabayAPI.page += 1;
//   try {
//     const { data } = await pixabayAPI.fetchPhotosByQuery();
//     galleryListEl.insertAdjacentHTML('beforeend', createGalleryCardsTemplate(data.hits));
//     // змінити на data qantity page
//     if (data.hits === pixabayAPI.page) {
//       loadMoreBtn.classList.add('is-hidden');
//       Notify.info("We're sorry, but you've reached the end of search results.");
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };
// loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);


formEl.addEventListener('submit', onSearchFormElSubmit);

//infinite scroll

const onInfiniteLoad = async (entries, observer) => {
  if (!entries[0].isIntersecting) {
    return;
  }
  pixabayAPI.page += 1;
  try {
    if (pixabayAPI.query === undefined) {
      //якщо запиту немає, то нічого не повинно підгружатися

    }
    const { data } = await pixabayAPI.fetchPhotosByQuery();

    galleryListEl.insertAdjacentHTML('beforeend', createGalleryCardsTemplate(data.hits));
    // де в моїх дата кількість сторінок
    if (data.hits === pixabayAPI.page) {

      observer.unobserve(infiniteScroll);
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
  } catch (err) {
    console.log(err);
  }
};

const options = {
  root: null,
  rootMargin: "0px 0px 100px 0px",
  threshold: 1.0,
};

const infiniteScrollObserver = new IntersectionObserver(onInfiniteLoad, options);
infiniteScrollObserver.observe(infiniteScroll);