import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const RouteAnimations =
  trigger('routeAnimations', [
    transition('* <=> *', [
      style({
        opacity: 0,
        marginLeft: '200px',
      }),
     animate('2s',
       style({
         opacity: 1,
         marginLeft: '0px',
        })
     )
    ])
  ]);
export const LoginAnimations =
  trigger('LoginAnimations', [
    transition('* => login', [
      // hide the inner elements
      query('#b1', style(
        {
          opacity: 0,
          marginLeft: '200px'
        }), { optional : true }
      ),
      query('#b2', style(
        {
          opacity: 0 ,
          marginRight: '200px'
        }), { optional : true }
      ),

      // animate the inner elements in, one by one
      query('#b1', [animate(1000, style(
        {
          opacity: 1 ,
          marginLeft: '0'
        })
      )], { optional : true }),
      query('#b2', [ animate(1000, style(
        {
          opacity: 1,
          marginRight: '0px'
        })
      )], { optional : true })
    ])

  ]);
export const LoginIndexAnimations =
  trigger('LoginIndexAnimations', [
    transition('* => loginIndex', [
      // hide the inner elements
      query('.section_box_title', style(
        {
          opacity: 0,
          marginLeft: '200px'
        }), { optional : true }
      ),
      query('.section_box1', style(
        {
          opacity: 0 ,
          marginTop: '300px'
        }), { optional : true }
      ),

      // animate the inner elements in, one by one
      query('.section_box_title', [animate(1000, style(
        {
          opacity: 1 ,
          marginLeft: '0'
        })
      )], { optional : true }),
      query('.section_box1', [ animate(1000, style(
        {
          opacity: 1,
          marginTop: '0px'
        })
      )], { optional : true })
    ])

  ]);





