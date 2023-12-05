import React, {useState} from "react";
import "./Page5.css";
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Prev_btn from "./prev_btn";
import axios from 'axios';
import styled from 'styled-components'
import { useEffect } from 'react'
import unsel_800 from './images/unsel_800.png';
import unsel_700 from './images/unsel_700.png';
import unsel_600 from './images/unsel_600.png';
import unsel_500 from './images/unsel_500.png';
import unsel_400 from './images/unsel_400.png';
import unsel_300 from './images/unsel_300.png';
import unsel_200 from './images/unsel_200.png';
import unsel_100 from './images/unsel_100.png';
import sel_800 from './images/sel_800.png';
import sel_700 from './images/sel_700.png';
import sel_600 from './images/sel_600.png';
import sel_500 from './images/sel_500.png';
import sel_400 from './images/sel_400.png';
import sel_300 from './images/sel_300.png';
import sel_200 from './images/sel_200.png';
import sel_100 from './images/sel_100.png';
import prev_btn_x from './images/prev_btn_x.png';
import close_btn_x from './images/close_btn_x.png';

import saebyuloreum from './images/saebyuloreum.png';
import spot_plus_btn from './images/spot_plus_btn.png';
import spot_already_added from './images/spot_already_added.png';

declare global {
  interface Window {
    kakao: any
  }
}

const Map = styled.div`
  width: 430px;
  height: 932px;
`
let is_first = true;
//let n_day = 5;
let spot_name: any;
let spot_content: any;
let spot_score: any;
let spot_isInSchedule: any;
let spot_Image: any;
let spot_id: any;
let isAddedList = new Array(300).fill(false);
let isSelected = new Array(300).fill(false);
let map_level = 11;
let map_center: any;
let map: any;
let newLng:any;
let newLat:any;

function PlannerMap() {
  const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;
  const [responseData, setResponseData] = useState<any[]>([]);
  const [responseDataPost, setResponseDataPost] = useState<any[]>([]);
  const [spotId, setSpotId] = useState(0);
  const [spotIsAdded, setSpotIsAdded] = useState(new Array(300).fill(false));
  const location = useLocation();
  const navigate = useNavigate();

  const handleSpotAdd = (index: number) => {
    // spotIsAdded 배열의 복사본을 만들어옴
    const newSpotIsAdded = [...spotIsAdded];
  
    // index에 해당하는 값 변경
    newSpotIsAdded[index] = true;
  
    // 변경된 배열로 상태 업데이트
    setSpotIsAdded(newSpotIsAdded);
  };

  //get DATA!!!
  useEffect(() => {
    // API 호출
    axios.get(backend_url + '/api/spots/recommend/' + String(location.state.planId), { withCredentials: true })// { withCredentials: true })
      .then(response => {
        setResponseData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, [setResponseDataPost]);  // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행되도록 설정

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleSpotPlus, setIsVisibleSpotPlus] = useState(false);

  const handle_closebtn = () => {
    setIsVisible(prevIsVisible => !prevIsVisible);
    if (isVisibleSpotPlus) setIsVisibleSpotPlus(prevIsVisibleSpotPlus => !prevIsVisibleSpotPlus);
  };

  const handle_spotplusbtn = () => {
    setIsVisibleSpotPlus(prevIsVisibleSpotPlus => !prevIsVisibleSpotPlus);
  };

  const handle_spotplusinmyplan = async (day: number) => {
    setIsVisibleSpotPlus(prevIsVisibleSpotPlus => !prevIsVisibleSpotPlus);
    // spot_isInSchedule = true;
    isAddedList[spotId] = true;
    handleSpotAdd(spotId);
    axios.post(backend_url + '/api/schedules/day', {
      "planId": location.state.planId, //location.state.planId,
      "spotId": spotId,
      "day": day
    },{ withCredentials: true })
    .then(response => {
      setResponseDataPost(response.data);
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
  };

  let backgroundColor;

  const spot_score_style: React.CSSProperties = {
    position: 'absolute',
    zIndex: '3',
    background: 'None', 
    border:'None',
    width: '100px',
    height: '24px',
    right: '10px',
    bottom: '10px',
    color: 'white',
    backgroundColor: "blue",// backgroundColor, // 변수를 사용하여 배경색 결정
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Noto Sans KR',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: 'normal',
    letterSpacing: '-0.25px',
  };
  
  map_center = new window.kakao.maps.LatLng(33.12, 126.7);

  // map_center.getLng();
  useEffect(() => {
    const container = document.getElementById('map')
    const options = {
      center: is_first ? new window.kakao.maps.LatLng(33.12, 126.7) : new window.kakao.maps.LatLng(newLat, newLng), // 지도의 중심 좌표
      level: map_level, // 지도의 레벨(확대, 축소 정도)
    }

    map = new window.kakao.maps.Map(container, options);
    
    if (Array.isArray(responseData)) {
      if (responseData) {
        let marker;
        let markerPosition;

        responseData.map((data: any, index: any) => {
          
          const score = data.score;

          let imageSrc: any;
          switch (score) {
            case 100:
              imageSrc = isSelected[data.Spot.id] ? sel_100 : unsel_100;
              backgroundColor = '#AF52DE';
              break;
            case 200:
              imageSrc = isSelected[data.Spot.id] ? sel_200 : unsel_200;
              backgroundColor = '#5856D6';
              break;
            case 300:
              imageSrc = isSelected[data.Spot.id] ? sel_300 : unsel_300;
              backgroundColor = '#007AFF';
              break;
            case 400:
              imageSrc = isSelected[data.Spot.id] ? sel_400 : unsel_400;
              backgroundColor = '#5AC8FA';
              break;
            case 500:
              imageSrc = isSelected[data.Spot.id] ? sel_500 : unsel_500;
              backgroundColor = '#34C759';
              break;
            case 600:
              imageSrc = isSelected[data.Spot.id] ? sel_600 : unsel_600;
              backgroundColor = '#FC0';
              break;
            case 700:
              imageSrc = isSelected[data.Spot.id] ? sel_700 : unsel_700;
              backgroundColor = '#FF9500';
              break;
            case 800:
              imageSrc = isSelected[data.Spot.id] ? sel_800 : unsel_800;
              backgroundColor = '#FF3B30';
              break;
            default:
              imageSrc = unsel_800;
              backgroundColor = '#FF3B30';
          }

          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(data.Spot.address, function(result:any, status:any) {
            if (status === window.kakao.maps.services.Status.OK) {
              markerPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              const imageSize = new window.kakao.maps.Size(30, 30); // 마커이미지의 크기입니다
              const imageOption = {offset: new window.kakao.maps.Point(0, 0)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
              const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
              
              marker = new window.kakao.maps.Marker({
                map: map,
                position: markerPosition,
                image: markerImage,
                clickable: true,
              });

              marker.setMap(map);
              window.kakao.maps.event.addListener(marker, 'click', function() {
                spot_name = data.Spot.name;
                spot_content = data.Spot.overview;
                spot_score = data.score;
                spot_isInSchedule = data.isInSchedule;
                isAddedList[data.Spot.id] = spot_isInSchedule;
                if (spot_isInSchedule) handleSpotAdd(data.Spot.id);
                spot_Image = data.Spot.Images[0].path;
                spot_id = data.Spot.id;
                setSpotId(data.Spot.id);
                if (isVisibleSpotPlus) setIsVisibleSpotPlus(prevIsVisibleSpotPlus => !prevIsVisibleSpotPlus);
                if (isSelected[data.Spot.id]){
                  isSelected = new Array(300).fill(false);
                  setIsVisible(false);
                }
                else{
                  setIsVisible(true);
                  isSelected = new Array(300).fill(false);
                  isSelected[data.Spot.id] = true;
                }
                map_level = map.getLevel();
                map_center = map.getCenter();
                newLat = map.getCenter().getLat();
                newLng = map.getCenter().getLng();
                is_first = false;
              });
            }
          });
        })
      }
    }
  }, [responseData, handle_spotplusinmyplan])


  const titleStyle = {
    color: 'var(--DARK-BLUE, #1D2029)',
    fontFamily: 'Noto Sans KR',
    fontSize: '20px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '120%',
    letterSpacing: '-0.6px',
  };
  
  const textStyle = {
    // width: '10px',
    color: '#8E8E8E',
    fontFamily: 'Noto Sans KR',
    fontSize: '13px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '120%', // 15.6px
    letterSpacing: '-0.39px',
  };
  return (
    <div className="plannermap" style={map_style}>
      <div className="map_div">
        <Map id="map" />
      </div>
      <div className="hi" style={my_style}> 
        <button style={{background: 'None', border:'None'}} onClick={() => navigate('/surveyresult', { state: { planId: location.state.planId} })}>
          <img src={prev_btn_x} style={{width: '74px', height: '60px'}} alt="이전" /> 
        </button>
      </div>
      {isVisible && (
        <div className="explain_popup" style={center_align}>
          <div className="popup" style={popup_style}>
            <div className="close_btn">
              <button onClick={handle_closebtn} style={{background: 'None', border:'None'}}>
                <img src={close_btn_x} style={close_btn_style}></img>
              </button>
            </div>
            <div className="spot_img" style={spot_img_style}>
              <img src={spot_Image} style={{width:'135px',height:'135px',}}></img>
            </div>
            <div className="content_explain" style={content_explain_style}>
            <span style={titleStyle}>{spot_name}</span> <br></br>
            <span style={textStyle}>{spot_content}</span>
            </div>
            <div className="spot_plus_btn">
              <button onClick={handle_spotplusbtn} style={{background: 'None', border:'None'}}>
                <img src={(spot_isInSchedule || spotIsAdded[spotId] || isAddedList[spotId]) ? spot_already_added : spot_plus_btn} style={spot_plus_btn_style}></img>
              </button>
            </div>
            <div className="spot_score" style={spot_score_style}>
              {spot_score}점/800점
            </div>
            {isVisibleSpotPlus && (
              <div className="popup_spot_plus" style={popup_spot_plus_style}>
                {Array.from({ length: location.state.howMuchDays }, (_, i) => i + 1).map(day => ( //location.state.howMuchDays
                  <button style={spot_plus_to_plan_style} key={day} onClick={() => handle_spotplusinmyplan(day)}>{day}일차 일정에 추가</button>
                ))}
              </div>
            )}

          </div>
        </div>
        )}
    </div>
  );
}

const map_style: React.CSSProperties = {
  position: 'relative',
  zIndex: '0'
};
const my_style: React.CSSProperties = {
  position: 'absolute',
  left: '10px',
  top: '10px',
  zIndex: '1',
};
const popup_style: React.CSSProperties = {
  zIndex: '1',
  width: '360px',
  height: '135px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fill: "#FFF",
  strokeWidth: "0.5px",
  stroke: "rgba(180, 180, 180, 0.45)",
  filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.20))",
  backgroundColor: "white",
  borderRadius: '10px',
};
const center_align: React.CSSProperties = {
  position: 'absolute',
  bottom: '59px',
  width: '430px',
  zIndex: '1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
const close_btn_style: React.CSSProperties = {
  position: 'absolute',
  zIndex: '3',
  background: 'None', 
  border:'None',
  width: '20px',
  height: '20px',
  left: '10px',
  top: '10px',
};
const spot_plus_btn_style: React.CSSProperties = {
  position: 'absolute',
  zIndex: '3',
  background: 'None', 
  border:'None',
  width: '24px',
  height: '24px',
  right: '10px',
  top: '15px',
};

const spot_img_style: React.CSSProperties = {
  position: 'absolute',
  zIndex: '2',
  background: 'None', 
  border:'None',
  width: '135px',
  height: '135px',
  left: '0px',
  top: '0px',
};

const content_explain_style: React.CSSProperties = {
  position: 'absolute',
  zIndex: '2',
  background: 'None', 
  border:'None',
  width: '200px',
  height: '135px',
  left: '145px',
  top: '15px',
};

const popup_spot_plus_style: React.CSSProperties = {
  position: 'absolute',
  left: '200px',
  top: '40px',
  zIndex: '4',
  width: '150px',
  // height: '135px',/
  display: 'flex',
  flexDirection: 'column',
  //justifyContent: 'center',
  //alignItems: 'center',
  // backgroundColor: "None",
  boxShadow: '0px 8px 64px 0px rgba(0, 0, 0, 0.10)',
  borderRadius: '12px',
  background: 'rgba(237, 237, 237, 0.80)',
  alignItems: 'flex-start'
};

const spot_plus_to_plan_style: React.CSSProperties = {
  zIndex: '5',
  // // width: '177px',
  width: '100%',
  height: '25px',
  backgroundColor: "white",
  // borderRadius: '12px',
  textAlign: 'center',
  backdropFilter: 'blur(40px)',
  border: "#5AC8FA",
  borderRadius: '12px',
  display: 'flex',
  background: 'rgba(237, 237, 237, 0.80)',
  alignItems: 'center',
  justifyContent: 'center',
};
export default PlannerMap;

