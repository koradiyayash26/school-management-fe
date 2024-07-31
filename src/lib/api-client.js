import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://school-management-be-m1fo.onrender.com/",
});

export default apiClient;

// class APIClient {
//   constructor(endpoint) {
//     this.endpoint = endpoint;
//   }

//   getAll = () => {
//     return axiosInstance.get(this.endpoint).then((res) => res.data);
//   };

//   post = (data) => {
//     return axiosInstance.post(this.endpoint, data).then((res) => res.data);
//   };
// }

// export default APIClient;
