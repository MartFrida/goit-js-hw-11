import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { formEl, galleryListEl, simpleLiteBox, infiniteScroll } from './refs';
import { createGalleryCardsTemplate } from './markup';
import { PixabayAPI } from './pixabay-api';

const pixabayAPI = new PixabayAPI();

const options = {
  root: null,
  rootMargin: "0px 0px 100px 0px",
  threshold: 1.0,
};

//infinite scroll

const onInfiniteLoad = async (entries, observer) => {
  if (!entries[0].isIntersecting) {
    return;
  }
  pixabayAPI.page += 1;
  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();
    const lastPage = Math.ceil(data.totalHits / pixabayAPI.perPage)
    galleryListEl.insertAdjacentHTML('beforeend', createGalleryCardsTemplate(data.hits));
    simpleLiteBox.refresh();

    if (lastPage === pixabayAPI.page) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      infiniteScrollObserver.unobserve(infiniteScroll)
    }
  } catch (err) {
    console.log(err);
  }
};

const infiniteScrollObserver = new IntersectionObserver(onInfiniteLoad, options);

// Фун-ція для пошуку з інпуту
const onSearchFormElSubmit = async event => {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements['searchQuery'].value.trim();
  pixabayAPI.query = searchQuery;
  pixabayAPI.page = 1;
  if (!searchQuery) {
    Notify.info("Empty search");
    return;
  }


  try {
    const { data } = await pixabayAPI.fetchPhotosByQuery();
    if (data.totalHits === 0) {
      Report.info(
        "Sorry,",
        'there are no images matching your search query.',
        'Please try again.',
      );
    }

    if (data.totalHits > 0) {
      Notify.success(`we found ${data.totalHits} pictures`);
    }

    if (data.total === 1) {
      galleryListEl.innerHTML = createGalleryCardsTemplate(data.hits);
      return;
    }
    galleryListEl.innerHTML = createGalleryCardsTemplate(data.hits);
    simpleLiteBox.refresh();

    if (data.totalHits > pixabayAPI.perPage) {
      infiniteScrollObserver.observe(infiniteScroll);
    }

  } catch (err) {
    Report.failure('Oops! Something went wrong! Try reloading the page!');
  }
};

formEl.addEventListener('submit', onSearchFormElSubmit);