import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';

import landingpage1 from './images/landingpage1.png';
import landingpage2 from './images/landingpage2.png';
import landingpage3 from './images/landingpage3.png';
import landingpage4 from './images/landingpage4.png';
import landingpage5 from './images/landingpage5.png';
import landingpage6 from './images/landingpage6.png';

import left from './images/left.png';
import right from './images/right.png';

const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page1Container = styled.div`
    width: 430px;
    height: 100%;
    background: #FFF; 
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Page1Header = styled.div`
  width: 100%;
  display:flex;
  margin-top: 4px;
  margin-left: 18px;
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
  margin-bottom: 31px;
`;

interface ChooseProp {
  currentImg: String;
}

const Choose = styled.div<ChooseProp>`
  width: 215px;
  height: 461px;
  box-sizing: border-box;
  
  border-radius: 20px;

  margin: 0px;
  
  background-image: ${(props) => `url(${props.currentImg})`};
  background-repeat: no-repeat;

  position: relative;
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
  margin-top: 41px;
`;

const LeftContainer = styled.div`
  position: absolute;
  left : -70px;
  top : 40%;
`

const RightContainer = styled.div`
  position: absolute;
  right : -70px;
  top : 40%;
`

function Page1() {
  const [currentImgNum, setCurrentImgNum] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);

  const imgArray = [landingpage1, landingpage2, landingpage3, landingpage4, landingpage5, landingpage6];

  const handleLeftClick = (event : any) => {
    //landingpage 뒤에 숫자는 currentImgNum이 되도록
    if(currentImgNum === 1){
      setIsFirst(true);
      setCurrentImgNum(currentImgNum-1);
    }
    else{
      setIsLast(false);
      setCurrentImgNum(currentImgNum-1);
    }
  }; 

  const handleRightClick = (event : any) => {
    //landingpage 뒤에 숫자는 currentImgNum이 되도록
    if(currentImgNum === 4){
      setIsLast(true);
      setCurrentImgNum(currentImgNum+1);
    }
    else{
      setIsFirst(false);
      setCurrentImgNum(currentImgNum+1);
    }
  }; 

  return (
    <Page1Container>
        <Page1Header>
          <Logo>Tripwiz</Logo>
        </Page1Header>
        <Introduce>
          함께 여행 계획 짜는<br></br>가장 쉬운 방법,<br></br>Tripwiz.
        </Introduce>
        <Choose currentImg={imgArray[currentImgNum]}>
          {!isFirst && (<LeftContainer onClick={handleLeftClick}>
            <img src={left}/>
          </LeftContainer>)}
          {!isLast && (<RightContainer onClick={handleRightClick}>
            <img src={right}/>
          </RightContainer>)}
        </Choose>
        <Start to="/page1_1" style={{ textDecoration: "none"}}>
          시작하기
        </Start>
    </Page1Container>
  );
}

export default Page1;
