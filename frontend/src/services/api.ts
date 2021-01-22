import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_HOST })

api.interceptors.request.use(config => {
  const token = localStorage.getItem("TOKEN")

  if (token) config.headers.Authorization = `Bearer ${token}`

  return config
})

export default api