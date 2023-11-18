import React, {useState} from "react";
import logo from "./logo.svg";
import "./Page1_1.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Prev_btn from "./prev_btn";
import { Link } from 'react-router-dom';

function Page1_2() {
  const [userId, setUserId] = useState<string>('');
  const [userPW, setUserPW] = useState<string>('');
  const handleInputChange_ID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  const handleInputChange_PW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPW(event.target.value);
  };
  const handleLogin = async () => {
    try {
      // API 호출 예시 (fetch 사용)
      const response = await fetch('https://example.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          userPW,
        }),
      });
  
      // 응답 처리
      if (response.ok) {
        console.log('로그인 성공');
        // 로그인이 성공했을 때, 다른 작업 수행
      } else {
        console.error('로그인 실패');
        // 로그인이 실패했을 때, 다른 작업 수행
      }
    } catch (error) {
      console.error('API 호출 오류', error);
      // 오류 처리
    }
  };

  return (
    <div className="page1_1">
      <div className="title">
        <div className="prev"> 
          <Link to="/Page1">
            <button style={buttonStyle}>
              <Prev_btn />
            </button> 
          </Link>
        </div> 
        <div className="logintitle">로그인</div> 
        <div className="blank"></div>
      </div>
      <div className="ID_input" style={inputContainerStyle}>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={handleInputChange_ID}
          style={inputStyle}
          placeholder="아이디"
        />
        <div style={underlineStyle}></div>
      </div>
      <div className="PW_input" style={inputContainerStyle_PW}>
        <input
          type="text"
          id="userPW"
          value={userPW}
          onChange={handleInputChange_PW}
          style={inputStyle}
          placeholder="비밀번호"
        />
        <div style={underlineStyle}></div>
      </div>
      <div className="Login_btn">
        <button onClick={handleLogin} style={login_btn_style}>
          로그인
        </button>
      </div>
    </div>
  );
}

const buttonStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'white', /* 배경색 설정 */
  color: "white", /* 텍스트 색상 설정 */
  border: 'none',
  cursor: 'pointer',
  marginLeft: 12,
};


const inputContainerStyle: React.CSSProperties = {
  marginTop: '165px', /* 입력칸과 버튼 사이의 간격 조절 */
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputContainerStyle_PW: React.CSSProperties = {
  marginTop: '27px', /* 입력칸과 버튼 사이의 간격 조절 */
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const inputStyle: React.CSSProperties = {
  //padding: '8px',
  marginBottom: '11px', /* 입력칸 아래 여백 조절 */
  border: 'none',
  width: '83.7%',
  fontSize: '16px', /* 텍스트 크기 조절 */
  fontFamily: 'Inter', /* 폰트 패밀리 설정 */
  fontWeight: 500, /* 폰트 굵기 설정 */
  fontStyle: 'normal', /* 폰트 스타일 설정 */
  lineHeight: 'normal', /* 라인 높이 설정 */
};

const underlineStyle: React.CSSProperties = {
  borderBottom: '1px solid rgba(0, 0, 0, 0.50)', /* 입력칸 밑에 1px의 실선으로 선 추가 (색상은 원하는 값으로 조절) */
  //width: '90%', /* 선이 가로 전체 길이에 걸치도록 설정 */
  width: '83.7%',
  //height: '1px',
  background: 'rgba(0, 0, 0, 0.50)',
};

const login_btn_style: React.CSSProperties = {
  marginTop: '47px',
  width: '83.7%',
  height: '40px',
  background: 'rgba(0, 0, 0, 255)',
  color: 'white', // 텍스트 색상을 흰색으로 변경
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.20)',
};

export default Page1_2;
