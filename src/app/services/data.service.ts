import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';
import { ok } from 'assert';
import { Observable } from 'rxjs';
import { swap } from '../interfaces/swap.interface';
import { users } from '../interfaces/users.interface';

// import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { feedback } from '../interfaces/feedback.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  Date=new Date() ;

  url=this.database.app.options.databaseURL;

  users:users[]=[];

  swap_arr:swap[]=[];

  theSwaper_whats_forContact:string[]=[];

  Share_swap_Result:swap={}

  final_swapResult:swap[]=[]
  
  final_Users:users[]=[]

  constructor(private http:HttpClient , private database:Database,private route:Router,private toastr:ToastrService ) { }

  
  
  sendData(data:swap , swap_arr:swap[]){
    let find_swap_before =swap_arr.find(item => (
      item.SwapType == data.SwapType &&
      item.have_day == data.have_day &&
      item.have_shift == data.have_shift &&
      item.have_shift_type == data.have_shift_type &&
      item.need_day == data.need_day &&
      item.need_shift == data.need_shift &&
      item.shift_type == data.shift_type &&
      item.userId == data.userId &&
      item.where == data.where
    ))
    if(!find_swap_before){
      this.http.post(`${this.url}/swap_2_2023.json`,data).subscribe(
        // id=>{console.log(id)}
        );
        this.http.post(`${this.url}/swapCopy_2_2023.json`,data).subscribe(
          // id=>{console.log(id)}
          );
      // console.log('swap not exist before')
    }
    this.swap_arr=[]//for remove the data saved before in this array and prevent it to be duplicated when we call set_Swap_data_arr() again ;
  }

  //  ------------------------  get array of swap request ---------------------------
  getData():Observable<swap[]>{
    return this.http.get<swap[]>(`${this.url}/swap_2_2023.json`)
  }
  set_Swap_dataArr(){
    this.swap_arr=[]//for remove the data saved before in this array and prevent it to be duplicated when we call set_Swap_dataArr() again ;
    this.getData().subscribe( data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.swap_arr.push(element)
        }
      }
    })
    return this.swap_arr
  }

  // get users data 
  getUsers():Observable<users[]>{
    return this.http.get<users[]>(`${this.url}/users.json`)
  }
  add_Users_in_arr(){
    this.users=[]//for remove the data saved before in this array and prevent it to be duplicated when we call add_Users_in_arr() again ;
    this.getUsers().subscribe( data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.users.push({
            name:element.name,
            email:element.email,
            phone:element.phone,
            pass:element.pass,
            ConfiremPass:element.ConfiremPass,
            userID:element.userID
          })
        }
      }
    })
    return this.users
  }
  
  filter_user_requests():swap[]{
    this.getData().subscribe( data =>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const element = data[key];
          this.swap_arr.push(element)
        }
      }
    })
    let items:swap[]=this.swap_arr.filter(item => item.userId == localStorage.getItem('swapUserID'))
    return items
  }

  filters(swap_Object:swap , swap_array:swap[]){
    let get_swapResult_arr : any[]=[];
    let swapShift ="shift";
    if(swap_Object.SwapType==swapShift){
       get_swapResult_arr = swap_array.filter( item => ( item.SwapType==swap_Object.SwapType && item.where==swap_Object.where && item.have_shift === swap_Object.need_shift && item.have_shift_type === swap_Object.shift_type && item.have_day=== swap_Object.have_day  && item.need_shift === swap_Object.have_shift  && item.shift_type === swap_Object.have_shift_type ))
       return get_swapResult_arr ;
      }else{
        get_swapResult_arr = swap_array.filter( item => ( item.SwapType==swap_Object.SwapType && item.where==swap_Object.where && item.have_day== swap_Object.need_day && item.need_day== swap_Object.have_day))
       return  get_swapResult_arr ; 
      }
  }
  get_theSwaper_arr(swap_array_result:swap[]){
    let swappersID : string[] =[];
    let swappers_data:users[]=[];
    for (const item of swap_array_result) { swappersID.push(`${item.userId}`)  }
    for (let i in swappersID ) {
      swappers_data.push(this.users.find(item => item.userID==swappersID[i])!) 
    }
    return swappers_data
  }

  shareSwap(swap_result:swap[],users:users[]){
    this.final_swapResult= swap_result;
    this.final_Users=users    
  }

  delete_Request(key:any){
    this.http.delete(`${this.database.app.options.databaseURL}/swap_2_2023/${key}.json`).subscribe(()=> {} )
  }

  delete_user(key:string){
    this.http.delete(`${this.database.app.options.databaseURL}/users/${key}.json`).subscribe(()=> {} )
    setTimeout(()=>{
      window.location.reload()
    },2000)
    this.toastr.success("deleted item successfully! ")
  }


  // feedback codes
  sendFeedback(data:feedback){
    this.http.post(`${this.url}/FeedBack.json`,data).subscribe();
  }
  getFeedback():Observable<feedback[]>{
    return this.http.get<feedback[]>(`${this.url}/FeedBack.json`);
  }
  deleteFeedback(key:string){
    this.http.delete(`${this.url}/FeedBack/${key}.json`).subscribe(()=> {} )
    setTimeout(()=>{
      window.location.reload()
    },2000)
    this.toastr.success("deleted item successfully! ")
  }

}




// delete_Request(key:any){

    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success ml-4',
    //     cancelButton: 'btn btn-danger'
    //   },
    //   buttonsStyling: false
    // })
    
    // swalWithBootstrapButtons.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonText: 'Yes, delete it!',
    //   cancelButtonText: 'No, cancel!',
    //   reverseButtons: true
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.http.delete(`${this.database.app.options.databaseURL}/swap_2_2023/${key}.json`).subscribe(()=> {} )
    //     this.route.navigate(['/'])
    //     swalWithBootstrapButtons.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   } else if (
    //     /* Read more about handling dismissals below */
    //     result.dismiss === Swal.DismissReason.cancel
    //   ) {
    //     swalWithBootstrapButtons.fire(
    //       'Cancelled',
    //       'Your imaginary file is safe :)',
    //       'error'
    //     )
    //   }
    // })

// }


// error permission 
// "rules": {
//   ".read": "now < 2771660000000",  // 2032-12-30
//   ".write": "now < 271660000000",  // 2032-12-30
// }


// right permission
// "rules": {
//   ".read": "auth != null",
//   ".write": "auth != null"
// }