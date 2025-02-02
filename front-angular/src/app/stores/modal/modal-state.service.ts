import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalStateService {
  private _modal = new BehaviorSubject<boolean>(false);
  public modal$ = this._modal.asObservable();

  showModal(modal: boolean) {
    this._modal.next(modal);
  }
  modal(): boolean {
    return this._modal.getValue();
  }
}
