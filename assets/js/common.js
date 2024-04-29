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
    const titArray = ['AI', 'PARTNER', 'SMART']; //슬라이드 타이틀
    const slideTitItems = document.querySelectorAll('#mvSlider .slide-tit__wrapper > li');
    slideTitItems.forEach(function (item) {
        const txt = item.textContent;
        titArray.push(txt);
    });

    //슬라이드 전체 페이지 번호
    const num = document.querySelector('#mvSlider .num');
    const slides = document.querySelectorAll('#mvSlider .swiper-slide');
    const slideCount = slides.length;
    num.innerHTML = `<strong>1</strong> / ${slideCount}`;

    //슬라이드 시작
    const swiper = new Swiper('#mvSlider', {
        loop: true,
        slidesPerView: 1,
        autoplay: {
            delay: 3000, //CSS animation과 시간 동일하게
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        navigation: {
            prevEl: '#mvSlider .btn--prev',
            nextEl: '#mvSlider .btn--next',
        },
        //pagination 텍스트 & progress bar 형태로 변경
        pagination: {
            el: '#mvSlider .slide-tit__wrapper',
            clickable: true,
            type: 'bullets',
            renderBullet: function (index, className) {
                return `<li class=${className}><span class="bar"></span><span class="tit">${titArray[index]}</span></li>`;
            },
        },
        //현재 페이지 번호 갱신
        on: {
            slideChange: function () {
                num.innerHTML = `<strong>${swiper.realIndex + 1}</strong> / ${slideCount}`;
            },
        },
    });

    // play, stop
    const mvPlay = document.querySelector('.btn--play');
    const mvStop = document.querySelector('.btn--stop');
    const prevAndNextBtn = document.querySelectorAll('.control__wrapper > button');

    mvStop.addEventListener('click', () => {
        console.log('dd');
        mvStop.style.display = 'none';
        mvPlay.style.display = 'block';
        swiper.autoplay.stop();
    });
    mvPlay.addEventListener('click', () => {
        console.log('dd');
        mvPlay.style.display = 'none';
        mvStop.style.display = 'block';
        swiper.autoplay.stop();
    });

    // 퀵 메뉴
    /* 뱃지 효과_.throttle(함수, 시간) */
    const quickMenuEl = document.querySelector('.quick-menu--on');
    const quickArrowBtn = document.getElementById('quickArrowBtn');

    window.addEventListener(
        'scroll',
        _.throttle(function () {
            if (window.scrollY >= sectionTwoY) {
                gsap.to(quickArrowBtn, {
                    x: 155,
                    duration: 0.4,
                });
                gsap.to(quickMenuEl, {
                    scale: 0,
                    transformOrigin: '100% 50%',
                    duration: 0.8,
                });
            }
            if (window.scrollY < sectionTwoY) {
                gsap.to(quickArrowBtn, {
                    x: 0,
                    duration: 0.4,
                });
                gsap.to(quickMenuEl, {
                    scale: 1,
                    transformOrigin: '100% 50%',
                    duration: 0.8,
                });
            }
        }, 200)
    ); // 단위 밀리세컨드 1000 → 1초

    // 스크롤 페이지 이동
    const sectionTwo = document.getElementById('section2');
    const sectionTwoY = sectionTwo.offsetTop; // 두번째 섹션 위치값
    window.addEventListener('wheel', (e) => {
        // 스크롤 다운 동작일 때
        if (e.deltaY > 0) {
            // mainVisual 영역 내에서 스크롤 다운 시
            if (window.scrollY < sectionTwoY) {
                gsap.to(window, 0.5, {
                    scrollTo: sectionTwoY,
                });
            }
        }
        if (e.deltaY < 0) {
            // mainVisual 영역 내에서 스크롤 다운 시
            if (window.scrollY <= sectionTwoY) {
                gsap.to(window, 0.5, {
                    scrollTo: 0,
                });
            }
        }
    });
});
