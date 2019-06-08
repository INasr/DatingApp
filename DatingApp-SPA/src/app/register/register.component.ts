import { Component, OnInit, Output,EventEmitter } from "@angular/core";
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisteration = new EventEmitter();
  model: any = {};
  constructor(private auth:AuthService) {}

  ngOnInit() {}
  register() {

    this.auth.register(this.model).subscribe(()=>{
      console.log("success")
    });
  }
  cancel() {
   this.cancelRegisteration.emit(false);
  }
}
