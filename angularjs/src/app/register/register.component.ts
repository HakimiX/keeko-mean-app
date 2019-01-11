import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { ValidateService } from './../services/validate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Required fields
    if (!this.validateService.validateRegister(user)) {
      console.log('not validate');
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log('registered');
        this.router.navigate(['/login']);
      } else {
        console.log('error registering');
        this.router.navigate(['/register']);
      }
    });
  }

}
