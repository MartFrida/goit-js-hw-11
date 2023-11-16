import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

export class PixabayAPI {
  #API_KEY = '40695765-d4632d96e5d94e604b3421ed4';

  constructor() {
    this.page = 1;
    this.query = null;
    this.perPage = 40;
  }

  fetchPhotosByQuery() {
    const axiosOptions = {
      params: {
        key:this.#API_KEY,
        // 'термін для пошуку. Те, що буде вводити користувач'
        q: this.query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page:this.page,
        per_page:this.perPage,
      },
    };

    return axios.get(`/?`, axiosOptions);
  }
}
