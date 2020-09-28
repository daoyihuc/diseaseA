import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, AfterContentInit, AfterViewChecked} from '@angular/core';
import * as logins from '../../libs/login';
import {LoginAnimations} from '../animation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [LoginAnimations]
})

export class LoginComponent implements OnInit, AfterViewInit, AfterViewChecked , AfterContentInit{
  button1 = 'buttons';
  button2 = 'buttons2';
  login = 'login';
  constructor(public el: ElementRef) {
    // this.inits();
  }
  squareState: string;

  ngOnInit(): void {
    // this.inits();
  }
  inits(): void{
   // this.el.nativeElement.querySelector('#b1').style.opacity = '1';
    this.squareState = 'open';
    logins.inits(this.el);

  }

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked(): void {
    // this.inits();
  }

  ngAfterContentInit(): void {
    this.inits();
  }


}

