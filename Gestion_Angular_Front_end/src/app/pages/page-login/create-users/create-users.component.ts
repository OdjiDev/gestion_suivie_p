import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { LoginuserService } from '../../../login/loginuser.service';
import { User } from 'src/app/classes/user';
@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent implements OnInit {


  user: User = {
    userId: "", password: "",
    repeatPassord: "",
    User_role: ""
  };

  constructor(private loginuserService: LoginuserService, private router: Router){}
onSubmit() {
  this.router.navigate(['/produit']);
}



  ngOnInit(): void {
  }

}
