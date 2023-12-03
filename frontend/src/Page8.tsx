import {BrowserRouter, Route, Routes, Link, Form} from 'react-router-dom';
import {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';
import example1Img from './images/example1.png';

import { exportPlanId } from './Page4';

const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page8Container = styled.div`
    width: 430px;
    height: 932px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

const LogoContainer = styled.div`
    width: 100%;
    height: 34px;

    display: flex;
    align-items: flex-start;

    color: #0D99FF;
    text-align: center;
    font-family: Outfit;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%; /* 33.6px */

    margin-top: 10px;
    padding-left: 40px;
`

const LinkContainer = styled.div`
    width: 98px;
    height: 32px;
    flex-shrink: 0;

    border-radius: 8px;
    background: #0D99FF;

    color: #FFF;
    font-family: Noto Sans KR;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.25px;

    display: flex;
    align-items: center;
    gap: 1px;
    padding-left: 5px;
    margin-top: 12px;
`

const Body = styled.div`
    width: 74%;
    height: 470px;

    border-radius: 10px;
    border: 0.5px solid rgba(180, 180, 180, 0.45);
    background: #FFF;

    /* drop blur */
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    margin-top: 16px;

    padding-top: 26px;
    padding-left: 26px;
    padding-right: 26px;

    overflow: scroll;
`

const Explanation = styled.div`
    width: 100%;
    height: fill;

    display: flex;
    flex-direction: column;
    gap: 25px;

    margin-top: 14px;
    margin-bottom: 20px;
`

const Charac = styled.div`
    width: 100%;
    height: fill;

    color: #000;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.25px;

    span{
        color: #000;
        font-family: Noto Sans KR;
        font-size: 14px;
        font-style: normal;
        font-weight: 800;
        line-height: normal;
        letter-spacing: -0.25px;
    }
`

const Question = styled.div`
    width: 77%;
    height: 37.255px;
    
    border-radius: 12px 12px 0px 0px;
    background: #0D99FF;

    color: #FFF;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.25px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 23px;
`

const AnswerBox = styled.div`
    width: 77%;
    height: 71.906px;
    flex-shrink: 0;

    border-radius: 0px 0px 12px 12px;
    background: #D2ECFF;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8.5px;
`

const Answer = styled.div`
    width: auto;
    height: 37.255px;
    flex-shrink: 0;

    border-radius: 50px;
    background: #FFF;

    color: #747474;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.25px;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-left: 11px;
    padding-right: 11px;
`

const Bottom = styled.div`
    width: fill;
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 26px;
    margin-top: 23px;
`

const Before = styled.div`
    width: auto;
    height: auto;
`;

const Next = styled.div`
    width: auto;
    height: auto;
`;

const Order = styled.div`
    width: 60px;
    height: 28px;
    flex-shrink: 0;

    border-radius: 30px;
    background : #0000001A;

    color: #808080;
    font-family: Inter;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.25px;

    display: flex;
    align-items: center;
    justify-content: center;
`

const FormContainer = styled.form`
    width: fill;
    height: 43px;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 20px;
`;

const Input = styled.input`
    width: 335px;
    height: 43px;
    flex-shrink: 0;

    border-radius: 50px;
    border: 1.5px solid #D0D0D0;
    padding-left: 19px;
    
    color: #747474;
    font-family: Noto Sans KR;
    font-size: 15px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.25px;
`;

const CommentButton = styled.button`
    width: fill;
    height: fill;
    background: #FFFFFF;
    cursor: pointer;
    border: 0px;
`;

type MyDictionary = {
    'id': number[];
    'link': string[];
    'name': string[]; 
    'overview': string[];
    'feature1': string[];
    'feature2': string[];
    'feature3': string[];
    'category': string[];
    'takenTime': string[];
    'fee': string[];
};

function Page8(){
    const [search, setSearch] = useState("");

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    };
    
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        console.log(search)
    };

    /*const [myData, setMyData] = useState<MyDictionary>({
        id: new Array(20),
        overview: new Array(20).fill(""),
        feature1: new Array(20).fill(""),
        feature2: new Array(20).fill(""),
        feature3: new Array(20).fill(""),

        takenTime: new Array(20).fill(""),
        fee: new Array(20).fill(""),
    });*/

    let myData: MyDictionary = {
        'id': new Array(20),
        'link': new Array(20).fill(""),
        'name': new Array(20).fill(""),
        'overview': new Array(20).fill(""),
        'feature1': new Array(20).fill(""),
        'feature2': new Array(20).fill(""),
        'feature3': new Array(20).fill(""),
        'category': new Array(20).fill(""),
        'takenTime': new Array(20).fill(""),
        'fee': new Array(20).fill("")
      };

    const [currentSpotId, setCurrentSpotId] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(backend_url+"/api/spots/"+exportPlanId, {});
              for(let i=0; i<20; i++){
                myData['id'][i] = 0;
                myData['name'][i] = "새별오름"
                myData['overview'][i] = "제주 오름 추천 리스트에 빠지지 않고 등장하는 핫플레이스 오름";
                myData['feature1'][i] = "가을,겨울에는 억새밭이 매력적이다.";
                myData['feature2'][i] = "해가 중천에 떠있을 때와 해질녘 모두 무척 아름답다.";
                myData['feature3'][i] = "급경사 오르막구간이 거의 없는 코스도 있어 초심자도 쉽게 올라갈 수 있다.";
                myData['category'][i] = "자연환경";
                myData['takenTime'][i] = "약 40분";
                myData['fee'][i] = "입장료 및 주차 무료";
              }
              console.log(response);
            } catch (error) {
              // 오류 발생시 실행
            } finally {
              // 항상 실행
            }
        };
        fetchData();
    }, []);

    return(
        <Page8Container>
            <LogoContainer>Tripwiz</LogoContainer>
            <LinkContainer>
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path d="M9.91634 7.08335L7.08301 9.91669" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.3337 9.20835L12.7503 7.79169C13.7283 6.81368 13.7283 5.22802 12.7503 4.25002V4.25002C11.7723 3.27202 10.1867 3.27202 9.20866 4.25002L7.79199 5.66669M5.66699 7.79169L4.25033 9.20835C3.27232 10.1864 3.27232 11.772 4.25033 12.75V12.75C5.22833 13.728 6.81399 13.728 7.79199 12.75L9.20866 11.3334" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                {myData['name'][currentSpotId]}
            </LinkContainer>
            <Body>
                <img src={example1Img} width={'100%'} height={316}></img>
                <Explanation>
                    <Charac>
                        <span>[한 줄 요약]</span><br/>{myData['overview'][currentSpotId]}
                    </Charac>
                    <Charac>
                        <span>[특징]</span><br/>
                        · {myData['feature1'][currentSpotId]}<br/>
                        · {myData['feature2'][currentSpotId]}<br/>
                        · {myData['feature3'][currentSpotId]}
                    </Charac>
                    <Charac>
                        <span>[관광지 유형]</span><br/>{myData['category'][currentSpotId]}
                    </Charac>
                    <Charac>
                        <span>[소요시간]</span><br/>{myData['takenTime'][currentSpotId]}
                    </Charac>
                    <Charac>
                        <span>[요금]</span><br/>{myData['fee'][currentSpotId]}
                    </Charac>
                </Explanation>
            </Body>

            <Question>이 여행지에 방문하고 싶나요?</Question>
            <AnswerBox>
                <Answer>매우 비선호</Answer>
                <Answer>비선호</Answer>
                <Answer>선호</Answer>
                <Answer>매우 선호</Answer>
            </AnswerBox>

            <Bottom>
                <Before>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
                        <path d="M0 9.93896C0 10.3208 0.145996 10.6465 0.449219 10.9385L9.20898 19.5073C9.44482 19.7544 9.75928 19.8779 10.1187 19.8779C10.8486 19.8779 11.4214 19.3164 11.4214 18.5752C11.4214 18.2158 11.2754 17.8901 11.0283 17.6431L3.1333 9.93896L11.0283 2.23486C11.2754 1.97656 11.4214 1.65088 11.4214 1.2915C11.4214 0.561523 10.8486 0 10.1187 0C9.75928 0 9.44482 0.123535 9.20898 0.370605L0.449219 8.93945C0.145996 9.23145 0.0112305 9.55713 0 9.93896Z" fill="#808080"/>
                    </svg>
                </Before>
                <Order>
                    5/20
                </Order>
                <Next>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
                        <path d="M11.4219 9.93896C11.4219 9.55713 11.2759 9.23145 10.9727 8.93945L2.21289 0.370605C1.97705 0.123535 1.6626 0 1.30322 0C0.573242 0 0.000488281 0.561523 0.000488281 1.30273C0.000488281 1.66211 0.146484 1.98779 0.393555 2.23486L8.28857 9.93896L0.393555 17.6431C0.146484 17.9014 0.000488281 18.2271 0.000488281 18.5864C0.000488281 19.3164 0.573242 19.8779 1.30322 19.8779C1.6626 19.8779 1.97705 19.7544 2.21289 19.5073L10.9727 10.9385C11.2759 10.6465 11.4106 10.3208 11.4219 9.93896Z" fill="#808080"/>
                    </svg>
                </Next>
            </Bottom>

            <FormContainer onSubmit={handleSubmit}>
                <Input type="text" value={search} onChange={onChange} placeholder="댓글 달기"/>
                <CommentButton type='submit'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="21" viewBox="0 0 26 21" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M25.885 1.20011L14.1119 20.6052C13.7412 21.2162 12.7906 21.0928 12.6005 20.409L9.57016 9.50639L9.54517 9.47231C9.52266 9.4347 9.50369 9.39605 9.48816 9.35672L1.20268 1.36111C0.682098 0.858824 1.05079 0 1.787 0H25.1718C25.8102 0 26.2075 0.668581 25.885 1.20011ZM22.91 2.94702L11.2621 9.43559L13.6848 18.1531L22.91 2.94702ZM3.78235 1.59462L22.0342 1.59363L10.4626 8.03967L3.78235 1.59462Z" fill="#D0D0D0"/>
                    </svg>
                </CommentButton>
            </FormContainer>
        </Page8Container>
    )

}

export default Page8