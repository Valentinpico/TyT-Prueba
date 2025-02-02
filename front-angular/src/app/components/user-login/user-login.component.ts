import { Component, Output, EventEmitter, Input } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { UserAuth } from '../../../types/types';
import { UserStateService } from '../../stores/user/user-state.service';

@Component({
  selector: 'app-user-login',
  template: `<app-input
      name="Username"
      label="Usuario o email"
      type="text"
      value="{{ user.Username }}"
      placeholder="Usuario o email"
      (input)="onChage($event)"
      [class]="getClass(errors.Username)"
      [error]="errors.Username"
    />
    <app-input
      name="Password"
      label="Contraseña"
      type="password"
      value="{{ user.Password }}"
      placeholder="Contraseña"
      (input)="onChage($event)"
      [class]="getClass(errors.Password)"
      [error]="errors.Password"
    /> `,
  standalone: true,
  imports: [InputComponent],
})
export class UserLoginComponent {
  user: UserAuth = {
    Username: '',
    Password: '',
    Email: '',
  };

  @Input() errors = {
    Username: false,
    Email: false,
    Password: false,
  };

  getClass(name: boolean) {
    return name
      ? 'rounded-sm shadow-sm focus:outline-none mt-1 block px-3 py-2 w-full sm:text-sm border border-gray-300 border-red-500 focus:border-red-600 focus:ring-1 focus:ring-red-500'
      : ' rounded-sm shadow-sm focus:outline-none mt-1 block px-3 py-2 w-full sm:text-sm border border-gray-300 border-gray-300';
  }

  onChage(e: Event) {
    const target = e.target as HTMLInputElement;
    const name = target.name as keyof UserAuth;

    this.errors = {
      ...this.errors,
      [name]: target.value == '',
    };

    this.userState.setUserAuth({
      ...this.user,
      [name]: target.value,
      Email: name === 'Username' ? target.value : this.user.Email,
    });
  }

  constructor(private userState: UserStateService) {
    this.userState.userAuth$.subscribe((user) => {
      this.user = user;
    });

    this.user = this.userState.userAuth();
  }
}
