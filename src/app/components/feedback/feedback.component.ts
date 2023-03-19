import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  sended:boolean=false;
  
  constructor(private formbuilder:FormBuilder,private dataServ:DataService) { }

  feedback=this.formbuilder.group({
    message:["",Validators.required],
    userID:["",Validators.required],
  })


  ngOnInit(): void {
  }

  sendFeedback(){
    this.feedback.patchValue({
      userID:localStorage.getItem("swapUserID*")
    })
    // this.dataServ.sendFeedback(this.feedback.value);

    this.sended=true

  }
}
