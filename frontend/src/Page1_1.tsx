import React, {useState} from "react";
import logo from "./logo.svg";
import "./Page1_1.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Prev_btn from "./prev_btn";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Page1_1() {
  const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;
  //const axios = require('axios');

  const [userId, setUserId] = useState<string>('');
  const [userPW, setUserPW] = useState<string>('');
  const handleInputChange_ID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  const handleInputChange_PW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPW(event.target.value);
  };
  const handleLogin = async () => {
    if (userId && userPW){
      await axios.post(backend_url+'/api/auth/login', {
        "email": userId,
        "password": userPW
      })
      .then(function (response) {
        const res = JSON.stringify(response);
        console.log(res);
        console.log("Done");
        window.location.href = "/page2_2";
      })
      .catch(function (error){
        window.alert('로그인에 실패하였습니다.');
      })
    
    }
  };
  const handlekakaoLogin = async () => {
      // API 호출 예시 (fetch 사용)
      //console.log('hi');
    // const response = await axios.get(backend_url+'/api/auth/login/kakao', {
    // })
    window.location.href = backend_url + "/api/auth/login/kakao";
    
  }

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
          type="password"
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
      <div className="Join_btn">
        <Link to="/page1_2">
        <button onClick={handleLogin} style={join_btn_style}>
          회원가입
        </button>
        </Link>
      </div>
      <div className="Kakao_Login_btn">
        <Link to="/page2_2">
        <button onClick={handlekakaoLogin} style={kakao_login_btn_style}>
          카카오 계정으로 로그인
        </button>
        </Link>
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

const join_btn_style: React.CSSProperties = {
  marginTop: '42px',
  color: 'rgba(0, 0, 0, 0.50)',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  border: 'none',
};

const kakao_login_btn_style: React.CSSProperties = {
  marginTop: '167px',
  width: '83.7%',
  height: '40px',
  background: 'rgba(254, 229, 0, 1)',
  color: 'black', // 텍스트 색상을 흰색으로 변경
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.20)',
};

export default Page1_1;
