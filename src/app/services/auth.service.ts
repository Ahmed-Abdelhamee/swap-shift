import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth , createUserWithEmailAndPassword} from '@angular/fire/auth';
import { Database} from '@angular/fire/database'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  userId:any;
  constructor(public auth:Auth , private http : HttpClient , private database:Database) {
    this.userId=localStorage.getItem('userID')
    // console.log(this.user)
   }

  register(email:string, pass:any,data:any){
    createUserWithEmailAndPassword(this.auth,email,pass).then(log=>{
      data.userID=log.user.uid
      this.http.post(`${this.database.app.options.databaseURL}/users.json`,data).subscribe();
      localStorage.setItem("userID",log.user.uid);
      this.login( email, pass ) 
    }).catch(err =>{console.log(err.message)})
  }


  login(email:string, pass:any){
    signInWithEmailAndPassword( this.auth,email ,pass).then((log)=>{
      localStorage.setItem("userID",log.user.uid)
      this.user=log.user
      setTimeout(()=>{window.location.reload()}, 1500)
    }).catch(err =>{
      console.log(err.message)
    })
  }
  
}
