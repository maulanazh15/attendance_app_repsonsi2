import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  private apiUrl = 'http://api-responsi2.test/api.php';

  constructor(private http: HttpClient) {}

  getAttendance(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addAttendance(name: string, status: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { name, status });
  }

  updateAttendance(id: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}?id=${id}`, { status });
  }

  deleteAttendance(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}?id=${id}`);
  }
}
