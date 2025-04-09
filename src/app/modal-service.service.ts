// src/app/services/modal.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showAuthModal = new BehaviorSubject<boolean>(false);
  showAuthModal$ = this.showAuthModal.asObservable();

  openAuthModal() {
    this.showAuthModal.next(true);
    console.log("here")
  }

  closeAuthModal() {
    this.showAuthModal.next(false);
    console.log("close")
  }
} 