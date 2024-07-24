import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
${reset}

*{
  box-sizing: border-box;

  /* 앱 대응 스타일 */
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color:rgba(255,255,255,0);

  /* IOS 스크롤 바운스 방지 */
  overscroll-behavior-y: none;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  display: none;
}

.swiper-button-next {
  width: 0px;
  height: 0px;
  border-left: 30px solid #7C7C7C;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}

.swiper-button-prev {
  width: 0px;
  height: 0px;
  border-right: 30px solid #7C7C7C;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}

a:link{
  color: inherit;
  text-decoration:none;
}
a:visited{
  color: inherit;
  text-decoration:none;
}
a:hover{
  color: inherit;
  text-decoration:none;
}

select {
  outline:none;
}

textarea:focus, input:focus{
    outline: none;
}

// Input type number 일때 input 오른쪽 화살표 없애기
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="checkbox"]:focus {
	outline-color : #ff9248;
	outline-style: solid;
	outline-width : 1px;	
};

input[type="checkbox"] {
  accent-color:#ff9248;
};

input::-webkit-search-decoration,
input::-webkit-search-cancel-button,
input::-webkit-search-results-button,
input::-webkit-search-results-decoration{
    display:none;
}

button {
background: inherit; 
border:none; 
box-shadow:none;
border-radius:0; 
padding:0; 
overflow:visible; 
cursor:pointer;
}

body {
  scrollbar-width: none;
  margin: 0;
  padding: 0;
  font-family: "Pretendard Variable", "Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  -ms-overflow-style: none; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: ${(props) => props.theme.colors.BGray};
  &::-webkit-scrollbar{
    display: none;
  }
}

&::-webkit-scrollbar {
  background-color: ${(props) => props.theme.colors.gray_3};
  width: 0.4rem;
  border-radius: 10px;
}

&::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 10px;
}

  #root {
    width: 100vw;
    height: 100vh;
  }
`;
