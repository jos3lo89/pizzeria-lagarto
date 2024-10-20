import { Injectable } from '@angular/core';

import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AxiosService {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:3000',
      withCredentials: true,
    });
  }

  getAxiosClient(): AxiosInstance {
    return this.axiosClient
  }
}
