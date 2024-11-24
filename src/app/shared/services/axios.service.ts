import { Injectable } from '@angular/core';

import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: environment.apiUrl,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = 'falta token 3333';
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (res) => res,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          console.log('Error de autenticación');
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.axiosInstance.get(url);
      return res.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.axiosInstance.post(url, data);
      return res.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(url: string, data: any): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.axiosInstance.put(url, data);
      return res.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const res: AxiosResponse<T> = await this.axiosInstance.delete(url);
      return res.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  getAxiosClient(): AxiosInstance {
    return this.axiosInstance;
  }

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      console.log('error desde servicio de axios', error);
      return new Error(error.response?.data?.message || 'Error en la petición');
    }
    return error;
  }
}
