import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, AfterContentInit, AfterViewChecked} from '@angular/core';
import * as logins from '../../libs/login';
import { trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {transAnimation} from '../animation';

@Component({
  selector: 'app-login',
  animations: [
    trigger('openClose', [
    // ...
    state('open', style({
      opacity: 1,
      backgroundColor: 'yellow'
    })),
    state('closed', style({
      opacity: 0.5,
      backgroundColor: 'green'
    })),
    transition('open => closed', [
      animate('5s')
    ]),
    transition('closed => open', [
      animate('5s')
    ]),
  ]),
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit, AfterViewInit, AfterViewChecked , AfterContentInit{

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

