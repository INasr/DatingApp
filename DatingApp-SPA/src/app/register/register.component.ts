import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import {BsDatepickerConfig} from 'ngx-bootstrap'
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegisteration = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig:Partial<BsDatepickerConfig>;

  constructor(private auth: AuthService, private fb: FormBuilder,private alertify: AlertifyService, private router:Router) {}

  ngOnInit() {
    this.bsConfig={
      containerClass:'theme-red'
    },
    this.createRegisterForm();
    // this.registerForm=new FormGroup({
    //   userName: new FormControl('',Validators.required),
    //   password: new FormControl('',[Validators.required,Validators.minLength(4)]),
    //   confirmPassword: new FormControl('',Validators.required)
    // },this.passwordMatchValidator);
  }
  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        dateOfBirth:['',[Validators.required]],
        userName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      },
      { Validators: this.passwordMatchValidator }
    );
  }
  register() {
    if(this.registerForm.valid){
      this.user=Object.assign({},this.registerForm.value);
      this.auth.register(this.user).subscribe(()=>{
          this.alertify.success('registeration successful');
      },error=>{
        this.alertify.error(error);
      },()=>{
        this.auth.login(this.user).subscribe(()=>{
          this.router.navigate(['/members']); 
        })
      })
    }
    // this.auth.register(this.model).subscribe(()=>{
    //   console.log("success")
    // });
  }
  cancel() {
    this.cancelRegisteration.emit(false);
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get("password").value === g.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }
}
