import React, { Fragment, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import App from './layouts/App'
import './index.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RouterData } from './commondata/routingdata';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'react-hot-toast';
import Loader from './layouts/layoutcomponents/loader';
import Auth from './layouts/auth/auth';
import Authlogin from './layouts/auth/authlogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    {/* <React.StrictMode> */}
    <BrowserRouter>
      <Provider store={store}>
        <Routes >
          <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />} >
            <Route index element={<Authlogin />} />
            <Route path={`${import.meta.env.BASE_URL}auth/authlogin`} element={<Authlogin />} />
            {/* <Route path={`${import.meta.env.BASE_URL}auth/signup`} element={<Signup />} /> */}
          </Route>
          {RouterData.map((idx) => (
            <Route path={`${import.meta.env.BASE_URL}`} element={<App />} key={Math.random()}>
              <Route path={idx.path} element={idx.element} />
            </Route>
          ))};
        </Routes>
        <Toaster />
      </Provider>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </>
);



// import React, { Fragment, lazy } from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './layouts/App'
// import './index.scss'
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { RouterData } from './commondata/routingdata';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import { Toaster } from 'react-hot-toast';
// import Loader from './layouts/layoutcomponents/loader';

// const Errorpage400 = lazy(() => import("./components/custompages/errorpages/400/400"));
// const Auth = lazy(() => import('./layouts/auth/auth'))
// const Authlogin = lazy(() => import('./layouts/auth/authlogin'))
// const Signup = lazy(() => import('./layouts/auth/signup'))
// const root = ReactDOM.createRoot(document.getElementById('root'))

// root.render(
//   <>
//     <Provider store={store}>
//       <BrowserRouter>
//         <React.Suspense fallback={<Loader />}>
//                   <Routes>
//             <Route path={`${import.meta.env.BASE_URL}`} element={<Auth />} >
//               <Route index element={<Authlogin />} />
//               <Route path={`${import.meta.env.BASE_URL}auth/authlogin`} element={<Authlogin />} />
//               <Route path={`${import.meta.env.BASE_URL}auth/signup`} element={<Signup />} />
//             </Route>

//             {RouterData.map((idx) => (
//               <Route path={`${import.meta.env.BASE_URL}`} element={<App />} key={Math.random()}>
//                 <Route path={idx.path} element={idx.element} />
//               </Route>
//             ))};
//             <Route path={`${import.meta.env.BASE_URL}custompages/errorpages/errorpage400`} element={<Errorpage400 />}/>
//             <Route path="*" element={<Errorpage400 />} />
//             {/* <Route path={`${import.meta.env.BASE_URL}pages/themeStyle`} element={<Switcherlayout />} /> */}
//           </Routes>
//         </React.Suspense>
//       </BrowserRouter>
//       <Toaster />
//     </Provider>
//   </>
// )