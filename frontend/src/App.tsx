import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Page1_1 from "./Page1_1";

function App(){
  return(
      <BrowserRouter>
          <Routes>
              <Route path="/">
                  <Route index element={<Page1_1 />} />
                  <Route path="page1_1" element={<Page1_1 />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;