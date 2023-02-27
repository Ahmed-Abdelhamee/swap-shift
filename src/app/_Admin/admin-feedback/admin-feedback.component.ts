import { Component, OnInit } from '@angular/core';
import { feedback } from 'src/app/interfaces/feedback.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss']
})
export class AdminFeedbackComponent implements OnInit {

  constructor(private dataServ:DataService) { }

  feedback_arr:feedback[]=[]
  feedback_keys:string[]=[]

  ngOnInit(): void {
    this.dataServ.getFeedback().subscribe(data=>{
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          this.feedback_keys.push(key)
          const element = data[key];
          this.feedback_arr.push(element);
        }
      }
    })
  }

  deleteItem(key:string){
    this.dataServ.deleteFeedback(key)
  }

}
