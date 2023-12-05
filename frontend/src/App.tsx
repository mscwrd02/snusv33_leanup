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
                  <Route path="page1" element={<Page1 />} />
                  <Route path="page1_1" element={<Page1_1 />} />
                  <Route path="page1_2" element={<Page1_2 />} />
                  <Route path="page2_1" element={<Page2_1 />} />
                  <Route path="page2_2" element={<Page2_2 />} />
                  <Route path="page3" element={<Page3 />} />
                  <Route path="page4" element={<Page4 />} />
                  <Route path="page5" element={<Page5 />} />
                  <Route path="page6" element={<Page6 />} />

                  <Route path="plannermap" element={<PlannerMap />} />
                  <Route path="timetable" element={<TimeTable />} />

                  <Route path="page6_1" element={<Page6_1 />} />
                  <Route path="pageforguest" element={<PageforGuest />} />
                  <Route path="page8" element={<Page8 />} />
                  <Route path="page9" element={<Page9 />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;