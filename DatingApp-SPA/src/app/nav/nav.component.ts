import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"]
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(private auth: AuthService) {}

  ngOnInit() {}
  login() {
    this.auth.login(this.model).subscribe(
      res => {
        console.log("success");
      },
      error => {
        console.log("error");
      }
    );
  }
  loggedIn(){
    return !!localStorage.getItem("token");
  }
  logOut(){
    localStorage.removeItem("token");
  }
}
