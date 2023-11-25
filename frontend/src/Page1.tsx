import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import styled from "styled-components";
import axios from 'axios';

const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page1Container = styled.div`
    width: 430px;
    height: 932px;
    background: #FFF; 
`;

const Page1Header = styled.div`
  display:flex;
  margin-top:58px;
  padding-left: 20px;
`;

const Logo = styled.div`
  width: 110px;
  height: 34px;
  flex-shrink: 0;

  color: #0D99FF;
  text-align: center;
  font-family: Outfit;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; 
`;

const Join = styled.div`
  display: flex;
  width: 75px;
  height: 28px;
  padding: 4px 0px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 10px;
  background: #0D99FF;    

  color: #FFF;
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-left: 150px;
`;

const Login = styled.div`
  display: inline-flex;
  height: 28px;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 10px;
  border: 0.6px solid rgba(0, 0, 0, 0.50);

  color: #000;
  text-align: center;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  margin-left: 10px;
`;

const Introduce = styled.div`
  color: var(--Black, #000);
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; 

  margin-top: 60.5px;
`;

const Choose = styled.div`
  width: 215px;
  height: 32px;

  border-radius: 20px;
  background: #D9D9D9;

  margin-top: 31px;
  margin-left: auto;
  margin-right: auto;

  padding-top:429px;
`;

const Circles = styled.div`
  margin-left:70px;
`;

const Start = styled(Link)`
  display: flex;
  width: 341px;
  height: 60px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  border-radius: 10px;
  background: #FFF;
  
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

  color: #191919;
  text-align: center;
  
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-left: 44px;
  margin-top: 41px;
`;

/*
function newPerson(){
  axios.post(backend_url+"/api/users", {
    "email": "cjuz89@naver.com",
    "password": "gdgdgdgd",
    "nickname": "양재혁"
  })
  .then(function (response) {
      console.log(response)
  }).catch(function (error) {
      // 오류발생시 실행
  }).then(function() {
      // 항상 실행
  });
}*/

function Page1() {
  return (
    <Page1Container>
        <Page1Header>
          <Logo>Tripwiz</Logo>
        </Page1Header>
        <Introduce>
          함께 여행 계획 짜는<br></br>가장 쉬운 방법,<br></br>Tripwiz.
        </Introduce>
        <Choose>
          <Circles>
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="12" viewBox="0 0 75 12" fill="none">
              <circle cx="6" cy="6" r="6" fill="#0D99FF"/>
              <circle cx="27" cy="6" r="6" fill="white"/>
              <circle cx="48" cy="6" r="6" fill="white"/>
              <circle cx="69" cy="6" r="6" fill="white"/>
            </svg>
          </Circles>
        </Choose>
        <Start to="/page1_1" style={{ textDecoration: "none"}}>
          시작하기
        </Start>
    </Page1Container>
  );
}

export default Page1;
