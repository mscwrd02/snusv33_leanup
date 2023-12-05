import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import Page1 from "./Page1";
import Page1_1 from './Page1_1';
import Page1_2 from './Page1_2';
import {Page2_1} from "./Page2_1";
import Page2_2 from "./Page2_2";
import {Page3} from "./Page3";
import {Page4} from "./Page4";
import Page5 from './Page5';
import Page6 from "./Page6";
import Page6_1 from "./Page6_1";
import PageforGuest from "./PageforGuest";

import PlannerMap from './PlannerMap';
import TimeTable from './TimeTable';

import Page8 from "./Page8";
import Page9 from "./Page9";

import { useEffect } from 'react';


function App(){
    // const location = useLocation();

    // useEffect(() => {
    //     const trackPageView = (page_path: string) => {
    //         window.gtag('config', 'G-52K4E07LDY', {
    //           page_path: page_path,
    //         }); 
    //       };
      
    //       trackPageView(location.pathname + location.search);
    // }, [location]);

  return(
      <BrowserRouter>
          <Routes>
              <Route path="/">
                  <Route index element={<Page1 />} />
                  <Route path="home" element={<Page1 />} />
                  <Route path="login" element={<Page1_1 />} />
                  <Route path="join" element={<Page1_2 />} />
                  <Route path="planlist" element={<Page2_1 />} />
                  <Route path="page2_2" element={<Page2_2 />} />
                  <Route path="makeplan" element={<Page3 />} />
                  <Route path="selectlocation" element={<Page4 />} />
                  <Route path="sharelink" element={<Page5 />} />
                  <Route path="planstatus" element={<Page6 />} />

                  <Route path="plannermap" element={<PlannerMap />} />
                  <Route path="timetable" element={<TimeTable />} />

                  <Route path="typesurvey" element={<Page6_1 />} />
                  <Route path="pageforguest" element={<PageforGuest />} />
                  <Route path="spotsurvey" element={<Page8 />} />
                  <Route path="surveyresult" element={<Page9 />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;