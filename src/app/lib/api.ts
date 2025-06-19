// export const fetchAdminTours = async () => {
//     const token = localStorage.getItem('token');
//     const res = await fetch('http://127.0.0.1:8000/api/admin/tours', {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Accept': 'application/json',
//       },
//     });
  
//     const data = await res.json();
  
//     if (!res.ok) {
//       throw new Error(data.message || 'Failed to fetch tours');
//     }
  
//     return data.tours;
//   };
  
import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000/api/admin/tours';

// SET TOKEN (example - you must get token after login)
const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken'); // assuming you save token here
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    }
  };
};


// ADMIN - Create a new tour
export const createAdminTour = async (tourData: any) => {
  const response = await axios.post(`${API_URL}`, tourData, getAuthHeaders());
  return response.data;
};


// ADMIN - Read all tours
export const fetchAdminTours = async () => {
  const response = await axios.get(`${API_URL}`, getAuthHeaders());
  console.log('🚀 fetched data:', response.data);
  return response.data;
};

// ADMIN - Delete a tour
export const deleteAdminTour = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
  return response.data;
  
};

// ADMIN - Update a tour by ID
export const updateAdminTour = async (id: number, tourData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, tourData, getAuthHeaders());
  return response.data;
};


// ADMIN - Create a tour
// export const createAdminTour = async (tourData: any) => {
//   const response = await axios.post(`${API_URL}/tours`, tourData, getAuthHeaders());
//   return response.data;
// };

// // ADMIN - Update a tour
// export const updateAdminTour = async (id: any, tourData: any) => {
//   const response = await axios.put(`${API_URL}/tours/${id}`, tourData, getAuthHeaders());
//   return response.data;
// };