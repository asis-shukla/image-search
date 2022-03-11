// A mock function to mimic making an async request for data
import axios from "axios";

export function getRecentPhotos(
  api_key: string,
  per_page: number,
  page: number
) {
  return axios.get(
    `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${api_key}&per_page=${per_page}&page=${page}&format=json&nojsoncallback=1`
  );
}
