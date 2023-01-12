import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth , createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Database} from '@angular/fire/database'; 
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  userId:any;
  constructor(public auth:Auth , private http : HttpClient , private database:Database, private route:Router, private toastr:ToastrService) {
    this.userId=localStorage.getItem('userID')
    // console.log(this.user)
   }

  register(email:string, pass:any,data:any){
    createUserWithEmailAndPassword(this.auth,email,pass).then(log=>{
      data.userID=log.user.uid
      this.http.post(`${this.database.app.options.databaseURL}/users.json`,data).subscribe();
      localStorage.setItem("userID",log.user.uid);
      this.login( email, pass ) 
    }).catch(err =>{console.log(err.message);
      // this.toastr.error("sign up Error ")
    })
  }


  login(email:string, pass:any){
    signInWithEmailAndPassword( this.auth,email ,pass).then((log)=>{
      localStorage.setItem("userID",log.user.uid)
      this.user=log.user
    }).catch(err =>{
      console.log(err.message)
    })
  }
  
}
