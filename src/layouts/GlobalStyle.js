import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
    font-family: Avenir;
  }

  body, html, ul, li {
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%
  }
  
  body {
    background-color: #FBF8F5
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
