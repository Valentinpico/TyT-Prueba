import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserAuth, UserDTO } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class UserStateService {
  private _token = new BehaviorSubject<string>('');
  public token$ = this._token.asObservable();

  setToken(token: string) {
    this._token.next(token);
  }

  token(): string {
    return this._token.getValue();
  }

  private _user = new BehaviorSubject<UserDTO>({
    UserID: 0,
    Username: '',
    Email: '',
    ToDoDTO: [],
  });

  public user$ = this._user.asObservable();

  setUser(user: UserDTO) {
    this._user.next(user);
  }

  user(): UserDTO {
    return this._user.getValue();
  }
  private _userAuth = new BehaviorSubject<UserAuth>({
    Username: '',
    Email: '',
    Password: '',
  });

  public userAuth$ = this._userAuth.asObservable();

  setUserAuth(user: UserAuth) {
    this._userAuth.next(user);
  }
  userAuth(): UserAuth {
    return this._userAuth.getValue();
  }
}
