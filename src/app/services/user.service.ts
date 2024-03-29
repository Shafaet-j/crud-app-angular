import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { environment } from 'src/environments/environment.development';

const API = environment.apiBaseLink + '/user/';
// http://localhost:3000/user/add
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  getAllwithFilter(filter?: any) {
    return this.httpClient.post<{ data: User[]; message: string }>(
      API + 'all-user',
      { filter }
    );
  }
  edit(data: User) {
    return this.httpClient.put<{ message: string }>(
      API + 'singleuser/' + data._id,
      data
    );
  }
  getAllUser() {
    return this.httpClient.get<{ data: User[]; message: string }>(
      API + 'all-user'
    );
  }
  add(data: User) {
    return this.httpClient.post<{ message: string }>(API + 'add', data);
  }
  getSingle(id: any) {
    return this.httpClient.get<{ data: User[]; message: string }>(
      API + 'singleuser/' + id
    );
  }
  delete(id: any) {
    return this.httpClient.delete<{ message: string }>(
      API + 'singleuser/' + id
    );
  }
}
