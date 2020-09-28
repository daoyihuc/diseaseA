import { Component, OnInit } from '@angular/core';
import {RolesBean} from '../../bean/rolesBean';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor( private meas: MatDialog,
               private route: ActivatedRoute,
               private router: Router
               ) { }

  ngOnInit(): void {
  }
  label_header = RolesBean;

  onSelectButton(id): void{
    switch (id) {
      case 2:
        this.router.navigate(['index/roles_add']);
        break;
    }
  }


}
