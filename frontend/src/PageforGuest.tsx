import React, {useState} from "react";
import "./Page5.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Prev_btn from "./prev_btn";
import { Link } from 'react-router-dom';
import kakaoLogo from './images/kakaotalk.png';
import invitationImg from './images/invitation.png';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function PageforGuest() {
  const backend_url: string = "http://ec2-3-37-49-144.ap-northeast-2.compute.amazonaws.com:3095";
  const query = useQuery();
  const id = query.get('id');

  const [responseData, setResponseData] = useState<any>(null);
  const [inviterName, setInviterName] = useState<any>(null);
  useEffect(() => {
    axios.get(backend_url + '/api/plans/hashId/' + id, { withCredentials: true })
    .then(response => {
      setResponseData(response.data);
      setInviterName(response.data.participantsName);
      localStorage.setItem('guestID', response.data.planId);
      console.log("get hashId done");
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  }, [])

  

  const handlekakaoLogin = async () => {
    window.location.href = backend_url + "/api/auth/login/kakao";
  }

  return (
    <div className="pageforguest">
      <div className="logoTripWiz" style={logo_style}>
        Tripwiz
      </div>
      <div className="explainText" style={explainText_style}>
        함께 여행 계획 짜는<br></br>가장 쉬운 방법,
      </div>
      <div className="explainTextLogo" style={explainTextLogo_style}>
        Tripwiz
      </div>
      <div style={center_align}>
        <div className="invitationCard" style={invitationCard_style}>
          <img src={invitationImg} style={{width: '100%', height: '100%'}}></img>
          <div style={textStyle}>
            <span style={boldtextStyle}>{inviterName}</span> 님의<br></br><span style={boldtextStyle}>제주도</span> 여행에<br></br>초대되셨어요 !
          </div>
        </div>
      </div>
      <div className="Kakao_Login_btn" style={center_align}>
        {/* <Link to="/page2_2"> */}
        <button onClick={handlekakaoLogin} style={kakao_login_btn_style}>
          <img src={kakaoLogo} style={{width: '40px', height: '40px'}} alt="카카오 계정으로 로그인" />
          카카오로 3초만에 시작하기
        </button>
        {/* </Link> */}
      </div>
    </div>

    
  );
}
const center_align: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const logo_style: React.CSSProperties = {
  marginTop: '21px',
  marginLeft: '21px',
  width: '110px',
  height: '34px',
  flexShrink: 0,
  color: '#0D99FF',
  fontFamily: 'Outfit',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '140%', // 33.6px
};

const explainText_style: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '65px',
  color: '#0D99FF',
  textAlign: 'center',
  fontFamily: 'Noto Sans KR',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 300,
  lineHeight: '120%', // 24px
  letterSpacing: '-0.6px',
};

const explainTextLogo_style: React.CSSProperties = {
  marginTop: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#0D99FF',
  textAlign: 'center',
  fontFamily: 'Outfit',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '140%', // 33.6px
};

const invitationCard_style: React.CSSProperties = {
  marginTop: '64px',
  // display: 'flex',
  // justifyContent: 'center',
  // alignItems: 'center',
  position: 'relative', // 상대 위치로 설정
  width: '313px',
  height: '261px',
};
const textStyle: React.CSSProperties = {
  position: 'absolute', // 절대 위치로 설정
  top: '22%', // 이미지의 중앙에 위치하도록 설정
  left: '50%',
  transform: 'translate(-50%, -50%)', // 중앙 정렬
  /* 필요한 스타일 속성을 추가하세요. 예: color, fontSize 등 */
  textAlign: 'center',
  color: '#1D2029',
  fontFamily: 'Noto Sans KR',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '120%',
  letterSpacing: '-0.54px',
};
const boldtextStyle: React.CSSProperties = {
  // position: 'absolute', // 절대 위치로 설정
  // top: '20%', // 이미지의 중앙에 위치하도록 설정
  // left: '50%',
  transform: 'translate(-50%, -50%)', // 중앙 정렬
  /* 필요한 스타일 속성을 추가하세요. 예: color, fontSize 등 */
  textAlign: 'center',
  fontWeight: 900,
  lineHeight: '120%',
  letterSpacing: '-0.54px',
};

const kakao_login_btn_style: React.CSSProperties = {
  marginTop: '24px',
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
export default PageforGuest;
