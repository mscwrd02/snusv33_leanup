import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';

import { exportPlanId } from './Page4';

const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page6_1Container = styled.div`
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

const Explanation = styled.div`
    color: var(--DARK-BLUE, #1D2029);
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 23px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 27.6px */
    letter-spacing: -0.69px;

    margin-top: 70px;

    span{
        color: var(--DARK-BLUE, #1D2029);
        font-family: Noto Sans KR;
        font-size: 23px;
        font-style: normal;
        font-weight: 900;
        line-height: 120%;
        letter-spacing: -0.69px;
    }
`

const Selection = styled.div`
    width: auto;
    height: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    row-gap: 21px;
    column-gap: 19px;

    margin-top: 50px;
`

interface ComponentProps {
    componentClicked: boolean;
    onClick: () => void;
}

const Component = styled.div<ComponentProps>`
    width: 101px;
    height: 49px;
    flex-shrink: 0;

    border-radius: 30px;
    background: ${(props) => (props.componentClicked ? '#0D99FF' : '#D9D9D9')};

    display: grid;
    align-items: center;
    justify-content: center;

    color: ${(props) => (props.componentClicked ? '#FFFFFF' : '#000000')};
    font-family: Noto Sans KR;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 21.6px */
    letter-spacing: -0.9px;
`

const Ok = styled(Link)`
    width: 356px;
    height: 54px;
    flex-shrink: 0;
    border-radius: 36px;

    background: #0D99FF;

    color: #FFF;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 100%; /* 20px */
    letter-spacing: 6px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 236px;
`;


function Page6_1(){
    const [componentClickedArray, setComponentClickedArray] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]);
    const [categoryArray, setCategoryArray] = useState<String[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    let preferenceArray: number[] = [];

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(backend_url+"/api/categories", {});
              for(let i=0; i<5; i++){
                setCategoryArray(prevState => {
                    const updatedArray = [...prevState];
                    updatedArray[i] = response['data'][i]['name'];
                    return updatedArray;
                });
              }
            } catch (error) {
              // 오류 발생시 실행
            } finally {
              // 항상 실행
            }
        };
        fetchData();
    }, []);
    
    function componentClick(index: number){
        setComponentClickedArray(prevState => {
            const updatedArray = [...prevState];
            updatedArray[index] = !updatedArray[index];
            return updatedArray;
        });
    }

    function sendPreference(){
        axios.post(backend_url+"/api/categories", {
            "participantName": "양재혁",
            "categoryList": "[1, 4, 7]",
            "planId" : exportPlanId
        }, { withCredentials: true })
        .then(function (response) {
            console.log(response);
            
        }).catch(function (error) {
            // 오류발생시 실행
        }).then(function() {
            // 항상 실행
        });
    }

    for(let i=0; i<5; i++){
        if(componentClickedArray[i]) preferenceArray.push(i);
    }

    return(
        <Page6_1Container>
            <Top>
                <Back to="/page6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                        <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                    </svg>                
                </Back>
                <Title>취향 고르기</Title>
            </Top>
            <Explanation>
                자신의 <span>여행 취향</span>과 일치하는<br/>키워드를 <span>3~5개</span>골라주세요.
            </Explanation>
            <Selection>
                <Component componentClicked={componentClickedArray[0]} onClick={() => componentClick(0)}>{categoryArray[0]}</Component>
                <Component componentClicked={componentClickedArray[1]} onClick={() => componentClick(1)}>{categoryArray[1]}</Component>
                <Component componentClicked={componentClickedArray[2]} onClick={() => componentClick(2)}>{categoryArray[2]}</Component>
                <Component componentClicked={componentClickedArray[3]} onClick={() => componentClick(3)}>{categoryArray[3]}</Component>
                <Component componentClicked={componentClickedArray[4]} onClick={() => componentClick(4)}>{categoryArray[4]}</Component>
                <Component componentClicked={componentClickedArray[5]} onClick={() => componentClick(5)}></Component>
                <Component componentClicked={componentClickedArray[6]} onClick={() => componentClick(6)}></Component>
                <Component componentClicked={componentClickedArray[7]} onClick={() => componentClick(7)}></Component>
                <Component componentClicked={componentClickedArray[8]} onClick={() => componentClick(8)}></Component>
                <Component componentClicked={componentClickedArray[9]} onClick={() => componentClick(9)}></Component>
                <Component componentClicked={componentClickedArray[10]} onClick={() => componentClick(10)}></Component>
                <Component componentClicked={componentClickedArray[11]} onClick={() => componentClick(11)}></Component>
                <Component componentClicked={componentClickedArray[12]} onClick={() => componentClick(12)}></Component>
                <Component componentClicked={componentClickedArray[13]} onClick={() => componentClick(13)}></Component>
                <Component componentClicked={componentClickedArray[14]} onClick={() => componentClick(14)}></Component>
            </Selection>

            <Ok to="/page6" style={{ textDecoration: "none"}} onClick={sendPreference}>완료</Ok>
        </Page6_1Container>
    )
}

export default Page6_1;