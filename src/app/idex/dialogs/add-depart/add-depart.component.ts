import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-depart',
  templateUrl: './add-depart.component.html',
  styleUrls: ['./add-depart.component.css']
})
/*
* 添加科室
* */
export class AddDepartComponent implements OnInit {

  constructor(private dialog: MatDialogRef<AddDepartComponent>) { }

  ngOnInit(): void {
  }
  ngClick(): void{
    this.dialog.close();
  }

}
