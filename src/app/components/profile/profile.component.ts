import { Component, OnInit } from '@angular/core';
import { profileRequsts } from 'src/app/interfaces/profile-requests.interface';
import { swap } from 'src/app/interfaces/swap.interface';
import { users } from 'src/app/interfaces/users.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user_requests_keys:string[]=[];
  user_requests:profileRequsts[]=[];
  users:users[]=[]
  user:any
  wait:boolean=false;

  constructor(private dataServ : DataService) {
    dataServ.getUsers().subscribe(data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.users.push(element)
        }
      }
      this.user=this.users.find(item => item.userID==localStorage.getItem('userID'))
    })
   }

  ngOnInit(): void {
    this.wait=true;
    this.dataServ.getData().subscribe( data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.user_requests_keys.push(key)
          this.user_requests.push(element)
        }
      }
      for(let i =0; i<this.user_requests_keys.length;i++){
        this.user_requests[i].key=this.user_requests_keys[i]
      }
    this.wait=false;
    this.user_requests=this.user_requests.filter(item => (item.userId == localStorage.getItem('userID')))
    console.log(this.user_requests)
    })

}

delete_request(key:any){
  console.log(key)
  this.dataServ.delete_Request(key)
}

}
