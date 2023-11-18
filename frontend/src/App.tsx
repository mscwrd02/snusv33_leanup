import {BrowserRouter, Route, Routes} from 'react-router-dom';
<<<<<<< HEAD
import Page1_1 from "./Page1_1";
=======
import Page1 from "./Page1";
import Page2_1 from "./Page2_1";
import Page2_2 from "./Page2_2";
import Page3 from "./Page3";
>>>>>>> 792dc917e2402441b78bb707c15ceaffc513673c

function App(){
  return(
      <BrowserRouter>
          <Routes>
              <Route path="/">
<<<<<<< HEAD
                  <Route index element={<Page1_1 />} />
                  <Route path="page1_1" element={<Page1_1 />} />
=======
                  <Route index element={<Page3 />} />
                  <Route path="page1" element={<Page1 />} />
                  <Route path="page2_1" element={<Page2_1 />} />
                  <Route path="page2_2" element={<Page2_2 />} />
                  <Route path="page3" element={<Page3 />} />
>>>>>>> 792dc917e2402441b78bb707c15ceaffc513673c
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;