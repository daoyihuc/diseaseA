import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-usera-add',
  templateUrl: './usera-add.component.html',
  styleUrls: ['./usera-add.component.css']
})
export class UseraAddComponent implements OnInit {

  id: string;
  name: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.name = this.route.snapshot.paramMap.get('name');
    console.log( '頁面id' , this.id);
    console.log( '名称' , this.name);
  }

}
