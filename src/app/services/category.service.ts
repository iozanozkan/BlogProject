import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  path = "https://localhost:44392/api/categories";

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.path);
  }

  getCategory(categoryId): Observable<Category>{
    return this.httpClient.get<Category>(this.path + "/byId/?id=" + categoryId)
  }

}
