import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  username: string;

  constructor(
    private route: Router,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');
  }

  GoOut(): void{
    localStorage.clear();
    sessionStorage.clear();
    this.route.navigate(['./login']);
  }

}
