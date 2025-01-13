// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "https://school-management-be-2.onrender.com/",
//   // baseURL: "http://127.0.0.1:8000",
// });

// export default apiClient;
import axios from "axios";

const isLocalDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

const apiClient = axios.create({
  baseURL: isLocalDevelopment 
    ? "http://127.0.0.1:8000"
    : "https://school-management-be-2.onrender.com/",
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
