import styled, { keyframes, text } from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { GrNext } from "react-icons/gr";
const Test = ({ btnText }) => {
  return (
    <DIV className="info">
      <div class="frame">
        <button class="custom-btn btn-5">
          <span
          className="test"> <FcGoogle className="icon" size="2rem" /><span>ddasd</span></span>
        </button>
      </div>
    </DIV>
  );
};
export default Test;


const DIV = styled.div`
 
  .test{
    display: flex;
    
    justify-content: center; 
    align-items: center; 
    /* flex-flow: nowrap; */  
    flex-wrap: nowrap; 
  }


.frame {
  width: 90%;
  margin: 40px auto;
  text-align: center;
}
button {
  margin: 20px;
  outline: none;
}
.custom-btn {
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  border: 2px solid #000;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

/* 5 */
.btn-5 {
  background: #3D405B;
  color: #fff;
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-5:hover {
  background: transparent;
  color: #3D405B;
   box-shadow:
   -7px -7px 20px 0px #fff9,
   -4px -4px 5px 0px #fff9,
   7px 7px 20px 0px #3D405B,
   4px 4px 5px 0px #3D405B,
}
.btn-5:before,
.btn-5:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background:#3D405B;
  transition:400ms ease all;
}
.btn-5:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
.btn-5:hover:before,
.btn-5:hover:after{
  width:100%;
  transition:800ms ease all;
}



`;
