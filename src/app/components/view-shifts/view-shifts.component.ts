import { Component, OnInit } from '@angular/core';
import { swap } from 'src/app/interfaces/swap.interface';
import { users } from 'src/app/interfaces/users.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-shifts',
  templateUrl: './view-shifts.component.html',
  styleUrls: ['./view-shifts.component.scss']
})
export class ViewShiftsComponent implements OnInit {

  constructor(private dataServ:DataService) { }

  where:string='';
  day:string='';

  swap_arr:swap[]=[]
  users:users[]=[]

  get_shifts:swap[]=[]
  get_users:users[]=[]

  wait:boolean=false;

  ngOnInit(): void {

    // for initialize the arrays that we want to get from firebase 
    this.dataServ.getData().subscribe(data => {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.swap_arr.push(element)
        }
      }
    })
    this.dataServ.getUsers().subscribe(data=>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.users.push(element);
        }
      }
    })
  }


  view_get_shifts(){
    this.get_shifts=[]
    this.get_users=[]
    if(this.day !='' && this.where !='' && this.day !=undefined && this.where !=undefined){
      this.wait=true
      this.dataServ.getData().subscribe(data=>{
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            this.swap_arr.push(element)
          }
        }
      })
      this.dataServ.getUsers().subscribe(data=>{
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const element = data[key];
            this.users.push(element);
          }
        }
      })
      
        // console.log(this.swap_arr.length)

        this.get_shifts=this.swap_arr.filter(item=> (this.day == item.have_day && this.where==item.where && item.SwapType=="shift"))

        for (const top of this.get_shifts) {
          this.get_users.push(this.users.find(item=> item.userID == top.userId)!)
        }
        
      // console.log(this.get_shifts)
      // console.log(this.get_users)

      this.wait=false;

      this.swap_arr=[]
      this.users=[]
      
    }
  }


}
