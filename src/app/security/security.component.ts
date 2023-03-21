import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../admin/user/userLogin';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  user: UserLogin = {id: 0, email: '', password: '', token: '', role: ''};

  isSubmitted: boolean = false;
  errorMessage: string = '';

  isLogin: boolean = false;
  isRegister: boolean = false;
  isLogout: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  
  ngOnInit(): void {
    switch (this.router.url) {
      case '/login': {
        this.isLogin = true;
        break;
      }
      case '/logout': {
        this.isLogout = true;
        this.authService.deleteToken();
        this.router.navigate(['']);
        break;
      }
      case '/register': {
        this.isRegister = true;
        break;
      }
      default: {
        this.isLogin = true;
        break;
      }
    }
  }

  onSubmit(): void {
    this.isSubmitted = true;

    if (this.isLogin) {
      this.authService.authenticate(this.user).subscribe(result => {
        this.errorMessage = '';
        
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('id', result.user.id.toString());
        localStorage.setItem('email', result.user.email);
        localStorage.setItem('role', result.user.role);

        this.router.navigate(['']);
      }, error => {
        this.errorMessage = 'Invalid credentials!';
        this.isSubmitted = false;
      });
    } else {
      alert('work in progress');
    }
  }
}
