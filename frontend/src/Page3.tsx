import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Link as ReactRouterDomLink, LinkProps as ReactRouterDomLinkProps } from "react-router-dom";

import React, {useState} from 'react';
import styled from "styled-components";

import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import 'react-datepicker/dist/react-datepicker.css';

import Select from 'react-select';

interface LinkProps extends ReactRouterDomLinkProps {
	isActive?: boolean;
	children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ isActive, children, ...props }) => {
	return <ReactRouterDomLink {...props}>{children}</ReactRouterDomLink>;
};

const Page3Container = styled.div`
    width: 100%;
    height: 100%;
    background: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Top = styled.div`
    margin-top: 12px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Back = styled(ReactRouterDomLink)`
    width: 14px;
    height: 26.34px;
    flex-shrink: 0;
    position: absolute;
    left: 22px;
`;

const Title = styled.div`
    color: #292929;

    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Container = styled.div`
    width: 100%;
    height: fit-content;
`

const Input = styled.div`
    width: 340px;
    height: 380px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin-top: 140px;
    padding-bottom: 10px;
    box-sizing: border-box;
`;

const Text = styled.div`
    color: #000;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-bottom: 9px;

    width: 100%;
`;

const Option = styled.select`
    width: 100%;
    height: 36px;
    flex-shrink: 0;

    border: 0.5px solid #B4B4B4;
    background: #FFF;
    
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    color: #000;

    color: #000;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 19.2px */
    letter-spacing: -0.8px;

    padding-left: 5px;
    box-sizing: border-box;
`;

const Number = styled.div`
    display: flex;
    align-items: center;

    width: 100%;
    height: 33px;
    flex-shrink: 0;

    border: 0.5px solid #B4B4B4;
    background: #FFF;

    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 5px;
    box-sizing: border-box;
`;

const Minus = styled.svg`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`;

const Ntext = styled.div`
    color: #000;

    color: #000;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 19.2px */
    letter-spacing: -0.8px;
    
    margin-left: 5px;
    margin-right: 5px;
`;

const Plus = styled.svg`
    width: 24px;
    height: 24px;
    flex-shrink: 0;
`;

const When = styled.div`
    display: flex;
    align-content: flex-start;

    width: 100%;
    height: 36px;
    flex-shrink: 0;

    background: #FFF;
    
    margin-left: 0px;
    margin-top: 0px;
`;

const Picker = styled(DatePicker)`
    color: #000;

    width: 340px;
    height: 34px;

    color: #000;
    font-family: Noto Sans KR;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%; /* 19.2px */
    letter-spacing: -0.8px;
    box-sizing: border-box;
`;

const Nextpage = styled(Link)`
    display: flex;
    width: 87%;
    height: 40px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;

    border-radius: 36px;
    background: ${(props) => (props.isActive ? '#0D99FF' : '#B1B1B1')};
    pointer-events: ${(props) => (props.isActive ? 'auto' : 'none')};
    
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    color: #FFF;
    text-align: center;
    
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    margin-top: 200px;

    text-decoration: None;
`;

export let exportCounter: number = 0;
export let exportStartDate: Date | null = new Date();
export let exportEndDate: Date | null = new Date();

export function Page3() {
    const [counter, setCounter] = useState(0);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [isActive, setIsActive] = useState(false);

    function plus(){
        setCounter(counter+1);
        //exportCounter += 1;
    }
    
    function minus(){
        if(counter == 0)  setCounter(counter);
        else{
            setCounter(counter-1);
            //exportCounter -= 1;
        }
    }

    function isCompleted(){
        if((counter>0) && (startDate!==null)){
            return true;
        }
    }

    const options = [
        { value: '제주도', label: '제주도' }
    ]
    
    exportCounter = counter;
    exportStartDate = startDate;
    exportEndDate = endDate;

    return (
      <Page3Container>
        <Top>
            <Back to="/planlist">
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

            <Container>
                <Text>여행 시작일</Text>
                <When>
                    <Picker
                        dateFormat= "yyyy년 M월 d일"
                        selected={startDate}
                        locale={ko}
                        onChange={(date) => setStartDate(date)}
                    />
                </When>
            </Container>

            <div>
                <Text>여행 종료일</Text>
                <When>
                    <Picker
                        dateFormat= "yyyy년 M월 d일"
                        selected={endDate}
                        minDate={startDate}
                        locale={ko}
                        onChange={(date) => setEndDate(date)}
                    />
                </When>
            </div>
        </Input>

        <Nextpage to="/selectlocation" isActive={isCompleted()}>
            다음
        </Nextpage>
      </Page3Container>
    );
}