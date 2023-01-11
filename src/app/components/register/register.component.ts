import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import * as AOS from 'aos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userExist:boolean=false;

  constructor(private formbuilder:FormBuilder ,private route:Router , private auth:AuthService , private toastr: ToastrService) {
    if(localStorage.getItem('userID')){
      this.userExist=true;
    }else{
      this.userExist=false;
    }
   }
  
  register=this.formbuilder.group({
    name:['',Validators.required],
    email:['',Validators.required],
    phone:['',[Validators.required,Validators.pattern('[0-9]{11}')]], // pattern for enter valid ohone number 
    pass:['',[Validators.required,Validators.minLength(6)]],
    ConfiremPass:['',[Validators.required,Validators.minLength(6)]]
  })

  ngOnInit(): void {
    AOS.init();
  }

  get email(){
    return this.register.get('email')?.value
  }

  get pass(){
    return this.register.get('pass')?.value
  }

  regist(){
    if(this.register.get('pass')?.value == this.register.get('ConfiremPass')?.value && this.register.valid){
      console.log(this.register.value)
      this.toastr.success('sign up successfully !','welcome')
      this.auth.register( this.email , this.pass , this.register.value)
      // setTimeout(()=>{this.route.navigate(['/home'])}, 2000)
      // setTimeout(()=>{window.location.reload()}, 2000)
    }else{
      this.toastr.error('enter valid data ','error')
    }
  }

  


}
