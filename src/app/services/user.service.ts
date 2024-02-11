import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
const API = `http://localhost:3000/user/`;
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get<{ data: User; message: string; count?: any }>(
      API + 'add'
    );
  }
  add(data: User) {
    return this.httpClient.post<{ message: string }>(API + 'add', data);
  }
}
