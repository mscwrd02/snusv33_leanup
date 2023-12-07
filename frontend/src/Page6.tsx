import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import friend_icon from './friend_icon.png';

import axios from 'axios';
const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page6Container = styled.div`
  width: 100%;
  height: 100%;
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

const DateContainer = styled.div`
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
    gap: 20px;
    margin-top: 10px;
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
  width: fit-content;
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
    height: auto;
    flex-shrink: 0; 

    border-radius: 15px;
    border: 0.5px solid rgba(180, 180, 180, 0.45);
    background: #FFF;

    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    padding-left: 18px;
    padding-right: 18px;
    padding-bottom: 10px;  
`

const Preferencetop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    margin-top: 17px;
    margin-bottom: 17px;
`

interface GoProps {
    done: boolean;
}

const Go = styled.button<GoProps>`
    width: fill;
    height: 30px;
    flex-shrink: 0;
    padding: 10px;

    border-radius: 15px;
    border: 1px solid #0D99FF;

    background: ${(props) => (props.done ? '#0D99FF' : '#FFF')};

    color: ${(props) => (props.done ? '#FFF' : '#0D99FF')};
    font-family: Noto Sans KR;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 16.8px */
    letter-spacing: -0.7px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`
interface SurveyrateProps {
    status: number;
}

const Surveyrate = styled.div<SurveyrateProps>`
    display: flex;
    flex-direction: column;
    align-items: start;

    color: #5A5A5A;
    font-family: Noto Sans KR;
    font-size: 11px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-bottom: 14px;

    span{
        margin-left: ${(props) => Math.max(props.status - 4, 0)}%;
    }
`

const Bar = styled.div`
    width: 100%;
    height: 10px;
    border-radius: 10px;
    background: #DDD;

    position: relative;
    margin-top: 4px;
`

interface CompletebarProps {
    status: number;
}

const Completebar = styled.div<CompletebarProps>`
    width: ${props => props.status}%;
    height: 10px;
    border-radius: 10px;
    background-color: #0D99FF;

    position: absolute;
`

const FriendContainer = styled.div`
    width: 80%;
    height: auto;

    float: right;
    display: grid;
    
    row-gap: 4px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 4px;
    grid-template-areas: "item4 item3 item2 item1"
                        "item8 item7 item6 item5";
`

interface FriendProps {
    order: number;
}

const Friend = styled.div<FriendProps>`
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

    grid-area: ${(props) => "item"+props.order};

    div{
        height:28px;
    }
`

const SpotResult = styled.div`
    width: auto;
    height: 77px;
    flex-shrink: 0;

    border-radius: 15px;
    border: 0.5px solid rgba(180, 180, 180, 0.45);
    background: #FFF;

    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    display: flex;
    justify-content: start;
    align-items: center;

    padding-left: 18px;
    padding-right: 18px;
`

const FirstSpot = styled.div`
    width: 76px;
    height: 22px;
    flex-shrink: 0;

    color: #FFF;
    font-family: Noto Sans KR;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: 120%; /* 12px */
    letter-spacing: -0.5px;

    background: #0D99FF;
    border-radius: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 65px;
    margin-right: 12px;
`

const UnfoldContainer = styled.div`
    width: 15px;
    height: 22px;
`

const TimeTable = styled.div`
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
    padding-right: 30px;
`

class ResponseType {
    planId: number = 0;
    userId: number = 0;
    link: string = "";
    groupNum: number = 0;
    regionList: string = "[]";
    participantsName: string = "[]";
    categoryResponseStatus: string = "[]";
    spotResponseStatus: string = "[]";
    startDate: string = "";
    endDate: string = "";
    status: string = "";
}

function Page6() {

  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(5);
  const [friends, setFriends] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const [myResponse, setMyResponse] = useState<ResponseType>(new ResponseType());
  const [myNickname, setMyNickname] = useState<string>("");
  const [finishedSurvey, setFinishedSurvey] = useState<boolean>(false);

  const [howMuchDays, setHowMuchDays] = useState<number>(0);

  const days: string[] = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(backend_url+"/api/plans/planId/"+location.state.planId, { withCredentials: true });
            setMyResponse(response.data);

            let tempFinishedSurvey: boolean = true;
            for(let i=0; i<response.data.groupNum; i++){
                tempFinishedSurvey = (tempFinishedSurvey && JSON.parse(response.data.spotResponseStatus)[i]);
            }
            setFinishedSurvey(tempFinishedSurvey);
            const response2 = await axios.get(backend_url+"/api/users", { withCredentials: true });
            setMyNickname(response2.data.nickname);
            setHowMuchDays((new Date(response.data.endDate).getTime() - new Date(response.data.startDate).getTime()) / (1000 * 60 * 60 * 24) + 1);
        } catch (error) {
          // 오류 발생시 실행
        } finally {
          // 항상 실행
        }
    };
    fetchData();
  }, []);

  useEffect(() => {
  }, [location.state.planId]);

  const generateStringToCopy = () => {
    // 여기에서 원하는 로직에 따라 새로운 문자열을 생성합니다.
    return "https://tripwiz.space/PageforGuest?id=" + myResponse.link;
  };

  const Sharing_Link = generateStringToCopy();
  
  const handleLinkCopy = async () => {
    if (navigator.clipboard !== undefined) {
      navigator.clipboard.writeText(Sharing_Link)
      .then(() => {
        //alert('텍스트가 복사되었습니다.');
      })
      .catch((error) => {
        console.error('클립보드 복사 실패:', error);
      });

    } else {
      // execCommand 사용
      const textArea = document.createElement('textarea');
      textArea.value = Sharing_Link;
      document.body.appendChild(textArea);
      textArea.select();
      textArea.setSelectionRange(0, 99999);
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('복사 실패', err);
      }
      textArea.setSelectionRange(0, 0);
      document.body.removeChild(textArea);
      alert('텍스트가 복사되었습니다.');
    }
  };

  return (
    (finishedSurvey) ? (
    <Page6Container>
        <Body>
            <Top>
                <Back to="/planlist">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                        <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                    </svg>                
                </Back>
                <Title>제주도</Title>
            </Top>
            <DateContainer>
                {myResponse['startDate'].replace(/-/g, "/")}({days[new Date(myResponse['startDate']).getDay()]}) ~ {String(myResponse['endDate']).replace(/-/g, "/")}({days[new Date(myResponse['endDate']).getDay()]})
            </DateContainer>

            <Categories>
            <With>
                <Text>함께 가는 사람</Text>
                <People>
                    {JSON.parse(myResponse.participantsName).map((name:string) => name.slice(1)).join(', ')}
                </People>
            </With>

            <SpotResult onClick={() => navigate('/surveyresult', { state: { planId: myResponse.planId, howMuchDays: howMuchDays } })}>
                <Text>여행지 고르기 결과</Text>
                <FirstSpot>
                    1등 여행지는?
                </FirstSpot>
                <UnfoldContainer>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="22" viewBox="0 0 15 25" fill="none">
                        <path d="M5.625 4.5L12.5 12.75L5.625 21" stroke="black" stroke-width="3"/>
                    </svg>
                </UnfoldContainer>
            </SpotResult>

            <TimeTable onClick={() => navigate('/timetable', { state: { planId: myResponse.planId, howMuchDays: howMuchDays } })}>
                <Text>여행 일정표</Text>
                <UnfoldContainer>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="22" viewBox="0 0 15 25" fill="none">
                        <path d="M5.625 4.5L12.5 12.75L5.625 21" stroke="black" stroke-width="3"/>
                    </svg>
                </UnfoldContainer>
            </TimeTable>
            </Categories>
        </Body>
    </Page6Container>
    ) : (
    <Page6Container>
      <Body>
        <Top>
            <Back to="/planlist">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                    <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                </svg>                
            </Back>
            <Title>제주도</Title>
        </Top>
        <DateContainer>
            {myResponse['startDate'].replace(/-/g, "/")}({days[new Date(myResponse['startDate']).getDay()]}) ~ {String(myResponse['endDate']).replace(/-/g, "/")}({days[new Date(myResponse['endDate']).getDay()]})
        </DateContainer>

        <LinkContainer onClick={handleLinkCopy}>
            <img width={40} height={40} src={friend_icon}/>
        </LinkContainer>

        <Categories>
            <With>
                <Text>함께 가는 사람</Text>
                <People>
                    {JSON.parse(myResponse.participantsName).map((name:string) => name.slice(1)).join(', ')}
                </People>
            </With>

            <Preference>
                <Preferencetop>
                    <Text>취향 고르기</Text>
                    {JSON.parse(myResponse.categoryResponseStatus)[JSON.parse(myResponse.participantsName).indexOf(myNickname)] ? (
                        <Go done={JSON.parse(myResponse.categoryResponseStatus)[JSON.parse(myResponse.participantsName).indexOf(myNickname)]}>완료</Go>
                    ) : (
                        <Go done={JSON.parse(myResponse.categoryResponseStatus)[JSON.parse(myResponse.participantsName).indexOf(myNickname)]} onClick={() => navigate('/typesurvey', { state: { planId: myResponse.planId } })}>하러 가기</Go>
                    )}
                </Preferencetop>
                <Surveyrate status={JSON.parse(myResponse.categoryResponseStatus).filter((value:boolean) => value === true).length / myResponse.groupNum * 100}>
                    <span>{(JSON.parse(myResponse.categoryResponseStatus).filter((value:boolean) => value === true).length / myResponse.groupNum * 100).toFixed(1)}%</span>
                    <Bar>
                        <Completebar status={JSON.parse(myResponse.categoryResponseStatus).filter((value:boolean) => value === true).length / myResponse.groupNum * 100}/>
                    </Bar>
                </Surveyrate>
                <FriendContainer>
                    {JSON.parse(myResponse.participantsName).map((name:string, index:number) => (
                        <Friend order={index+1}>
                            { JSON.parse(myResponse.categoryResponseStatus)[index] ? ( <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <circle cx="14" cy="14" r="9" fill="#0D99FF"/>
                                <path d="M10.5 13L13.2118 16.8284C13.2713 16.9124 13.3959 16.9128 13.456 16.8291L18 10.5" stroke="white" stroke-width="1.2"/>
                            </svg></div>
                            ) : (<div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <circle cx="14" cy="14" r="9" fill="#969696"/>
                                    <path d="M10.5 13L13.2118 16.8284C13.2713 16.9124 13.3959 16.9128 13.456 16.8291L18 10.5" stroke="white" stroke-width="1.2"/>
                            </svg></div>
                            )} 
                            {name.slice(1)}
                        </Friend>
                    ))}
                </FriendContainer>
            </Preference>
            {(JSON.parse(myResponse.categoryResponseStatus).filter((value:boolean) => value === true).length === myResponse.groupNum) ? (
                <Preference>
                    <Preferencetop>
                        <Text>여행지 고르기</Text>
                        {JSON.parse(myResponse.spotResponseStatus)[JSON.parse(myResponse.participantsName).indexOf(myNickname)] ? (
                            <Go done={JSON.parse(myResponse.spotResponseStatus)[JSON.parse(myResponse.participantsName).indexOf(myNickname)]}>완료</Go>
                        ) : (
                            <Go done={JSON.parse(myResponse.spotResponseStatus)[JSON.parse(myResponse.participantsName).indexOf(myNickname)]} onClick={() => navigate('/spotsurvey', { state: { planId: myResponse.planId } })}>하러 가기</Go>
                        )}

                    </Preferencetop>
                    <Surveyrate status={JSON.parse(myResponse.spotResponseStatus).filter((value:boolean) => value === true).length / myResponse.groupNum * 100}>
                        <span>{(JSON.parse(myResponse.spotResponseStatus).filter((value:boolean) => value === true).length / myResponse.groupNum * 100).toFixed(1)}%</span>
                        <Bar>
                            <Completebar status={JSON.parse(myResponse.spotResponseStatus).filter((value:boolean) => value === true).length / myResponse.groupNum * 100}/>
                        </Bar>
                    </Surveyrate>
                    <FriendContainer>
                        {JSON.parse(myResponse.participantsName).map((name:string, index:number) => (
                            <Friend order={index+1}>
                                { JSON.parse(myResponse.spotResponseStatus)[index] ? ( <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <circle cx="14" cy="14" r="9" fill="#0D99FF"/>
                                    <path d="M10.5 13L13.2118 16.8284C13.2713 16.9124 13.3959 16.9128 13.456 16.8291L18 10.5" stroke="white" stroke-width="1.2"/>
                                </svg></div>
                                ) : (<div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                        <circle cx="14" cy="14" r="9" fill="#969696"/>
                                        <path d="M10.5 13L13.2118 16.8284C13.2713 16.9124 13.3959 16.9128 13.456 16.8291L18 10.5" stroke="white" stroke-width="1.2"/>
                                </svg></div>
                                )} 
                                {name.slice(1)}
                            </Friend>
                        ))}
                    </FriendContainer>
                </Preference>
            ) : (
            <With>
                <Text>여행지 고르기</Text>
                <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                    <path d="M7.75033 27.5C7.03991 27.5 6.43154 27.255 5.9252 26.765C5.41887 26.275 5.16613 25.6867 5.16699 25V12.5C5.16699 11.8125 5.42016 11.2238 5.92649 10.7338C6.43283 10.2438 7.04077 9.99917 7.75033 10H9.04199V7.5C9.04199 5.77083 9.6719 4.29667 10.9317 3.0775C12.1915 1.85833 13.7144 1.24917 15.5003 1.25C17.2871 1.25 18.8104 1.85958 20.0702 3.07875C21.33 4.29792 21.9595 5.77167 21.9587 7.5V10H23.2503C23.9607 10 24.5691 10.245 25.0755 10.735C25.5818 11.225 25.8345 11.8133 25.8337 12.5V25C25.8337 25.6875 25.5805 26.2763 25.0742 26.7663C24.5678 27.2563 23.9599 27.5008 23.2503 27.5H7.75033ZM15.5003 21.25C16.2107 21.25 16.8191 21.005 17.3255 20.515C17.8318 20.025 18.0845 19.4367 18.0837 18.75C18.0837 18.0625 17.8305 17.4738 17.3242 16.9838C16.8178 16.4938 16.2099 16.2492 15.5003 16.25C14.7899 16.25 14.1815 16.495 13.6752 16.985C13.1689 17.475 12.9161 18.0633 12.917 18.75C12.917 19.4375 13.1702 20.0263 13.6765 20.5163C14.1828 21.0063 14.7908 21.2508 15.5003 21.25ZM11.6253 10H19.3753V7.5C19.3753 6.45833 18.9986 5.57292 18.2451 4.84375C17.4916 4.11458 16.5767 3.75 15.5003 3.75C14.4239 3.75 13.509 4.11458 12.7555 4.84375C12.0021 5.57292 11.6253 6.45833 11.6253 7.5V10Z" fill="black"/>
                </svg>
            </With>
            )}
        </Categories>
      </Body>
    </Page6Container>
    )
  );
  }
  
  export default Page6;