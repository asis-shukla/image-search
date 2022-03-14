import axios from "axios";
const BASE_URL = "https://www.flickr.com/services/rest";

export function getRecentPhotos(
  api_key: string,
  per_page: number,
  page: number
) {
  return axios.get(
    `${BASE_URL}/?method=flickr.photos.getRecent&api_key=${api_key}&per_page=${per_page}&page=${page}&format=json&nojsoncallback=1`
  );
}

export function getPhotoBySearchText(
  api_key: string,
  per_page: number,
  page: number,
  searchText: string
) {
  return axios.get(
    `${BASE_URL}/?method=flickr.photos.search&api_key=${api_key}&text=${searchText}&per_page=${per_page}&page=${page}&format=json&nojsoncallback=1`
  );
}
