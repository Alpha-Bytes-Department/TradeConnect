// Fahim
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
});


api.interceptors.request.use((config) => {
    // config.headers['ngrok-skip-browser-warning'] = 'true'; // This skips the ngrok warning page
   
    if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
});


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refresh_token');

                // We send the refresh token to get a new access token
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/token/refresh/`, {
                    refresh: refreshToken
                });

                // Assuming our refresh endpoint returns { access: "..." }
                const newAccessToken = res?.data?.access;

                localStorage.setItem('access_token', newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }
            catch (refreshError) {
                // If refresh fails, the user must log in again
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default api;