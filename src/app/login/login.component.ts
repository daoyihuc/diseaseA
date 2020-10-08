import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, AfterContentInit, AfterViewChecked} from '@angular/core';
import * as logins from '../../libs/login';
import {LoginAnimations} from '../animation';
import {ActivatedRoute, Router} from '@angular/router';


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
  type = 0;
  constructor(public el: ElementRef,
              public route: Router,
              public router: ActivatedRoute
  ) {
    // this.inits();
  }
  squareState: string;

  ngOnInit(): void {

  }
  change_stutas(value: number): void{
    let b1; // 医生
    let b2; // 管理员
    let b3; // 前往

    b1 = this.el.nativeElement.querySelector('#b1');
    b2 = this.el.nativeElement.querySelector('#b2');
    b3 = this.el.nativeElement.querySelector('#b3');

    if (value === 1) {
      b1.style.background = '#02BED9';
      b1.style.boxShadow = '0px 5px 16px 0px rgba(1, 165, 189, 0.75)';
      b1.style.border = 'none';

      b2.style.background = 'rgba(255, 255, 255, 0.24)';
      b2.style.boxShadow = '0px 5px 16px 0px rgba(0, 0, 0, 0.11)';
      b2.style.border = '1px solid #fcfcfc';
      this.type = 0; // 登录类型
    } else {
      b2.style.background = '#02BED9';
      b2.style.boxShadow = '0px 5px 16px 0px rgba(1, 165, 189, 0.75)';
      b2.style.border = 'none';

      b1.style.background = 'rgba(255, 255, 255, 0.24)';
      b1.style.boxShadow = '0px 5px 16px 0px rgba(0, 0, 0, 0.11)';
      b1.style.border = '1px solid #fcfcfc';
      this.type = 1; // 登录类型
    }
  }

  go(): void{
   // this.el.nativeElement.querySelector('#b1').style.opacity = '1';
    this.squareState = 'open';
    this.route.navigate(['/loginIndex', {type: this.type}]);

  }

  ngAfterViewInit(): void {
  }

  ngAfterViewChecked(): void {
    // this.inits();
  }

  ngAfterContentInit(): void {
  }



}

