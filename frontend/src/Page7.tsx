import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import styled from "styled-components";

const Page7Container = styled.div`
    width: 100%;
    height: 932px;
    background: #FFF;
    padding-top: 11px;
`;

const Upper = styled.div`
    background: #FFF;
    height:auto;
    width: 100%;
    display:flex;
    flex-direction: column;
    align-items: center;

    margin-top: 31px;
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

const Progress = styled.div`
    width: 80%;
    height: auto;

    margin: 0px;
    display: flex;
    flex-direction: column;
    margin-top: 31px;

    background: #FFF;
`;

const Top = styled.div`
    display: flex;
    width: 99%;
    justify-content: space-between;
    padding: 0px;
`;

const Text = styled.div`
    color: var(--Black, #000);
    font-family: Noto Sans KR;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Complete = styled.div`
    width: 93px;
    height: 33px;
    flex-shrink: 0;

    border-radius: 10px;
    background: #B0B0B0;
    color: #FFF;

    text-align: center;
    font-family: Noto Sans KR;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const Bar = styled.div`
    position: relative;
    width: 100%;
    height: 18px;

    border-radius: 5px;
    background: #DBDAE7;
    
    margin-top: 10px;
`;

const Realbar = styled.div`
    position: absolute;
    width: 50%;
    border-radius: 5px;
    background: linear-gradient(270deg, #2E5AF5 0%, #A4E8FF 100%);
`

const Percentage = styled.div`
    margin-top: 5px;

    color: #4B4B4B;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Detail = styled.div`
    width: 100%;
    margin-top: 10px;

    color: #7D7D7D;
    text-align: right;
    font-family: Noto Sans KR;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
`;

const Mygame = styled.div`
    width: 80%;
    height: auto;

    margin-top: 30px;
    margin-bottom: 12px;
`;

const Text2 = styled.div`
    color: var(--Black, #000);
    font-family: Noto Sans KR;
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Section = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: 64px;
    flex-shrink: 0;

    border-radius: 15px;
    border: 0.5px solid rgba(180, 180, 180, 0.45);
    background: #FFF;
    
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    margin-top: 18px;
`;

const Explaination = styled.div`
    width: auto;
    height: auto;

    margin: 0px;
    margin-left: 15px;

    color: #000;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const More = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 93px;
    height: 33px;
    flex-shrink: 0;

    border-radius: 15px;
    background: #2E5AF5;

    color: #FFF;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    margin-right: 15px;
`;

const Plus = styled.div`
    width: 51px;
    height: 50px;
    flex-shrink: 0;
    display: flex;
    margin-top: 250px;

    margin-left: auto;
    margin-right: 20px;
`;

function Page7() {
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(3);

    return (
        <Page7Container>
            <Upper>
                <Title>여행지 선정 게임</Title>
                <Progress>
                    <Top>
                        <Text>진행현황</Text>
                        <Complete>{current}/{total}명 완료</Complete>
                    </Top>
                    <Bar><Realbar></Realbar></Bar>
                    <Percentage>{(current/total * 100).toFixed(1)}%</Percentage>
                    <Detail>참여한 사람 보기</Detail>
                </Progress>

                <Mygame>
                    <Text2>내 게임</Text2>
                    <Section>
                        <Explaination>미완료</Explaination>
                        <More>게임 시작</More>
                    </Section>
                </Mygame>

                <Mygame>
                    <Text2>게임 결과</Text2>
                    <Section>
                        <Explaination>우리의 1등 여행지는?</Explaination>
                        <More>보러가기</More>
                    </Section>
                </Mygame>
            </Upper>

            <Plus>
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" viewBox="0 0 51 50" fill="none">
                    <ellipse cx="25.5" cy="25" rx="25.5" ry="25" fill="#D9D9D9"/>
                    <path d="M21.7664 12V21.7664H12V28.2774H21.7664V38.0438H28.2774V28.2774H38.0438V21.7664H28.2774V12H21.7664Z" fill="black"/>
                </svg>
            </Plus>
        </Page7Container>
    );
  }
  
  export default Page7;