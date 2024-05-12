import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin! : FormGroup;
  errorMessage = undefined;
  constructor(private  fb:FormBuilder,private router:Router,private authservice:AuthService ) {
  }
  ngOnInit(){
    this.formLogin=this.fb.group({
      username:this.fb.control(""),
      password:this.fb.control("")
    })
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
   this.authservice.login(username,password)//nous utilise then à la place de subscribe parceque le type de reponse Promise
     .then(resp=>{
       this.router.navigateByUrl("/admin")
     })
     .catch(error=>{
       this.errorMessage = error;
     })
  }
}
