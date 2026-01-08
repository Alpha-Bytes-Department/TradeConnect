import axios from 'axios';

const api = axios.create({
    baseURL: 'https://rihanna-preacquisitive-eleanore.ngrok-free.dev',
    timeout: 10000, // 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;