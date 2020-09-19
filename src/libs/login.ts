// 加载


import {ElementRef} from '@angular/core';

export function inits(el: ElementRef) {
  let b1; // 医生
  let b2; // 管理员
  let b3; // 前往

  b1 = el.nativeElement.querySelector('#b1');
  b2 = el.nativeElement.querySelector('#b2');
  b3 = el.nativeElement.querySelector('#b3');
  b1.style.marginLeft = '0';
  b2.style.marginRight = '0';
  b1.style.opacity = '1';
  b2.style.opacity = '1';
  b1.style.transition = 'all 1s linear';
  b2.style.transition = 'all 1s linear';

  b1.addEventListener('click', function() {
    change_stutas(1, el);
  });
  b2.addEventListener('click', function() {
    change_stutas(2, el);
  });
  b3.addEventListener('click', function() {
    // 前往登录
    window.location.href = 'loginIndex';
    // alert("前往登录")
  });

}

function change_stutas(value: number, el: ElementRef) {
  let b1; // 医生
  let b2; // 管理员
  let b3; // 前往

  b1 = el.nativeElement.querySelector('#b1');
  b2 = el.nativeElement.querySelector('#b2');
  b3 = el.nativeElement.querySelector('#b3');

  if (value === 1) {
    b1.style.background = '#02BED9';
    b1.style.boxShadow = '0px 5px 16px 0px rgba(1, 165, 189, 0.75)';
    b1.style.border = 'none';

    b2.style.background = 'rgba(255, 255, 255, 0.24)';
    b2.style.boxShadow = '0px 5px 16px 0px rgba(0, 0, 0, 0.11)';
    b2.style.border = '1px solid #fcfcfc';
  } else {
    b2.style.background = '#02BED9';
    b2.style.boxShadow = '0px 5px 16px 0px rgba(1, 165, 189, 0.75)';
    b2.style.border = 'none';

    b1.style.background = 'rgba(255, 255, 255, 0.24)';
    b1.style.boxShadow = '0px 5px 16px 0px rgba(0, 0, 0, 0.11)';
    b1.style.border = '1px solid #fcfcfc';
  }
}
