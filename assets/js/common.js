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
});
