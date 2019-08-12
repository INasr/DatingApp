import { Component, OnInit } from "@angular/core";
import { User } from "../../_models/user";
import { UserService } from "../../_services/user.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.scss"]
})
export class MemberListComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService,private route:ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data=>this.users=data['users']);
  }
  loadUsers() {
    this.userService.getUsers().subscribe((result: User[]) => {
      this.users = result;
    });
  }
}
