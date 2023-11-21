import {BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import "./Page2_2.css";

function Page2_2() {
  return (
    <div className="Page2_2">
        <div className="Logo">Tripwiz</div>
        <div className="Explaination">
            플러스 버튼을 <span className="Portion">눌러</span><br></br>여행 계획<span className="Portion">을</span><br></br>시작해보세요!
        </div>
        <div className="Add">
          <Link to="/page2_1">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="#0D99FF"/>
                  <path d="M30 44.5714L30 14.5714" stroke="white" stroke-width="7" stroke-linecap="round"/>
                  <path d="M14.5713 30H44.5713" stroke="white" stroke-width="7" stroke-linecap="round"/>
              </svg>            
          </Link>
        </div>
    </div>
  );
}

export default Page2_2;
