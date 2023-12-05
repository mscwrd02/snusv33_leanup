import React, {useState} from "react";
import "./Page5.css";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Prev_btn from "./prev_btn";
import { Link } from 'react-router-dom';
import prev_btn_x from './images/prev_btn_x.png';
import close_btn_x_black from './images/close_btn_x_black.png';
import styled from 'styled-components'
import { useEffect } from 'react'
import axios from 'axios';
import delete_btn from './images/delete_btn.png';

const TimeTableContainer = styled.div`
  width: 100%;
  height: 932px;
  background: #FFF;
  padding-top: 11px;  
`;

const Body = styled.div`
  background: #FFF;
  height:932px;
  display:flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
    width: 100%;
    height: 30px;
    text-align: center;
    display: flex;
    flexDirection: 'column',
    color: #292929;
`;

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

let n_day = 3;
let selected_day: any;
let date = 1;
let spot_arr = new Array(n_day);  // 3개의 원소를 가진 배열 생성
let spot_arr_count = new Array(n_day+1).fill(0);
let spot_id = 0;
const color_array = ["rgba(0, 122, 255, 0.14)", "rgba(255, 204, 0, 0.14)", "rgba(255, 59, 48, 0.14)", "rgba(175, 82, 222, 0.14)", "rgba(255, 149, 0, 0.14)"];
const text_color_array = ["rgba(0, 122, 255, 1)", "rgba(255, 204, 0, 1)", "rgba(255, 59, 48, 1)", "rgba(175, 82, 222, 1)", "rgba(255, 149, 0, 1)"];
// 6개 색
function TimeTable() {
  const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;
  const [brightness, setBrightness] = useState(Array(n_day).fill(1));
  const [selected, setSelected] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoadingDone, setIsLoadingDone] = useState(false);
  const [isDeleteEnable, setIsDeleteEnable] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [nSpot, setNSpot] = useState(0); // nSpot을 상태로 관리
  const [newPostFlag, setnewPostFlag] = useState(0);
  const [isPlannedEachBlock, setisPlannedEachBlock] = useState(Array.from({ length: n_day }, () => Array(4).fill(0)));
  const [planData, setPlanData] = useState<string[][]>([]);
  const [isBlockChoosed, setIsBlockChoosed] = useState<boolean[][]>([]); // for delete button visible

  const initialResponseData = {}; // 초기 responseData 값

  // responseData를 객체로 관리
  const [responseData_totalplan, setResponseData_totalplan] = useState(initialResponseData);

  const location = useLocation();
  const navigate = useNavigate();
  n_day = location.state.howMuchDays;

  let get_flag = 0;
  const handleSpotClick = (index: number) => {
    setSelectedSpot(index);
    spot_id = spot_arr[selected_day][index-1].spotId;
  };
  const handle_closebtn = () => {
    setIsVisible(prevIsVisible => !prevIsVisible);
    setBrightness(prevBrightness => prevBrightness.map((b, i) => {
        return 1;
    }));
    selected_day = null;
    setSelectedSpot(null)
  };

  const handle_eachday = async ({day, block}: {day: number, block: number}) => {
    // 버튼 클릭 시 실행될 코드
    let time: string;
    if (block == 1) time = "morning";
    else if (block == 2) time = "afternoon1";
    else if (block == 3) time = "afternoon2";
    else if (block == 4) time = "evening";
    else time = "morning";

    if (selectedSpot === null && isLoadingDone){
      if (planData[day-1][block-1] && isDeleteEnable &&isBlockChoosed[day-1][block-1]) { // delete
        setIsDeleteEnable(false);
        selected_day = day;
        const selectedDayData = spot_arr[selected_day];
        if (selectedDayData) {
          // if (!spot_id) {
            let index = spot_arr[selected_day].findIndex((item: { name: string }) => item.name === planData[day-1][block-1]);
            // if (spot_arr[selected_day][index]) 
            spot_id = spot_arr[selected_day][index].spotId;
          // }
        }
        axios.delete(backend_url + '/api/schedules', { ///day
          withCredentials: true,
          data: {
            planId: location.state.planId, //location.state.planId,
            spotId: spot_id,
            date: day,
            time: time,
          }
          })
        .then(response => {
          setResponseData(response.data);
          setnewPostFlag(1);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });

        let newIsBlockChoosed: boolean[][] = [];
        for (let i = 0; i < n_day; i++) {
          newIsBlockChoosed.push([false, false, false, false]);
        }
        setIsBlockChoosed(newIsBlockChoosed);
      }
      else if(planData[day-1][block-1]){
        setIsDeleteEnable(true);

        let newIsBlockChoosed: boolean[][] = [];
        for (let i = 0; i < n_day; i++) {
          if (i != day-1)
            newIsBlockChoosed.push([false, false, false, false]);
          else{
            let tmp_arr = [false, false, false, false];
            tmp_arr[block-1] = true;
            newIsBlockChoosed.push(tmp_arr);
          }
        }
        setIsBlockChoosed(newIsBlockChoosed);
      }
      else{
        setIsDeleteEnable(false);
        setBrightness(prevBrightness => prevBrightness.map((b, i) => {
          if (i === day-1) {
            return Math.max(b - 0.2, 0.8);
          } else if (i === selected) {
            return 1;
          } else {
            return b;
          }
        }));
        setSelected(day-1);
        selected_day = day;
        setNSpot(spot_arr_count[selected_day]);
        if (!isVisible) setIsVisible(prevIsVisible => !prevIsVisible);
        setSelectedSpot(null)

        let newIsBlockChoosed: boolean[][] = [];
        for (let i = 0; i < n_day; i++) {
          newIsBlockChoosed.push([false, false, false, false]);
        }
        setIsBlockChoosed(newIsBlockChoosed);
      }
    }
    else{
      setIsDeleteEnable(false);
      if (planData[day-1][block-1]){
        return ;
      }
      if (day == selected_day){
        axios.post(backend_url + '/api/schedules', {
          "planId": location.state.planId, //location.state.planId,
          "spotId": spot_id,
          "date": day,
          "time": time,
        },{ withCredentials: true })
        .then(response => {
          setResponseData(response.data);
          setnewPostFlag(1);
        })
        .catch(error => {
          console.error('Error fetching data: ', error);
        });
      }
      else{
        setBrightness(prevBrightness => prevBrightness.map((b, i) => {
          if (i === day-1) {
            return Math.max(b - 0.2, 0.8);
          } else if (i === selected) {
            return 1;
          } else {
            return b;
          }
        }));
        setSelected(day-1);
        selected_day = day;
        if (!isVisible) setIsVisible(prevIsVisible => !prevIsVisible);
        setSelectedSpot(null)
        setNSpot(spot_arr_count[selected_day]);
      }
    }
  };
  const [responseData, setResponseData] = useState<any[]>([]);

  useEffect(() => {
    // API 호출
    axios.get(backend_url + '/api/schedules/day/' + String(location.state.planId), { withCredentials: true })// String(location.state.planId), { withCredentials: true })
      .then(response => {
        setResponseData(response.data);
        let tempNSpot = nSpot; // 임시 변수에 현재 nSpot 값 저장
        let day: any;
        spot_arr = new Array(n_day);
        spot_arr_count = new Array(n_day+1).fill(0);
        if (!get_flag){
          for(let data of response.data){
            day = data.day;  // day 속성 값 가져오기
            // arr의 day번째 원소가 아직 배열로 초기화되지 않았다면 초기화
            if(!spot_arr[day]) spot_arr[day] = [];
            tempNSpot = tempNSpot + 1; // 임시 변수 값 증가
            spot_arr_count[day] = spot_arr_count[day] + 1;
            // arr의 day번째 배열에 data 추가
            spot_arr[day].push(data);
          }
        }
        get_flag = 1;
        setNSpot(spot_arr_count[day]); // nSpot 상태 업데이트
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  useEffect(() => {
    axios.get(backend_url + '/api/schedules/all/' + String(location.state.planId), { withCredentials: true }) //+ String(location.state.planId), { withCredentials: true })
    .then(response => {
        // const dayNum = 3; //////////// 재혁이가 넘겨줄 예정
        let newPlanData: string[][] = [];
        let newIsBlockChoosed: boolean[][] = [];
        for (let i = 0; i < n_day; i++) {
          newPlanData.push(["", "", "", ""]);
          newIsBlockChoosed.push([false, false, false, false]);
        }
        for(let i = 0; i < response.data.length; i++){
          switch (response.data[i].time) {
            case "morning":
              newPlanData[response.data[i].date - 1][0] = response.data[i].name;
              break;
            case "afternoon1":
              newPlanData[response.data[i].date - 1][1] = response.data[i].name;
              break;
            case "afternoon2":
              newPlanData[response.data[i].date - 1][2] = response.data[i].name;
              break;
            case "evening":
              newPlanData[response.data[i].date - 1][3] = response.data[i].name;
              break;
            case "night":
              newPlanData[response.data[i].date - 1][4] = response.data[i].name;
              break;
            default:
              throw new Error('Unsupported time');
          }
        }
        // response.data.forEach((item: {day: string, time: string, name: string}) => {
        //     const { day, time, name } = item;
        //     if (!newPlanData[day]) {
        //         newPlanData[day] = {};
        //     }
        //     newPlanData[day][time] page= name;
        // });
        setPlanData(newPlanData);
        setIsBlockChoosed(newIsBlockChoosed);
        setnewPostFlag(0);
        setIsLoadingDone(true);
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });
}, [newPostFlag, nSpot]);

  return(
    <TimeTableContainer>
      <Body>
        <Top>
            <Back onClick={() => navigate('/planstatus', { state: { planId: location.state.planId } })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                    <path d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z" fill="black"/>
                </svg>                
            </Back>
            <Title>여행 일정표</Title>

        </Top>

        {isLoadingDone && (  
        <div className="timetable" style={timetable_style}>
          <div className="explain" style={explain_style}> * 원하는 날짜의 칸을 선택하여 여행지를 추가해보세요! </div>
          <div className="timetable_each_day" style={timetable_each_day_style}>
            <div className="time_label" style={time_label_style}>
              <div style={{height: '20px',}}></div>
              <div style={time_label_text_style}>오전</div>
              <div style={time_label_text_style}>오후1</div>
              <div style={time_label_text_style}>오후2</div>
              <div style={time_label_text_style}>저녁</div>
            </div>
            {Array.from({ length: n_day }, (_, i) => i + 1).map((day, i) => {
              const is_first_day = i === 0;
              const is_last_day = i === n_day - 1;
            
              const day_title_style = is_first_day ? first_day_title_style
                              : is_last_day ? last_day_title_style
                              : n_th_day_title_style;
              const day_last_block_style = is_first_day ? first_day_last_block_style
                                      : is_last_day ? last_day_last_block_style
                                      : each_time_block_style;
              console.log(planData);
              return (
                <div style={{...each_day_style, filter: `brightness(${brightness[i]})`}} key={day}>
                  <div className="n_th_day_title" style={day_title_style}>
                    {day}일차
                  </div>
                  <div className="ojeon" style={{...each_time_block_style, background: planData[day-1][0] ? color_array[(day+1)%5] : 'white', color: planData[day-1][0] ? text_color_array[(day+1)%5] : '#9E9E9E', paddingTop: '15px', borderLeft: planData[day-1][0] ? ' 2px solid' : 'none'}} onTouchEnd={() => handle_eachday({day, block:1})}>
                    {planData[day-1][0]} 
                    {isBlockChoosed[day-1][0]? 
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                          <img src={delete_btn} style={{marginTop: '30px', width: '40px', height: '40px'}}></img>
                        </div>
                       : ""}
                  </div>
                  <div className="ohu1" style={{...each_time_block_style, background: planData[day-1][1] ? color_array[(day+2)%5] : 'white', color: planData[day-1][1] ? text_color_array[(day+2)%5] : '#9E9E9E', paddingTop: '15px', borderLeft: planData[day-1][1] ? ' 2px solid' : 'none'}} onTouchEnd={() => handle_eachday({day, block:2})}>
                    {planData[day-1][1]} 
                    {isBlockChoosed[day-1][1]? 
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                          <img src={delete_btn} style={{marginTop: '30px', width: '40px', height: '40px'}}></img>
                        </div>
                       : ""}
                  </div>
                  <div className="ohu2" style={{...each_time_block_style, background: planData[day-1][2] ? color_array[(day+3)%5] : 'white', color: planData[day-1][2] ? text_color_array[(day+3)%5] : '#9E9E9E', paddingTop: '15px', borderLeft: planData[day-1][2] ? ' 2px solid' : 'none'}} onTouchEnd={() => handle_eachday({day, block:3})}>
                    {planData[day-1][2]} 
                    {isBlockChoosed[day-1][2]? 
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                          <img src={delete_btn} style={{marginTop: '30px', width: '40px', height: '40px'}}></img>
                        </div>
                       : ""}
                  </div>
                  <div className="jeonyeok" style={{...each_time_block_style, background: planData[day-1][3] ? color_array[(day+4)%5] : 'white', color: planData[day-1][3] ? text_color_array[(day+4)%5] : '#9E9E9E', paddingTop: '15px', borderLeft: planData[day-1][3] ? ' 2px solid' : 'none'}} onTouchEnd={() => handle_eachday({day, block:4})}>
                    {planData[day-1][3]}
                    {isBlockChoosed[day-1][3]? 
                        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                          <img src={delete_btn} style={{marginTop: '30px', width: '40px', height: '40px'}}></img>
                        </div>
                       : ""}
                  </div>
                </div>
              );
            })}
            <div className="right_blank" style={{width:'20px'}}></div>
          </div>     
        </div>
        )}
        {isVisible && (
        <div className="spot_list_popup" style={spot_list_popup_style}>
          <div className="close_btn" style={close_btn_style}>
            <button onClick={handle_closebtn} style={{background: 'None', border:'None'}}>
              <img src={close_btn_x_black} style={close_btn_style}></img>
            </button>
          </div>
          <div className="popup_title" style={popup_title_style}>
            {selected_day}일차 여행지 리스트
          </div>
          <div className="selected_spots" style={selected_spots_style}>
            {Array.from({ length: nSpot }, (_, i) => i + 1).map((index) => {
                const each_spot_block_style: React.CSSProperties = {
                  marginLeft: '10px',
                  zIndex: '20',
                  flex: 'none',
                  height: '100px',
                  width: '100px',
                  bottom: '0px',
                  border: selectedSpot === index ? '1.5px solid #0D99FF' : '0.7px solid #E0E0E0',
                  borderRadius: "15px",
                  alignItems: 'center',
                  overflow: 'hidden',
                };
                const img_src = spot_arr[selected_day][index-1].paths[0]
                return (
                  <div style={each_spot_block_style} onClick={() => handleSpotClick(index)}>
                    <div style={image_style}>
                      <img src={img_src}></img>
                    </div>
                    <div style={image_title_style}>
                      {spot_arr[selected_day][index-1].name}
                    </div>
                  </div>  
                );
              })}
          </div>
        </div>
        )}
      </Body>
    </TimeTableContainer>
  )
}
export default TimeTable;

const timetable_style: React.CSSProperties = {
  zIndex: '4',
  width: '100%',
  height: '685px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: "None",
  borderRadius: '12px',
};
const timetable_each_day_style: React.CSSProperties = {
  marginTop: '12px',
  zIndex: '4',
  width: '100%',
  height: '685px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: "None",
  borderRadius: '12px',
};
const each_day_style: React.CSSProperties = {
  zIndex: '5',
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  height: '650px',
  backgroundColor: "white",
  border: "#5AC8FA",
  color: '#9E9E9E',
  fontFamily: 'Noto Sans KR',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '120%',
  letterSpacing: '-0.36px',
  textAlign: 'center',

};
const n_th_day_title_style: React.CSSProperties = {
  zIndex: '5',
  height: '20px',
  backgroundColor: "white",
  border: "0.7px solid #E0E0E0",
  color: '#9E9E9E',
  fontFamily: 'Noto Sans KR',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '120%',
  letterSpacing: '-0.36px',
  textAlign: 'center',
  
};
const each_time_block_style: React.CSSProperties = {
  zIndex: '5',
  flex: '1',
  backgroundColor: "white",
  border: "0.7px solid #E0E0E0",
  // color: '#9E9E9E',
  fontFamily: 'Noto Sans KR',
  fontSize: '15px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '16px',
  letterSpacing: '-0.45px',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '1.5px',
};
const first_day_title_style: React.CSSProperties = {
  zIndex: '5',
  height: '20px',
  backgroundColor: "white",
  borderTopLeftRadius: '10px',
  border: "0.7px solid #E0E0E0",
  color: '#9E9E9E',
  fontFamily: 'Noto Sans KR',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '120%',
  letterSpacing: '-0.36px',
  textAlign: 'center',
};
const first_day_last_block_style: React.CSSProperties = {
  zIndex: '5',
  flex: '1',
  backgroundColor: "white",
  borderBottomLeftRadius: '10px',
  border: "0.7px solid #E0E0E0",
  color: '#9E9E9E',
  fontFamily: 'Noto Sans KR',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '120%',
  letterSpacing: '-0.36px',
  textAlign: 'center',
};
const last_day_title_style: React.CSSProperties = {
  zIndex: '5',
  height: '20px',
  backgroundColor: "white",
  borderTopRightRadius: '10px',
  border: "0.7px solid #E0E0E0",
  color: '#9E9E9E',
  fontFamily: 'Noto Sans KR',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '120%',
  letterSpacing: '-0.36px',
  textAlign: 'center',
};
const last_day_last_block_style: React.CSSProperties = {
  zIndex: '5',
  flex: '1',
  backgroundColor: "white",
  borderBottomRightRadius: '10px',
  border: "0.7px solid #E0E0E0",
  color: '#9E9E9E',
  fontFamily: 'Noto Sans KR',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '120%',
  letterSpacing: '-0.36px',
  textAlign: 'center',
};
const time_label_style: React.CSSProperties = {
  width: '40px',
  height: '650px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};
const time_label_text_style: React.CSSProperties = {
  flex:'1', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  color: '#9E9E9E',
  fontFamily: 'Noto Sans KR',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '120%',
  letterSpacing: '-0.36px',
  textAlign: 'center',
};
const explain_style: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '28px',
  color: '#9E9E9E',
  fontFamily: 'Noto Sans KR',
  fontSize: '13px',
  fontStyle: 'normal',
  fontWeight: 350,
  lineHeight: '16px',
  letterSpacing: '-0.39px',
};
const spot_list_popup_style: React.CSSProperties = {
  zIndex: '15',
  position: 'absolute',
  bottom: '0px',
  width: '95%',
  height: '200px',
  display: 'flex',
  justifyContent: 'center',
  fill: "#FFF",
  filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.20))",
  backgroundColor: "white",
  borderRadius: '10px',
};

const close_btn_style: React.CSSProperties = {
  position: 'absolute',
  zIndex: '3',
  background: 'None', 
  border:'None',
  width: '15px',
  height: '15px',
  left: '10px',
  top: '10px',
};
const popup_title_style: React.CSSProperties = {
  position: 'absolute',
  zIndex: '3',
  background: 'None', 
  border:'None',
  bottom: '160px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'var(--DARK-BLUE, #1D2029)',
  fontFamily: 'Noto Sans KR',
  fontSize: '18px',
  fontStyle: 'normal',
  fontWeight: 900,
  lineHeight: '120%',
  letterSpacing: '-0.54px',
};

const selected_spots_style: React.CSSProperties = {
  display: 'flex',
  zIndex: '20',
  flexDirection: 'row',
  overflowX: 'auto',
  overflowY: 'hidden',
  marginTop: '70px',
  marginLeft: '10px',
  height: '160px',
};
const image_style: React.CSSProperties = {
  display: 'flex',
  height: '80%',
  width: '90%',
  marginTop: '0px',
  objectFit: 'cover',
};
const image_title_style: React.CSSProperties = {
  display: 'flex',
  color: 'var(--DARK-BLUE, #1D2029)',
  fontFamily: 'Noto Sans KR',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: '120%', // 16.8px
  letterSpacing: '-0.42px',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
};