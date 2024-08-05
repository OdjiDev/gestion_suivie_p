import { RoleDto } from 'src/app/classes/role-dto';
import { UsersDto } from 'src/app/classes/users-dto';
import { Component, OnInit } from '@angular/core';
import { LoginuserService } from '../../login/loginuser.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.css']
})
export class PageLoginComponent implements OnInit {


  constructor(private loginuserService: LoginuserService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
   // const { userIdDto, passwordDto,RoleDto } = this.usersDto;

    // this.loginuserService.loginUsers(this.usersDto)
    //   .subscribe(
    //     (data) => {
    //       // Successful login: Redirect to dashboard
    //       this.router.navigate(['/produit']);
    //     },
    //     (error) => {
    //       // Handle login error
    //       console.error('Login error:', error);
    //       alert('Login failed. Please check your username and password.');
    //     }
    //   );
  }
}
