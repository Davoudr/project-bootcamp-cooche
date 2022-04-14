/*
	        https://www.joshwcomeau.com/css/custom-css-reset/
	        http://meyerweb.com/eric/tools/css/reset/
	            v2.0 | 20110126
	            License: none (public domain)
	  */
////=================================================================
import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
	////=================================================================
  
	:root {
    --text-color-1: white;
		  --c10: #f3f4f6;
	      --c11: #cdcdcd;
	      --c12: #b3b3b3;
	      --c13: #808080;
	      --c14: #676767;
	      --c15: #343434;
        --c21: #F4F1DE;
        --c31: #E07A5F;
        --c41: #3D405B;
        --c51: #81B29A;
        --c61: #F2CC8F;
	      /* ------------- */
        --f11: 'Poiret One', cursive;
        --f12: 'Roboto', sans-serif;
	      /* ------------- */
        --font-size-1: 0.5rem;
        --font-size-2: 0.7rem;
        --font-size-3: 0.9rem;
        --font-size-4: 1.1rem;
        --font-size-5: 1.3rem;
        --font-size-6: 1.5rem;
        --font-size-7: 1.7rem;
        --font-size-8: 1.9rem;
        --font-size-9: 2.1rem;
        --font-size-10: 2.3rem;
	  	  /* ------------- */
        --navbar-height: 4rem;
        /* ------------- */
        --border-radius1: 0.1rem;
        --border-radius2: 0.3rem;
        --border-radius3: 0.5rem;
        --border-radius4: 0.7rem;
        /* ------------- */
        --min-normal-width: 700px;
        --min-normal-width-inside: 600px;
	    }
	/* ------------------------------------------------------------------ */
	  *,
	  *:before,
	  *:after {
	    box-sizing: border-box;
	    -webkit-font-smoothing: antialiased;
	  }
	  html, body, div,
	  input, button, select, option,
	  h1, h2, h3, h4, h5, h6, p,
	  text {
	    font-family: 'Roboto','Poppins', sans-serif,  sans-serif, Roboto,  -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
      border: none;
      border-radius: var(--border-radius2);
	  }
	  html, body {
	    max-width: 100vw;
	  }
	  html, body, div, span, applet, object, iframe,
	  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
	  a, abbr, acronym, address, big, cite, code,
	  del, dfn, em, img, ins, kbd, q, s, samp,
	  small, strike, strong, sub, sup, tt, var,
	  b, u, i, center,
	  dl, dt, dd, ol, ul, li,
	  fieldset, form, label, legend,
	  caption, tbody, tfoot, thead, tr, th, td,
	  article, aside, canvas, details, embed,
	  figure, figcaption, footer, header, hgroup,
	  menu, nav, output, ruby, section, summary,
	  time, mark, audio, video {
	    margin: 0;
	    padding: 0;
	    border: 0;
	    vertical-align: baseline;
	  }
	  /* HTML5 display-role reset for older browsers */
	  article, aside, details, figcaption, figure,
	  footer, header, hgroup, menu, nav, section {
	    display: block;
	  }
	  ol, ul {
	    list-style: none;
	  }
	  blockquote, q {
	    quotes: none;
	  }
	  blockquote:before, blockquote:after,
	  q:before, q:after {
	    content: '';
	    content: none;
	  }
	  body {
	    line-height: 1.25;
	  }
	  a {
	    color: #69ffcf;
	    text-decoration: none;
	  }
	    img, picture, video, canvas, svg {
	        display: block;
	        max-width: 100%;
	    }
	    input, button, textarea, select {
	        font: inherit;
	    }
	    p, h1, h2, h3, h4, h5, h6 {
	        overflow-wrap: break-word;
	    }
	    #root, #__next {
	        isolation: isolate;
	    }

		div{
			transition: all ease-out 0.5s;
		}
		
		button{
			background: var(--c21);
    		font-weight: bold;
   			box-shadow: 5px 5px 5px -3px rgba(0, 0, 0, 0.1);
    		transition: all ease 0.1s;
			padding: 5px 20px;
    	  &:active {
      			box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.1);
      			background-color: var(--c11);

    		}
			border: none;
		}
	`;
