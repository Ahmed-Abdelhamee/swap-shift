import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import * as AOS from 'aos'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import { RoutersService } from 'src/app/services/routers.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(private formbuilder:FormBuilder , private auth:Auth , private toastr: ToastrService, private authServ:AuthService , private routeServ:RoutersService ,private route:Router) {  
    
  }


  login=this.formbuilder.group({
    email:['',Validators.required],
    pass:['',[Validators.required,Validators.minLength(6)]],
  })

  ngOnInit(): void {
    AOS.init();
  }

  get email (){
    return this.login.get('email')?.value
  }

  get pass (){
    return this.login.get('pass')?.value
  }


  login_data(){
    signInWithEmailAndPassword( this.auth,this.email ,this.pass).then((log)=>{
      localStorage.setItem("swapUserID",log.user.uid)
      this.authServ.user=log.user;
      this.toastr.success("Login successfully ")
      // setTimeout(()=>{
      //       window.open("https://ahmed-abdelhamee.github.io/swap-shift/","_self")
            
      //       // // window.open("https://ahmed-abdelhamee.github.io/swap-shift/","_self")
      //       // // window.open("https://ahmed-abdelhamee.github.io/swap-shift/","_self")
      // }, 2000);
      setTimeout(()=>{this.route.navigate(["/let's-go"])}, 2000);
      // setTimeout(()=>{window.location.reload()}, 2000);
    }).catch(err =>{
      this.toastr.error("Login Error ");
      this.route.navigate(['/register'])
    })
  }

  routes(link:string){
    this.routeServ.go_to(link)
  }
}
