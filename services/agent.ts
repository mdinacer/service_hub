import { MemberService, ServiceCreateInput } from '@models/member-service';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { MemberUpdateInput } from 'gql/member/mutations';
import { toast } from 'react-toastify';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: '/api/',
  withCredentials: true
});

const responseBody = (response: AxiosResponse) => response.data;

axiosInstance.interceptors.response.use(
  async (response) => response,
  (error: AxiosError<any>) => {
    if (error.response) {
      const { data, status } = error.response!;
      switch (status) {
        case 400:
          if (data.errors) {
            const modelStateErrors: any[] = [];
            for (const key in data.errors) {
              if (data.errors[key]) {
                modelStateErrors.push(key);
              }
            }
            throw modelStateErrors.flat();
          }
          toast.error(data.title);
          break;

        case 401:
          if (status === 401) {
            toast.error('Session expired - please login again');
          }
          break;

        case 403:
          toast.error('You are not allowed');

          break;

        case 404:
          // code
          break;

        case 500:
          toast.error(data);

          break;
      }
    }

    return Promise.reject(error.response);
  }
);

const requests = {
  get: <T>(url: string, params?: URLSearchParams) =>
    axiosInstance.get<T>(url, { params }).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axiosInstance.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) =>
    axiosInstance.put<T>(url, body).then(responseBody),
  patch: <T>(url: string, body: {}) =>
    axiosInstance.patch<T>(url, body).then(responseBody),
  delete: <T>(url: string, body?: {}) =>
    axiosInstance.delete<T>(url, body).then(responseBody),
  postForm: <T>(url: string, data: FormData) =>
    axiosInstance
      .postForm<T>(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(responseBody),

  putForm: <T>(url: string, data: FormData) =>
    axiosInstance
      .putForm<T>(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(responseBody)
};

const Account = {
  me: () => requests.get(`profile`),
  create: (values: any) => requests.post(`profile/update`, values),
  update: (values: Partial<MemberUpdateInput>) => requests.post(`profile/update`, values)
};

const Assets = {
  delete: (assetId: string) => requests.post(`assets/delete`, { assetId }),
  publish: (assetId: string) => requests.post(`assets/publish`, { assetId }),
  update: (values: any) => requests.post(`assets/update`, values)
};

const Categories = {
  create: (data: any) => requests.post(`categories/create`, { data }),
  list: () => requests.get(`categories`),

};

const Services = {
  list: () => requests.get(`services`),
  get: (id: string) => requests.get(`services/${id}`),
  create: (data: any) => requests.post<MemberService>(`services/create`, data),
  update: (data: any) => requests.post(`services/update`, data),
  delete: (id: string) => requests.post(`services/delete`, { id }),

};

const agent = {
  Account,
  Assets,
  Categories,
  Services
};

export default agent;
