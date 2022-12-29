import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";

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
    me: () => requests.get(`account`),
    create: (values: any) =>
        requests.post(`account/update`, values),
    update: (values: any) =>
        requests.post(`account/update`, values)

};


const agent = {
    Account,

};

export default agent;