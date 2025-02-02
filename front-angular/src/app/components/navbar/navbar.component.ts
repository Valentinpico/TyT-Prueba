import { Component, Input } from '@angular/core';
import { UserAuth, UserDTO } from '../../../types/types';
import { UserStateService } from '../../stores/user/user-state.service';
import { LocalStorageService } from '../../services/local-storage-service.service';
import { decodeToken } from '../../utils/decodeToken';
import { AuthService } from '../../services/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  user$: UserDTO = {
    UserID: 0,
    Username: '',
    Email: '',
    ToDoDTO: [],
  };

  haveToken: String = 'sdfas';

  constructor(
    private userState: UserStateService,
    private localStorage: LocalStorageService,
    private authService: AuthService
  ) {
    this.userState.token$.subscribe((token) => {
      this.haveToken = token;
    });

    this.haveToken = this.userState.token();
  }
  ngOnInit() {
    const token = this.localStorage.getItem('token');
    if (token) {
      const tokenDecoded = decodeToken(token);

      //aca hacer la consulta al backend para obtener el usuario
    }
    this.authService.getUser(1).subscribe((user) => {
      this.user$ = user;
    });
  }

  logout() {
    this.userState.setToken('');
    this.localStorage.removeItem('token');
    this.userState.setUser({
      UserID: 0,
      Username: '',
      Email: '',
      ToDoDTO: [],
    });
  }
}
