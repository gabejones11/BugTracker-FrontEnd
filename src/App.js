
import './App.css';
import Login from './pages/login'
import Register from './pages/register'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard';
import PrivateRoutes from './utility/PrivateRoutes';


function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/dashboard' element={
          <PrivateRoutes>
            <Dashboard/>
          </PrivateRoutes>
          }/>
          <Route path='/createIssue' element={
            <PrivateRoutes>
              <createIssue/>
            </PrivateRoutes>
          }/>  
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
