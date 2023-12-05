import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import styled from "styled-components";

const Page2_2Container = styled.div`
  width: 430px;
  height: 932px;
  background: #FFF;    

  padding-top: 6px;
`;

const Logo = styled.div`
  width: 110px;
  height: 34px;

  color: #0D99FF;
  text-align: center;
  font-family: Outfit;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
`;

const Explaination = styled.div`
  width: 313px;

  color: var(--Black, #000);
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  
  margin-top: 314px;
  margin-left: 59px;

  span{
    color: var(--Black, #000);
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Add =styled.div`
  width: 60px;
  height: 60px;
  flex-shrink: 0;

  margin-left: 328px;
  margin-top: 276px;
`;

function Page2_2() {
  return (
    <Page2_2Container>
        <Logo>Tripwiz</Logo>
        <Explaination>
            플러스 버튼을 <span>눌러</span><br></br>여행 계획<span>을</span><br></br>시작해보세요!
        </Explaination>
        <Add>
          <Link to="/makeplan">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="#0D99FF"/>
                  <path d="M30 44.5714L30 14.5714" stroke="white" stroke-width="7" stroke-linecap="round"/>
                  <path d="M14.5713 30H44.5713" stroke="white" stroke-width="7" stroke-linecap="round"/>
              </svg>            
          </Link>
        </Add>
    </Page2_2Container>
  );
}

export default Page2_2;
