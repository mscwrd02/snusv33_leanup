import {BrowserRouter, Route, Routes} from 'react-router-dom';
import "./Page2_1.css";

function Page2_1() {
  return (
    <div className="Page2_1">
        <div className="Logo">Tripwiz</div>
        <div className="Location">
            <div className="Date">2023/12/21(목) ~ 2023/12/23(토)</div>
            <div className="Jeju">제주도</div>
            <div className="Below">
                <div className="Planning">계획중</div>
            </div>
        </div>
        <div className="Decoration">Tripwiz</div>
        <div className="Add">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="#0D99FF"/>
                <path d="M30 44.5714L30 14.5714" stroke="white" stroke-width="7" stroke-linecap="round"/>
                <path d="M14.5713 30H44.5713" stroke="white" stroke-width="7" stroke-linecap="round"/>
            </svg>            
        </div>
    </div>
  );
}

export default Page2_1;
