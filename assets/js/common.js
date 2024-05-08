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
            }, 80); //0.08초 후에 daynamic함수를 실행
        }
    }
    dynamic(split); //dynamic함수에 split인자 넣어서 실행

    // gsap.utils.toArray('.parallax__item').forEach((item) => {
    //     let color = item.getAttribute('data-bgcolor');

    //     ScrollTrigger.create({
    //         trigger: item,
    //         start: 'top 50%',
    //         end: 'bottom 5%',
    //         markers: true,

    //         onEnter: () =>
    //             gsap.to('body', {
    //                 backgroundColor: color,
    //                 duration: 1,
    //             }),
    //         onEnterBack: () =>
    //             gsap.to('body', {
    //                 backgroundColor: color,
    //                 duration: 1,
    //             }),
    //     });
    // });

    // //09 : 이미지 확대하기
    // const ani9 = gsap.timeline();
    // ani9.to('#scrollBg_02 .parallax__item__img', { scale: 10 }).to('#scrollBg_02 .parallax__item__img', { autoAlpha: 0 });

    // ScrollTrigger.create({
    //     animation: ani9,
    //     trigger: '#scrollBg_02',
    //     start: 'top top',
    //     end: '+=4000',
    //     scrub: true,
    //     pin: true,
    //     markers: false,
    //     anticipatePin: 1,
    // });
    console.clear();
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    let panels = document.querySelector('.panels');
    let sections = gsap.utils.toArray('.panel');
    let activeSlide = document.querySelector('.activeSlide');
    let totalSlides = sections.length;
    let slideTotal = document.querySelector('.slideTotal');
    slideTotal.innerHTML = totalSlides;

    sections.forEach((eachPanel, index) => {
        let realIndex = index + 1;

        ScrollTrigger.create({
            scroller: '.panels',
            trigger: eachPanel,
            start: 'top 50%', // count changes @ 20%
            end: 'top bottom',
            //	markers:true
            //  no ST pinning / scrubbing - major problems in iOS
            //	so we that in native CSS (scroll-snap / sticky)
            onLeave: function () {
                eachPanel.classList.add('active');
                activeSlide.innerHTML = realIndex;
                //	console.log('active: i = ' + realIndex);
                let indexNext = realIndex + 1;
                let indexPrev = realIndex - 1;
                dnBtn.setAttribute('data-down', indexNext);
                upBtn.setAttribute('data-up', indexPrev);
                updateUI(indexPrev, indexNext);
            },
            onLeaveBack: function () {
                eachPanel.classList.remove('active');
                let realIndexBack = realIndex - 1;
                activeSlide.innerHTML = realIndexBack;
                //  console.log('active: i = ' + realIndexBack);
                let indexNext = realIndex;
                let indexPrev = realIndex - 2;
                dnBtn.setAttribute('data-down', indexNext);
                upBtn.setAttribute('data-up', indexPrev);
                updateUI(indexPrev, indexNext);
            },
        });
    });

    function updateUI(keyIndexUp, keyIndexDown) {
        if (keyIndexDown > 2) {
            upBtn.classList.remove('disabled');
        } else {
            upBtn.classList.add('disabled');
        }

        if (keyIndexDown > totalSlides) {
            // (6)
            dnBtn.classList.toggle('disabled');
        } else {
            dnBtn.classList.remove('disabled');
        }
    }

    let upBtn = document.querySelector('.up');
    let dnBtn = document.querySelector('.down');
    dnBtn.addEventListener('click', panelDown);
    upBtn.addEventListener('click', panelUp);

    function panelDown() {
        let nextPanel = this.getAttribute('data-down');
        if (nextPanel <= totalSlides) {
            // less/equal to 5
            goToPanel(nextPanel);
        }
    } // panelDown

    function panelUp() {
        let prevPanel = this.getAttribute('data-up');
        if (prevPanel >= 1) {
            // more/equal to 1
            goToPanel(prevPanel);
        }
    } // panelDown

    function goToPanel(thePanel) {
        gsap.to(panels, {
            ease: 'power4.inOut',
            duration: 0.55,
            scrollTo: {
                y: '#panel_' + thePanel,
                autoKill: false,
            },
        });
    }
});
