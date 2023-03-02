import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth , createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Database} from '@angular/fire/database'; 
import { Router } from '@angular/router';
import { sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RoutersService } from './routers.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  userId:any;
  constructor(public auth:Auth , private http : HttpClient , private database:Database, private route:Router, private toastr:ToastrService, private routeServ:RoutersService) {
    this.userId=localStorage.getItem('swapUserID')
   }

  register(email:string, pass:any,data:any){
    createUserWithEmailAndPassword(this.auth,email,pass).then(log=>{
      data.userID=log.user.uid
      this.http.post(`${this.database.app.options.databaseURL}/users.json`,data).subscribe();
      this.http.post(`${this.database.app.options.databaseURL}/users_copy.json`,data).subscribe();
      localStorage.setItem("swapUserID",log.user.uid);
      this.toastr.success('sign up successfully !','welcome')
      this.login( email, pass ) 
    }).catch(err =>{
      // console.log(err.message);
      this.toastr.error("compelete your data or contact us");
    })
  }

  login(email:string, pass:any){
    signInWithEmailAndPassword( this.auth,email ,pass).then((log)=>{
      localStorage.setItem("swapUserID",log.user.uid)
      this.user=log.user;
      setTimeout(()=>{this.routes("let's-go")}, 2000)
    }).catch(err =>{
      // console.log(err.message)
    })
  }
  
  routes(link:string){
    this.routeServ.go_to(link)
  }

  forget_pass(email:string){
    sendPasswordResetEmail(this.auth,email).then(()=>{ this.toastr.info("verify your email to change password") , this.route.navigate(['/login'])}).catch(()=>{ this.toastr.error("invalid email")})
  }

  change_personal_data(user_key:string,userData:any , name : string , phone : string){
    let user_update_view={
      name:name,
      email:userData.email,
      phone:phone,
      pass:userData.pass,
      ConfiremPass:userData.ConfiremPass,
      userID:userData.userID
    }

    this.http.put(`${this.database.app.options.databaseURL}/users/${user_key}.json`,user_update_view).subscribe( () => {this.toastr.success(`changed successfully`,'done! '); setTimeout(()=>{ this.route.navigate(['/']) },2000)})

    // sendEmailVerification(this.auth.currentUser!).then( ()=>{
    //   this.http.put(`${this.database.app.options.databaseURL}/users/${user_key}.json`,user_update_view).subscribe( () => this.toastr.success(`verify ${user_update_view.email}`,'done! '))
    // })
    // console.log(`${this.database.app.options.databaseURL}/users/${user_key}.json`,user_update_view)
  }
}
