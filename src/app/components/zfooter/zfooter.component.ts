import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import * as jQuery from 'jquery';


@Component({
  selector: 'app-zfooter',
  templateUrl: './zfooter.component.html',
  styleUrls: ['./zfooter.component.scss']
})
export class ZfooterComponent implements OnInit {

  constructor(private Admin:AdminService) { }

  isAdmin:boolean=false;
  
  ngOnInit(): void {
    this.Admin.findAdmin();
    $(".AdminLinks").hide()

    if(localStorage.getItem("Swap_shift_Admin")=="yes"){
      // this.isAdmin==true;
      $(".AdminLinks").show()
    }
    // console.log(localStorage.getItem("Swap_shift_Admin"))
  }

}
