import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserStateService } from '../app/stores/user/user-state.service';
import { LocalStorageService } from './services/local-storage-service.service';
import { FormComponent } from './components/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FormComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styles: '',
})
export class AppComponent {
  haveToken: String = '';

  constructor(
    private userState: UserStateService,
    private localStorage: LocalStorageService,
    private http: HttpClient
  ) {
    this.userState.token$.subscribe((token) => {
      this.haveToken = token;
    });

    const token = this.localStorage.getItem('token');

    if (token) {
      this.userState.setToken(token);
      this.haveToken = token;
    }
  }
}
