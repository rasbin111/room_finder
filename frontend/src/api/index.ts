import axios, { AxiosError, type AxiosResponse } from 'axios'

const PUBLIC_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/v1`
const PUBLIC_BASE_TOKEN = `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh/`

const api = axios.create({
  baseURL: PUBLIC_BASE,
  timeout: 1000000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const fileApi = axios.create({
  baseURL: PUBLIC_BASE,
  timeout: 4000000,
  // headers: {
  //   'Content-Type': 'multipart/form-data',
  // },
})

api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (typeof window !== 'undefined' && response?.data?.access) {
      window.localStorage.setItem('token', 'Bearer ' + response?.data?.access)
    }
    return response
  },
  (error: AxiosError) => {
    const { response } = error
    if (typeof window !== 'undefined' && response?.status === 401) {
      const data = {
        refresh: JSON.parse(localStorage.getItem('refreshToken') || '""'),
      }
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
      axios
        .post(PUBLIC_BASE_TOKEN, data, { headers })
        .then((response: any) => {
          localStorage.setItem('token', 'Bearer ' + response.data.access)
        })
        .catch(() => {
          window.localStorage.removeItem('token')
          window.location.pathname = '/login'
        })
    }
    return Promise.reject(error)
  },
)



const authenticated = (api: any) => {
  const token: string | null = localStorage.getItem('token')
  let parsedToken: string | null
  try {
    parsedToken = token ? JSON.parse(token) : null
  } catch {
    parsedToken = token // If parsing fails, assume it's a normal string
  }
  api.defaults.headers.common.Authorization = parsedToken || ''
  return api
}


export const getData = <R = any>(url: string): Promise<AxiosResponse<R>> =>
  authenticated(api).get(url)

export const getFileData = <R = any> (url: string): Promise<AxiosResponse<R>> => 
  authenticated(fileApi).get(url, {
    responseType: "arraybuffer",
  })

export const editData = <T, R = any>(
  url: string,
  data: T,
): Promise<AxiosResponse<R>> => authenticated(api).put(url, data)

export const fileEditData = <T, R = any>(
  url: string,
  data: T,
): Promise<AxiosResponse<R>> => authenticated(fileApi).put(url, data)

export const postData = <T, R = any>(
  url: string,
  data: T,
): Promise<AxiosResponse<R>> => authenticated(api).post(url, data)

export const fileUpload = <T, R = any>(
  url: string,
  data: T,
): Promise<AxiosResponse<R>> => authenticated(fileApi).post(url, data)

export const delData = <T, R = any>(
  url: string,
  data?: T,
): Promise<AxiosResponse<R>> => authenticated(api).delete(url, data)

export const loginPost = <T, R = any>(
  url: string,
  data: T,
): Promise<AxiosResponse<R>> => api.post<R>(url, data)