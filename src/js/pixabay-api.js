import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class PixabayAPI {
  #API_KEY = '40695765-d4632d96e5d94e604b3421ed4';
  #query = '';

  constructor() {
    this.page = 1;
    this.#query = null;
    this.perPage = 12;
  }

  // Запит картинок по ключовому слову
  fetchPhotosByQuery() {
    const axiosOptions = {
      params: {
        key: this.#API_KEY,
        q: this.#query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: this.page,
        per_page: this.perPage,
      },
    };

    return axios.get(`/?`, axiosOptions);
  }

  // Сетер для запису searchQuery
  set query(newQuery) {
    this.#query = newQuery;
  }
}
