import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {useState} from 'react';
import styled from "styled-components";
import axios from 'axios';

const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page4Container = styled.div`
    width: 100%;
    height: 932px;
    background: #FFF;
    padding-top: 30px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Top = styled.div`
    width: 100%;
    height: 30px;
    text-align: center;
    display: flex;

    color: #292929;
`;

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

const Explaination = styled.div`
    margin: 0px;
    margin-top: 40px;

    color: var(--Black, #000);
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    text-align: center;
`;

const Jeju = styled.span`
    color: var(--Black, #000);
    text-align: center;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Cf = styled.div`
    color: rgba(0, 0, 0, 0.50);
    text-align: center;

    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    margin-top: 6px;
`;

const Selection = styled.div`
    width: 85;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    row-gap: 22px;
    column-gap: 26px;

    margin-top: 22px;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 166px;
    height: 250px;
    flex-shrink: 0;

    border-radius: 14px;
    background: #D9D9D9;
`;

const Where = styled.div`
    color: rgba(0, 0, 0, 0.50);
    text-align: center;
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-top: 54px;
`;

const Direction = styled.span`
    color: var(--Black, #000);
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 25px;
    font-style: normal;
    font-weight: 900;
    line-height: 120%; 
`

const Example = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    column-gap: 9px;
    row-gap: 9px;
    margin-top: 25px;
`;

const Examplea = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    column-gap: 9px;
    row-gap: 9px;
    margin-top: 25px;
`;

const Location = styled.div`
    display: flex;
    width: 44px;
    height: auto;
    padding: 5px;
    justify-content: center;
    align-items: center;

    border-radius: 14px;
    background: #FFF;

    color: var(--Black, #000);
    text-align: center;
    
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;

    margin : 0px;
`;

const Locationa = styled.div`
    display: flex;
    width: 75px;
    height: auto;
    padding: 5px;
    justify-content: center;
    align-items: center;

    border-radius: 14px;
    background: #FFF;

    color: var(--Black, #000);
    text-align: center;
    
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;

    margin : 0px;
`;

const Bottom = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: right;

    margin-top: 22px;
`;

const Enlarge = styled.div`
    width: 33px;
    height: 25px;
    flex-shrink: 0;

    border-radius: 14px;
    background: #2E5AF5;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-right: 6px;
`;

const Extra = styled.div`
    width: 278px;

    color: var(--Black, #000);
    text-align: center;
    
    /* body */
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    margin-top: 30px;
`;

const Ok = styled(Link)`
    width: 90%;

    display: flex;
    justify-content: flex-end;

    color: #000;
    text-align: center;
    
    /* body */
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    margin-top: 10px;
`;

function createTrip(){
    console.log("나이스~")
    console.log(backend_url)
    axios.post(backend_url+"/api/plans", {
        "groupNum": 4,
        "regionList": "[east, west]",
        "startDate": "2023-12-25",
        "endDate": "2023-12-30"
    }, { withCredentials: true })
    .then(function (response) {
        console.log(response);
        
    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });
}

function Page4(){
    return(
        <Page4Container>
            <Top>
                <Back to="/page3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                        <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                    </svg>                
                </Back>
                <Title>여행지 정하기</Title>
            </Top>

            <Explaination>
                <Jeju>제주도</Jeju>에서<br />여행하고 싶은 곳을<br/>선택해주세요.
            </Explaination>

            <Cf>* 복수선택 가능</Cf>

            <Selection>
                <Card>
                    <Where>
                        노을이 아름다운<br/><Direction>제주 서부</Direction>
                    </Where>
                    <Example>
                        <Location>애월</Location>
                        <Location>한림</Location>
                        <Location>한경</Location>
                        <Location>대정</Location>
                    </Example>
                    <Bottom>
                        <Enlarge>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white"/>
                                <line x1="10.9786" y1="10.2714" x2="15.3536" y2="14.6464" stroke="white"/>
                                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white"/>
                                <line x1="10.9786" y1="10.2714" x2="15.3536" y2="14.6464" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                            </svg>
                        </Enlarge>
                    </Bottom>
                </Card>
                <Card>
                    <Where>
                        신비로운 대자연의<br/><Direction>제주 동부</Direction>
                    </Where>
                    <Example>
                        <Location>조천</Location>
                        <Location>구좌</Location>
                        <Location>성산</Location>
                        <Location>표선</Location>
                    </Example>
                    <Bottom>
                        <Enlarge>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white"/>
                                <line x1="10.9786" y1="10.2714" x2="15.3536" y2="14.6464" stroke="white"/>
                                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white"/>
                                <line x1="10.9786" y1="10.2714" x2="15.3536" y2="14.6464" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                            </svg>
                        </Enlarge>
                    </Bottom>
                </Card>
                <Card>
                    <Where>
                        뚜벅이를 위한<br/><Direction>제주 북부</Direction>
                    </Where>
                    <Examplea>
                        <Locationa>제주 공항</Locationa>
                        <Locationa>제주 시내</Locationa>
                    </Examplea>
                    <Bottom>
                        <Enlarge>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white"/>
                                <line x1="10.9786" y1="10.2714" x2="15.3536" y2="14.6464" stroke="white"/>
                                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white"/>
                                <line x1="10.9786" y1="10.2714" x2="15.3536" y2="14.6464" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                            </svg>
                        </Enlarge>
                    </Bottom>
                </Card>
                <Card>
                    <Where>
                        다양한 액티비티의<br/><Direction>제주 남부</Direction>
                    </Where>
                    <Example>
                        <Location>안덕</Location>
                        <Location>중문</Location>
                        <Location>남원</Location>
                        <Location>서귀포</Location>
                    </Example>
                    <Bottom>
                        <Enlarge>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" viewBox="0 0 16 15" fill="none">
                                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white"/>
                                <line x1="10.9786" y1="10.2714" x2="15.3536" y2="14.6464" stroke="white"/>
                                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white"/>
                                <line x1="10.9786" y1="10.2714" x2="15.3536" y2="14.6464" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="3.625" y1="6.625" x2="9.75" y2="6.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                                <line x1="6.625" y1="9.75" x2="6.625" y2="3.625" stroke="white"/>
                            </svg>
                        </Enlarge>
                    </Bottom>
                </Card>
            </Selection>

            <Extra>렌트카 여행 시 2~3개,<br/>뚜벅이 여행 시 1~2개를 추천해요!</Extra>
            <Ok to="/page6" style={{ textDecoration: "none"}} onClick={createTrip}>확인</Ok>
        </Page4Container>
    )
}

export default Page4;