import {Link, useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import styled from "styled-components";
import axios from 'axios';

const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;


const Page2_1Container = styled.div`
    width: 100%;
    height: 100%;
    background: #FFF;
    padding-top: 6px;
    padding-bottom: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Logo = styled(Link)`
    width: 100%;
    height: 34px;

    color: #0D99FF;
    text-align: center;
    font-family: Outfit;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;

    text-align: start;
    padding-left: 50px;
`;

const Body2_1 = styled.div`
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 25px;
    gap: 30px;
` 

const Location = styled.div`
    width: 87%;
    height: 239px;
    flex-shrink: 0;

    border-radius: 20px;
    border: 0.5px solid #B4B4B4;
    background: #FFF;
    
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    padding: 18px 21px 13px 21px;
    box-sizing: border-box;
`;

const Top = styled.div`
    width: 100%;
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: relative;
`

const DateContainer = styled.div`
    width: 249px;
    height: 28px;
    flex-shrink: 0;

    border-radius: 10px;
    background: rgba(0, 0, 0, 0.70);

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

const DotDotDot = styled.div`
`

const DeleteMenu = styled.div`
    display: flex;

    width: 174px;
    height: 40px;
    padding: 11px 16px 11px 16px;
    box-sizing: border-box;

    align-items: center;
    justify-content: space-between;

    border-radius: 10px;
    box-shadow: 0px 8px 64px 0px rgba(0, 0, 0, 0.10);
    backdrop-filter: blur(40px);
    background: #EDEDEDCC;

    color: var(--label-color-light-primary, #000);
    font-family: Noto Sans KR;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 129.412% */
    letter-spacing: -0.408px;

    position: absolute;
    top: 33px;
    right: -8px;
`

const Jeju = styled.div`
    color: var(--Black, #000);

    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-align: center;

    margin-top: 57px;
`;

const Below = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 67px;
    margin-top: 15px;
`;

const Planning = styled.div`
    width: 100px;
    height: 34px;
    flex-shrink: 0;

    border-radius: 10px;
    background: #0D99FF;

    color: #FFF;

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const ParticipantContainer = styled.div`
    width: fill;

    display: grid;
    
    row-gap: 4px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    column-gap: 4px;
    grid-template-areas: "item4 item3 item2 item1"
                         "item5 item6 item7 item8";
`

interface ParticipantProps {
    order: number;
}

const Participant = styled.div<ParticipantProps>`
    width: 40px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 15px;
    border: 1px solid #0D99FF;

    color: #0D99FF;
    font-family: Noto Sans KR;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    display: flex;
    align-items: center;
    justify-content: center;

    grid-area: ${(props) => "item"+props.order};
`

const Decoration = styled.div`
    width: 316px;
    height: 64px;
    flex-shrink: 0;

    color: rgba(13, 153, 255, 0.29);
    text-align: center;
    font-family: Outfit;
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
`;

const Add = styled.div`
    width: 60px;
    height: 60px;
    flex-shrink: 0;

    margin-left: 323px;
    margin-top: 303px;
`;

const Body2_2 = styled.div`
  width: 100%;

  color: var(--Black, #000);
  text-align: center;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  
  margin-top: 314px;

  span{
    color: var(--Black, #000);
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

export let participantsName: string[] = [];

const days: string[] = ['일', '월', '화', '수', '목', '금', '토'];

if (localStorage.getItem('guestID')){
    localStorage.removeItem('guestID');
    axios.post(backend_url+"/api/plans/join/" + localStorage.getItem('guestID'), {
    }, { withCredentials: true })
    .then(function (response) {
        console.log(response);
        console.log(" join done !!! ");
        //redirect
    }).catch(function (error) {
        // 오류발생시 실행
    }).then(function() {
        // 항상 실행
    });
}

export function Page2_1() {
    const navigate = useNavigate();

    const [havePlan, setHavePlan] = useState(true);
    const [myResponse, setMyResponse] = useState(Array<string[]>());
    const [isClickDeleteMenu, setIsClickDeleteMenu] = useState(false);

    const deletePlan = (event: any, planId: string) => {
        event.stopPropagation();
        axios.delete(backend_url+"/api/plans/"+planId, {
            withCredentials: true,
            })
          .then(response => {
            console.log("page2_1 plan delete 성공")
            setIsClickDeleteMenu(false);
            window.location.reload();
          })
          .catch(error => {
            console.error('Error fetching data: ', error);
        });
    }

    const handleClick = (event : any) => {
        event.stopPropagation();
        console.log("click");
        setIsClickDeleteMenu(!isClickDeleteMenu);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(backend_url+"/api/plans/all", { withCredentials: true });
              console.log(response);
              if(response['data'].length==0){
                setHavePlan(false);
              }
              else{
                const tempResponse: Array<string[]> = [];
                for(let i=0;i<response['data'].length;i++){
                    const tempArray: string[] = [];
                    tempArray.push(response['data'][i]['startDate']);
                    tempArray.push(response['data'][i]['endDate']);
                    tempArray.push(response['data'][i]['status']);
                    tempArray.push(response['data'][i]['participantsName']);
                    tempArray.push(String(response['data'][i]['planId']));

                    tempResponse.push(tempArray);
                }
                setMyResponse(tempResponse);
              }
            } catch (error) {
              // 오류 발생시 실행
            } finally {
              // 항상 실행
            }
        };
        fetchData();
    }, []); // 최초 한번

    useEffect(() => {}, [isClickDeleteMenu]);

    return (
        <Page2_1Container>
            <Logo to="/page2_1" style={{ textDecoration: "none"}}>Tripwiz</Logo>
            {havePlan===true ? (<Body2_1>
                {myResponse.map((response, index) => (
                    <Location onClick={() => navigate('/page6', { state: { planId: response[4] } })}>
                        {response.length === 0 ? (
                            <a>a</a>
                        ) : (
                            <div>
                                <Top>
                                    <DateContainer>
                                        {response[0].replace(/-/g, "/")}({days[new Date(response[0]).getDay()]}) ~ {response[1].replace(/-/g, "/")}({days[new Date(response[1]).getDay()]})
                                    </DateContainer>
                                    <DotDotDot onClick={handleClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="5" height="23" viewBox="0 0 5 23" fill="none">
                                            <circle cx="2.5" cy="2.5" r="2.5" fill="black" fill-opacity="0.7"/>
                                            <circle cx="2.5" cy="11.5" r="2.5" fill="black" fill-opacity="0.7"/>
                                            <circle cx="2.5" cy="20.5" r="2.5" fill="black" fill-opacity="0.7"/>
                                        </svg>
                                    </DotDotDot>
                                    {isClickDeleteMenu&& 
                                    <DeleteMenu onClick={(event) => deletePlan(event, response[4])}>
                                        <div>계획 삭제하기</div>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                                                <path d="M4.88889 3.0726V2.12986C4.88889 1.83235 4.88889 1.68359 5.11682 1.40669C5.34475 1.12979 5.41533 1.11597 5.5565 1.08833C6.00751 1 6.54569 1 6.83333 1H8.5L10.1667 1.00001C10.4666 1.00001 11.0389 1.00001 11.5007 1.10013C11.5738 1.11597 11.6103 1.12389 11.8182 1.33181C11.8446 1.35819 11.9318 1.46624 11.952 1.49762C12.1111 1.74486 12.1111 1.85372 12.1111 2.07143V2.07143V3.14286M1 3.63466H2.94444M2.94444 3.63466H14.0556M2.94444 3.63466L3.38889 14.8759C3.38889 15.4967 3.77028 16 4.24074 16H12.7593C13.2297 16 13.6111 15.4967 13.6111 14.8759L14.0556 3.63466M14.0556 3.63466H16M8.5 6.73529V12.9118M5.94444 6.73529V12.9118M11.0556 6.73529V12.9118" stroke="black" stroke-linecap="round"/>
                                            </svg>
                                        </div>
                                    </DeleteMenu>}
                                </Top>
                                <Jeju>제주도</Jeju>
                                <Below>
                                    <Planning>{response[2]}</Planning>
                                    <ParticipantContainer>
                                        {JSON.parse(response[3]).map((participant: string, index: number) => (
                                            <Participant key={index} order={index+1}>{participant.slice(1)}</Participant>
                                        ))}
                                    </ParticipantContainer>
                                </Below>
                            </div>
                        )}
                    </Location>
                ))}
                <Decoration>Tripwiz</Decoration>
            </Body2_1>) : (<Body2_2>
                플러스 버튼을 <span>눌러</span><br></br>여행 계획<span>을</span><br></br>시작해보세요!
            </Body2_2>
            )}
            <Add>
                <Link to="/page3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="30" fill="#0D99FF"/>
                        <path d="M30 44.5714L30 14.5714" stroke="white" stroke-width="7" stroke-linecap="round"/>
                        <path d="M14.5713 30H44.5713" stroke="white" stroke-width="7" stroke-linecap="round"/>
                    </svg>   
                </Link>         
            </Add>
        </Page2_1Container>
    );
}