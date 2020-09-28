import { Component, OnInit } from '@angular/core';
import {LoginIndexAnimations} from '../animation';

@Component({
  selector: 'app-login-index',
  templateUrl: './login-index.component.html',
  styleUrls: ['./login-index.component.css'],
  animations: [LoginIndexAnimations]
})
export class LoginIndexComponent implements OnInit {

  box = 'loginIndex';
  constructor() { }

  ngOnInit(): void {
  }

}
