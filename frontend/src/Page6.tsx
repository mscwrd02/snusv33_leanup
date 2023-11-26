import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import friend_icon from './friend_icon.png';

import axios from 'axios';
const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page6Container = styled.div`
  width: 100%;
  height: 932px;
  background: #FFF;
  padding-top: 11px;
`;

const Body = styled.div`
  background: #FFF;
  height:auto;
  display:flex;
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

const Date = styled.div`
  width: 249px;
  height: 28px;
  flex-shrink: 0;

  border-radius: 10px;
  background: #0000001A;

  margin-top: 21px;
  margin-bottom: 10px;

  color: #808080;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkContainer = styled.div`
    width: 375.33px;
    height: auto;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    margin-bottom: 18px;
`

const Categories = styled.div`
    width: 374px;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 19px;
`

const With = styled.div`
    width: auto;
    height: 77px;
    flex-shrink: 0;

    border-radius: 15px;
    border: 0.5px solid rgba(180, 180, 180, 0.45);
    background: #FFF;

    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 18px;
    padding-right: 18px;
`

const Text = styled.span`
  color: #000;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;

  align-items: center;
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

const Preference = styled.div`
    width: auto;
    height: 160px;
    flex-shrink: 0; 

    border-radius: 15px;
    border: 0.5px solid rgba(180, 180, 180, 0.45);
    background: #FFF;

    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    padding-left: 18px;
    padding-right: 18px;
`

const Preferencetop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-top: 17px;
    margin-bottom: 17px;
`

const Go = styled.div`
    width: 78px;
    height: 30px;
    flex-shrink: 0;

    border-radius: 15px;
    border: 1px solid #0D99FF;
    background: #FFF;

    color: #0D99FF;
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 16.8px */
    letter-spacing: -0.7px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`

const Surveyrate = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    color: #5A5A5A;
    font-family: Noto Sans KR;
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-bottom: 14px;
`

const Bar = styled.div`
    width: 100%;
    height: 10px;
    border-radius: 10px;
    background: #DDD;

    position: relative;
    margin-top: 4px;
`

const Completebar = styled.div`
    width: 53%;
    height: 10px;
    border-radius: 10px;
    background-color: #0D99FF;

    position: absolute;
`

const FriendContainer = styled.div`
    width: 100%;
    height: auto;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    gap: 7px;
`

const Friend = styled.div`
    width: auto;
    height: 30px;
    border-radius: 35px;
    border: 1px solid #E2E2E2;

    color: #000;
    font-family: Noto Sans KR;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-right: 7px;
`

function Page6() {
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(5);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

        try {
          const response = await axios.post(backend_url+"/api/plans", {


          }, { withCredentials: true });
        
          console.log(response);
        } catch (error) {
          // 오류 발생시 실행
        } finally {
          // 항상 실행
        }
    };

    fetchData();
  }, []);

  return (
    <Page6Container>
      <Body>
        <Top>
            <Back to="/page2_1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                    <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                </svg>                
            </Back>
            <Title>제주도</Title>
        </Top>
        <Date>2023/12/21(목) ~ 2023/12/23(토)</Date>

        <LinkContainer>
            <img width={40} height={40} src={friend_icon}/>
        </LinkContainer>

        <Categories>
            <With>
                <Text>함께 가는 사람</Text>
                <People>광진(나),재혁,경준,민석</People>
            </With>

            <Preference>
                <Preferencetop>
                    <Text>취향 고르기</Text>
                    <Go>하러 가기</Go>
                </Preferencetop>
                <Surveyrate>
                    50%
                    <Bar>
                        <Completebar/>
                    </Bar>
                </Surveyrate>
                <FriendContainer>
                    <Friend>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <circle cx="14" cy="14" r="9" fill="#0D99FF"/>
                            <path d="M10.5 13L13.2118 16.8284C13.2713 16.9124 13.3959 16.9128 13.456 16.8291L18 10.5" stroke="white" stroke-width="1.2"/>
                        </svg>
                        재혁
                    </Friend>
                    <Friend>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <circle cx="14" cy="14" r="9" fill="#0D99FF"/>
                            <path d="M10.5 13L13.2118 16.8284C13.2713 16.9124 13.3959 16.9128 13.456 16.8291L18 10.5" stroke="white" stroke-width="1.2"/>
                        </svg>
                        민석
                    </Friend>
                    <Friend>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <circle cx="14" cy="14" r="9" fill="#969696"/>
                            <path d="M10.5 13L13.2118 16.8284C13.2713 16.9124 13.3959 16.9128 13.456 16.8291L18 10.5" stroke="white" stroke-width="1.2"/>
                        </svg>
                        경준
                    </Friend>
                    <Friend>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <circle cx="14" cy="14" r="9" fill="#969696"/>
                            <path d="M10.5 13L13.2118 16.8284C13.2713 16.9124 13.3959 16.9128 13.456 16.8291L18 10.5" stroke="white" stroke-width="1.2"/>
                        </svg>
                        광진 (나)
                    </Friend>
                </FriendContainer>
            </Preference>

            <With>
                <Text>여행지 고르기</Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                    <path d="M7.75033 27.5C7.03991 27.5 6.43154 27.255 5.9252 26.765C5.41887 26.275 5.16613 25.6867 5.16699 25V12.5C5.16699 11.8125 5.42016 11.2238 5.92649 10.7338C6.43283 10.2438 7.04077 9.99917 7.75033 10H9.04199V7.5C9.04199 5.77083 9.6719 4.29667 10.9317 3.0775C12.1915 1.85833 13.7144 1.24917 15.5003 1.25C17.2871 1.25 18.8104 1.85958 20.0702 3.07875C21.33 4.29792 21.9595 5.77167 21.9587 7.5V10H23.2503C23.9607 10 24.5691 10.245 25.0755 10.735C25.5818 11.225 25.8345 11.8133 25.8337 12.5V25C25.8337 25.6875 25.5805 26.2763 25.0742 26.7663C24.5678 27.2563 23.9599 27.5008 23.2503 27.5H7.75033ZM15.5003 21.25C16.2107 21.25 16.8191 21.005 17.3255 20.515C17.8318 20.025 18.0845 19.4367 18.0837 18.75C18.0837 18.0625 17.8305 17.4738 17.3242 16.9838C16.8178 16.4938 16.2099 16.2492 15.5003 16.25C14.7899 16.25 14.1815 16.495 13.6752 16.985C13.1689 17.475 12.9161 18.0633 12.917 18.75C12.917 19.4375 13.1702 20.0263 13.6765 20.5163C14.1828 21.0063 14.7908 21.2508 15.5003 21.25ZM11.6253 10H19.3753V7.5C19.3753 6.45833 18.9986 5.57292 18.2451 4.84375C17.4916 4.11458 16.5767 3.75 15.5003 3.75C14.4239 3.75 13.509 4.11458 12.7555 4.84375C12.0021 5.57292 11.6253 6.45833 11.6253 7.5V10Z" fill="black"/>
                </svg>
            </With>
        </Categories>
      </Body>
    </Page6Container>
  );
  }
  
  export default Page6;