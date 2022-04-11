/*
            https   : //www.joshwcomeau.com/css/custom-css-reset/
            http    : //meyerweb.com/eric/tools/css/reset/v2.0  20110126
            License : none (public domain)
	  */
////=================================================================
import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
	////=================================================================
root {
    --primary-color           : #66806A;
    --second-color            : #B4C6A6;
    --third-color             : #FFC286;
    --fourth-color            : #FFF1AF;
    --fifth-color             : rgb(0, 155, 200);
    --sixth-color             : rgba(0, 155, 200 , 0.1);
    --seventh-color           : black;
	      /* ------------- */
    --firsth-font-family      : 'Poppins', sans-serif;
    --heading-font-family     : 'Roboto', sans-serif;
    --heading-font-family     : Helvetica, sans-serif;
    --heading-font-family     : "Segoe UI", sans-serif;
	      /* ------------- */
    --page-horizontal-padding : 20px;
    --header-height           : 50px;
    --max-content-width       : 1200px;
    --user-img-width          : 120px;
	}
	/* ------------------------------------------------------------------ */
	  *,
	  *:before,
	  *:after {
	    box-sizing: border-box;
	    -webkit-font-smoothing: antialiased;
	  }

	`;
