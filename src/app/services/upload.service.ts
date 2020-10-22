import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadFile(formData) {
    return this.http.post('https://localhost:44392/api/upload', formData, { reportProgress: true, observe: 'events' })
  }

  createImgPath(serverPath: string) {
    return `https://localhost:44392/${serverPath}`;
  }
}
