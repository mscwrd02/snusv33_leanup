import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import styled from "styled-components";
import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';


const Page2_1Container = styled.div`
    width: 430px;
    height: 932px;
    background: #FFF;
    padding-top: 6px;
`;

const Logo = styled(Link)`
    width: 110px;
    height: 34px;

    color: #0D99FF;
    text-align: center;
    font-family: Outfit;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 140%;
    
    margin-left: 10px;
`;

const Location = styled.div`
    width: 374px;
    height: 239px;
    flex-shrink: 0;

    border-radius: 20px;
    border: 0.5px solid #B4B4B4;
    background: #FFF;
    
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.20);

    margin-left: auto;
    margin-right: auto;
    margin-top: 14px;
    padding-bottom: 10px;
`;

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

    margin-top: 87px;
    margin-left: auto;
    margin-right: auto;
`;

const Add = styled.div`
    width: 60px;
    height: 60px;
    flex-shrink: 0;

    margin-left: 323px;
    margin-top: 303px;
`;

const Date = styled.div`
    width: 249px;
    height: 28px;
    flex-shrink: 0;

    border-radius: 10px;
    background: rgba(0, 0, 0, 0.70);

    margin-left: 19px;
    margin-top: 18px;

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

const Jeju = styled.div`
    color: var(--Black, #000);

    font-family: Inter;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    margin-top: 63px;
    text-align: center;
`;

const Below = styled.div`
    margin-top: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 19px;
`;

const Planning = styled.div`
    width: 94px;
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

    margin-left: 19px;
`;

const Images = styled.div`
    width: auto;
    height: auto;
    display: flex;
    position: relative;
`

const Image1 = styled.div`
    position: absolute;
    width: 44px;
    height: 44px;
    left: -70px;
    top: -22px;
`

const Image2 = styled.div`
    position: absolute;
    width: 44px;
    height: 44px;
    left: -50px;
    top: -22px;
`

const Image3 = styled.div`
    position: absolute;
    width: 44px;
    height: 44px;
    left: -30px;
    top: -22px;
`

function Page2_1() {
  return (
    <Page2_1Container>
        <Logo to="/page2_2" style={{ textDecoration: "none"}}>Tripwiz</Logo>
        <Location>
            <Link to="/page3" style={{ textDecoration: "none"}}>
                <Date>2023/12/21(목) ~ 2023/12/23(토)</Date>
                <Jeju>제주도</Jeju>
                <Below>
                    <Planning>계획중</Planning>
                    <Images>
                        <Image1><img width={44} height={44} src={img3}/></Image1>
                        <Image2><img width={44} height={44} src={img1}/></Image2>
                        <Image3><img width={44} height={44} src={img2}/></Image3>
                    </Images>
                </Below>
            </Link>
        </Location>
        <Decoration>Tripwiz</Decoration>
        <Add>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="#0D99FF"/>
                <path d="M30 44.5714L30 14.5714" stroke="white" stroke-width="7" stroke-linecap="round"/>
                <path d="M14.5713 30H44.5713" stroke="white" stroke-width="7" stroke-linecap="round"/>
            </svg>            
        </Add>
    </Page2_1Container>
  );
}

export default Page2_1;
