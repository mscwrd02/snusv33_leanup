import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import "./Page1.css";

function Page1() {
  return (
    <div className="Page1">
        <div className="Page1-header">
          <div className="Logo">Tripwiz</div>
          <div className="Join">회원가입</div>
          <div className="Login">로그인</div>
        </div>
        <div className="Introduce">
          함께 여행 계획 짜는<br></br>가장 쉬운 방법,<br></br>Tripwiz.
        </div>
        <div className="Choose">
          <div className="Circles">
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="12" viewBox="0 0 75 12" fill="none">
              <circle cx="6" cy="6" r="6" fill="#0D99FF"/>
              <circle cx="27" cy="6" r="6" fill="white"/>
              <circle cx="48" cy="6" r="6" fill="white"/>
              <circle cx="69" cy="6" r="6" fill="white"/>
            </svg>
          </div>
        </div>
        <Link className="Start" to="/page1_1" style={{ textDecoration: "none"}}>
          시작하기
        </Link>
    </div>
  );
}

export default Page1;
