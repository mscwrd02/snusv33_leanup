import { Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

import landingpage1 from "./images/landingpage1.png";
import landingpage2 from "./images/landingpage2.png";
import landingpage3 from "./images/landingpage3.png";
import landingpage4 from "./images/landingpage4.png";
import landingpage5 from "./images/landingpage5.png";
import landingpage6 from "./images/landingpage6.png";

import left from "./images/left.png";
import right from "./images/right.png";

//const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;
const backend_url: string = "https://api.tripwiz.space";

const Page1Container = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Page1Header = styled.div`
  width: 100%;
  display: flex;
  padding-top: 4px;
  padding-left: 18px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  width: 110px;
  height: 34px;
  flex-shrink: 0;

  color: #0d99ff;
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
  background: #0d99ff;

  color: #fff;
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
  border: 0.6px solid rgba(0, 0, 0, 0.5);

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
  height: 482px;
  box-sizing: border-box;

  border-radius: 20px;

  margin: 0px;

  background-image: ${(props) => `url(${props.currentImg})`};
  background-repeat: no-repeat;
  background-size: cover;

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
  background: #fff;

  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);

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
  left: -70px;
  top: 44%;
`;

const RightContainer = styled.div`
  position: absolute;
  right: -70px;
  top: 44%;
`;

function Page1() {
  const [currentImgNum, setCurrentImgNum] = useState<number>(0);
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);

  const imgArray = [
    landingpage1,
    landingpage2,
    landingpage3,
    landingpage4,
    landingpage5,
    landingpage6,
  ];

  const handleLeftClick = (event: any) => {
    //landingpage 뒤에 숫자는 currentImgNum이 되도록
    if (currentImgNum === 1) {
      setIsFirst(true);
      setCurrentImgNum(currentImgNum - 1);
    } else {
      setIsLast(false);
      setCurrentImgNum(currentImgNum - 1);
    }
  };

  const handleRightClick = (event: any) => {
    //landingpage 뒤에 숫자는 currentImgNum이 되도록
    if (currentImgNum === 4) {
      setIsLast(true);
      setCurrentImgNum(currentImgNum + 1);
    } else {
      setIsFirst(false);
      setCurrentImgNum(currentImgNum + 1);
    }
  };

  return (
    <Page1Container>
      <Page1Header>
        <Logo>Tripwiz</Logo>
      </Page1Header>
      <Introduce>
        함께 여행 계획 짜는<br></br>가장 쉬운 방법,<br></br>Tripwiz
      </Introduce>
      <Choose currentImg={imgArray[currentImgNum]}>
        {!isFirst && (
          <LeftContainer onClick={handleLeftClick}>
            <img src={left} />
          </LeftContainer>
        )}
        {!isLast && (
          <RightContainer onClick={handleRightClick}>
            <img src={right} />
          </RightContainer>
        )}
      </Choose>
      <Start to="/login" style={{ textDecoration: "none" }}>
        시작하기
      </Start>
    </Page1Container>
  );
}

export default Page1;
