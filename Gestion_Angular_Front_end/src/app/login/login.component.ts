import { UserService } from 'src/app/services/user.service';

import { HttpHeaders } from '@angular/common/http';


import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { LoginuserService } from './loginuser.service';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { RoleDto } from '../classes/role-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {
// userDto: UserDto= new UserDto();
 //user:User[]=[];

//  user:User=new User
// // user:User[]=[];

//   constructor(private loginuserService:LoginuserService,private router:Router) { }

//   ngOnInit(): void {
//     this.getLoginconsole();
//   }

//   getLoginconsole() {
//     this.loginuserService.getUsers()
//       .subscribe(data => {
//         this.user = data;
//         console.log("Toutes les produits: ", this.user);
//       });
//     }

// userLogin() {
//   console.log(this.userDto);
//   console.log(this.userDto.roleDto);

//   const headers = new HttpHeaders().set('Content-Type', 'application/json');

//   // Send the request with the headers
//   this.loginuserService.loginUser(this.userDto)
//     .subscribe(data => {
//       alert("Login successfully");

//  if(this.userDto.roleDto="personel"){
//   this.router.navigate(['/personel']);
//  }
//  else if(this.userDto.roleDto="Admin"){
//   this.router.navigate(['/admin']);
//  }
//       this.router.navigate(['']);
//     }, error => {
//       alert("Sorry please enter correct username or password");
//     });
// }
// }


user: User= new User();
users : User[]=[];
role:string="";

  constructor(private loginuserService:LoginuserService,private router:Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  // String Role=""
  getUsers(){
    this.loginuserService.getUser()
      .subscribe(data => {
        this.users = data;
        // this.role = this.;
        console.log("Toutes les users ", this.users);
        console.log
      });
    }



userLogin() {
  console.log(this.user);
this.role = this.user.User_role;
console.log("le role est",this.role);
  const headers = new HttpHeaders().set('Content-Type', 'application/json');




 // Send the request with the headers
this.loginuserService.loginUser(this.user)
.subscribe(data => {
  console.log(this.user.User_role);

  if (this.user.userId === "djire") {
    this.router.navigate(['/admin']);
  } else if (this.user.userId === "djiree" ) {
    this.router.navigate(['/comptable']);
  } else if (this.user.userId === "diarra" ) {
    this.router.navigate(['/personel']);
  } else {
    alert("Role inconnu");
  }
});

 }
}

