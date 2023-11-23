import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import {useState} from 'react';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import styled from "styled-components";

const Page3Container = styled.div`
    width: 430px;
    height: 932px;
    background: #FFF;    
`;

const Top = styled.div`
    margin-top: 12px;
    display: flex;

    padding-left: 22px;
    align-items: center;
`;

const Back = styled(Link)`
    width: 14px;
    height: 26.34px;
    flex-shrink: 0;
`;

const Title = styled.div`
    margin-left: 115px;

    color: #292929;

    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Input = styled.div`
    width: 356px;
    height: 380px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-top: 140px;
    margin-left: 38px;   
`;

const Text = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-bottom: 9px;
`;

const Option = styled.select`
    width: 356px;
    height: 36px;
    flex-shrink: 0;

    border: 0.5px solid #B4B4B4;
    background: #FFF;
    
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    color: #000;

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Number = styled.div`
    display: flex;
    align-items: center;

    width: 347px;
    height: 22px;
    flex-shrink: 0;

    border: 0.5px solid #B4B4B4;
    background: #FFF;

    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 9px;
`;

const Minus = styled.svg`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`;

const Ntext = styled.div`
    color: #000;

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    
    margin-left: 19px;
    margin-right: 19px;
`;

const Plus = styled.svg`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`;

const When = styled.div`
    display: flex;
    align-content: flex-start;

    width: 356px;
    height: 36px;
    flex-shrink: 0;

    background: #FFF;
    
    margin-left: 0px;
    margin-top: 0px;
`;

const Picker = styled(DatePicker)`
    color: #000;

    width: 348px;
    height: 28px;

    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Nextpage = styled(Link)`
    display: flex;
    width: 360px;
    height: 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 10px;
    background: #000;
    
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    color: #FFF;
    text-align: center;
    
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    margin-top: 200px;
    margin-left: 35px;
`;

function Page3() {
    const [counter, setCounter] = useState(0);

    function plus(){
        setCounter(counter+1);
    }
    function minus(){
        if(counter == 0)  setCounter(counter);
        else setCounter(counter-1);
    }

    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    return (
      <Page3Container>
        <Top>
            <Back to="/page2_1">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                    <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                </svg>                
            </Back>
            <Title>여행 계획하기</Title>
        </Top>

        <Input>
            <div>
                <Text>여행지 선택</Text>
                <Option name="items1">
                    <option value="제주도">제주도</option>
		        </Option>
            </div>

            <div>
                <Text>여행 인원</Text>
                <Number>
                    <Minus onClick={minus} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12.998H5V10.998H19V12.998Z" fill="#888888"/>
                    </Minus>
                    <Ntext>{counter}명</Ntext>
                    <Plus onClick={plus} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="#888888"/>
                    </Plus>
                </Number>
            </div>

            <div>
                <Text>여행 시작일</Text>
                <When>
                    <Picker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </When>
            </div>

            <div>
                <Text>여행 종료일</Text>
                <When>
                    <Picker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                </When>
            </div>
        </Input>

        <Nextpage to="/page4">
            링크 생성하기
        </Nextpage>
      </Page3Container>
    );
  }
  
  export default Page3;

