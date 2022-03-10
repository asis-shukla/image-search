// A mock function to mimic making an async request for data
import axios from "axios";

// export function fetchPhotos(amount = 1) {
//   return new Promise<{ data: number }>((resolve) =>
//     setTimeout(() => resolve({ data: amount }), 500)
//   );
// }

export function fetchPhotos(amount = 1) {
  return axios.get(`https://jsonplaceholder.typicode.com/photos?_page=${amount}&_limit=16`);
}
