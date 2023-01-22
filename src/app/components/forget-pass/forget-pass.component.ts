import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as AOS from 'aos'

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

  email:string='';

  constructor(private authServ:AuthService) { }

  ngOnInit(): void {
    AOS.init();
  }

  changePass(){
    this.authServ.forget_pass(this.email)
  }
}
