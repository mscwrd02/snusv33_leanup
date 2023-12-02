import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import example1Img from './images/example1.png';

import axios from 'axios';
const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page9Container = styled.div`
    width: 100%;
    height: 932px;
    background: #FFF;
    padding-top: 11px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const Top = styled.div`
    width: 100%;
    height: fill;
    text-align: center;
    display: flex;

    color: #292929;
`

const Back = styled(Link)`
    margin-left: 22px;
    width: auto;
    height: auto;
`;

const Title = styled.div`
    width: auto;
    height: auto;

    color: #292929;

    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-left: auto;
    margin-right: auto;

    padding-right: 36px;
`;

const Body = styled.div`
    width: 84%;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
`

const More = styled.div`
    width: 45%;
    height: 32px;
    fill: #FFF;

    border-radius: 15px;
    border: 0.5px solid rgba(180, 180, 180, 0.45);
    background: #FFF;

    /* drop blur */
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    color: #0D99FF;
    font-family: Noto Sans KR;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.25px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    margin-top: 23px;
`

const Result = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    gap: 12px;
`

const Score = styled.div`
    width: 101.441px;
    height: 29px;
    flex-shrink: 0;
    border-radius: 8px;
    background: #FF3B30;

    color: #FFF;
    font-family: Noto Sans KR;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.25px;

    display: flex;
    align-items: center;
    justify-content: center;
`

const Spot = styled.div`
    width: 100%;
    height: 73px;
    fill: #FFF;
    border-radius: 15px;
    border: 0.5px solid rgba(180, 180, 180, 0.45);
    background: #FFF;

    /* drop blur */
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    display: flex;
    grid-template-columns: 3fr 8.5fr 1fr;
    padding-top: 12px;
    padding-bottom: 12px;
    padding-left: 12px;

    align-items: center;
    gap: 12px;
`

const Explanation = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    
    color: #8E8E8E;
    font-family: Noto Sans KR;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 15.6px */
    letter-spacing: -0.39px;
    

    p{
        color: var(--DARK-BLUE, #1D2029);
        font-family: Noto Sans KR;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 120%; /* 19.2px */
        letter-spacing: -0.48px;
        margin-bottom: 5px;
        margin-top: 0px;
    }
`

const Plus = styled.div`
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    border-radius: 7px;
    background: #CCC;
`
//background: #CCC;


function Page9(){
    return(
        <Page9Container>
            <Top>
                <Back to="/page6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                        <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                    </svg>                
                </Back>
                <Title>여행지 고르기 결과</Title>
            </Top>

            <Body>
                <More>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 11L6 1" stroke="#0D99FF" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 6L11 6" stroke="#0D99FF" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    20개 설문 더 하기
                </More>

                <Result>
                    <Score>800/800점</Score>
                    <Spot>
                        <img src={example1Img} width={'72px'} height={'72px'}></img>
                        <Explanation>
                            <p>새별오름</p>
                            제주 오름 추천 리스트에 빠지지 않고 등장하는 핫플레이스 오름
                        </Explanation>
                        <Plus>
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 60 60" fill="none">
                                <path d="M30 44.5714L30 14.5714" stroke="white" stroke-width="7" stroke-linecap="round"/>
                                <path d="M14.5713 30H44.5713" stroke="white" stroke-width="7" stroke-linecap="round"/>
                            </svg>   
                        </Plus>
                    </Spot>
                </Result>
            </Body>
        </Page9Container>
    )

}

export default Page9