// import axios from 'axios';
// const apiClient = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_API_URL,
//     headers:{
//         'Content-Type': 'application/json',
//     },
// });

// //attch request interceptor for authentication in order to attach tokens
// apiClient.interceptors.request.use(
//     (config) => {
//         // const token = localStorage.getItem('token');
//         // if(token){
//         //     config.headers.Authorization = `Bearer ${token}`;
//         // }
//         return config;
//     },
//     (error)=> Promise.reject(error)
// );



// //error handling
// apiClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     // (error) => {
//     //     if(error.response.status === 401){
//     //         localStorage.removeItem('token');
//     // //         window.location.href = '/login';
//     //     }
//     //     return Promise.reject(error);
//     // }
   
   
// );
// export default apiClient;