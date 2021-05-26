import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Admin } from '../admin';
import {FormControl,FormGroup,Validators} from '@angular/forms';  ;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  admin : Admin=new Admin();  
  submitted = false;  

  ngOnInit(): void {
    this.submitted=false;
  }

  registerForm=new FormGroup({  
    userName:new FormControl('' , [Validators.required , Validators.minLength(5) ] ),  
    email:new FormControl('',[Validators.required,Validators.email]),  
    password:new FormControl('', [Validators.required, Validators.minLength(6)])  
  }); 

  saveAdmin(saveadmin){  
    this.admin=new Admin();     
    this.admin.username=this.userName.value;  
    this.admin.email=this.email.value;  
    this.admin.password=this.password.value;  
    this.submitted = true;  
    this.save();  
  }  
  
    
  
  save() {  
    this.authService.createAdmin(this.admin)  
      .subscribe(data => console.log(data), error => console.log(error));  
    this.admin = new Admin();  
  }  
  
  get userName(){  
    return this.registerForm.get('userName');  
  }  
  
  get email(){  
    return this.registerForm.get('email');  
  }  
  
  get password(){  
    return this.registerForm.get('password');  
  }  
  
  addadminForm(){  
    this.submitted=false;  
    this.registerForm.reset();  
  } 

}
