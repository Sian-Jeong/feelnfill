

1. 반응형 사이즈 정의
/* width(태블릿 1400px 기준) => xxl */
@media (max-width: 1200px) { 

}  
/* width(태블릿 1200px 기준) => xl */
@media (max-width: 1200px) { 

}  
/* width(태블릿 1024px 기준) => lg */
@media (max-width: 1024px) { 

}  
/* width(태블릿 768px 기준) => md */
@media (max-width: 768px) { 

}  
/* width(모바일 576px 기준) => sm */
@media (max-width: 576px) { 

}  
/* width(모바일 375px 기준) => xs */
@media (max-width: 375px) { 

}  
/* width(모바일 최소 사이즈 320px 기준) => xxs */
@media (max-width: 320px) { 

}

2. 파일 관리
① html 파일
- 퍼블리싱 할 때, 파일명은 실제 사용되는 메뉴명과 일치하게 만들어 주세요.
  (ex: 01인사말_01회사소개)

② css 파일(해당 순서로 link 연결)
  - basic.css  : 초기 세팅 및 기본설정 관련 파일(※ 관리자 외 수정 불가)
  - module.css : CSS 변수 관리
  - common.css : header, footer, top, quick-menu 버튼(공통요소)
  - layout.css : LNB요소, 서브타이틀, 네비게이션, 탭메뉴(레이아웃 결정하는 요소)
  - main.css   : 메인 페이지에서 사용되는 스타일 정의(공통 스타일이 있을 경우 common.css에 적용)
  - contents.css  : 서브페이지에서 사용되는(콘텐츠 종류) 스타일 정의
  
  ※ 추가 또는 수정되는 사항이 있을 시, 하단의 주석 "+ 추가 날짜-이름(부서명/회사명)"에 정보를 작성한 후 작업해주세요
     예시 : 240130-홍길동(디자인팀/조인트리)

③ 준수사항
  - 외부 라이브러리 관련 파일은 각 폴더의 libs에 생성해주세요.
  - 개발팀에서 사용하는 js는 dev.js에서 관리(개발 시 삭제 및 수정이 필요한 코드가 있을 경우 퍼블리셔에게 문의 필수)
  - 메인에 사용되는 이미지는 [assets] > [images] > [main] 폴더에
    서브에 사용되는 이미지는 [assets] > [images] > [sub] 폴더에
    아이콘이나 공통적으로 사용되는 이미지는 [assets] > [images] > [common] 폴더에 넣어주세요
  
