import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {useState} from 'react';
import "./Page3.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

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
      <div className="Page3">

        <div className="Top">
            <div className="Back">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                    <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                </svg>                
            </div>
            <div className="Title">여행 계획하기</div>
        </div>

        <div className="Input">
            <div className="Where">
                <div className="Text">여행지 선택</div>
                <select className="Option" name="items1">
                    <option value="제주도">제주도</option>
		        </select>
            </div>

            <div className="Who">
                <div className="Text">여행 인원</div>
                <div className="Number">
                    <svg className="Minus" onClick={minus} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12.998H5V10.998H19V12.998Z" fill="#888888"/>
                    </svg>
                    <div className="Ntext">{counter}명</div>
                    <svg className="Plus" onClick={plus} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z" fill="#888888"/>
                    </svg>
                </div>
            </div>

            <div className="Startdate">
                <div className="Text">여행 시작일</div>
                <div className="Date">
                    <DatePicker className="Picker"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                    />
                </div>
            </div>

            <div className="Enddate">
                <div className="Text">여행 종료일</div>
                <div className="Date">
                    <DatePicker className="Picker"
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                    />
                </div>
            </div>
        </div>

        <div className="Nextpage">
            링크 생성하기
        </div>
      </div>
    );
  }
  
  export default Page3;

