import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userLoginOn: boolean = false;
  userData: any;

  constructor(private loginService: LoginService) { }

  // ngOnDestroy(): void {
  //   this.loginService.currentUserLoginOn.unsubscribe();
  //   this.loginService.currentUserData.unsubscribe();
  // }

  ngOnInit(): void {

    //this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.loginService.getUsuarios().subscribe(
      data => {
      this.userData = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
}
