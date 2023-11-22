import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import styled from "styled-components";

const Page6Container = styled.div`
  width: 100%;
  height: 932px;
  background: #FFF;
  padding-top: 11px;
`;

const Upper = styled.div`
  background: #FFF;
  height:auto;
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  color: #292929;

  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  text-align: center;

  margin-left: 0px;
`;

const Date = styled.div`
  width: 249px;
  height: 28px;
  flex-shrink: 0;

  border-radius: 10px;
  background: rgba(0, 0, 0, 0.70);

  margin-top: 28px;
  margin-bottom: 6px;

  color: #FFF;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Category = styled.div`
  width: 334px;
  height: 77px;
  flex-shrink: 0;

  border-radius: 15px;
  border: 0.5px solid rgba(180, 180, 180, 0.45);
  background: #FFF;
  
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

  margin-top: 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-left: 20px;
  padding-right: 20px;
`;

const Text = styled.span`
  color: #000;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;

  align-items: center;

  margin-bottom: 0px;
`;

const Arrow = styled.span`
  color: #000;
  text-align: center;
  font-family: Anonymous Pro;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  align-items: center;

  padding-bottom: 6px;
`;

const Plus = styled.div`
  width: 51px;
  height: 50px;
  flex-shrink: 0;
  display: flex;
  margin-top: 150px;

  margin-left: auto;
  margin-right: 20px;
`;

const People = styled.span`
  color: #717171;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const Progress = styled.div`
  color: #FFF;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  border-radius: 10px;
  background: #2E5AF5;

  width: 93px;
  height: 33px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 50px;
  margin-top: 4px;
`;

function Page6() {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(5);

  return (
    <Page6Container>
      <Upper>
        <Title>제주도</Title>
        <Date>2023/12/21(목) ~ 2023/12/23(토)</Date>

        <Category>
          <Text>함께 가는 사람</Text>
          <People>광진(나),재혁,경준,민석</People>
          <Arrow>{">"}</Arrow>
        </Category>
        <Category>
          <Text>여행지 선정 게임</Text>
          <Progress>{current}/{total}명 완료</Progress>
          <Arrow>{">"}</Arrow>
        </Category>
        <Category>
          <Text>여행지 리스트</Text>
          <Arrow>{">"}</Arrow>
        </Category>
        <Category>
          <Text>여행 일정</Text>
          <Arrow>{">"}</Arrow>
        </Category>
        <Category>
          <Text>공동 메모</Text>
          <Arrow>{">"}</Arrow>
        </Category>

      </Upper>

      <Plus>
        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" viewBox="0 0 51 50" fill="none">
          <ellipse cx="25.5" cy="25" rx="25.5" ry="25" fill="#D9D9D9"/>
          <path d="M21.7664 12V21.7664H12V28.2774H21.7664V38.0438H28.2774V28.2774H38.0438V21.7664H28.2774V12H21.7664Z" fill="black"/>
        </svg>
      </Plus>
    </Page6Container>
  );
  }
  
  export default Page6;