import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from '../modal-service.service';
import { AuthService } from '../authservice.service';
@Component({
  selector: 'app-auth',
  imports: [RouterOutlet,CommonModule,FormsModule],
  // host: { ngSkipHydration: 'true' },
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true;
  email: string = '';
  password: string = '';
  error: string = '';
  firstName: string = '';
  lastName: string = '';
  dob: string = '';

  constructor(private router: Router, public modalService: ModalService,private authService: AuthService) {}

  handleSubmit(): void {
    // Clear previous errors
    this.error = '';

    // Basic validation
    if (!this.email || !this.password) {
      this.error = 'Please fill in all fields';
      return;
    }

    if (this.isLoginMode) {
      this.handleLogin();
    } else {
      this.handleSignup();
    }
  }

  handleLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.access_token);
        this.closeModal()
        this.authService.redirectAfterLogin(); // ✅ call here
      },
      error: (err) => {
        console.error('Login error:', err);
      }
    });
  }

  handleSignup(): void {
    // Add your signup logic here
    this.authService.signup(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.access_token);
        this.closeModal()
        this.authService.redirectAfterLogin(); // ✅ call here
      },
      error: (err) => {
        console.error('Signup error:', err);
      }
    });
  }
  closeModal() {
    this.modalService.closeAuthModal();
  }
}