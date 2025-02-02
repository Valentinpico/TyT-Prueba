import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment'; // Asegúrate de que la ruta sea correcta
import { UserAuth, UserDTO } from '../../types/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  // Método para realizar login con las credenciales de usuario
  login(credentials: UserAuth): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/login`, credentials);
  }

  // Método para obtener datos del usuario usando su ID
  getUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/ToDo/${id}`);
  }
}
