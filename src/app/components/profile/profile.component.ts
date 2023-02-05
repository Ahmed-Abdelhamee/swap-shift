import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { findIndex } from 'rxjs';
import { profileRequsts } from 'src/app/interfaces/profile-requests.interface';
import { swap } from 'src/app/interfaces/swap.interface';
import { users } from 'src/app/interfaces/users.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user_requests_keys:string[]=[];
  user_requests:profileRequsts[]=[];
  _users:users[]=[]
  user:any
  wait:boolean=false;

  // arrays 
  swap_arr:swap[]=[];
  users:users[]=[];

  personal_data=this.formbuilder.group({
    name:['',[Validators.required,Validators.minLength(1)]],
    phone:['',[Validators.required,Validators.pattern('[0-9]{11}')]]
  })

  constructor(private formbuilder:FormBuilder,private dataServ : DataService , private toastr:ToastrService , private route:Router , private authServ:AuthService) {
    dataServ.getUsers().subscribe(data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this._users.push(element)
        }
      }
      this.user=this._users.find(item => item.userID==localStorage.getItem('userID'))
    })
    this.swap_arr=[]
    this.users=[]
    this.swap_arr = dataServ.set_Swap_dataArr(); // we call it here because we build it in service
    this.users = dataServ.add_Users_in_arr(); // we call it here because we build it in service 
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
    // console.log(this.user_requests)
    })
  }


  request(data:profileRequsts){
    let item:swap={
      where:data.where,
      SwapType:data.SwapType,
      have_day:data.have_day,
      have_shift:data.have_shift,
      have_shift_type:data.have_shift_type,
      need_shift:data.need_shift,
      shift_type:data.shift_type,
      need_day:data.need_day,
      userId:data.userId
    }
    this.dataServ.sendData(item,this.swap_arr);
    let swap_result = this.dataServ.filters(item , this.swap_arr);
    let swappers=this.dataServ.get_theSwaper_arr(swap_result)
    this.dataServ.shareSwap(swap_result,swappers);
    // console.log(item)
    // console.log(swap_result)
    // console.log(swappers)
    // console.log(this.swap_arr)
    // console.log(this.users)
    this.route.navigate(['/show-swap']);
  }

  delete_request(key:any){
    // console.log(key)
    this.dataServ.delete_Request(key);
        setTimeout(()=>{
          // window.open("https://ahmed-abdelhamee.github.io/swap-shift/","_self");
          // window.location.reload()
          this.route.navigate(['/'])
        },2000)
        this.toastr.success("deleted item successfully! ")
  }

  set_personal(){
    this.personal_data.patchValue({
      name:this.user.name,
      phone:this.user.phone
    })
  }

  change_pesonal_data(){
    let keys : string[]=[];
    let add_Users_in_arr : users[]=[];
    this.dataServ.getUsers().subscribe(data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          keys.push(key)
          add_Users_in_arr.push(element)
        }
      }
      if(this.personal_data.valid){
        this.authServ.change_personal_data(keys[(add_Users_in_arr.findIndex(item => this.user.email == item.email))],this.user, this.personal_data.get('name')?.value , this.personal_data.get('phone')?.value)
      }
    // console.log(keys[(add_Users_in_arr.findIndex(item => this.user.email == item.email))])
    // console.log(keys)
    // console.log(this.user)
    // console.log(this.personal_data.value)
    })

  }
}
