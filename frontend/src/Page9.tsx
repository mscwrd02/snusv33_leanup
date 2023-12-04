import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import example1Img from './images/example1.png';

import axios from 'axios';
const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page9Container = styled.div`
    width: 100%;
    height: 100%;
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

const Back = styled.div`
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

const SpotContainer = styled.div`
    width: 100%;
    height: 97px;
    box-sizing: border-box;
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
    padding-right: 21px;

    align-items: center;
    justify-content: space-between;

    position: relative;
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

    width: 198px;
    
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

interface PlusProps {
    onClick: any;
}

const Plus = styled.div<PlusProps>`
    width: 26px;
    height: 26px;
    flex-shrink: 0;
    border-radius: 7px;
    background: #CCC;
`

const Checked = styled.div`
    width: 26px;
    height: 26px;
`

const PlusMenu = styled.div`
    display: flex;
    width: 209px;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 12px;
    box-shadow: 0px 8px 64px 0px rgba(0, 0, 0, 0.10);
    backdrop-filter: blur(40px);

    background: rgba(237, 237, 237, 0.80);

    position: absolute;
    top: 68px;
    right: 17px;

    display: grid;
    flex-direction: column;
    z-index: 1;
`

const EachDaySection = styled.div`
    width: 100%;
    height: 1fr;
    box-sizing: border-box;
    color: var(--label-color-light-primary, #000);
    font-family: Noto Sans KR;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 129.412% */
    letter-spacing: -0.408px;

    padding: 11px 16px 11px 16px;
    display: flex;
    justify-content: space-between;

    span{
        color: var(--label-color-light-primary, #000);
        font-family: Noto Sans KR;
        font-size: 25px;
        font-style: normal;
        font-weight: 550;
        line-height: 22px; /* 129.412% */
        letter-spacing: -0.408px;
    }
`

const RowSeparator = styled.div`
    width: 100%;
    height: 0.5px;
    background: rgba(60, 60, 67, 0.36);
`

const ShowMap = styled.div`
    width: 197px;
    height: 46px;
    box-sizing: border-box;
    flex-shrink: 0;
    background: #000000;

    border-radius: 30px;
    position: fixed;
    bottom: 45px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 12px 45px 12px 45px;

    color: #FFF;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%; /* 19.2px */
    letter-spacing: -0.48px;
`

class Image {
    id: number = 0;
    path: string = "";
    SpotId: number = 0;
}
  
class Spot {
    id: number = 0;
    name: string = "";
    address: string = "";
    hours: string = "";
    fee: string = "";
    takenTime: string = "";
    overview: string = "";
    feature1: string = "";
    feature2: string = "";
    feature3: string = "";
    reviews: number = 0;
    region: string = "";
    link: string = "";
    Images: Image[] = [new Image()];
}
  
class ResponseType {
    score: number = 0;
    comments: string = "[]";
    isInSchedule: boolean = false;
    Spot: Spot = new Spot();
}

let scoreSet : number[] = [];
const referenceDaysArray : string[] = ["첫째날", "둘째날", "셋째날", "넷째날", "다섯째날", "여섯째날", "일곱째날", "여덟째날", "아홉째날", "열째날"];

function Page9(){
    const navigate = useNavigate();
    const location = useLocation();

    const [isChoosingArray, setIsChoosingArray] = useState<boolean[]>([]);
    const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>([]);
    const [responseArray, setResponseArray] = useState<ResponseType[]>([]);

    const [daysArray, setDaysArray] = useState<string[]>(referenceDaysArray.slice(0, location.state.howMuchDays));
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(backend_url+"/api/spots/recommend/"+String(location.state.planId), { withCredentials: true });
                // 1을 location.state.planId로 바꿔야 함
                console.log(response.data.length);
                scoreSet = response.data.map((item : any) => (item.score >= 100 ? item.score : 100));
                scoreSet = Array.from(new Set(scoreSet));
                console.log(scoreSet);
            
                setIsChoosingArray(Array(response.data.length).fill(false));
                let tempIsCheckedArray : boolean[] = Array(response.data.length).fill(false);
                for(let i = 0; i < response.data.length; i++){
                    if(response.data[i].isInSchedule){
                        tempIsCheckedArray[i] = true;
                    }
                }
                setIsCheckedArray(tempIsCheckedArray);
                setResponseArray(response.data);
            }   catch (error) {
                // 오류 발생시 실행
            }   finally {
                // 항상 실행
            }
        };
        fetchData();
    }, []);

    const handleClickPlus = (index: number) => {
        setIsChoosingArray((prevArray) => {
            const newArray : boolean[] = [...prevArray];
            newArray[index] = !newArray[index];
            return newArray;
        });
    }

    const handleClickDay = (dayindex: number, index: number) => {
        setIsCheckedArray((prevArray) => {
            const newArray : boolean[] = [...prevArray];
            newArray[index] = !newArray[index];
            return newArray;
        });

        setIsChoosingArray((prevArray) => {
            const newArray : boolean[] = [...prevArray];
            newArray[index] = !newArray[index];
            return newArray;
        });

        //planId를 1에서 location.state.planId로 바꿔야 함
        const fetchData = async () => {
            try {
                const response = await axios.post(backend_url+"/api/schedules/day/", {
                    "planId": location.state.planId,
                    "spotId": responseArray[index].Spot.id,
                    "day": dayindex+1
                }, { withCredentials: true });
            }   catch (error) {
                // 오류 발생시 실행
            }   finally {
                // 항상 실행
            }
        };
        fetchData();
    }

    const handleClickChecked = (index: number) => {
        setIsCheckedArray((prevArray) => {
            const newArray : boolean[] = [...prevArray];
            newArray[index] = !newArray[index];
            return newArray;
        });
        ////////////////// axois planId
        axios.delete(backend_url+"/api/schedules/day/", {
            withCredentials: true,
            data: {
                planId: location.state.planId,
                spotId: responseArray[index].Spot.id
            }
            })
          .then(response => {
            console.log("page9 장바구니 delete 성공")
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }
    ////////////////// axois planId
    function giveMore(){        
        axios.post(backend_url+"/api/spots/more", {
            "planId" : location.state.planId
        }, { withCredentials: true })
        .then(function (response) {
            console.log(response);
        }).catch(function (error) {
            // 오류발생시 실행
        }).then(function() {
            // 항상 실행
            navigate('/page6', {
                state: {
                  planId: location.state.planId,
                }
            });
        });
    }

    return(
        <Page9Container>
            <Top>
                <Back onClick={() => navigate('/page6', { state: { planId: location.state.planId} })}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                        <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                    </svg>                
                </Back>
                <Title>여행지 고르기 결과</Title>
            </Top>

            <Body>
                <More onClick={giveMore}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M6 11L6 1" stroke="#0D99FF" stroke-width="2" stroke-linecap="round"/>
                        <path d="M1 6L11 6" stroke="#0D99FF" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    20개 설문 더 하기
                </More>

                {scoreSet.map((score: number, scoreindex: number) => (
                    <Result>
                        <Score>{score}/{scoreSet[0]}점</Score>
                        {responseArray.map((response: ResponseType, index: number) => (
                            (response.score === score) && (
                            <SpotContainer>
                                <img src={responseArray[index].Spot.Images[0].path} width={'72px'} height={'72px'}></img>
                                <Explanation>
                                    <p>{responseArray[index].Spot.name}</p>
                                    {responseArray[index].Spot.overview}
                                </Explanation>
                                {isCheckedArray[index] ? (
                                    <Checked onClick={() => handleClickChecked(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <rect width="24" height="24" rx="7" fill="#0D99FF"/>
                                            <path d="M7 10.4615L11.0364 15.8412C11.0961 15.9208 11.2155 15.9212 11.2758 15.8419L18 7" stroke="white" stroke-width="3"/>
                                        </svg>
                                    </Checked>
                                ) : (
                                    <Plus onClick={() => handleClickPlus(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 60 60" fill="none">
                                        <path d="M30 44.5714L30 14.5714" stroke="white" stroke-width="7" stroke-linecap="round"/>
                                        <path d="M14.5713 30H44.5713" stroke="white" stroke-width="7" stroke-linecap="round"/>
                                    </svg>   
                                    </Plus>
                                )
                                }
                                {isChoosingArray[index]&& 
                                <PlusMenu>
                                    {daysArray.map((day: string, dayindex: number) => (
                                        <div>
                                            <EachDaySection onClick={() => handleClickDay(dayindex, index)}>{day} 일정에 추가<span>+</span></EachDaySection>
                                            <RowSeparator/>
                                        </div>
                                    ))}
                                </PlusMenu>}
                            </SpotContainer>
                        )))}
                    </Result>
                ))}
            </Body>

            <ShowMap onClick={() => navigate('/plannermap', { state: { planId: location.state.planId, howMuchDays: location.state.howMuchDays } })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                    <path d="M10.9009 15.551L10.4359 14.6657L10.4359 14.6657L10.9009 15.551ZM10.0991 15.551L9.63413 16.4363L9.63414 16.4363L10.0991 15.551ZM15.625 7.875C15.625 9.68329 14.7173 11.1863 13.5589 12.3698C12.4007 13.553 11.0713 14.332 10.4359 14.6657L11.3659 16.4363C12.092 16.055 13.6247 15.1618 14.9882 13.7688C16.3514 12.376 17.625 10.3985 17.625 7.875H15.625ZM10.5 2.75C13.3305 2.75 15.625 5.04454 15.625 7.875H17.625C17.625 3.93997 14.435 0.75 10.5 0.75V2.75ZM5.375 7.875C5.375 5.04454 7.66954 2.75 10.5 2.75V0.75C6.56497 0.75 3.375 3.93997 3.375 7.875H5.375ZM10.5641 14.6657C9.92865 14.332 8.59926 13.553 7.44112 12.3698C6.28269 11.1863 5.375 9.68329 5.375 7.875H3.375C3.375 10.3985 4.64859 12.376 6.01183 13.7688C7.37535 15.1618 8.90801 16.055 9.63413 16.4363L10.5641 14.6657ZM10.4359 14.6657C10.4749 14.6452 10.5251 14.6452 10.5641 14.6657L9.63414 16.4363C10.1774 16.7217 10.8226 16.7217 11.3659 16.4363L10.4359 14.6657ZM12.125 7.875C12.125 8.77246 11.3975 9.5 10.5 9.5V11.5C12.502 11.5 14.125 9.87703 14.125 7.875H12.125ZM10.5 6.25C11.3975 6.25 12.125 6.97754 12.125 7.875H14.125C14.125 5.87297 12.502 4.25 10.5 4.25V6.25ZM8.875 7.875C8.875 6.97754 9.60254 6.25 10.5 6.25V4.25C8.49797 4.25 6.875 5.87297 6.875 7.875H8.875ZM10.5 9.5C9.60254 9.5 8.875 8.77246 8.875 7.875H6.875C6.875 9.87703 8.49797 11.5 10.5 11.5V9.5Z" fill="white"/>
                    <path d="M17.3199 15.3125C18.0111 15.7115 18.375 16.1642 18.375 16.625C18.375 17.0858 18.0111 17.5384 17.32 17.9375C16.6288 18.3366 15.6347 18.6679 14.4375 18.8983C13.2403 19.1287 11.8824 19.25 10.5 19.25C9.11765 19.25 7.75965 19.1287 6.5625 18.8983C5.36535 18.6679 4.37123 18.3366 3.68005 17.9375C2.98887 17.5384 2.625 17.0858 2.625 16.625C2.625 16.1642 2.98887 15.7116 3.68005 15.3125" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span>
                    지도로 보기
                </span>
            </ShowMap>
        </Page9Container>
    )
}

export default Page9