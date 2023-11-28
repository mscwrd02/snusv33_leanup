import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { exportCounter, exportStartDate, exportEndDate } from "./Page3";

const backend_url: string = process.env.REACT_APP_BACKEND_URL as string;

const Page4Container = styled.div`
  width: 100%;
  height: 932px;
  background: #fff;
  padding-top: 30px;

  display: flex;
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

const Explaination = styled.div`
  margin: 0px;
  margin-top: 20px;
  margin-bottom: 10px;

  color: var(--DARK-BLUE, #1d2029);
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 24px */
  letter-spacing: -0.6px;

  span {
    color: var(--DARK-BLUE, #1d2029);
    font-family: Noto Sans KR;
    font-size: 20px;
    font-style: normal;
    font-weight: 900;
    line-height: 120%;
    letter-spacing: -0.6px;
  }
`;

const Extra = styled.div`
  width: 278px;

  color: #747474;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%; /* 18px */
  letter-spacing: -0.45px;

  margin-top: 10px;
  margin-bottom: 10px;

  span {
    color: #747474;
    font-family: Noto Sans KR;
    font-size: 15px;
    font-style: normal;
    font-weight: 700;
    line-height: 120%;
    letter-spacing: -0.45px;
  }
`;

const Selection = styled.div`
  width: 85;
  height: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 22px;
  column-gap: 26px;

  margin-top: 22px;
`;

interface CardProps {
  cardClicked: boolean;
  onClick: () => void;
}

const Card = styled.button<CardProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 166px;
  height: 250px;
  flex-shrink: 0;

  border-radius: 14px;
  border: 2px solid ${(props) => (props.cardClicked ? "#2E5AF5;" : "#FFFFFF")};
  &.Direction {
    color: #2e5af5;
  }

  background: #d9d9d9;
`;

const Where = styled.div`
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  margin-top: 54px;
`;

interface DirectionProps {
  cardClicked: boolean;
}

const Direction = styled.span<DirectionProps>`
  color: ${(props) => (props.cardClicked ? "#2E5AF5;" : "var(--Black, #000);")};
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 25px;
  font-style: normal;
  font-weight: 900;
  line-height: 120%;
`;

const Example = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 9px;
  row-gap: 9px;
  margin-top: 25px;
`;

const Examplea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  column-gap: 9px;
  row-gap: 9px;
  margin-top: 25px;
`;

const Location = styled.div`
  display: flex;
  width: 44px;
  height: auto;
  padding: 5px;
  justify-content: center;
  align-items: center;

  border-radius: 14px;
  background: #fff;

  color: var(--Black, #000);
  text-align: center;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  margin: 0px;
`;

const Locationa = styled.div`
  display: flex;
  width: 75px;
  height: auto;
  padding: 5px;
  justify-content: center;
  align-items: center;

  border-radius: 14px;
  background: #fff;

  color: var(--Black, #000);
  text-align: center;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;

  margin: 0px;
`;

const Bottom = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: right;

  margin-top: 22px;
`;

const Enlarge = styled.div`
  width: 33px;
  height: 25px;
  flex-shrink: 0;

  border-radius: 14px;
  background: #2e5af5;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 6px;
`;

interface OkProps {
  isActive: boolean;
}

const Ok = styled(Link)<OkProps>`
  width: 356px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 36px;

  background: ${(props) => (props.isActive ? "#0D99FF" : "#B1B1B1")};
  pointer-events: ${(props) => (props.isActive ? "auto" : "none")};

  color: #fff;
  text-align: center;
  font-family: Noto Sans KR;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 20px */
  letter-spacing: 0.6px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 50px;
`;

export let exportPlanId: number = 0;

export function Page4() {
  const [cardClickedArray, setCardClickedArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [checkClicked, setCheckClicked] = useState(false);
  let directions: string[] = [];

  function cardClick(index: number) {
    setCardClickedArray((prevState) => {
      const updatedArray = [...prevState];
      updatedArray[index] = !updatedArray[index];

      if (
        updatedArray[0] ||
        updatedArray[1] ||
        updatedArray[2] ||
        updatedArray[3]
      )
        setCheckClicked(true);
      else setCheckClicked(false);

      return updatedArray;
    });
  }

  function createTrip() {
    console.log(exportCounter);
    console.log(String(directions));
    console.log(
      String(exportStartDate?.getFullYear()) +
        "-" +
        String((exportStartDate?.getMonth() ?? 0) + 1) +
        "-" +
        String(exportStartDate?.getDate())
    );
    console.log(
      String(exportEndDate?.getFullYear()) +
        "-" +
        String((exportEndDate?.getMonth() ?? 0) + 1) +
        "-" +
        String(exportEndDate?.getDate())
    );

    axios
      .post(
        backend_url + "/api/plans",
        {
          groupNum: exportCounter,
          regionList: String(directions),
          startDate:
            String(exportStartDate?.getFullYear()) +
            "-" +
            String((exportStartDate?.getMonth() ?? 0) + 1) +
            "-" +
            String(exportStartDate?.getDate()),
          endDate:
            String(exportEndDate?.getFullYear()) +
            "-" +
            String((exportEndDate?.getMonth() ?? 0) + 1) +
            "-" +
            String(exportEndDate?.getDate()),
        },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(response);
        console.log(response["data"]["planId"]);
        exportPlanId = response["data"]["planId"];
      })
      .catch(function (error) {
        // 오류발생시 실행
      })
      .then(function () {
        // 항상 실행
      });
  }

  for (let i = 0; i < 4; i++) {
    if (i == 0 && cardClickedArray[i]) directions.push("west");
    else if (i == 1 && cardClickedArray[i]) directions.push("east");
    else if (i == 2 && cardClickedArray[i]) directions.push("north");
    else if (i == 3 && cardClickedArray[i]) directions.push("south");
  }

  return (
    <Page4Container>
      <Top>
        <Back to="/page3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="27"
            viewBox="0 0 14 27"
            fill="none"
          >
            <path
              d="M13.1699 0L0 13.1699L13.1699 26.3397L13.9999 25.442L1.43203 13.1699L14 0.904566L13.1699 0Z"
              fill="black"
            />
          </svg>
        </Back>
        <Title>여행지 정하기</Title>
      </Top>

      <Explaination>
        제주도에서 여행하고 싶은 곳을 <br /> <span>모두</span> 선택해주세요.
      </Explaination>

      <Extra>
        렌트카 여행 시 <span>2~3개</span>,<br />
        뚜벅이 여행 시 <span>1~2개</span>를 추천해요!
      </Extra>

      <Selection>
        <Card cardClicked={cardClickedArray[0]} onClick={() => cardClick(0)}>
          <Where>
            노을이 아름다운
            <br />
            <Direction cardClicked={cardClickedArray[0]}>제주 서부</Direction>
          </Where>
          <Example>
            <Location>애월</Location>
            <Location>한림</Location>
            <Location>한경</Location>
            <Location>대정</Location>
          </Example>
          <Bottom>
            <Enlarge>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
              >
                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white" />
                <line
                  x1="10.9786"
                  y1="10.2714"
                  x2="15.3536"
                  y2="14.6464"
                  stroke="white"
                />
                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white" />
                <line
                  x1="10.9786"
                  y1="10.2714"
                  x2="15.3536"
                  y2="14.6464"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
              </svg>
            </Enlarge>
          </Bottom>
        </Card>
        <Card cardClicked={cardClickedArray[1]} onClick={() => cardClick(1)}>
          <Where>
            신비로운 대자연의
            <br />
            <Direction cardClicked={cardClickedArray[1]}>제주 동부</Direction>
          </Where>
          <Example>
            <Location>조천</Location>
            <Location>구좌</Location>
            <Location>성산</Location>
            <Location>표선</Location>
          </Example>
          <Bottom>
            <Enlarge>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
              >
                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white" />
                <line
                  x1="10.9786"
                  y1="10.2714"
                  x2="15.3536"
                  y2="14.6464"
                  stroke="white"
                />
                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white" />
                <line
                  x1="10.9786"
                  y1="10.2714"
                  x2="15.3536"
                  y2="14.6464"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
              </svg>
            </Enlarge>
          </Bottom>
        </Card>
        <Card cardClicked={cardClickedArray[2]} onClick={() => cardClick(2)}>
          <Where>
            뚜벅이를 위한
            <br />
            <Direction cardClicked={cardClickedArray[2]}>제주 북부</Direction>
          </Where>
          <Examplea>
            <Locationa>제주 공항</Locationa>
            <Locationa>제주 시내</Locationa>
          </Examplea>
          <Bottom>
            <Enlarge>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
              >
                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white" />
                <line
                  x1="10.9786"
                  y1="10.2714"
                  x2="15.3536"
                  y2="14.6464"
                  stroke="white"
                />
                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white" />
                <line
                  x1="10.9786"
                  y1="10.2714"
                  x2="15.3536"
                  y2="14.6464"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
              </svg>
            </Enlarge>
          </Bottom>
        </Card>
        <Card cardClicked={cardClickedArray[3]} onClick={() => cardClick(3)}>
          <Where>
            다양한 액티비티의
            <br />
            <Direction cardClicked={cardClickedArray[3]}>제주 남부</Direction>
          </Where>
          <Example>
            <Location>안덕</Location>
            <Location>중문</Location>
            <Location>남원</Location>
            <Location>서귀포</Location>
          </Example>
          <Bottom>
            <Enlarge>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
              >
                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white" />
                <line
                  x1="10.9786"
                  y1="10.2714"
                  x2="15.3536"
                  y2="14.6464"
                  stroke="white"
                />
                <circle cx="6.6875" cy="6.6875" r="5.6875" stroke="white" />
                <line
                  x1="10.9786"
                  y1="10.2714"
                  x2="15.3536"
                  y2="14.6464"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="3.625"
                  y1="6.625"
                  x2="9.75"
                  y2="6.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
                <line
                  x1="6.625"
                  y1="9.75"
                  x2="6.625"
                  y2="3.625"
                  stroke="white"
                />
              </svg>
            </Enlarge>
          </Bottom>
        </Card>
      </Selection>
      <Ok
        to="/page5"
        style={{ textDecoration: "none" }}
        isActive={checkClicked}
        onClick={createTrip}
      >
        공유링크 만들기
      </Ok>
    </Page4Container>
  );
}
