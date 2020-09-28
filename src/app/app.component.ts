import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RouteAnimations} from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [RouteAnimations]
})
export class AppComponent {
  title = 'diseasess';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
