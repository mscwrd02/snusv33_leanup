import React, {useState} from "react";
import "./Page1_2.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Prev_btn from "./prev_btn";
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import kakaoLogo from './images/kakaotalk.png';

function Page1_2() {
  const [userId, setUserId] = useState<string>('');
  const [userPW, setUserPW] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const handleInputChange_ID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };
  const handleInputChange_PW = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserPW(event.target.value);
  };
  const handleInputChange_Name = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlekakaoLogin = async () => {
    window.location.href = backend_url + "/api/auth/login/kakao";
  }

  //const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;
  const backend_url: string = "https://api.tripwiz.space";

  const handleJoin = async () => {
    if (userId && userPW && userName){
        // window.location.href = "/page2_2";
        await axios.post(backend_url + '/api/users', {
          "email": userId,
          "password": userPW,
          "nickname": userName
        },{ withCredentials: true })
        .then(function (response) {
          const res = JSON.stringify(response);
          window.location.href = "/page1_1";
        }) 
        .catch(function (error){
          window.alert('회원가입에 실패하였습니다.');
        }) 

    }
  };

  return (
    <div className="page1_1">
      <div className="title">
        <div className="prev"> 
          <Link to="/Page1_1">
            <button style={buttonStyle}>
              <Prev_btn />
            </button> 
          </Link>
        </div> 
        <div className="logintitle">회원가입</div> 
        <div className="blank"></div>
      </div>
      <div className="Kakao_Login_btn" style={center_align}>
        {/* <Link to="/page2_2"> */}
        <button onClick={handlekakaoLogin} style={kakao_login_btn_style}>
          <img src={kakaoLogo} style={{width: '40px', height: '40px'}} alt="카카오 계정으로 로그인" />
          카카오로 3초만에 시작하기
        </button>
        {/* </Link> */}
      </div>
      <div style={orWithLinesStyle}>
        <div style={beforeLineStyle} />
        OR
        <div style={afterLineStyle} />
      </div>
      <div className="ID_input" style={inputContainerStyle}>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={handleInputChange_ID}
          style={inputStyle}
          placeholder="이메일"
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
      <div className="PW_input" style={inputContainerStyle_Name}>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={handleInputChange_Name}
          style={inputStyle}
          placeholder="이름"
        />
        <div style={underlineStyle}></div>
      </div>
      <div className="Join_btn">
            <button onClick={handleJoin} style={login_btn_style}>
            이메일로 가입하기
            </button>
      </div>
    </div>
  );
}

const center_align: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const orWithLinesStyle: React.CSSProperties = {
  marginTop: '60px',
  position: 'relative',
  display: 'inline-block',
  color: '#A0A0A0',
  textAlign: 'center',
  fontFamily: 'Inter',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
};
const lineStyle: React.CSSProperties = {
  content: '""',
  position: 'absolute',
  height: '1px',
  width: '153px',
  backgroundColor: '#A0A0A0',
  background: '#D9D9D9',
  top: '50%',
};

const beforeLineStyle: React.CSSProperties = {
  ...lineStyle,
  left: '-160px',
};

const afterLineStyle: React.CSSProperties = {
  ...lineStyle,
  right: '-160px',
};

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
  marginTop: '60px', /* 입력칸과 버튼 사이의 간격 조절 */
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

const inputContainerStyle_Name: React.CSSProperties = {
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
const kakao_login_btn_style: React.CSSProperties = {
  marginTop: '167px',
  width: '83.7%',
  height: '40px',
  background: 'rgba(254, 229, 0, 1)',
  color: 'black', // 텍스트 색상을 흰색으로 변경
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.20)',
  // backgroundImage: `url(${kakaoLoginImage})`, // 배경 이미지 설정
  // //backgroundSize: 'auto 100%',
  // backgroundSize: 'cover', // 이미지 사이즈 조절
  // backgroundRepeat: 'no-repeat', // 이미지 반복 방지
  // backgroundPosition: 'center', // 이미지 위치 조절
  //display: 'flex',
  // flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',

};

export default Page1_2;
