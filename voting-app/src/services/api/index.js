import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
})

// Request interceptor for auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  requestOTP: (email) => api.post('/auth/request-otp', { email }),
  verifyOTP: (email, otp) => api.post('/auth/verify-otp', { email, otp }),
}

export const electionAPI = {
  create: (data) => api.post('/elections', data),
  get: (id) => api.get(`/elections/${id}`),
  list: () => api.get('/elections'),
  update: (id, data) => api.put(`/elections/${id}`, data),
}

export const votingAPI = {
  submitVote: (electionId, ballot) => api.post(`/elections/${electionId}/vote`, ballot),
  getReceipt: (electionId) => api.get(`/elections/${electionId}/receipt`),
}

export default api
