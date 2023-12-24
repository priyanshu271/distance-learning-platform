import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsDataService {

  constructor(private http: HttpClient) { }

  public getStudentData(): Observable<any[]> {
    return this.http.get<any[]>('assets/students-data.json');
  }
}
