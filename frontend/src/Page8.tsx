import {useLocation, useNavigate, Link} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import styled from "styled-components";
import axios from 'axios';

const backend_url: string = "https://api.tripwiz.space";

interface Page8ContainerProps {
    isPopupOpen: boolean;
}

const Page8Container = styled.div<Page8ContainerProps>`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    background: ${(props) => (props.isPopupOpen ? 'rgba(0, 0, 0, 0.5)' : '#FFF')};
    
    overflow: hidden;

    padding-bottom: 10px;
    box-sizing: border-box;
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
    padding-left: 18px;
    box-sizing: border-box;
`

const LinkContainer = styled(Link)`
    width: fill;
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
    padding-right: 5px;
    margin-top: 12px;

    text-decoration: none;
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

interface AnswerProps {
    recordRemain: boolean;
}

const Answer = styled.div<AnswerProps>`
    width: auto;
    height: 37.255px;
    flex-shrink: 0;

    border-radius: 50px;
    
    background: ${(props) => (props.recordRemain ? '#0D99FF' : '#FFF')};

    color: ${(props) => (props.recordRemain ? '#FFFFFF' : '#747474')};

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
    padding: 5px;
`;

interface NextProps {
    canClick: boolean;
}

const Next = styled.div<NextProps>`
    pointer-events : ${(props) => (props.canClick ? 'auto' : 'none')};
    width: auto;
    height: auto;
    padding: 5px;
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

const FormContainer = styled.div`
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

class Category {
    id: number = 0;
    name: string = "";
};
  
class Image {
    path: string = "";
};
  
class SpotForm {
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
    Categories: Category[] = [new Category()];
    Images: Image[] = [new Image()];
};
  
class AlreadySubmitResponse {
    score: number = 0;
    spotId: number = 0;
    comment: string = "";
};
  
class ResponseType {
    spotForm: SpotForm[] = [new SpotForm()];
    alreadySubmitResponses: AlreadySubmitResponse[] = [new AlreadySubmitResponse()];
};


const PopupBackground = styled.div`
    width: 430px;
    height: 932px;
    background: rgba(0, 0, 0, 0.5);
`

interface PopupProps {
    onEdit: () => void;
    onSubmit: () => void;
}

const PopupContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    width: 270px;
    flex-direction: column;
    align-items: flex-start;

    border-radius: 14px;
    background: rgba(242, 242, 242, 0.80);
    backdrop-filter: blur(11px);
`

const PopupText = styled.p`
    display: flex;
    padding: 16px;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    align-self: stretch;

    color: var(--label-color-light-primary, #000);
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 18px; /* 138.462% */
    letter-spacing: -0.078px;

    span{
        color: var(--label-color-light-primary, #000);
        text-align: center;
        font-family: Noto Sans KR;
        font-size: 17px;
        font-style: normal;
        font-weight: 700;
        line-height: 22px; /* 129.412% */
        letter-spacing: -0.408px;
    }
`

const RowSeparator = styled.div`
    height: 0.5px;
    align-self: stretch;
    background: var(--separator-color-light-with-transparency, rgba(60, 60, 67, 0.36));
`

const ButtonContainer = styled.div`
    display: flex;
    height: 44px;
    align-items: flex-start;
    gap: 0.5px;
    align-self: stretch;
`

const Revise = styled.div`
    display: flex;
    padding: 11px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;

    color: #2E5AF5;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 129.412% */
    letter-spacing: -0.408px;
`

const ColumnSeparator = styled.div`
    width: 0.5px;
    align-self: stretch;
    background: var(--separator-color-light-with-transparency, rgba(60, 60, 67, 0.36));
`

const Submit = styled.div`
    display: flex;
    padding: 11px 20px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex: 1 0 0;
    align-self: stretch;

    color: #2E5AF5;
    text-align: center;
    font-family: Noto Sans KR;
    font-size: 17px;
    font-style: normal;
    font-weight: 700;
    line-height: 22px; /* 129.412% */
    letter-spacing: -0.408px;
`

const Popup: React.FC<PopupProps> = ({ onEdit, onSubmit }) => {
    return (
        <PopupContainer>
            <PopupText><span>끝!</span>여행지 고르기를 모두 완료하셨습니다.<br/>해당 결과를 제출할까요?</PopupText>
            <RowSeparator />
            <ButtonContainer>
                <Revise onClick={onEdit}>수정하기</Revise>
                <ColumnSeparator />
                <Submit onClick={onSubmit}>제출하기</Submit>
            </ButtonContainer>
        </PopupContainer>
    );
};

const Rectangle = styled.div`
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.50);
    position: absolute;
`


function Page8(){
    const [myResponse, setMyResponse] = useState<ResponseType>(new ResponseType());
    const [scoreArray, setScoreArray] = useState<number[]>(new Array(20).fill(0));
    const [commentArray, setCommentArray] = useState<string[]>(new Array(20).fill(""));

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const handleEdit = () => {
        setIsPopupOpen(false);
    };

    const handleSubmit = () => {
        const fetchData = async () => {
            try {
                const response = await axios.post(backend_url+"/api/spots", {
                    "planId": location.state.planId,
                    "spotId": myResponse.spotForm[currentSpotId].id,
                    "score": scoreArray[currentSpotId],
                    "comment": commentArray[currentSpotId],
                    "isLast": true
                }, { withCredentials: true });
            } catch (error) {
              // 오류 발생시 실행
            } finally {
              // 항상 실행
            }
        };
        setIsPopupOpen(false);
        navigate('/planstatus', { state: { planId: location.state.planId } });
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentArray(prevState => {
            const updatedArray = [...prevState];
            updatedArray[currentSpotId] = e.target.value;
            return updatedArray;
        })
    };
    const [currentSpotId, setCurrentSpotId] = useState(0);

    function saveScore(score: number){
        setScoreArray(prevState => {
            const updatedArray = [...prevState];
            updatedArray[currentSpotId] = score;
            return updatedArray;
        });
    }

    function beforeFunction(){
        if(currentSpotId > 0){
            setCurrentSpotId(currentSpotId - 1);
        }
    }

    function nextFunction(){
        const fetchData = async () => {
            try {
                const response = await axios.post(backend_url+"/api/spots", {
                    "planId": location.state.planId,
                    "spotId": myResponse.spotForm[currentSpotId].id,
                    "score": scoreArray[currentSpotId],
                    "comment": commentArray[currentSpotId],
                    "isLast": currentSpotId === 19
                }, { withCredentials: true });       
            } catch (error) {
              // 오류 발생시 실행
            } finally {
              // 항상 실행
            }
        };
        fetchData();
        if(currentSpotId < 19){
            setCurrentSpotId(currentSpotId + 1);
        }
        else{
            setIsPopupOpen(true);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(backend_url+"/api/spots/survey/"+String(location.state.planId), { withCredentials: true });
              setMyResponse(response.data);
              if(response.data.alreadySubmitResponses.length > 0){
                setCurrentSpotId(response.data.alreadySubmitResponses[0].length);
                for(let i=0; i<response.data.alreadySubmitResponses.length; i++){
                    setScoreArray(prevState => {
                        const updatedArray = [...prevState];
                        updatedArray[i] = response.data.alreadySubmitResponses[i].score;
                        return updatedArray;
                    });
                    setCommentArray(prevState => {
                        const updatedArray = [...prevState];
                        updatedArray[i] = response.data.alreadySubmitResponses[i].comment;
                        return updatedArray;
                    });
                }
              }
            } catch (error) {
              // 오류 발생시 실행
            } finally {
              // 항상 실행
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
    }, [currentSpotId, scoreArray]);
    
    return(
        <Page8Container isPopupOpen={isPopupOpen}>
            <LogoContainer onClick={() => navigate('/planlist')}>Tripwiz</LogoContainer>
            <LinkContainer to={myResponse.spotForm[currentSpotId].link !== undefined ? myResponse.spotForm[currentSpotId].link : "https://www.naver.com/"} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none">
                    <path d="M9.91634 7.08335L7.08301 9.91669" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M11.3337 9.20835L12.7503 7.79169C13.7283 6.81368 13.7283 5.22802 12.7503 4.25002V4.25002C11.7723 3.27202 10.1867 3.27202 9.20866 4.25002L7.79199 5.66669M5.66699 7.79169L4.25033 9.20835C3.27232 10.1864 3.27232 11.772 4.25033 12.75V12.75C5.22833 13.728 6.81399 13.728 7.79199 12.75L9.20866 11.3334" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                {myResponse.spotForm[currentSpotId].name}
            </LinkContainer>
            <Body>
                <img src={myResponse.spotForm[currentSpotId].Images[0].path} width={'100%'} height={316}></img>
                <Explanation>
                    <Charac>
                        <span>[한 줄 요약]</span><br/>{myResponse.spotForm[currentSpotId].overview}
                    </Charac>
                    <Charac>
                        <span>[특징]</span><br/>
                        · {myResponse.spotForm[currentSpotId].feature1}<br/>
                        · {myResponse.spotForm[currentSpotId].feature2}<br/>
                        · {myResponse.spotForm[currentSpotId].feature3}
                    </Charac>
                    <Charac>
                        <span>[관광지 유형]</span><br/>{myResponse.spotForm[currentSpotId].Categories.map(categoryType => categoryType.name).join(', ')}
                    </Charac>
                    <Charac>
                        <span>[소요시간]</span><br/>{myResponse.spotForm[currentSpotId].takenTime}
                    </Charac>
                    <Charac>
                        <span>[요금]</span><br/>{myResponse.spotForm[currentSpotId].fee}
                    </Charac>
                </Explanation>
            </Body>

            <Question>이 여행지에 방문하고 싶나요?</Question>
            <AnswerBox>
                <Answer onClick={() => saveScore(1)} recordRemain={scoreArray[currentSpotId]===1}>매우 비선호</Answer>
                <Answer onClick={() => saveScore(2)} recordRemain={scoreArray[currentSpotId]===2}>비선호</Answer>
                <Answer onClick={() => saveScore(3)} recordRemain={scoreArray[currentSpotId]===3}>선호</Answer>
                <Answer onClick={() => saveScore(4)} recordRemain={scoreArray[currentSpotId]===4}>매우 선호</Answer>
            </AnswerBox>

            <Bottom>
                <Before onClick={beforeFunction}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
                        <path d="M0 9.93896C0 10.3208 0.145996 10.6465 0.449219 10.9385L9.20898 19.5073C9.44482 19.7544 9.75928 19.8779 10.1187 19.8779C10.8486 19.8779 11.4214 19.3164 11.4214 18.5752C11.4214 18.2158 11.2754 17.8901 11.0283 17.6431L3.1333 9.93896L11.0283 2.23486C11.2754 1.97656 11.4214 1.65088 11.4214 1.2915C11.4214 0.561523 10.8486 0 10.1187 0C9.75928 0 9.44482 0.123535 9.20898 0.370605L0.449219 8.93945C0.145996 9.23145 0.0112305 9.55713 0 9.93896Z" fill="#808080"/>
                    </svg>
                </Before>
                <Order>
                    {currentSpotId + 1}/20
                </Order>
                <Next onClick={nextFunction} canClick={scoreArray[currentSpotId]!==0}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
                        <path d="M11.4219 9.93896C11.4219 9.55713 11.2759 9.23145 10.9727 8.93945L2.21289 0.370605C1.97705 0.123535 1.6626 0 1.30322 0C0.573242 0 0.000488281 0.561523 0.000488281 1.30273C0.000488281 1.66211 0.146484 1.98779 0.393555 2.23486L8.28857 9.93896L0.393555 17.6431C0.146484 17.9014 0.000488281 18.2271 0.000488281 18.5864C0.000488281 19.3164 0.573242 19.8779 1.30322 19.8779C1.6626 19.8779 1.97705 19.7544 2.21289 19.5073L10.9727 10.9385C11.2759 10.6465 11.4106 10.3208 11.4219 9.93896Z" fill="#808080"/>
                    </svg>
                </Next>
            </Bottom>

            <FormContainer>
                <Input type="text" value={commentArray[currentSpotId]} onChange={onChange} placeholder={(commentArray[currentSpotId]==="")? ("댓글 달기") : (commentArray[currentSpotId]) }/>
            </FormContainer>
            {isPopupOpen && <Rectangle/>}
            {isPopupOpen && <Popup onEdit={handleEdit} onSubmit={handleSubmit} />}
            
        </Page8Container>
    )

}

export default Page8