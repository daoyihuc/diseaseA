import {
  animation, trigger, animateChild, group,
  transition, animate, style, query
} from '@angular/animations';

export const transAnimation = animation([
  style({
    'margin-left': '{{ margin-left }}',
    'margin-right': '{{ margin-right }}',
    opacity: '{{ opacity }}',
  }),
  animate('{{ time }}')
]);
