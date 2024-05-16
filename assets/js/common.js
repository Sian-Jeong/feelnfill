/*------------------------------------------------------------------------
File : common.js
Author : 정시안(사업1팀/조인트리)
Create date : 2024-01-00
Version : 1.0
Editable : O

※디자인팀 js 파일입니다.(디자인팀 외에 수정 금지)
  개발에서 필요한 부분은 dev.js 파일에 작업 부탁드리며,
  common.js에서 삭제 필요한 부분은 디자인팀에 따로 전달 및 협의 부탁드립니다.
------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
    //javascript 작성하기

    const target = document.querySelector('#typedTxt'); //html에서 dynamic 선택

    //함수 만들기
    function blink() {
        target.classList.toggle('active'); // dynamic에 active 클래스 추가<->삭제 반복
    }
    setInterval(blink, 500); // blink 함수를 0.5초마다 실행

    //javascript 작성하기
    const string = 'Feel and Fill'; //원하는 텍스트를 string변수 선언
    const split = string.split(''); //string의 텍스트를 여러개의 문자열로 나눠줌

    //문자열을 한개씩 나타내주는 함수 만들기
    function dynamic(arr) {
        if (arr.length > 0) {
            //배열의 길이가 0보다 크면(배열에 요소가 하나라도 있다면)
            target.textContent += arr.shift(); //dynamic에 textContent에 배열의 요소 추가
            setTimeout(function () {
                dynamic(arr);
            }); // daynamic함수를 실행
        }
    }
    dynamic(split); //dynamic함수에 split인자 넣어서 실행

    /*
     * 부유하는 요소 관리
     */
    // 범위 랜덤 함수(소수점 2자리까지)
    function random(min, max) {
        // `.toFixed()`를 통해 반환된 '문자 데이터'를,
        // `parseFloat()`을 통해 소수점을 가지는 '숫자 데이터'로 변환
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    }
    // 부유하는(떠 다니는) 요소를 만드는 함수
    function floatingObject(selector, delay, size) {
        gsap.to(
            selector, // 선택자 selector
            random(3, 1.5), // 애니메이션 동작 시간 delay
            {
                delay: random(0, delay), // 얼마나 늦게 애니메이션을 시작할 것인지 지연 시간을 설정.
                y: size, // `transform: translateY(수치);`와 같음. 수직으로 얼마나 움직일지 설정.
                repeat: -1, // 몇 번 반복하는지를 설정, `-1`은 무한 반복.
                yoyo: true, // 한번 재생된 애니메이션을 다시 뒤로 재생.
                ease: Power1.easeInOut, // Easing 함수 적용.
            }
        );
    }
    floatingObject('.floating.item02', 0.5, 50);
    floatingObject('.floating.item03', 1.5, 30);

    // Feel and Fill - 텍스트 애니메이션
    const ani5 = gsap.timeline();
    ani5.to('.about02 .t1', { xPercent: 100 }, 'text').to('.about02 .t2', { xPercent: -100 }, 'text');

    ScrollTrigger.create({
        animation: ani5,
        trigger: '.about02',
        start: 'top top',
        end: '+=1920',
        scrub: true,
        pin: true,
        anticipatePin: 1,
        markers: true,
    });

    /* 포트폴리오 */
    const porfolEls = document.querySelectorAll('.pofol-item');
    // const porfolItems = porfolEls.childNodes;

    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(porfolEls).forEach((item, i) => {
        ScrollTrigger.create({
            trigger: item,
            start: 'top top',
            pin: true,
            pinSpacing: false,
        });
    });
    // ScrollTrigger.create({
    //     snap: 1 / 6,
    // });
});
