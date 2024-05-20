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
    /*
     *   모달창 - 공통 기능
     */
    var modalOpenBtns = document.querySelectorAll('.modal-btn--open');
    var modalCloseBtns = document.querySelectorAll('.close-btn');

    // 모달 열기
    modalOpenBtns.forEach((btn) => {
        btn.addEventListener('click', function () {
            const modalId = btn.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            document.body.classList.add('modal--active');
            modal.classList.add('active');
        });
    });
    // 모달 닫기
    modalCloseBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            document.body.classList.remove('modal--active');
            modal.classList.remove('active');
        });
    });

    /*
     *  탑버튼
     */
    const topBtnEl = document.getElementById('topBtn');

    const backToTop = () => {
        // Scroll | button show/hide
        window.addEventListener('scroll', () => {
            if (document.querySelector('html').scrollTop > 100) {
                topBtnEl.style.display = 'block';
            } else {
                topBtnEl.style.display = 'none';
            }
        });
        // back to top
        topBtnEl.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        });
    };
    backToTop();

    /*
     *   메인 비주얼 - 타이핑 효과
     */
    const txtWrap = document.querySelector('.typing');
    const txtString = 'Feel and Fill';
    const txtSpeed = 300;
    const txtDelay = 2000;
    let txtIndex = 0;
    let typeControl = true;

    function typingEvent() {
        if (typeControl === true) {
            let txtNow = txtString[txtIndex++];
            txtWrap.innerHTML += txtNow === '\n' ? '<br>' : txtNow;
            console.log(txtIndex);
            if (txtIndex >= txtString.length) {
                txtIndex = 0;
                typeControl = false;
            }
        } else {
            clearInterval(setTyping);
            setTimeout(function () {
                txtWrap.innerHTML = '';
                typeControl = true;
                setTyping = setInterval(typingEvent, txtSpeed);
            }, txtDelay);
        }
    }

    let setTyping = setInterval(typingEvent, txtSpeed);

    /*
     *   Feel and Fill - 텍스트 애니메이션
     */
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
    });

    /*
     *   부유하는 요소 관리
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

    /*
     *   사용자의 입장에서 생각하고 느끼면 만들겠습니다 - split 애니메이션
     */
    const targets = gsap.utils.toArray('.split');

    targets.forEach((target) => {
        let SplitClient = new SplitType(target, { type: 'lines, words, chars' });
        let lines = SplitClient.lines;
        let words = SplitClient.words;
        let chars = SplitClient.chars;

        gsap.from(chars, {
            yPercent: 100,
            autoAlpha: 0,
            duration: 1,
            ease: 'circ.out',
            stagger: {
                amount: 1,
                from: 'random',
            },
            scrollTrigger: {
                trigger: target,
                start: 'top bottom',
                end: '+=400',
                markers: false,
            },
        });
    });

    /*
     *   수상내역 swiper
     */
    var swiper = new Swiper('.prize-pop__swiper .swiper-container', {
        pagination: {
            el: '.prize-pop__swiper .swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.prize-pop__swiper .swiper-button-next',
            prevEl: '.prize-pop__swiper .swiper-button-prev',
        },
    });

    /*
     *   포트폴리오 - one page scroll
     */
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
