import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        if (success) {
          // Redirect to a protected page after successful login
          this.router.navigate(['/attendance-list']);
        }
      },
      (error) => {
        console.error(error);
        // Handle login error, show a message, etc.
      }
    );
  }

  goToRegister() {
    // Navigate to the register page
    this.router.navigate(['/register']); // Replace 'register' with the actual path to your register page
  }

}
