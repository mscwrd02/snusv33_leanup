import React, {useState} from "react";
import "./Page5.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Prev_btn from "./prev_btn";
import { Link } from 'react-router-dom';
import kakaoLogo from './images/kakaotalk.png';

function Page5() {
  
  const generateStringToCopy = () => {
    // 여기에서 원하는 로직에 따라 새로운 문자열을 생성합니다.
    return 'https://choigangminseok';
  };

  const Sharing_Link = generateStringToCopy();

  let box_size: number = 100;

  const handleLinkCopy = async () => {
    if (navigator.clipboard !== undefined) {
      
      navigator.clipboard.writeText(Sharing_Link)
      .then(() => {
        console.log('클립보드에 복사되었습니다.');
      })
      .catch((error) => {
        console.error('클립보드 복사 실패:', error);
      });

    } else {
      // execCommand 사용
      const textArea = document.createElement('textarea');
      textArea.value = `복사할 텍스트`;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('복사 실패', err);
      }
      textArea.setSelectionRange(0, 0);
      document.body.removeChild(textArea);
      alert('텍스트가 복사되었습니다.');
    }
  };

  const handleKakaoShare = async () => {
    if (!window.Kakao.isInitialized()){
      window.Kakao.init('aee10f2f78c2808dcf4aea2225adcfb6');
    }

    const kakao = window.Kakao;

    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'hi',
        imageUrl:
          'http://via.placeholder.com/500.jpg/',
        link: {
          webUrl: 'hihi',
          mobileWebUrl: 'hihi',
        },
      },
    })
  };

  const handleNextBtn = async () => {
    window.location.href = "/page6";
  };
  
  const boxStyle: React.CSSProperties = {
    width: `${box_size}px`, // 정수 변수에 비례하여 width를 조절
    height: '30px', // 상자의 높이 설정 (원하는 값으로 변경 가능)
    //backgroundColor: '#2DACF3', // 상자의 배경색 설정
    //marginLeft: '34px',
    marginTop: '10px',
    borderRadius: '5px',
    background: 'linear-gradient(270deg, #00BFFF 0%, rgba(0, 191, 255, 0.20) 100%)',
  };

  return (
    <div className="page1_1">
      <div className="title">
        <div className="prev"> 
          <Link to="/Page2_1">
            <button style={buttonStyle}>
              <Prev_btn />
            </button> 
          </Link>
        </div> 
        <div className="linkshare_title">설문 링크 보내기</div> 
        <div className="blank"></div>
      </div>
      <div className="link_made_text" style={link_made_text_style}>
        <span style={{     
          color: '#000',
          textAlign: 'center',
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'normal',}}>각자의 취향 수집</span>
          
          <span style={{     
          color: '#000',
          textAlign: 'center',
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',}}>을 위한</span> 
          
          <br /> 
          
          <span style={{     
          color: '#000',
          textAlign: 'center',
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: 'normal',}}>링크</span>

          <span style={{     
          color: '#000',
          textAlign: 'center',
          fontFamily: 'Inter',
          fontSize: '20px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',}}>를 만들었어요 !</span>
      </div>
      <div className="link" style={link_style}>
          {Sharing_Link}
      </div>
      <div className="link_copy_btn">
            <button onClick={handleLinkCopy} style={link_copy_btn_style}>
            링크 복사하기
            </button>
      </div>
      <div className="kakao_share_btn" style={center_align}>
            <button onClick={handleKakaoShare} style={kakao_share_btn_style}>
            <img src={kakaoLogo} style={{width: '40px', height: '40px'}} alt="카카오 계정으로 로그인" />
            카카오톡으로 공유하기
            </button>
      </div>
      <div className="text1" style={text1_style}>
          모두 설문에 참여하면, <br/>
          AI가 모두의 취향을 반영한 장소를 추천해줘요!
      </div>
      <div className="text2" style={text2_style}>
          * 추천된 장소들은 동일한 링크에서 확인할 수 있어요!
      </div>
      <div className="next_btn" style={center_align}>
        
        <button onClick={handleNextBtn} style={next_btn_style}> 
          여행 계획 현황 보기
        </button>
      </div>
      {/* <div className="label_survey_rate" style={label_survey_rate_style}>
            설문 참여율
      </div>
      <div className="background_survey_rate" style={background_survey_rate_style}>
        <div className="survey_rate" style={boxStyle}>
        </div>
      </div> */}
      
    </div>
  );
}

const center_align: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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

const link_style: React.CSSProperties = {
  marginTop: '20px',
  color: '#2DACF3',
  textAlign: 'center',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  textDecorationLine: 'underline',
};

const link_copy_btn_style: React.CSSProperties = {
  marginTop: '33px',
  width: '83.7%',
  height: '40px',
  background: 'rgba(80, 80, 80, 1)',
  color: 'white', // 텍스트 색상을 흰색으로 변경
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.20)',
};

const link_made_text_style: React.CSSProperties = {
  marginTop: '159px',
  
};
const text1_style: React.CSSProperties = {
  marginTop: '92px',
  color: '#000',
  textAlign: 'center',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
};
const text2_style: React.CSSProperties = {
  marginTop: '10px',
  color: 'rgba(0, 0, 0, 0.50)',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
};

const kakao_share_btn_style: React.CSSProperties = {
  marginTop: '16px',
  // width: '83.7%',
  // height: '40px',
  // background: 'rgba(254, 229, 0, 1)',
  // color: 'black', // 텍스트 색상을 흰색으로 변경
  // border: 'none',
  // borderRadius: '10px',
  // boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.20)',

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
  flexDirection: 'row'
};

const next_btn_style: React.CSSProperties = {
  marginTop: '249px',
  width: '83.7%',
  height: '54px',
  background: '#0D99FF',
  color: 'white', // 텍스트 색상을 흰색으로 변경
  border: 'none',
  borderRadius: '36px',
  boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.20)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Noto Sans KR',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '100%', // 20px
  letterSpacing: '0.2px',
};


const label_survey_rate_style: React.CSSProperties = {
  marginTop: '90px',
  color: '#000',
  fontFamily: 'Inter',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  textAlign: 'left',
  marginLeft: '34px',
};
const background_survey_rate_style: React.CSSProperties = {
  width: `87%`, // 정수 변수에 비례하여 width를 조절
  height: '30px', // 상자의 높이 설정 (원하는 값으로 변경 가능)
  marginLeft: '34px',
  marginTop: '10px',
  borderRadius: '5px',
  background: '#DBDAE7',
};

export default Page5;
