import { Component } from '@angular/core';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { UserAuth } from '../../../types/types';
import { UserStateService } from '../../stores/user/user-state.service';
import { AuthService } from '../../services/auth-service.service';
import { LocalStorageService } from '../../services/local-storage-service.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [UserLoginComponent, UserRegisterComponent],
  templateUrl: './form.component.html',
  styles: ``,
})
export class FormComponent {
  user: UserAuth = {
    Username: '',
    Password: '',
    Email: '',
  };

  errors = {
    Username: false,
    Email: false,
    Password: false,
  };

  constructor(
    private userState: UserStateService,
    private authService: AuthService,
    private localStorage: LocalStorageService
  ) {
    this.userState.userAuth$.subscribe((user) => {
      this.user = user;
    });

    this.user = this.user;
  }
  register: boolean = false;

  handleSubmit() {
    const userr = this.userState.userAuth();

    this.errors = {
      ...this.errors,
      Username: userr.Username === '',
      Password: userr.Password === '',
    };

    if (userr.Username === '' || userr.Password === '') return;

    this.authService.login(userr).subscribe({
      next: (res) => {
        this.userState.setToken(res.data);
        this.localStorage.setItem('token', res.data);
        this.userState.setUserAuth({
          Username: '',
          Password: '',
          Email: '',
        });
      },
      error: (err) => console.error('Error en el login:', err),
    });
  }

  toggleRegistrarIniciar() {
    this.register = !this.register;
  }
}
